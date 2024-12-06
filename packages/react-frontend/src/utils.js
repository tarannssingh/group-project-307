export function addAuthHeader(otherHeaders = {}) {
  const token = sessionStorage.getItem("token");
  if (token === "INVALID_TOKEN") {
    return otherHeaders;
  } else {
    return {
      ...otherHeaders,
      Authorization: `Bearer ${token}`,
    };
  }
}

export const API_PREFIX =
  import.meta.env.VITE_BASE_URL ||
  "https://piggypass-api-e9hmcmbebkfabyam.westus3-01.azurewebsites.net";
