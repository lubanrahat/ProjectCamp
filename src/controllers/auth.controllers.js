import { asyncHandler } from "../utils/async-handler.js";
import User from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  const existedUser = await User.findOne({
    $or: [{ email }, { password }],
  });
  if (existedUser) {
    throw new ApiResponse(409, "User with email or username already exists");
  }
  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });

  const { hashedToken, unHashedToken, tokenExpire } =
    user.genetateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpire;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get(
        "host",
      )}/api/v1/auth/verify-email/${unHashedToken}`,
    ),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser },
        "Users registered successfully and verification email has been sent on your email.",
      ),
    );
});

export { registerUser };
