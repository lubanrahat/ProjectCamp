export const UserRolesEnum = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
};

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const taskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  Done: "done",
};

export const AvailableTaskStatuses = Object.values(taskStatusEnum);
