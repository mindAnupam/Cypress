Cypress.Commands.add("selectOptionByText", (selector, optionText) => {
  cy.get(selector).select(optionText);
});

Cypress.Commands.add("dragAndDrop", (sourceSelector, targetSelector) => {
  cy.get(sourceSelector).as("source");
  cy.get(targetSelector).as("target");

  cy.get("@source").then(($source) => {
    const sourceRect = $source[0].getBoundingClientRect();

    cy.get("@target").then(($target) => {
      const targetRect = $target[0].getBoundingClientRect();

      // Calculate the center points
      const sourceX = sourceRect.left + sourceRect.width / 2;
      const sourceY = sourceRect.top + sourceRect.height / 2;
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 2;

      // Perform the drag and drop
      cy.get("@source")
        .trigger("mousedown", {
          button: 0,
          clientX: sourceX,
          clientY: sourceY,
          force: true,
        })
        .trigger("mousemove", {
          clientX: sourceX + 10,
          clientY: sourceY + 10,
          force: true,
        })
        .trigger("mousemove", {
          clientX: targetX,
          clientY: targetY,
          force: true,
        })
        .wait(500) // Wait for any animations
        .trigger("mouseup", { force: true });
    });
  });
});
