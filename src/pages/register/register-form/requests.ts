import { buildHeaders } from "@utils/api-call";
import State from "./interfaces/state";
import City from "./interfaces/city";

export async function getStates(): Promise<State[]> {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  try {
    const headers = new Map<string, string>();

    headers.set("Accept", "application/json");

    const response = await fetch(url, {
      method: "GET",
      headers: buildHeaders(headers),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getStateCities(stateId: number): Promise<City[]> {
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/distritos`;

  try {
    const headers = new Map<string, string>();

    headers.set("Accept", "application/json");

    const response = await fetch(url, {
      method: "GET",
      headers: buildHeaders(headers),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
