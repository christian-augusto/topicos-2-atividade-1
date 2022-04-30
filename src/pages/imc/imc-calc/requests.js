export async function sendCalcImc(height, weight) {
  const url = "https://app.professordaniloalves.com.br/api/v1/imc/calcular";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        peso: `${weight}`,
        altura: `${height}`,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
