import Base from "./Base";

class Dropdown extends Base {
  constructor() {
    super();
    this.url = "/dropdowns";
    this.fruitsDropdown = "#fruits";
    this.superheroesDropdown = "#superheros";
    this.langDropdown = "#lang";
    this.countryDropdown = "#country";
    this.fruitSubtitle = "p.subtitle:eq(0)";
    this.superheroSubtitle = "p.subtitle:eq(1)";
  }

  visit() {
    super.visit(this.url);
  }

  selectFruit(fruit) {
    cy.selectOptionByText(this.fruitsDropdown, fruit);
  }

  selectSuperhero(superhero) {
    cy.selectOptionByText(this.superheroesDropdown, superhero);
  }

  selectLastLanguage() {
    cy.get(`${this.langDropdown} option`)
      .last()
      .then(($lastOption) => {
        cy.get(this.langDropdown).select($lastOption.text());
      });
  }

  selectCountry(country) {
    cy.selectOptionByText(this.countryDropdown, country);
  }

  verifyFruitSelection(expectedFruit) {
    this.verifyElementText(
      this.fruitSubtitle,
      `You have selected ${expectedFruit}`
    );
  }

  verifySuperheroSelection(expectedSuperhero) {
    this.verifyElementText(
      this.superheroSubtitle,
      `You have selected ${expectedSuperhero}`
    );
  }
}

export default new Dropdown();
