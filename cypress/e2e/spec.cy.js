import "cypress-real-events";
import "@4tw/cypress-drag-drop";
import Edit from "../pages/Edit";
import Button from "../pages/Button";
import Dropdown from "../pages/Dropdown";
import Alert from "../pages/Alert";
import Radio from "../pages/Radio";
import Elements from "../pages/Elements";
import Selectable from "../pages/Selectable";
import Table from "../pages/Table";
import AdvancedTable from "../pages/AdvancedTable";
import Calendar from "../pages/Calendar";
import Upload from "../pages/Upload";

describe("Cypress Actions", () => {
  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit(Cypress.env("url"));
    cy.url().should("eq", Cypress.env("url"));
  });

  it("Verify Edit functionality", () => {
    Edit.visit();
    Edit.fillFullName(testData.edit.fullName);
    Edit.appendToJoin(testData.edit.joinText);
    Edit.verifyGetMeValue(testData.edit.getMeValue);
    Edit.clearClearMeInput();
    Edit.verifyClearMeInputEmpty();
    Edit.verifyNoEditDisabled();
    Edit.verifyDontWriteReadonly();
  });

  it("Verify button functionality", () => {
    Button.visit();
    Button.clickHomeButton();
    cy.go("back");
    Button.verifyColorButtonBackground(testData.button.backgroundColor);
    Button.verifyPropertyButtonHeight(testData.button.buttonHeight);
    Button.verifyDisabledButtonAttribute();
    // Button.holdButton(2000);
    cy.get("h2").should("contain", "Button Hold!").trigger("mousedown");
    cy.wait(2000);
  });

  it("Verify dropdown functionality", () => {
    Dropdown.visit();
    Dropdown.selectFruit(testData.dropdown.fruit);
    Dropdown.verifyFruitSelection(testData.dropdown.fruit);
    Dropdown.selectSuperhero(testData.dropdown.superhero);
    Dropdown.verifySuperheroSelection(testData.dropdown.superhero);
    Dropdown.selectLastLanguage();
    Dropdown.selectCountry(testData.dropdown.country);
  });

  it("Verify alerts functionality", () => {
    Alert.visit();
    Alert.clickAcceptButton();
    Alert.verifyAlertText(testData.alert.alertText);
    Alert.clickConfirmButton();
    Alert.verifyConfirmText(testData.alert.confirmText);
  });

  it("Verify radio button functionality", () => {
    Radio.visit();
    Radio.checkYesOption();
    Radio.verifyYesOptionChecked();
    Radio.checkOneOption();
    Radio.verifyTwoOptionNotChecked();
    Radio.checkTwoOption();
    Radio.verifyOneOptionNotChecked();
    Radio.checkFooOption();
    Radio.verifyFooOptionChecked();
    Radio.checkNotFooOption();
    Radio.verifyNotFooOptionChecked();
    Radio.verifyFirstCheckboxChecked();
    Radio.checkSecondCheckbox();
    Radio.verifySecondCheckboxChecked();
  });

  it("Verify elements functionality", () => {
    // Elements.visit();
    // Elements.enterGitHubUsername(testData.elements.githubUsername);
    // Elements.verifyName(testData.elements.name);
    // Elements.verifyCountry(testData.elements.country);
    // Elements.verifyBio(testData.elements.bio);
    cy.get("[href='/elements']").click();
    cy.get("[type='text']").type("mindAnupam {enter}");
    cy.get("p.title").should("have.text", "Anupam Kushwaha");
    cy.get("p.subtitle").should("have.text", "India");
    cy.get(".media-content > span").should(
      "have.text",
      "Developer. Reader. Gamer "
    );
  });

  it("Verify multi-select functionality", () => {
    Selectable.visit();
    Selectable.selectMultipleItems([0, 3, 6, 7]);
    Selectable.verifyItemsSelected([0, 3, 6, 7]);
  });

  it.skip("Verify sorting functionality", () => {
    cy.get("[href='/sortable']").click();

    cy.get("#cdk-drop-list-0").children().should("have.length", "4");
    cy.get("#cdk-drop-list-1").children().should("have.length", "5");

    cy.get("#cdk-drop-list-0").children().first().as("sourceElement");
    cy.get("#cdk-drop-list-1").children().first().as("targetElement");

    cy.dragAndDrop(
      "#cdk-drop-list-0 > :first-child",
      "#cdk-drop-list-1 > :last-child"
    );
  });

  it("Verify table functionality", () => {
    // Table.visit();
    // Table.sumAndVerifyCalories();
    // Table.checkRowByName("Raj");
    // Table.verifyRowChecked("Raj");
    // Table.verifyInitialTableOrder();
    // Table.sortByCalories();
    // Table.verifyTableOrderAfterSort();
    cy.get("[href='/table']").click();
    cy.get("tr").eq(1).find("td").eq(1).invoke("text").as("Chocolate");
    cy.get("tr").eq(2).find("td").eq(1).invoke("text").as("Apple");
    cy.get("tr").eq(3).find("td").eq(1).invoke("text").as("Eggs");
    cy.get("tr").eq(4).find("td").eq(1).invoke("text").as("Corn");

    cy.get("@Chocolate").then((text1) => {
      cy.get("@Apple").then((text2) => {
        cy.get("@Eggs").then((text3) => {
          cy.get("@Corn").then((text4) => {
            const Value1 = parseFloat(text1);
            const Value2 = parseFloat(text2);
            const Value3 = parseFloat(text3);
            const Value4 = parseFloat(text4);
            const sum = Value1 + Value2 + Value3 + Value4;
            cy.log(`Sum of values: ${sum}`);
            cy.get("tfoot")
              .eq(0)
              .find("td")
              .eq(1)
              .should("have.text", parseFloat(sum));
          });
        });
      });
    });

    cy.contains("td", "Raj").siblings("td").last().find("input").check();
    cy.contains("td", "Raj")
      .siblings("td")
      .last()
      .find("input")
      .should("be.checked");

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
    cy.contains("div", "Calories").dblclick();
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
  });

  it("Verify Advanced table functionality", () => {
    AdvancedTable.visit();
    AdvancedTable.verifyColumnCount(4);
    AdvancedTable.changeSize(25);
    AdvancedTable.verifyRowCount(25);
    AdvancedTable.searchTable("london");
    AdvancedTable.verifySearchResults("London", 16);
    AdvancedTable.clearSearch();
    AdvancedTable.verifyRowCount(25);
    AdvancedTable.verifyOneIndexes();
    AdvancedTable.goToNext();
    AdvancedTable.verifyTwoIndexes();
  });

  it("Verify Calendar functionality", () => {
    Calendar.visit();
    Calendar.selectTodayAsStartDate();
    Calendar.selectFutureDateAsEndDate(3);
    Calendar.verifySelectedDateRange();
    Calendar.adjustTime(2);
    Calendar.verifyAdjustedTime("02");
  });

  it("Verify Upload functionality", () => {
    Upload.visit();
    Upload.uploadFile("cypress/fixtures/example.json");
    Upload.downloadExcelFile();
    Upload.downloadPdfFile();
    Upload.verifyDownloadedFiles(["sample.xlsx", "sample.pdf"]);
  });
});
