describe('Terms of Service Page', () => {
  beforeEach(() => {
    cy.visit('/terms');
  });

  it('should display the page header', () => {
    cy.get('h1').should('contain', 'Terms of Service');
    cy.get('p').should('contain', 'Last updated');
  });

  it('should display all required sections', () => {
    const sections = [
      'Agreement to Terms',
      'Use License',
      'User Account',
      'Content Guidelines',
      'Service Modifications',
      'Payment Terms',
      'Limitation of Liability',
      'Governing Law',
      'Contact Information',
    ];

    sections.forEach((section) => {
      cy.get('h2').should('contain', section);
    });
  });

  it('should display use license conditions', () => {
    cy.contains('Use License')
      .parent()
      .within(() => {
        const conditions = [
          'modify or copy',
          'illegal purposes',
          'decompile or reverse engineer',
          'copyright or proprietary',
          'transfer the license',
        ];

        conditions.forEach((condition) => {
          cy.get('li').should('contain', condition);
        });
      });
  });

  it('should display user account requirements', () => {
    cy.contains('User Account')
      .parent()
      .within(() => {
        const requirements = [
          'Provide accurate and complete registration',
          'Maintain the security of your account',
          'Promptly update any changes',
          'Accept responsibility for all activities',
          'Not share your account credentials',
        ];

        requirements.forEach((requirement) => {
          cy.get('li').should('contain', requirement);
        });
      });
  });

  it('should display content guidelines', () => {
    cy.contains('Content Guidelines')
      .parent()
      .within(() => {
        const guidelines = [
          'Upload or share any unlawful or inappropriate content',
          'Infringe upon intellectual property rights',
          'Harass, abuse, or harm other users',
          'Spam or distribute malware',
          'Attempt to gain unauthorized access',
        ];

        guidelines.forEach((guideline) => {
          cy.get('li').should('contain', guideline);
        });
      });
  });

  it('should display payment terms', () => {
    cy.contains('Payment Terms')
      .parent()
      .within(() => {
        const terms = [
          'processed securely',
          'auto-renew',
          'Refunds',
          'Prices may change',
        ];

        terms.forEach((term) => {
          cy.get('li').should('contain', term);
        });
      });
  });

  it('should have working contact email link', () => {
    cy.contains('Contact Information')
      .parent()
      .within(() => {
        cy.get('a')
          .should('have.attr', 'href', 'mailto:legal@jobtasker.com')
          .and('contain', 'legal@jobtasker.com');
      });
  });

  // Test responsive behavior
  it('should be responsive', () => {
    // Mobile view
    cy.viewport('iphone-6');
    cy.get('h1').should('be.visible');
    cy.get('.container').should('be.visible');

    // Tablet view
    cy.viewport('ipad-2');
    cy.get('h1').should('be.visible');
    cy.get('.container').should('be.visible');

    // Desktop view
    cy.viewport('macbook-13');
    cy.get('h1').should('be.visible');
    cy.get('.container').should('be.visible');
  });

  // Test navigation
  it('should have working navigation through footer', () => {
    cy.get('footer').within(() => {
      cy.get('a[href="/"]').should('exist');
      cy.get('a[href="/about"]').should('exist');
      cy.get('a[href="/privacy"]').should('exist');
      cy.get('a[href="/contact"]').should('exist');
    });
  });
});
