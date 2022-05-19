<template>
  <section class="register-form">
    <form class="flex" @submit="registerFormSubmit">
      <div class="form__field flex">
        <label for="completeName-input">{{ translations.translation("completeNameInputLabel") }}</label>
        <input
          type="text"
          id="completeName-input"
          autocomplete="nope"
          required="required"
          :placeholder="translations.translation('completeNameInputPlaceholder')"
          v-model="completeName"
          :class="{ 'has-errors': invalidCompleteName, 'is--blocked': blockedForm }"
        />
        <p class="form__field__error-message">{{ completeNameError }}</p>
      </div>
      <div class="form__field flex">
        <label for="email-input">{{ translations.translation("emailInputLabel") }}</label>
        <input
          type="email"
          id="email-input"
          autocomplete="nope"
          required="required"
          :placeholder="translations.translation('emailInputPlaceholder')"
          v-model="email"
          :class="{ 'is--blocked': blockedForm }"
        />
        <p class="form__field__error-message">{{ emailError }}</p>
      </div>
      <div class="form__field flex">
        <label for="birthDate-input">{{ translations.translation("birthDateInputLabel") }}</label>
        <input
          type="text"
          id="birthDate-input"
          ref="birthDate"
          autocomplete="nope"
          minlength="10"
          maxlength="10"
          required="required"
          :placeholder="translations.translation('birthDateInputPlaceholder')"
          v-model="birthDate"
          v-imask="birthDateMask"
          :class="{ 'has-errors': invalidBirthDate, 'is--blocked': blockedForm }"
        />
        <p class="form__field__error-message">{{ birthDateError }}</p>
      </div>
      <div class="form__field flex">
        <label for="gender-select">{{ translations.translation("genderSelectLabel") }}</label>
        <select id="gender-select" v-model="gender" required="required" :class="{ 'is--blocked': blockedForm }">
          <option value="">{{ translations.translation("genderSelectPlaceholder") }}</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </div>
      <div class="form__field flex">
        <label for="cpf-input">{{ translations.translation("cpfInputLabel") }}</label>
        <input
          type="text"
          id="cpf-input"
          ref="cpf"
          autocomplete="nope"
          minlength="14"
          maxlength="14"
          required="required"
          :placeholder="translations.translation('cpfInputPlaceholder')"
          v-model="cpf"
          v-imask="cpfMask"
          :class="{ 'has-errors': invalidCpf, 'is--blocked': blockedForm }"
        />
        <p class="form__field__error-message">{{ cpfError }}</p>
      </div>
      <div class="form__field flex">
        <label for="postalCode-input">{{ translations.translation("postalCodeInputLabel") }}</label>
        <input
          type="text"
          id="postalCode-input"
          autocomplete="nope"
          minlength="9"
          maxlength="9"
          required="required"
          :placeholder="translations.translation('postalCodeInputPlaceholder')"
          v-model="postalCode"
          v-imask="postalCodeMask"
          :class="{ 'is--blocked': blockedForm }"
        />
        <p class="form__field__error-message">{{ postalCodeError }}</p>
      </div>
      <div class="form__field flex">
        <label for="street-input">{{ translations.translation("streetInputLabel") }}</label>
        <input
          type="text"
          id="street-input"
          :placeholder="translations.translation('streetInputPlaceholder')"
          v-model="street"
          required="required"
          autocomplete="nope"
          :class="{ 'is--blocked': blockedForm }"
        />
        <p class="form__field__error-message">{{ streetError }}</p>
      </div>
      <div class="form__field flex">
        <label for="streetNumber-input">{{ translations.translation("streetNumberInputLabel") }}</label>
        <input
          type="text"
          id="streetNumber-input"
          required="required"
          :placeholder="translations.translation('streetNumberInputPlaceholder')"
          v-model="streetNumber"
          autocomplete="nope"
          :class="{ 'is--blocked': blockedForm }"
        />
        <p class="form__field__error-message">{{ streetNumberError }}</p>
      </div>
      <div class="form__field flex">
        <label for="state-input">{{ translations.translation("stateInputLabel") }}</label>
        <input
          type="text"
          id="state-input"
          autocomplete="nope"
          required="required"
          :placeholder="translations.translation('stateInputPlaceholder')"
          v-model="state"
          :class="{ 'has-errors': invalidState, 'is--blocked': blockedForm }"
        />
        <p class="form__field__error-message">{{ stateError }}</p>
      </div>
      <div class="form__field flex">
        <label for="city-input">{{ translations.translation("cityInputLabel") }}</label>
        <input
          type="text"
          id="city-input"
          autocomplete="nope"
          required="required"
          :placeholder="translations.translation('cityInputPlaceholder')"
          v-model="city"
          :class="{ 'has-errors': invalidCity, 'is--blocked': blockedForm }"
        />
        <p class="form__field__error-message">{{ cityError }}</p>
      </div>
      <div class="form__field flex" id="acceptedTerms-wrapper">
        <label for="acceptedTerms-input">{{ translations.translation("acceptedTermsInputLabel") }}</label>
        <input
          type="checkbox"
          id="acceptedTerms-input"
          autocomplete="nope"
          required="required"
          v-model="acceptedTerms"
          :class="{ 'is--blocked': blockedForm }"
        />
      </div>
      <div class="form__actions flex">
        <button type="submit" class="form__send-btn" :class="{ 'is--blocked': blockedForm || !acceptedTerms }">
          Cadastrar
        </button>
      </div>
      <div class="form__confirmation-modal-overlay" :class="{ 'is--active': confirmationModalIsActive }"></div>
      <div class="form__confirmation-modal flex" :class="{ 'is--active': confirmationModalIsActive }">
        <p class="form__confirmation-modal__text">{{ translations.translation("confirmationModalText") }}</p>
        <div class="form__confirmation-modal__actions flex">
          <button type="button" class="form__confirmation-modal__edit-btn" @click="editRegisterClick">Editar</button>
          <button type="button" class="form__confirmation-modal__delete-btn" @click="deleteRegisterClick">
            Excluir
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { IMaskDirective } from "vue-imask";

