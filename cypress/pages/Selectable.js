import Base from "./Base";

class Selectable extends Base {
  constructor() {
    super();
    this.url = "/selectable";
    this.selectableItems = ".ui-selectable";
  }

  visit() {
    super.visit(this.url);
  }

  selectMultipleItems(indexes) {
    cy.get("body").type("{ctrl}", { release: false });
    indexes.forEach((index) => {
      this.getElement(this.selectableItems).eq(index).click();
    });
    cy.get("body").type("{ctrl}", { release: true });
  }

  verifyItemsSelected(indexes) {
    indexes.forEach((index) => {
      this.getElement(this.selectableItems)
        .eq(index)
        .should("have.class", "ui-selected");
    });
  }
}

export default new Selectable();
