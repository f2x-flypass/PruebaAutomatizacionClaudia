describe('Registration Form Test', () => {
   it('Successfully fill out the registration form', () => {
        cy.visit('https://cert-clientes.flypass.com.co/#!/register/person');
        cy.fixture('/Flypass/cuentaFlypass.json').then((infoUsuario) => {
            cy.RegisterFlypass(infoUsuario);           
        });
    });
    it('vehicle creation', () => {
        let access_token; 
        cy.getToken().then((token) => {
            access_token = token;
            cy.registerVehicle(access_token).then((result) =>{
                if (result.status === 200) {
                    expect(result.status).to.be.eq(200);
                } else {
                cy.log(`Error ${response.status}: ${response.body.message}`);
                 expect(response.status).to.equal(500);
                }

            });
        });
    });
   it('delete vehicle', () => {
        cy.visit('https://cert-clientes.flypass.com.co/#!/login');
        cy.deleteVehicle()
    });
});