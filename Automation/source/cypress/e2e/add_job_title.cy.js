import "cypress-file-upload";
import "cypress-each";

describe("Create KPI Data-Driven Test", function () {
    const testData = require("../fixtures/job_title.json");

    beforeEach(function () {
        cy.visit("http://localhost:8080/orangehrm-4.5/symfony/web/index.php/admin/viewJobTitleList");

        //login
        cy.get('#txtUsername').type("admin");
        cy.get('#txtPassword').type("@haN12022021");
        cy.get("[id='btnLogin']").click();
    });

    it.each(testData)(`Test case for feature add employee`, (data) => {
        //click button add employ
        cy.get("[id='btnAdd']").click();

        const job_title = data["job_title"] ?? "";
        const job_description = data["job_description"] ?? "";
        const job_specification = data["job_specification"] ?? "";
        const note = data["note"] ?? "";

        //fill form data
        if (job_title != "")
            cy.get("[id='jobTitle_jobTitle']").type(job_title);
        if (job_description != "")
            cy.get("[id='jobTitle_jobDescription']").type(job_description);


        cy.get("[id='jobTitle_jobSpec']").selectFile('123.png', {
            action: 'drag-drop'
        })

        if (note != "")
            // cy.get("[id='employeeId']").clear();
            cy.get("[id='jobTitle_note']").type(note);

        cy.get("[id='btnSave']").click();

        // check result
        // assert
        if (cy.contains("Successfully Saved")) {
            cy.contains(job_title).should("be.visible");
        } else {
            cy.get('.validation-error').should("be.visible");
        }
    });
});