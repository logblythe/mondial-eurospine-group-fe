export const apiUrls = {
  auth: {
    login: "/auth/login",
  },
  groups: {
    get: "/groups",
    sync: "/groups/sync/:id",
    syncStatus: "/groups/sync/:id/status",
    globalSyncStatus: "/groups/sync/status",
    refresh_cache: "/groups/refresh-cache",
  },
  exceptionLogs: "/logs?pageNumber=0&pageSize=1000",
};
