const browserLanguage = navigator.language;

export default browserLanguage;

export function isPt() {
  return browserLanguage.indexOf("pt") != -1;
}
