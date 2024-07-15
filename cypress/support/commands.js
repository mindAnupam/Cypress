Cypress.Commands.add("selectOptionByText", (selector, optionText) => {
  cy.get(selector).select(optionText);
});
