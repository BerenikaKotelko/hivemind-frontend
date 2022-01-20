describe("Navbar content is correct", () => {
    //line 1 should probably say 'homePage', and NavBar should maybe have another file. 
    //Also, what is 'correct'...?
    beforeEach(() => {
      cy.visit("/");
    });
    it("displays the title", () => {
        //maybe slightly more specific? 'Display Hivemind as the title'. Descripction should be able to tell you if the tst is correct.
      cy.get("[data-cy=page-title]").should("have.text", "🐝 Hivemind");
      //don't use data-cy in case you decide to change the testing framework. Target the h1. 
    });
    it("3 links in nav buttons", () => {
      cy.get("[data-cy=nav-buttons]").find("li").should("have.length", 3);
      //Accesibility - use a nav ement and target it. OR use data-test, this makes it agnostic to the test framework.
    // can also use classNames? This is not as explicit, so they could b changd by accident. do NOT use id's
    });
    it("displays sign-in and displays list-of-users when sign-in clicked AND can click on user and see them signed in AND there is a sign out button", () => {
        //you can have multiple assertions as long as they are testing ONE logical claim.
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
    //this is good. Could possibly get more specific - the test is stronger then.


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

  //Testing the home page central content (search bar and downwards from there)
  describe("Home page content is correct", () => {
    beforeEach(() => {
      cy.visit("/");
    })
    // Is there a search bar that says 'Search'?
    it("Search bar says 'search'", () => {
        cy.get("[data-cy=search-bar]")
        .invoke('attr', 'placeholder')
        .should("contain", "Search");
      });

    //Filter Tests
    it("Filter modal fully functional: filter button; content type; recommendation value; tags; reset; close", () => {
         //is there a filter button that says 'Filter'
        cy.get("[data-cy=filter]")
        .should("have.text", "Filter")
        //can it be clicked to reveal a modal with th title 'Set Filters'
        .click()
        cy.get("[data-cy=filter-modal-title]")
        .should("have.text", "Set Filters")
        //are there 14 content types, is the second one Cheat-Sheet
        cy.get("[data-cy=content-type-filter-list]")
        .find("label")
        .should("have.length", 14)
        .eq(1)
        .should("have.text", "Cheat-Sheet")
        //are there 3 recommendation values, is the first one "Un-bee-table"
        cy.get("[data-cy=recommendation-value-list-filter]")
        .find("label")
        .should("have.length", 3)
        .first()
        .should("have.text", "Un-bee-table")
        //are there at last 11 Tags, and is the 4th one 'SQL'
        cy.get("[data-cy=unselected-tags-list-filter]")
        .find("span")
        .should("have.length.greaterThan", 10)
        .eq(3)
        .should("have.text", "SQL")
        //Is there a Reset Filters button with the title 'reset filter'
        cy.get("[data-cy=reset-filters-button]")
        .should("have.text", "Reset filters")
        //When it is clicked, does it clear 'selected tags'
        .click()
        cy.get("[data-cy=selected-tags]")
        .find("span")
        .should("have.length", 0)
        //Is there a close button that says 'close'
        cy.get("[data-cy=close-button")
        .should("have.text", "Close")
      });

//Filter functionality
    it("Filter modal actually filters", () => {
        //what does that mean... better names!
        cy.get("[data-cy=filter]")
        .should("have.text", "Filter")
        .click()
        cy.get("[data-cy=filter-modal-title]")
        .should("have.text", "Set Filters")
        //via content type
        cy.get("[data-cy=content-type-filter-list]")
        .find("input")
        .eq(7)
        .click()
        cy.get("[data-cy=resources]")
        .find("[data-cy=individual-resource]")
        .should("have.length", 1)
        .should("have.text", "Test 1")
        //via recommendation value
        //unclicking content type first
        cy.get("[data-cy=content-type-filter-list]")
        .find("input")
        .eq(7)
        //any time you use a number, specify where it comes from, or person reading code would be confused.
        //use variable? Better than comment. 
        .click()
        cy.get("[data-cy=recommendation-value-list-filter]")
        .find("input")
        .eq(1)
        .click()
        cy.get("[data-cy=resources]")
        .find("[data-cy=individual-resource]")
        .should("have.length", 3)
        .eq(1)
        .should("have.text", "Beri rules")
        //via tags
         //unclicking recommendation value first
         cy.get("[data-cy=recommendation-value-list-filter]")
         .find("input")
         .eq(1)
         .click()
         cy.get("[data-cy=unselected-tags-list-filter]")
         .find("span")
         .first()
         .click()
         cy.get("[data-cy=resources]")
         .find("[data-cy=individual-resource]")
         .should("have.length", 2)
         .first()
         .should("have.text", "CSS tricks")
    })
})