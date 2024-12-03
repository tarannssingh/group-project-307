export function addAuthHeader(otherHeaders = {}) {
    const token = sessionStorage.getItem("token")
    if (token === "INVALID_TOKEN") {
        return otherHeaders;
    } else {
        return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
        };
    }
}

export const API_PREFIX = "http://localhost:5478";