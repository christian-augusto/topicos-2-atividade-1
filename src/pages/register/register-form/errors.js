export class InvalidFieldRegisterForm extends Error {
  constructor(message) {
    super(message);
  }
}

export class GenericRegisterFormError extends Error {
  constructor(message) {
    super(message);
  }
}

export class InvalidCpfError extends Error {
  constructor(message) {
    super(message);
  }
}

export class CpfAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
  }
}
