import * as ui from '../../ui/loginUI.js'


Cypress.Commands.add('login',(datosLogin) => {
  cy.escribir(datosLogin.usuario, ui.SELECTOR_USUARIO);
  cy.escribir(datosLogin.clave, ui.SELECTOR_CLAVE);
  cy.realizarClic(ui.SELECTOR_LOGIN);
  cy.esperarCargaPagina();
  });