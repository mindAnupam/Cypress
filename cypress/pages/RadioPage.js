import BasePage from "./BasePage";

class RadioPage extends BasePage {
  constructor() {
    super();
    this.url = "/radio";
    this.yesOption = "#yes";
    this.oneOption = "#one";
    this.twoOption = "#two";
    this.fooOption = "#foo";
    this.notFooOption = "#notfoo";
    this.firstCheckbox = '[type="checkbox"]:eq(0)';
    this.secondCheckbox = '[type="checkbox"]:eq(1)';
  }

  visit() {
    super.visit(this.url);
  }

  checkYesOption() {
    this.clickElement(this.yesOption);
  }

  verifyYesOptionChecked() {
    this.getElement(this.yesOption).should("be.checked");
  }

  checkOneOption() {
    this.clickElement(this.oneOption);
  }

  verifyTwoOptionNotChecked() {
    this.getElement(this.twoOption).should("not.be.checked");
  }

  checkTwoOption() {
    this.clickElement(this.twoOption);
  }

  verifyOneOptionNotChecked() {
    this.getElement(this.oneOption).should("not.be.checked");
  }

  checkFooOption() {
    this.clickElement(this.fooOption);
  }

  verifyFooOptionChecked() {
    this.getElement(this.fooOption).should("be.checked");
  }

  checkNotFooOption() {
    this.clickElement(this.notFooOption);
  }

  verifyNotFooOptionChecked() {
    this.getElement(this.notFooOption).should("be.checked");
  }

  verifyFirstCheckboxChecked() {
    this.getElement(this.firstCheckbox).should("be.checked");
  }

  checkSecondCheckbox() {
    this.clickElement(this.secondCheckbox);
  }

  verifySecondCheckboxChecked() {
    this.getElement(this.secondCheckbox).should("be.checked");
  }
}

export default new RadioPage();