import Translations from "@/translations";
import translationsData from "./translations.json";
import {
  queryAddressByPostalCode,
  sendRegister,
  sendValidateCpf,
  sendDeleteByCpf,
  sendGetRegister,
  sendEditRegister,
} from "./requests";
import { InvalidFieldRegisterForm, GenericRegisterFormError, InvalidCpfError, CpfAlreadyExistsError } from "./errors";
import "./register-form.scss";

const translations = new Translations(translationsData);

export default {
  data() {
    return {
      completeName: "",
      invalidCompleteName: false,
      completeNameError: "",

      email: "",
      invalidEmail: false,
      emailError: "",

      birthDate: "",
      birthDateMask: {
        mask: "00/00/0000",
      },
      invalidBirthDate: false,
      birthDateError: "",

      cpf: "",
      cpfMask: {
        mask: "000.000.000-00",
      },
      cpfError: "",
      invalidCpf: false,

      gender: "",

      postalCode: "",
      postalCodeMask: {
        mask: "00000-000",
      },
      invalidPostalCode: false,
      postalCodeError: "",

      street: "",
      streetError: "",
      invalidStreet: false,

      streetNumber: "",
      streetNumberError: "",
      invalidStreetNumber: false,

      state: "",
      stateError: "",
      invalidState: false,

      city: "",
      cityError: "",
      invalidCity: false,

      acceptedTerms: false,

      translations,
      states: [],
      stateId: -1,
      cities: [],
      blockedForm: false,

      confirmationModalIsActive: false,
      blockedConfirmationModal: false,

      cachedRegisterId: null,

      setAddressActive: true,
    };
  },
  watch: {
    completeName() {
      this.completeNameError = "";
      this.invalidCompleteName = false;
    },
    email() {
      this.emailError = "";
      this.invalidEmail = false;
    },
    birthDate() {
      this.birthDateError = "";
      this.invalidBirthDate = false;
    },
    cpf() {
      this.cpfError = "";
      this.invalidCpf = false;
      this.validCpf();
    },
    postalCode() {
      this.postalCodeError = "";
      this.invalidPostalCode = false;

      const self = this;

      Promise.all([this.setAddressByPostalCode()]).then(function () {
        self.activeSetAddress();
      });
    },
    street() {
      this.streetError = "";
      this.invalidStreet = false;
    },
    streetNumber() {
      this.streetNumberError = "";
      this.invalidStreetNumber = false;
    },
    state() {
      this.stateError = "";
      this.invalidState = false;
    },
    city() {
      this.cityError = "";
      this.invalidCity = false;
    },
  },
  methods: {
    async setAddressByPostalCode() {
      if (this.postalCode.length != 9 || !this.setAddressActive) {
        return;
      }

      this.blockForm();

      const address = await queryAddressByPostalCode(this.postalCode);

      if (address === null) {
        return;
      }

      this.street = address.logradouro;
      this.state = address.uf;
      this.city = address.localidade;

      this.unblockForm();
    },
    validBirthDate() {
      const birthDateSplit = this.birthDate.split("/");

      const aux = birthDateSplit[0];
      birthDateSplit[0] = birthDateSplit[1];
      birthDateSplit[1] = aux;

      const date = new Date(birthDateSplit.join("/"));

      return date instanceof Date && !isNaN(date);
    },
    formatBirthDate() {
      return this.birthDate.split("/").reverse().join("-");
    },
    revertBirthDate(birthDate) {
      return birthDate.split("-").reverse().join("/");
    },
    formatCpf() {
      return this.cpf.replace(/\D/gim, "");
    },
    revertCpf(cpf) {
      return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
    },
    formatPostalCode() {
      return this.postalCode.replace(/\D/gim, "");
    },
    revertPostalCode(postalCode) {
      return `${postalCode.substring(0, 5)}-${postalCode.substring(5)}`;
    },
    resetForm() {
      this.completeName = "";
      this.birthDate = "";
      this.gender = "";
      this.cpf = "";
      this.street = "";
      this.streetNumber = "";
      this.postalCode = "";
      this.state = "";
      this.city = "";
      this.email = "";
      this.acceptedTerms = false;
    },
    blockForm() {
      this.blockedForm = true;
    },
    unblockForm() {
      this.blockedForm = false;
    },
    blockConfirmationModal() {
      this.blockedConfirmationModal = true;
    },
    unblockConfirmationModal() {
      this.blockedConfirmationModal = false;
    },
    activeConfirmationModal() {
      this.confirmationModalIsActive = true;
    },
    disableConfirmationModal() {
      this.confirmationModalIsActive = false;
    },
    activeSetAddress() {
      this.setAddressActive = true;
    },
    disableSetAddress() {
      this.setAddressActive = false;
    },
    editRegisterClick(ev) {
      ev.preventDefault();

      this.editRegister();
    },
    async editRegister() {
      this.blockConfirmationModal();

      let register = null;

      try {
        register = await sendGetRegister(this.formatCpf());
      } catch (error) {
        console.error(error);
      }

      if (register) {
        this.disableSetAddress();

        this.completeName = register.nomeCompleto;
        this.email = register.email;
        this.birthDate = this.revertBirthDate(register.dataNascimento);
        this.gender = register.sexo;
        this.cpf = this.revertCpf(register.cpf);
        this.postalCode = this.revertPostalCode(register.cep);
        this.street = register.logradouro;
        this.streetNumber = register.numeroLogradouro;
        this.state = register.uf;
        this.city = register.cidade;

        this.cachedRegisterId = register.id;
      }

      this.unblockForm();
      this.disableConfirmationModal();
      this.unblockConfirmationModal();
    },
    deleteRegisterClick(ev) {
      ev.preventDefault();

      this.deleteRegister();
    },
    async deleteRegister() {
      this.blockConfirmationModal();

      try {
        await sendDeleteByCpf(this.formatCpf());
      } catch (error) {
        console.error(error);
      }

      this.unblockForm();
      this.disableConfirmationModal();
      this.unblockConfirmationModal();
    },
    async validCpf() {
      if (this.cpf.length != 14) {
        return;
      }

      this.blockForm();

      try {
        await sendValidateCpf(this.formatCpf());

        this.unblockForm();
      } catch (error) {
        if (error instanceof InvalidCpfError) {
          this.cpfError = error.message;
          this.invalidCpf = true;
        } else if (error instanceof CpfAlreadyExistsError) {
          this.activeConfirmationModal();
        } else {
          console.error(error);
        }

        this.$refs.cpf.focus();
      }
    },
    registerFormSubmit(ev) {
      ev.preventDefault();

      this.register();
    },
    setFieldsErrors(responseBody) {
      if (responseBody.errors.nomeCompleto) {
        this.completeNameError = responseBody.message;
        this.invalidCompleteName = true;
      }

      if (responseBody.errors.email) {
        this.emailError = responseBody.message;
        this.invalidEmail = true;
      }

      if (responseBody.errors.dataNascimento) {
        this.birthDateError = responseBody.message;
        this.invalidBirthDate = true;
      }

      if (responseBody.errors.cpf) {
        this.cpfError = responseBody.message;
        this.invalidCpf = true;
      }

      if (responseBody.errors.cep) {
        this.postalCodeError = responseBody.message;
        this.invalidPostalCode = true;
      }

      if (responseBody.errors.logradouro) {
        this.streetError = responseBody.message;
        this.invalidStreet = true;
      }

      if (responseBody.errors.numeroLogradouro) {
        this.streetNumberError = responseBody.message;
        this.invalidStreetNumber = true;
      }

      if (responseBody.errors.uf) {
        this.stateError = responseBody.message;
        this.invalidState = true;
      }

      if (responseBody.errors.cidade) {
        this.cityError = responseBody.message;
        this.invalidCity = true;
      }
    },
    async register() {
      this.blockForm();

      const data = {
        nomeCompleto: this.completeName,
        email: this.email,
        dataNascimento: this.formatBirthDate(),
        sexo: this.gender,
        cpf: this.formatCpf(),
        cep: this.postalCode.replace(/\D/gim, ""),
        logradouro: this.street,
        numeroLogradouro: this.streetNumber,
        uf: this.state,
        cidade: this.city,
      };

      if (this.cachedRegisterId) {
        data.id = this.cachedRegisterId;
      }

      if (!this.validBirthDate()) {
        this.birthDateError = translations.translation("invalidBirthDateErrorMessage");
        this.invalidBirthDate = true;
        this.unblockForm();
        this.$refs.birthDate.focus();
        return;
      }

      let sendForm = sendRegister;

      if (this.cachedRegisterId) {
        sendForm = sendEditRegister;
      }

      try {
        const responseBody = await sendForm(data);

        alert(responseBody.message);

        this.resetForm();
        this.cachedRegisterId = null;
      } catch (error) {
        if (error instanceof GenericRegisterFormError) {
          alert(error.message);
        } else if (error instanceof InvalidFieldRegisterForm) {
          const responseBody = JSON.parse(error.message);

          this.setFieldsErrors(responseBody);
        }
      }

      this.unblockForm();
    },
  },
  directives: {
    imask: IMaskDirective,
  },
};
</script>
