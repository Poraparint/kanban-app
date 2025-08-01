/**
 * An array of routes that are acessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * An array of routes that are useed for authentication
 * These routes will redirect logged in users to /board
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/user";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/board";