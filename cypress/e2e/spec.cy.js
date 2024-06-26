import "cypress-real-events";

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

  it.only("Verify radio buuton  functionality", () => {
    cy.get("[href='/windows']").click();
  });
});
