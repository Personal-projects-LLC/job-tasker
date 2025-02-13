describe('Authentication', () => {
  describe('Sign In', () => {
    beforeEach(() => {
      cy.visit('/auth/signin');
    });

    it('should show GitHub sign in button', () => {
      cy.get('[data-testid="github-signin-button"]')
        .should('be.visible')
        .and('contain', 'Sign in with GitHub');
    });

    it('should successfully authenticate', () => {
      cy.get('[data-testid="github-signin-button"]').click();
      cy.login();
      cy.url().should('include', '/projects');
    });

    it('should allow returning to home page', () => {
      cy.get('a[href="/"]').click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });

  describe('Protected Routes', () => {
    it('should redirect to login page when accessing protected route', () => {
      cy.visit('/projects');
      cy.url().should('include', '/auth/signin');
    });

    it('should maintain authentication across pages', () => {
      cy.login();
      cy.visit('/projects');
      cy.url().should('include', '/projects');
      cy.visit('/');
      cy.visit('/projects');
      cy.url().should('include', '/projects');
    });
  });

  describe('Sign Out', () => {
    beforeEach(() => {
      cy.login();
    });

    it('should successfully log out', () => {
      cy.get('[data-testid="user-menu"]').click();
      cy.get('[data-testid="logout-button"]').click();
      cy.url().should('include', '/auth/signin');
    });

    it('should redirect to login after logout when accessing protected route', () => {
      cy.logout();
      cy.visit('/projects');
      cy.url().should('include', '/auth/signin');
    });
  });
});
