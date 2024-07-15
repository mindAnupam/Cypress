import BasePage from "./BasePage";

class AlertPage extends BasePage {
  constructor() {
    super();
    this.url = "/alert";
    this.acceptButton = "#accept";
    this.confirmButton = "#confirm";
  }

  visit() {
    super.visit(this.url);
  }

  clickAcceptButton() {
    this.clickElement(this.acceptButton);
  }

  clickConfirmButton() {
    this.clickElement(this.confirmButton);
  }

  verifyAlertText(expectedText) {
    cy.on("window:alert", (str) => {
      expect(str).to.equal(expectedText);
    });
  }

  verifyConfirmText(expectedText) {
    cy.on("window:confirm", (str) => {
      expect(str).to.equal(expectedText);
    });
  }
}

export default new AlertPage();
