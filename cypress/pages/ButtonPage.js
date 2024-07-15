import BasePage from "./BasePage";

class ButtonPage extends BasePage {
  constructor() {
    super();
    this.url = "/buttons";
    this.homeButton = "#home";
    this.colorButton = "#color";
    this.propertyButton = "#property";
    this.disabledButton = '[title="Disabled button"]';
    this.holdButton = 'h2:contains("Button Hold!")';
  }

  visit() {
    super.visit(this.url);
  }

  clickHomeButton() {
    this.clickElement(this.homeButton);
  }

  verifyColorButtonBackground(expectedColor) {
    this.verifyElementCss(this.colorButton, "background-color", expectedColor);
  }

  verifyPropertyButtonHeight(expectedHeight) {
    this.verifyElementCss(this.propertyButton, "height", expectedHeight);
  }

  verifyDisabledButtonAttribute() {
    this.verifyElementAttribute(this.disabledButton, "disabled", "disabled");
  }

  holdButton(duration) {
    this.getElement(this.holdButton).trigger("mousedown");
    cy.wait(duration);
  }
}

export default new ButtonPage();
