describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('should display the page header', () => {
    cy.get('h1').should('contain', 'About JobTasker');
    cy.get('p').should(
      'contain',
      'Modern project and task management solution'
    );
  });

  it('should display all content sections', () => {
    // Check all section titles are present
    cy.get('h2').should('have.length', 4);
    cy.get('h2').should('contain', 'Our Mission');
    cy.get('h2').should('contain', 'What We Offer');
    cy.get('h2').should('contain', 'Built for Modern Teams');
    cy.get('h2').should('contain', 'Open Source');
  });

  it('should display the features list', () => {
    cy.contains('What We Offer')
      .parent()
      .within(() => {
        cy.get('ul li').should('have.length', 6);
        cy.get('ul li').should('contain', 'Intuitive project management');
        cy.get('ul li').should('contain', 'Flexible task organization');
        cy.get('ul li').should('contain', 'Team collaboration');
        cy.get('ul li').should('contain', 'Detailed progress analytics');
        cy.get('ul li').should('contain', 'Customizable workflows');
        cy.get('ul li').should('contain', 'Integration');
      });
  });

  it('should navigate to other pages through footer links', () => {
    // Check footer navigation
    cy.get('footer').within(() => {
      cy.get('a[href="/"]').should('exist');
      cy.get('a[href="/privacy"]').should('exist');
      cy.get('a[href="/terms"]').should('exist');
      cy.get('a[href="/contact"]').should('exist');
    });
  });

  // Test responsive behavior
  it('should be responsive', () => {
    // Test mobile view
    cy.viewport('iphone-6');
    cy.get('h1').should('be.visible');
    cy.get('nav').should('exist');

    // Test tablet view
    cy.viewport('ipad-2');
    cy.get('h1').should('be.visible');
    cy.get('nav').should('exist');

    // Test desktop view
    cy.viewport('macbook-13');
    cy.get('h1').should('be.visible');
    cy.get('nav').should('exist');
  });
});
