import "cypress-file-upload";
import "cypress-each";

describe("Create KPI Data-Driven Test", function () {
  const testData = require("../fixtures/add_employee.json");

  beforeEach(function () {
    cy.visit("http://localhost:8080/orangehrm-4.5/symfony/web/index.php/pim/viewEmployeeList/reset");

    //login
    cy.get('#txtUsername').type("admin");
    cy.get('#txtPassword').type("@haN12022021");
    cy.get("[id='btnLogin']").click();
  });

  it.each(testData)(`Test case for feature add employee`, (data) => {
    //click button add employ
    cy.get("[id='btnAdd']").click();

    const first_name = data["first_name"] ?? "";
    const mid_name = data["middle_name"] ?? "";
    const last_name = data["last_name"] ?? "";
    const employee_id = data["employee_id"] ?? "";

    //fill form data
    if (first_name != "")
      cy.get("[id='firstName']").type(first_name);
    if (mid_name != "")
      cy.get("[id='middleName']").type(mid_name);
    if (last_name != "")
      cy.get("[id='lastName']").type(last_name);
    cy.get("[id='employeeId']").clear();
    if (employee_id != "")
      cy.get("[id='employeeId']").type(employee_id);

    cy.get("[id='btnSave']").click();

    // check result
    // assert
    if (cy.contains("Personal Details")) {
      cy.contains("Personal Details").should("be.visible");
    } else {
      cy.get('.validation-error').should("be.visible");
    }
  });
});