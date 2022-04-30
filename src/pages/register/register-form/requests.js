import { InvalidCpfError, SendRegisterError } from "./errors";

export async function queryAddressByPostalCode(postalCode) {
  postalCode = postalCode.replace(/\D/gim, "");

  const url = `https://app.professordaniloalves.com.br/api/v1/endereco/${postalCode}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
      }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getStates() {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({
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
      headers: new Headers({
        Accept: "application/json",
      }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function sendValidateCpf(cpf) {
  const url = `https://app.professordaniloalves.com.br/api/v1/cadastro/validar/documento/${cpf}`;

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Accept: "application/json",
    }),
  });

  const responseBody = await response.json();

  if ([400, 412].includes(response.status)) {
    throw new InvalidCpfError(responseBody.message);
  }
}

export async function sendRegister(data) {
  const url = "https://app.professordaniloalves.com.br/api/v1/cadastro";

  const response = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if ([400, 412, 422].includes(response.status)) {
    throw new SendRegisterError(responseBody.message);
  }

  return responseBody;
}
