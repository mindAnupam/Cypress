import BasePage from "./BasePage";

class SortablePage extends BasePage {
  constructor() {
    super();
    this.url = "/sortable";
    this.draggableItems = ".cdk-drag";
  }

  visit() {
    super.visit(this.url);
  }

  dragAndDrop(sourceIndex, targetIndex) {
    this.getElement(this.draggableItems).eq(sourceIndex).as("sourceElement");
    this.getElement(this.draggableItems).eq(targetIndex).as("targetElement");
    cy.get("@sourceElement").drag("@targetElement");
  }

  verifyItemOrder(index, expectedText) {
    this.getElement(this.draggableItems)
      .eq(index)
      .should("have.text", expectedText);
  }
}

export default new SortablePage();
