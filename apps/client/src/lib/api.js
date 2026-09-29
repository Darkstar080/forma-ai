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

export async function downloadSubmissionPdf(submissionId, filename) {
  const res = await authFetch(`/api/submissions/${submissionId}/pdf`);
  if (!res.ok) throw new Error("Could not generate PDF");
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || `claim-${submissionId}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}