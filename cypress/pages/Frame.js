import Base from "./Base";

class Frame extends Base {
  constructor() {
    super();
    this.url = "/frame";
    this.fname = "First name is Bruce";
    this.lname = "Last name is Wayne";
    this.email = "bruce@wayneenterprises.com";
    this.firstNameInput = '[name="fname"]';
    this.lastNameInput = '[name="lname"]';
    this.emailInput = '[name="email"]';
    this.firstFrame = "#firstFr";
    this.nestedFrame = "iframe.has-background-white";
    this.confirmationText = ".title.has-text-info";
  }

  visit() {
    super.visit(this.url);
  }

  typeFirstName() {
    cy.iframe(this.firstFrame).find(this.firstNameInput).type(this.fname);
  }

  typeLastName() {
    cy.iframe(this.firstFrame).find(this.lastNameInput).type(this.lname);
  }

  verifyConfirmationText() {
    cy.iframe(this.firstFrame)
      .find(this.confirmationText)
      .should("have.text", `You have entered ${this.fname} ${this.lname}`);
  }

  typeEmail() {
    cy.iframe(this.firstFrame).within(() => {
      cy.iframe(this.nestedFrame).within(() => {
        cy.get(this.emailInput).type(this.email);
      });
    });
  }
}

export default new Frame();
