import "cypress-file-upload";
import "cypress-each";

describe("Create KPI Data-Driven Test", function () {
    const testData = require("../fixtures/add_report.json");

    beforeEach(function () {
        cy.visit("http://localhost:8080/orangehrm-4.5/symfony/web/index.php/core/viewDefinedPredefinedReports/reportGroup/3/reportType/PIM_DEFINED");

        //login
        cy.get('#txtUsername').type("admin");
        cy.get('#txtPassword').type("@haN12022021");
        cy.get("[id='btnLogin']").click();
    });

    it.each(testData)(`Test case for feature add employee`, (data) => {
        //click button add employ
        cy.get("[id='btnAdd']").click();

        const report_name = data["report_name"] ?? "";
        const selection_criteria = data["selection_criteria"];
        const selected_criteria_include = data["selected_criteria_include"];
        const display_fields = data["display_fields"];

        //fill form data
        if (report_name != "")
            cy.get("[id='report_report_name']").type(report_name);
        cy.get("[id='report_criteria_list']").select(selection_criteria);
        cy.get("[id='report_include_comparision']").eq(1).select(selected_criteria_include, { force: true });


        // cy.get("[id='employeeId']").clear();
        cy.get("[id='report_display_field_list']").select(display_fields);
        cy.get("[id='btnAddDisplayField']").click();

        cy.get("[id='btnSave']").click();

        // check result
        // assert
        if (cy.contains("Successfully Saved")) {
            cy.contains(report_name)
        } else {
            cy.get('.validation-error').should("be.visible");
        }
    });
});