import { asyncHandler } from "../utils/async-handler.js";

const registerUser = asyncHandler((req, res) => {
  const { username, email, password, role } = req.body;
});

export { registerUser };
