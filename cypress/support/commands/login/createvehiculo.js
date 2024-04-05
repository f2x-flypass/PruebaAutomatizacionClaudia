Cypress.Commands.add('registerVehicle', (accessToken) => {
  const randomNumber = Math.floor(Math.random() * 1000);
  const plateNumber = 'JER' + randomNumber;
  cy.log(plateNumber)
  return cy.fixture('Flypass/vehicleFlypass.json').then((fixture) => {      
    const variables = {
      plate: plateNumber
    }
    return cy.replaceVariables(fixture, variables).then((requestBody) => {
      return cy.request({
        method: 'POST',
        url: 'https://test.security.flypass.co/flypass/vehicle/saveVehicle',
        headers: {
          'authority': 'test.security.flypass.co',
          'authorization': `${accessToken}`,
          'content-type': 'application/json;charset=UTF-8',
        },
        body: requestBody,
      }).then((response) => {
        return response;
      });
    });
  });
});

Cypress.Commands.add('deleteVehicle', () => {
  cy.get('input[name="username"]').type('4444');
  cy.get('input[name="password"]').type('claudia27');
  cy.get('button.md-accent').click();
  cy.url().should('eq', 'https://cert-clientes.flypass.com.co/#!/home');
  cy.realizarClic(':nth-child(4) > .ng-scope.ng-isolate-scope > .md-button-toggle > .layout-row > .ng-binding');
  cy.realizarClic('#docs-menu-Vehículos > :nth-child(2) > .ng-isolate-scope > .md-raised');
  cy.url().should('eq', 'https://cert-clientes.flypass.com.co/#!/vehicle/list');
  cy.realizarClic('.firstElement > .md-3-line > .layout-align-center-center > .ng-isolate-scope > md-fab-trigger > .md-fab > .step');
});