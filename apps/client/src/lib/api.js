export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("forma-auth-token");
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return fetch(url, { ...options, headers });
}

export function isLoggedIn() {
  return !!localStorage.getItem("forma-auth-token");
}