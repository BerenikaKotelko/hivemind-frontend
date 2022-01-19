

//is the title of the page 'Hivemind'?
describe("Navbar content is correct", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("displays the title", () => {
      cy.get("[data-cy=page-title]").should("have.text", "🐝 Hivemind");
    });
    it("3 links in nav buttons", () => {
      cy.get("[data-cy=nav-buttons]").find("li").should("have.length", 3);
    });
    it("display sign-in and displays list-of-users when sign-in clicked AND cn click on user and see them signed in AND there is a sign out button", () => {
        cy.get("[data-cy=sign-in]")
        .should("have.text", "Sign in")
        .click();
        cy.get("[data-cy=list-of-users]")
        .find("li")
        .should("have.length", 25)
        // cy.get("[data-cy=user-1]")
        .first()
        .should("have.text", "Berenika")
        .click()
        cy.get("[data-cy=user-signed-in]")
        .should("have.text", "Signed in as  🎓Berenika ")
        cy.get("[data-cy=sign-out]")
        .should("have.text", "Sign out")
        .click();
        cy.get("[data-cy=sign-in]")
        .should("have.text", "Sign in");


    });

    //The 'add resource' tab contains the corrct text and can be visited upon clicking 
    it("displays Add Resource page and visits it upon clicking", () => {
        cy.get("[data-cy=add-resource-page-click]")
        .should("have.text", "Add Resource")
        .click()
        cy.url()
        .should("include", "/add-resource")
    })


     //The 'study list' tab contains the corrct text and can be visited upon clicking 
     it("displays Study-list page and visits it upon clicking", () => {
        cy.get("[data-cy=study-list-page-click]")
        .should("have.text", "Study List")
        .click()
        cy.url()
        .should("include", "/study-list")
    })
    //The 'home' tab contains the correct text and can be visited upon clikcing
    it("displays Home page and visits it upon clicking", () => {
        cy.get("[data-cy=home-page-click]")
        .should("have.text", "Home")
        .click()
        cy.url()
        .should("include", "/")
    })

   
  });