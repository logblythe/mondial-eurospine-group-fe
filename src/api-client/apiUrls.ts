export const apiUrls = {
  auth: {
    login: "/auth/login",
  },
  groups: {
    get: "/groups",
    sync: "/groups/sync/:id",
    syncStatus: "/groups/sync/:id/status",
    refresh_cache: "/groups/refresh-cache",
  },
};
