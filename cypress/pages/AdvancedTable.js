import Base from "./Base";

class AdvancedTable extends Base {
  constructor() {
    super();
    this.url = "/advancedtable";
    this.pageSizeSelect = '[name="advancedtable_length"]';
    this.searchInput = '[type="search"]';
    this.tableRows = "tbody>tr";
    this.nextButton = ".paginate_button.next";
  }

  verifyColumnCount(expectedCount) {
    cy.get("tr>th").should("have.length", expectedCount);
  }

  changeSize(size) {
    cy.get(this.pageSizeSelect).select(size.toString());
  }

  verifyRowCount(expectedCount) {
    cy.get(this.tableRows).should("have.length", expectedCount);
  }

  searchTable(searchTerm) {
    cy.get(this.searchInput).type(searchTerm);
  }

  verifySearchResults(expectedText, expectedCount) {
    this.verifyRowCount(expectedCount);
    cy.get("tbody > tr > td:nth-child(2)").each(($td) => {
      cy.wrap($td).should("contain.text", expectedText);
    });
  }

  clearSearch() {
    cy.get(this.searchInput).clear();
  }

  verifyOneIndexes() {
    cy.get("tbody > tr > td:nth-child(1)").each(($td, index) => {
      cy.wrap($td).should("have.text", index + 1);
    });
  }

  goToNext() {
    cy.get(this.nextButton).click();
  }

  verifyTwoIndexes() {
    cy.get("tbody > tr > td:nth-child(1)").each(($td, index) => {
      cy.wrap($td).should("have.text", index + 26);
    });
  }
}

export default new AdvancedTable();
