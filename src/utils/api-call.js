export function buildQueryParams(obj) {
  let queryParams = "";

  queryParams = Object.entries(obj)
    .reduce(function (acc, [key, value]) {
      acc.push(`${key}=${value}`);

      return acc;
    }, [])
    .join("&");

  return `?${queryParams}`;
}
