import "cypress-real-events";
import "@4tw/cypress-drag-drop";

describe("Cypress Actions", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("url"));
    cy.url().should("eql", Cypress.env("url"));
  });

  it("Verify Edit functionality", () => {
    cy.get("[href='/edit']").click();
    cy.get("#fullName").type("Bruce Wayne");
    cy.get("#join").type(" Batman");
    cy.get("#getMe").should("have.value", "ortonikc");
    cy.get("#clearMe").clear();
    cy.get("#clearMe").should("have.text", "");
    cy.get("#noEdit").should("have.attr", "disabled");
    cy.get("#dontwrite").should("have.attr", "readonly");
  });

  it("Verify button functionality", () => {
    cy.get("[href='/buttons']").click();
    cy.get("#home").click();
    cy.go("back");
    cy.get("#color").should(
      "have.css",
      "background-color",
      "rgb(138, 77, 118)"
    );
    cy.get("#property").should("have.css", "height", "40px");
    cy.get('[title="Disabled button"]').should("have.attr", "disabled");
    cy.get("h2").should("contain", "Button Hold!").trigger("mousedown");
    cy.wait(2000);
  });

  it("Verify dropdown functionality", () => {
    cy.get("[href='/dropdowns']").click();
    cy.get("#fruits").should("have.value", "header");
    cy.get("#fruits").select("Mango");
    cy.get("#fruits").should("have.value", "1");
    cy.get("p.subtitle").eq(0).should("have.text", "You have selected Mango");
    cy.get("#superheros").select("Batman");
    cy.get("p.subtitle").eq(1).should("have.text", "You have selected Batman");
    cy.get("#superheros").select("Daredevil");
    cy.get("#lang option")
      .last()
      .then(($lastOption) => {
        cy.get("#lang").select($lastOption.text());
      });
    cy.get("#country").select("India");
  });

  it("Verify alerts  functionality", () => {
    cy.get("[href='/alert']").click();
    cy.get("#accept").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Hey! Welcome to LetCode");
    });
    cy.get("#confirm").click();
    cy.on("window:confirm", (str) => {
      expect(str).to.equal("Are you happy with LetCode?");
    });
  });

  it("Verify radio buuton  functionality", () => {
    cy.get("[href='/radio']").click();
    cy.get("#yes").check();
    cy.get("#yes").should("be.checked");
    cy.get("#one").check();
    cy.get("#two").should("not.be.checked");
    cy.get("#two").check();
    cy.get("#one").should("not.be.checked");
    cy.get("#foo").check();
    cy.get("#foo").should("be.checked");
    cy.get("#notfoo").check();
    cy.get("#notfoo").should("be.checked");
    cy.get("[type='checkbox']").eq(0).should("be.checked");
    cy.get("[type='checkbox']").eq(1).check();
    cy.get("[type='checkbox']").eq(1).should("be.checked");
  });

  it("Verify elements buuton  functionality", () => {
    cy.get("[href='/elements']").click();
    cy.get("[type='text']").type("mindAnupam {enter}");
    cy.get("p.title").should("have.text", "Anupam Kushwaha");
    cy.get("p.subtitle").should("have.text", "India");
    cy.get(".media-content > span").should(
      "have.text",
      "Developer. Reader. Gamer "
    );
  });

  it("Verify multi-select  functionality", () => {
    cy.get("[href='/selectable']").click();
    cy.get("body").type("{ctrl}", { release: false });
    cy.get(".ui-selectable").eq(0).click();
    cy.get(".ui-selectable").eq(0).should("have.class", "ui-selected");

    cy.get(".ui-selectable").eq(3).click();
    cy.get(".ui-selectable").eq(3).should("have.class", "ui-selected");

    cy.get(".ui-selectable").eq(6).click();
    cy.get(".ui-selectable").eq(6).should("have.class", "ui-selected");

    cy.get(".ui-selectable").eq(7).click();
    cy.get(".ui-selectable").eq(7).should("have.class", "ui-selected");
  });

  it("Verify sorting  functionality", () => {
    cy.get("[href='/sortable']").click();
    cy.get(".cdk-drag")
      .eq(1)
      .as("sourceElement")
      .should("have.text", " Pick up groceries");

    cy.get(".cdk-drag")
      .eq(3)
      .as("targetElement")
      .should("have.text", " Fall asleep");

    cy.get("@sourceElement").drag("@targetElement");

    // cy.get(".cdk-drag").eq(2).should("have.text", " Fall asleep");
    cy.get(".cdk-drag").eq(3).should("have.text", " Pick up groceries");
  });

  it("Verify table  functionality", () => {
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

  it("Verify Advanced table  functionality", () => {
    cy.get("[href='/advancedtable']").click();
    cy.get("tr>th").should("have.length", 4);

    cy.get("[name='advancedtable_length']").should("have.value", "5");
    cy.get("tbody>tr").should("have.length", 5);
    cy.get("[name='advancedtable_length']").select("25");
    cy.get("[name='advancedtable_length']").should("have.value", 25);
    cy.get("tbody>tr").should("have.length", 25);

    cy.get("[type='search']").type("london");
    cy.get("tbody>tr").should("have.length", 16);
    cy.get("tbody > tr > td:nth-child(2)").each(($td) => {
      cy.wrap($td).should("contain.text", "London");
    });

    cy.get("[type='search']").clear();
    cy.get("tbody>tr").should("have.length", 25);
    cy.get("tbody > tr > td:nth-child(1)").each(($td, index) => {
      cy.wrap($td).should("have.text", index + 1);
    });
    cy.get(".paginate_button.next").click();
    cy.get("tbody > tr > td:nth-child(1)").each(($td, index) => {
      cy.wrap($td).should("have.text", index + 26);
    });
  });

  it.only("Verify Calendar  functionality", () => {
    cy.get("[href='/calendar']").click();
    const currentDate = new Date();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = monthNames[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    const formattedDate = `${month} ${day.toString().padStart(2, "0")} ${year}`;
    console.log(formattedDate);

    cy.get(".datepicker-days>div");
  });
});
