import user from "./user.json";

describe("Login page", () => {
  it("should verify that all the elements of the form are properly rendered", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="cypress-logo"]').should("exist");
    cy.get('[data-testid="cypress-loginemail"]').should("exist");
    cy.get('[data-testid="cypress-loginpassword"]').should("exist");
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
    cy.get('[data-testid="cypress-loginemail"]').type("test@example.com");
    cy.get('[data-testid="cypress-loginpassword"]').type("abcdef");

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

  it("should connect and redirect to the home page", () => {
    cy.visit("http://localhost:3000");

    cy.request("POST", "http://localhost:4000", {
      query: `
      mutation AddUser($user: AddUserInput!) {
        addUser(user: $user) {
          id
          email
          password
          name
          surname
        }
      }
    `,
      variables: { user },
    }).then((response) => {
      // 1. Simulate the logging
      cy.get('[data-testid="cypress-loginemail"]').type(user.email);
      cy.get('[data-testid="cypress-loginpassword"]').type(user.password);
      cy.get("[data-testid=cypress-loginbutton]").click();
      cy.wait(1000);

      // 2. Verify that the home page is well rendered
      cy.visit("http://localhost:3000/home");
      cy.get('[data-testid="cypress-homewelcome"]').should("exist");
      cy.get('[data-testid="cypress-homeuser"]').should("exist");

      // 3. Verify this is the good informations displayed
      cy.get("[data-testid=cypress-homeuser]").should(
        "have.text",
        `${user.surname} ${user.name}`
      );
    });
  });
});
