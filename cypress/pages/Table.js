import Base from "./Base";

class Table extends Base {
  constructor() {
    super();
    this.url = "/table";
    this.tableRows = "tr";
    this.caloriesHeader = 'div:contains("Calories")';
  }

  visit() {
    super.visit(this.url);
  }

  sumAndVerifyCalories() {
    let sum = 0;
    for (let i = 1; i <= 4; i++) {
      cy.get(this.tableRows)
        .eq(i)
        .find("td")
        .eq(1)
        .invoke("text")
        .then(parseFloat)
        .then((value) => {
          sum += value;
        });
    }
    cy.get("tfoot")
      .eq(0)
      .find("td")
      .eq(1)
      .invoke("text")
      .then(parseFloat)
      .then((totalValue) => {
        expect(sum).to.equal(totalValue);
      });
  }

  checkRowByName(name) {
    cy.contains("td", name).siblings("td").last().find("input").check();
  }

  verifyRowChecked(name) {
    cy.contains("td", name)
      .siblings("td")
      .last()
      .find("input")
      .should("be.checked");
  }

  verifyInitialTableOrder() {
    cy.get(".mat-sort.table")
      .find("tr")
      .first()
      .find("td")
      .eq(1)
      .should("have.text", "159");
    cy.get(".mat-sort.table")
      .find("tr")
      .first()
      .find("td")
      .eq(2)
      .should("have.text", "6");
  }

  sortByCalories() {
    this.getElement(this.caloriesHeader).dblclick();
  }

  verifyTableOrderAfterSort() {
    cy.get(".mat-sort.table")
      .find("tr")
      .first()
      .find("td")
      .eq(1)
      .should("have.text", "356");
    cy.get(".mat-sort.table")
      .find("tr")
      .first()
      .find("td")
      .eq(2)
      .should("have.text", "16");
  }
}

export default new Table();
