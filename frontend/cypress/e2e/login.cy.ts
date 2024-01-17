describe("Login page", () => {
  it("should verify that all the elements of the form are properly rendered", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="cypress-logo"]').should("exist");
    cy.get('[data-testid="cypress-emailinput"]').should("exist");
    cy.get('[data-testid="cypress-passwordinput"]').should("exist");
    cy.get('[data-testid="cypress-loginbutton"]').should("exist");
    cy.get('[data-testid="cypress-signuplink"]').should("exist");
  });

  it("should display an error message if the email or password aren't correct", () => {
    // cy.request("POST", "http://localhost:4000", {
    //   query: `
    //   query AuthQuery($email: String!, $password: String!) {
    //     auth(email: $email, password: $password) {
    //       email
    //       name
    //       surname
    //     }
    //   }
    // `,
    //   variables: {
    //     email: "lambert.drn@gmail.com",
    //     password: "test",
    //   },
    // }).then((response) => {
    //   cy.log("response", response.body);
    //   expect(response.status).to.equal(200);
    //   expect(response.body.data).to.have.property("auth");
    // });

    cy.visit("http://localhost:3000");

    // Type email and password
    cy.get('[data-testid="cypress-emailinput"]').type("test@example.com");
    cy.get('[data-testid="cypress-passwordinput"]').type("abcdef");

    // // Intercept the GraphQL request to return an error response
    // cy.intercept("POST", "http://localhost:4000/", (req) => {
    //   req.reply({
    //     body: {
    //       data: {
    //         auth: null,
    //       },
    //     },
    //   });
    // }).as("graphql");

    // Click the login button
    cy.get("[data-testid=cypress-loginbutton]").click();

    // Wait for the GraphQL request to complete
    // cy.wait("@graphql");

    cy.wait(1000);

    // Verify there is an error message
    cy.get('[data-testid="cypress-errorLogin"]').should("exist");
  });
});
