class BasePage {
  visit(path) {
    cy.visit("https://letcode.in/" + path);
  }

  getElement(selector) {
    return cy.get(selector);
  }

  clickElement(selector) {
    this.getElement(selector).click();
  }

  typeIntoElement(selector, text) {
    this.getElement(selector).type(text);
  }

  verifyUrl(url) {
    cy.url().should("eq", url);
  }

  verifyElementText(selector, expectedText) {
    this.getElement(selector).should("have.text", expectedText);
  }

  verifyElementAttribute(selector, attribute, expectedValue) {
    this.getElement(selector).should("have.attr", attribute, expectedValue);
  }

  verifyElementCss(selector, property, expectedValue) {
    this.getElement(selector).should("have.css", property, expectedValue);
  }
}

export default BasePage;
