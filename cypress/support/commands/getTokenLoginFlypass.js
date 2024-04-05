Cypress.Commands.add('getToken', () => {
    return cy.fixture('login/tokenFlypass.json').then((requestBody) => {
      return cy
        .request({
          method: 'POST',
          url: '/secure/oauth/token',
          headers: {
            'authority': 'test.security.flypass.co',
            'authorization': 'Basic Zmx5cGFzczpSbXg1ZEdWamFDNHlNREUz',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          form: true,
          body: requestBody,
          failOnStatusCode: false
        })
        .then((response) => {
          const token = response.body.access_token;
          const access_token = "Bearer " + token;
          cy.log(`access token: ${access_token}`);
          return Cypress.Promise.resolve(access_token);
        });
    });
  });