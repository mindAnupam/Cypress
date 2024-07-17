import Base from "./Base";

class Edit extends Base {
  constructor() {
    super();
    this.url = "/edit";
    this.fullNameInput = "#fullName";
    this.joinInput = "#join";
    this.getMeInput = "#getMe";
    this.clearMeInput = "#clearMe";
    this.noEditInput = "#noEdit";
    this.dontWriteInput = "#dontwrite";
  }

  visit() {
    super.visit(this.url);
  }

  fillFullName(name) {
    this.typeIntoElement(this.fullNameInput, name);
  }

  appendToJoin(text) {
    this.typeIntoElement(this.joinInput, text);
  }

  verifyGetMeValue(value) {
    this.getElement(this.getMeInput).should("have.value", value);
  }

  clearClearMeInput() {
    this.getElement(this.clearMeInput).clear();
  }

  verifyClearMeInputEmpty() {
    this.verifyElementText(this.clearMeInput, "");
  }

  verifyNoEditDisabled() {
    this.verifyElementAttribute(this.noEditInput, "disabled", "disabled");
  }

  verifyDontWriteReadonly() {
    this.verifyElementAttribute(this.dontWriteInput, "readonly", "readonly");
  }
}

export default new Edit();
