Cypress.Commands.add('RegisterFlypass',(dataRegister) => {
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }  
    const numeroIdentificacion = getRandomNumber(10000, 9999999999);
    cy.get('input[name="names"]').type(dataRegister.names);
    cy.get('input[name="lastName"]').type(dataRegister.lastName);
    cy.get('input[name="document"]').type(numeroIdentificacion);
    cy.get('input[name="cellphone"]').type(dataRegister.cellphone);
    cy.get('input[name="direccion"]').type(dataRegister.direccion);
    cy.get('input[name="email"]').type(dataRegister.email);
    cy.get('#password').type(dataRegister.password);   
    cy.get('md-select[name="documentType"]').click();
    cy.get('md-option[value="CC"]').click();
    cy.get('md-select[name="department"]').click();
    cy.get('md-option.ng-scope').contains(dataRegister.department).click();  
    cy.get('md-select[name="city"]').click();
    cy.get('md-option.ng-scope').contains(dataRegister.city).click();
    cy.get('[name="terms"]').click();
    cy.get('md-dialog-actions > .md-accent').click();
    cy.get('#saveUserRegister').click(); 
    cy.url().should('eq', 'https://cert-clientes.flypass.com.co/#!/validateMail/');
    cy.consultUser(numeroIdentificacion).then((result) => {
        cy.log(result)
    });
});

Cypress.Commands.add('consultUser', (Document) => {
    const transaccionSQLConsul = `SELECT P.CDPERSONA FROM TFPS_PERSONAS P
    INNER JOIN TFPS_USUARIOS_SEG US ON US.CDPERSONA=P.CDPERSONA
    INNER JOIN TFPS_USUARIOS U ON US.CDUSUARIO_SEG= U.CDUSUARIO_SEG
    WHERE P.CDNRO_DOC='${Document}'`;
    return cy.task('queryDatabase', { query: transaccionSQLConsul }).then((transactionResult) => {
        if (transactionResult && transactionResult.length > 0 && transactionResult[0].CDPERSONA) {
            const cdPersona = transactionResult[0].CDPERSONA;
            return cy.updateUser(cdPersona).then((resultUpdate) => {
                cy.log(resultUpdate)
            });
        } else {
             cy.log('No se encontró CDPERSONA en la consulta.');
        }
    });
});
Cypress.Commands.add('updateUser', (idPerson) => {
    const transaccionSQLUpdate = `UPDATE TFPS_USUARIOS_SEG 
        SET SNINHABILITADO = 'N', 
            SNVALIDO_CORREO = 'Y' 
        WHERE CDPERSONA ='${idPerson}'`;
    return cy.task('queryDatabase', { query: transaccionSQLUpdate }).then((transactionResult) => {
        return cy.task('queryDatabase', { query: 'COMMIT' });
    });
});
