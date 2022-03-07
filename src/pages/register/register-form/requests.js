import { buildHeaders } from "@utils/api-call";

export async function getStates() {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: buildHeaders({
        Accept: "application/json",
      }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getStateCities(stateId) {
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/distritos`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: buildHeaders({
        Accept: "application/json",
      }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
