import "cypress-real-events";
import "@4tw/cypress-drag-drop";
import EditPage from "../pages/EditPage";
import ButtonPage from "../pages/ButtonPage";
import DropdownPage from "../pages/DropdownPage";
import AlertPage from "../pages/AlertPage";
import RadioPage from "../pages/RadioPage";
import ElementsPage from "../pages/ElementsPage";
import SelectablePage from "../pages/SelectablePage";
import SortablePage from "../pages/SortablePage";
import TablePage from "../pages/TablePage";
import AdvancedTablePage from "../pages/AdvancedTablePage";
import CalendarPage from "../pages/CalendarPage";
import UploadPage from "../pages/UploadPage";

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
    EditPage.visit();
    EditPage.fillFullName(testData.edit.fullName);
    EditPage.appendToJoin(testData.edit.joinText);
    EditPage.verifyGetMeValue(testData.edit.getMeValue);
    EditPage.clearClearMeInput();
    EditPage.verifyClearMeInputEmpty();
    EditPage.verifyNoEditDisabled();
    EditPage.verifyDontWriteReadonly();
  });

  it("Verify button functionality", () => {
    ButtonPage.visit();
    ButtonPage.clickHomeButton();
    cy.go("back");
    ButtonPage.verifyColorButtonBackground(testData.button.backgroundColor);
    ButtonPage.verifyPropertyButtonHeight(testData.button.buttonHeight);
    ButtonPage.verifyDisabledButtonAttribute();
    // ButtonPage.holdButton(2000);
    cy.get("h2").should("contain", "Button Hold!").trigger("mousedown");
    cy.wait(2000);
  });

  it("Verify dropdown functionality", () => {
    DropdownPage.visit();
    DropdownPage.selectFruit(testData.dropdown.fruit);
    DropdownPage.verifyFruitSelection(testData.dropdown.fruit);
    DropdownPage.selectSuperhero(testData.dropdown.superhero);
    DropdownPage.verifySuperheroSelection(testData.dropdown.superhero);
    DropdownPage.selectLastLanguage();
    DropdownPage.selectCountry(testData.dropdown.country);
  });

  it("Verify alerts functionality", () => {
    AlertPage.visit();
    AlertPage.clickAcceptButton();
    AlertPage.verifyAlertText(testData.alert.alertText);
    AlertPage.clickConfirmButton();
    AlertPage.verifyConfirmText(testData.alert.confirmText);
  });

  it("Verify radio button functionality", () => {
    RadioPage.visit();
    RadioPage.checkYesOption();
    RadioPage.verifyYesOptionChecked();
    RadioPage.checkOneOption();
    RadioPage.verifyTwoOptionNotChecked();
    RadioPage.checkTwoOption();
    RadioPage.verifyOneOptionNotChecked();
    RadioPage.checkFooOption();
    RadioPage.verifyFooOptionChecked();
    RadioPage.checkNotFooOption();
    RadioPage.verifyNotFooOptionChecked();
    RadioPage.verifyFirstCheckboxChecked();
    RadioPage.checkSecondCheckbox();
    RadioPage.verifySecondCheckboxChecked();
  });

  it("Verify elements functionality", () => {
    // ElementsPage.visit();
    // ElementsPage.enterGitHubUsername(testData.elements.githubUsername);
    // ElementsPage.verifyName(testData.elements.name);
    // ElementsPage.verifyCountry(testData.elements.country);
    // ElementsPage.verifyBio(testData.elements.bio);
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
    SelectablePage.visit();
    SelectablePage.selectMultipleItems([0, 3, 6, 7]);
    SelectablePage.verifyItemsSelected([0, 3, 6, 7]);
  });

  // it("Verify sorting functionality", () => {
  //   // SortablePage.visit();
  //   // SortablePage.dragAndDrop(1, 3);
  //   // SortablePage.verifyItemOrder(3, "Pick up groceries");
  //   cy.get("[href='/sortable']").click();
  //   cy.get(".cdk-drag")
  //     .eq(1)
  //     .as("sourceElement")
  //     .should("have.text", " Pick up groceries");

  //   cy.get(".cdk-drag")
  //     .eq(3)
  //     .as("targetElement")
  //     .should("have.text", " Fall asleep");

  //   cy.get("@sourceElement").drag("@targetElement");

  //   // cy.get(".cdk-drag").eq(2).should("have.text", " Fall asleep");
  //   cy.get(".cdk-drag").eq(3).should("have.text", " Pick up groceries");
  // });

  it("Verify table functionality", () => {
    // TablePage.visit();
    // TablePage.sumAndVerifyCalories();
    // TablePage.checkRowByName("Raj");
    // TablePage.verifyRowChecked("Raj");
    // TablePage.verifyInitialTableOrder();
    // TablePage.sortByCalories();
    // TablePage.verifyTableOrderAfterSort();
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
    AdvancedTablePage.visit();
    AdvancedTablePage.verifyColumnCount(4);
    AdvancedTablePage.changePageSize(25);
    AdvancedTablePage.verifyRowCount(25);
    AdvancedTablePage.searchTable("london");
    AdvancedTablePage.verifySearchResults("London", 16);
    AdvancedTablePage.clearSearch();
    AdvancedTablePage.verifyRowCount(25);
    AdvancedTablePage.verifyPageOneIndexes();
    AdvancedTablePage.goToNextPage();
    AdvancedTablePage.verifyPageTwoIndexes();
  });

  it("Verify Calendar functionality", () => {
    CalendarPage.visit();
    CalendarPage.selectTodayAsStartDate();
    CalendarPage.selectFutureDateAsEndDate(3);
    CalendarPage.verifySelectedDateRange();
    CalendarPage.adjustTime(2);
    CalendarPage.verifyAdjustedTime("02");
  });

  it("Verify Upload functionality", () => {
    UploadPage.visit();
    UploadPage.uploadFile("cypress/fixtures/example.json");
    UploadPage.downloadExcelFile();
    UploadPage.downloadPdfFile();
    UploadPage.verifyDownloadedFiles(["sample.xlsx", "sample.pdf"]);
  });
});
