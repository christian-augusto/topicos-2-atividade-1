class RequiredArgumentMissingError extends Error {
  constructor() {
    super("Required argument missing");
  }
}

function argumentRequired() {
  throw new RequiredArgumentMissingError();
}
export default argumentRequired;
