import user from "./user.json";
import user2 from "./user2.json";

describe("Signup page", () => {
  it("should verify that all the elements of the form are properly rendered", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get('[data-testid="cypress-signupname"]').should("exist");
    cy.get('[data-testid="cypress-signupsurname"]').should("exist");
    cy.get('[data-testid="cypress-signupemail"]').should("exist");
    cy.get('[data-testid="cypress-signuppassword"]').should("exist");
  });

  it("should display an error message if the email is not available", () => {
    cy.visit("http://localhost:3000/signup");

    // 1. Fill the form and press the button
    cy.get('[data-testid="cypress-signupname"]').type(user.name);
    cy.get('[data-testid="cypress-signupsurname"]').type(user.surname);
    cy.get('[data-testid="cypress-signupemail"]').type(user.email);
    cy.get('[data-testid="cypress-signuppassword"]').type(user.password);
    cy.get("[data-testid=cypress-signupjoinnow]").click();

    cy.wait(1000);

    // 2. Verify that the error is displayed
    cy.get('[data-testid="cypress-signuperror"]').should("exist");
  });

  it("should redirect to the home page if fields are correct", () => {
    cy.visit("http://localhost:3000/signup");

    // 1. Fill the form
    cy.get('[data-testid="cypress-signupname"]').type(user2.name);
    cy.get('[data-testid="cypress-signupsurname"]').type(user2.surname);
    cy.get('[data-testid="cypress-signupemail"]').type(user2.email);
    cy.get('[data-testid="cypress-signuppassword"]').type(user2.password);
    cy.get("[data-testid=cypress-signupjoinnow]").click();

    cy.wait(1000);

    // 2. Verify that the home page is well rendered
    cy.visit("http://localhost:3000/home");
    cy.get('[data-testid="cypress-homewelcome"]').should("exist");
    cy.get('[data-testid="cypress-homeuser"]').should("exist");

    // 3. Verify this is the good informations displayed
    cy.get("[data-testid=cypress-homeuser]").should(
      "have.text",
      `${user2.surname} ${user2.name}`
    );
  });
});
