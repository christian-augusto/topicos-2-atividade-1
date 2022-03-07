export function buildHeaders(map: Map<string, string>) {
  const headers = new Headers();

  for (const [key, value] of map) {
    headers.append(key, value);
  }

  return headers;
}

export function buildQueryParams(map: Map<string, string>) {
  const queryParams = [];

  for (const [key, value] of map) {
    queryParams.push(`${key}=${value}`);
  }

  return `?${queryParams.join("&")}`;
}
