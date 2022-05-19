import { InvalidFieldRegisterForm, GenericRegisterFormError, InvalidCpfError, CpfAlreadyExistsError } from "./errors";
import Translations from "@/translations";
import translationsData from "./translations.json";

const translations = new Translations(translationsData);

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

export async function sendValidateCpf(cpf) {
  const url = `https://app.professordaniloalves.com.br/api/v1/cadastro/validar/documento/${cpf}`;

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Accept: "application/json",
    }),
  });

  const responseBody = await response.json();

  if (response.status === 400) {
    throw new InvalidCpfError(responseBody.message);
  }

  if (response.status === 412) {
    throw new CpfAlreadyExistsError(responseBody.message);
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

  if (response.status === 422) {
    throw new InvalidFieldRegisterForm(JSON.stringify(responseBody));
  }

  if ([4, 5].includes(parseInt(response.status / 100))) {
    throw new GenericRegisterFormError(responseBody.message || translations.translation("formErrorMessage"));
  }

  return responseBody;
}

export async function sendEditRegister(data) {
  const url = "https://app.professordaniloalves.com.br/api/v1/cadastro";

  const response = await fetch(url, {
    method: "PUT",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (response.status === 422) {
    throw new InvalidFieldRegisterForm(JSON.stringify(responseBody));
  }

  if ([4, 5].includes(parseInt(response.status / 100))) {
    throw new GenericRegisterFormError(responseBody.message || translations.translation("formErrorMessage"));
  }

  return responseBody;
}

export async function sendDeleteByCpf(cpf) {
  const url = `https://app.professordaniloalves.com.br/api/v1/cadastro/${cpf}`;

  await fetch(url, {
    method: "DELETE",
    headers: new Headers({
      Accept: "application/json",
    }),
  });
}

export async function sendGetRegister(cpf) {
  const url = `https://app.professordaniloalves.com.br/api/v1/cadastro/${cpf}`;

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Accept: "application/json",
    }),
  });

  return await response.json();
}
