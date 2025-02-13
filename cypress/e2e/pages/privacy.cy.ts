describe('Privacy Policy Page', () => {
  beforeEach(() => {
    cy.visit('/privacy');
  });

  it('should display the page header', () => {
    cy.get('h1').should('contain', 'Privacy Policy');
    cy.get('p').should('contain', 'Last updated');
  });

  it('should display all required sections', () => {
    const sections = [
      'Introduction',
      'Information We Collect',
      'How We Use Your Information',
      'Data Security',
      'Data Sharing',
      'Your Rights',
      'Contact Us',
    ];

    sections.forEach((section) => {
      cy.get('h2').should('contain', section);
    });
  });

  it('should display personal information list', () => {
    cy.contains('Personal Information')
      .parent()
      .within(() => {
        const items = [
          'Name and email address',
          'Profile information',
          'Company/organization details',
          'Payment information',
        ];

        items.forEach((item) => {
          cy.get('li').should('contain', item);
        });
      });
  });

  it('should display usage information list', () => {
    cy.contains('Usage Information')
      .parent()
      .within(() => {
        const items = [
          'Log data',
          'Project and task activity',
          'Communication preferences',
          'Cookies',
        ];

        items.forEach((item) => {
          cy.get('li').should('contain', item);
        });
      });
  });

  it('should display user rights', () => {
    cy.contains('Your Rights')
      .parent()
      .within(() => {
        const rights = [
          'Access your personal information',
          'Correct inaccurate data',
          'Request deletion',
          'Object to data processing',
          'Export your data',
        ];

        rights.forEach((right) => {
          cy.get('li').should('contain', right);
        });
      });
  });

  it('should have working contact email link', () => {
    cy.contains('Contact Us')
      .parent()
      .within(() => {
        cy.get('a')
          .should('have.attr', 'href', 'mailto:privacy@jobtasker.com')
          .and('contain', 'privacy@jobtasker.com');
      });
  });

  // Test responsive behavior
  it('should be responsive', () => {
    // Test on mobile
    cy.viewport('iphone-6');
    cy.get('h1').should('be.visible');
    cy.get('.container').should('be.visible');

    // Test on tablet
    cy.viewport('ipad-2');
    cy.get('h1').should('be.visible');
    cy.get('.container').should('be.visible');

    // Test on desktop
    cy.viewport('macbook-13');
    cy.get('h1').should('be.visible');
    cy.get('.container').should('be.visible');
  });

  // Test navigation
  it('should have working navigation through footer', () => {
    cy.get('footer').within(() => {
      cy.get('a[href="/"]').should('exist');
      cy.get('a[href="/about"]').should('exist');
      cy.get('a[href="/contact"]').should('exist');
      cy.get('a[href="/terms"]').should('exist');
    });
  });
});
