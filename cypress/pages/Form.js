class Form {
  constructor() {
    this.url = "https://letcode.in/forms";
    this.firstNameInput = "#firstname";
    this.lastNameInput = "#lasttname";
    this.emailInput = "#email";
    this.select = ".select select";
    this.phoneInput = "#Phno";
    this.address1Input = "#Addl1";
    this.address2Input = "#Addl2";
    this.stateInput = "#state";
    this.postalCodeInput = "#postalcode";
    this.dobInput = "#Date";
    this.maleRadio = "#male";
    this.agreeCheckbox = "[type='checkbox']";
    this.form = "[type='submit']";
    this.clearButton = 'button:contains("Clear")';
    this.alertMessage = ".alert";
  }

  visit() {
    cy.visit(this.url);
  }

  fillForm(data) {
    cy.get(this.firstNameInput).type(data.firstName);
    cy.get(this.lastNameInput).type(data.lastName);
    cy.get(this.emailInput).type(data.email);
    cy.get(this.select).first().select(data.countryCode);
    cy.get(this.phoneInput).type(data.phone);
    cy.get(this.address1Input).type(data.address1);
    cy.get(this.address2Input).type(data.address2);
    cy.get(this.stateInput).type(data.state);
    cy.get(this.postalCodeInput).type(data.postalCode);
    cy.get(this.select).last().select(data.country);
    cy.get(this.dobInput).type(data.dob);
    cy.get(this.maleRadio).check();
    cy.get(this.agreeCheckbox).check();
  }
}

export const form = new Form();
