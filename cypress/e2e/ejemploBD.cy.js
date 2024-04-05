describe("ejemplo consulta BD", ()=>{
    it("ejemplo select",()=>{
        const query = 'SELECT VRTRANSACCION_VALIDADORA FROM (SELECT * FROM tfps_trans_valid_medio_usuario WHERE CDUSUARIO=34177 ORDER BY FEINGRESA DESC) sub WHERE ROWNUM = 1';
        cy.task('queryDatabase', { query }).then((result) => {
            // Hacer aserciones sobre el resultado de la consulta
            cy.log(result.rows);
            cy.expect(result[0].VRTRANSACCION_VALIDADORA).to.be.a('string');
            });
    })
})