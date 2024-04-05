import * as ui from '../support/ui/loginUI.js'

describe("Realizar login en la aplicación", ()=>{
    beforeEach(() => {
        // Eliminar cookies antes de cada prueba
        cy.clearCookies();
        cy.visit("/");
    }); 
    it("con credenciales válidas", ()=>{
        // Cuando el usuario se autentica con credenciales válidas
        cy.fixture('/login/credencialesValidas.json').then((usuario) =>{
            cy.login(usuario)
        })
        // Entonces debe ver la página de inventario
        cy.url().should("contains", "/inventory.html");
    })
    it("con credenciales inválidas", ()=>{
        // Cuando el usuario se intenta autenticar con credenciales inválidas
        cy.fixture('/login/credencialesInvalidas.json').then((usuario) =>{
            cy.login(usuario)
        })
        // Entonces debe ver error de autenticación
        cy.get(ui.SELECTOR_MENSAJE_ERROR).contains("Epic sadface: Username and password do not match any user in this service")

    })
    it("con sin ingresar credenciales", ()=>{
        // Cuando el usuario se intenta autenticar sin sus credenciales
        cy.fixture('/login/sinCredenciales.json').then((usuario) =>{
            cy.login(usuario)
        })
        // Entonces debe ver error de autenticación
        cy.get(ui.SELECTOR_MENSAJE_ERROR).contains("Epic sadface: Username is required")

    })
})