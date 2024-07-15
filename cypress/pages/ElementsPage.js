import BasePage from "./BasePage";

class ElementsPage extends BasePage {
  constructor() {
    super();
    this.url = "/elements";
    this.usernameInput = '[type="text"]';
    this.nameElement = "p.title";
    this.countryElement = "p.subtitle";
    this.bioElement = ".media-content > span";
  }

  visit() {
    super.visit(this.url);
  }

  enterGitHubUsername(username) {
    this.typeIntoElement(this.usernameInput, `${username} {enter}`);
  }

  verifyName(expectedName) {
    this.verifyElementText(this.nameElement, expectedName);
  }

  verifyCountry(expectedCountry) {
    this.verifyElementText(this.countryElement, expectedCountry);
  }

  verifyBio(expectedBio) {
    this.verifyElementText(this.bioElement, expectedBio);
  }
}

export default new ElementsPage();
