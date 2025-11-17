// src/lib/authFetch.ts
// With NextAuth, cookies are automatically included in fetch requests
// This is a simple wrapper that ensures credentials are included
export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  return fetch(input, {
    ...init,
    credentials: "include", // Include cookies (NextAuth session)
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}
