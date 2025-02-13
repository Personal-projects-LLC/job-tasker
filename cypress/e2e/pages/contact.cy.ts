describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should display the page header', () => {
    cy.get('h1').should('contain', 'Contact Us');
    cy.get('p').should('contain', 'Have questions?');
  });

  it('should display contact information', () => {
    // Check email
    cy.contains('Email')
      .parent()
      .within(() => {
        cy.get('a').should('have.attr', 'href', 'mailto:support@jobtasker.com');
      });

    // Check office location
    cy.contains('Office Location').parent().should('contain', 'San Francisco');

    // Check business hours
    cy.contains('Business Hours').parent().should('contain', 'Monday - Friday');

    // Check social media links
    cy.contains('Connect With Us')
      .parent()
      .within(() => {
        cy.get('a[href*="twitter.com"]').should('exist');
        cy.get('a[href*="github.com"]').should('exist');
        cy.get('a[href*="linkedin.com"]').should('exist');
      });
  });

  describe('Contact Form', () => {
    it('should have all required fields', () => {
      cy.get('[data-testid="contact-name-input"]').should('exist');
      cy.get('[data-testid="contact-email-input"]').should('exist');
      cy.get('[data-testid="contact-message-input"]').should('exist');
      cy.get('[data-testid="contact-submit-button"]').should('exist');
    });

    it('should show validation for required fields', () => {
      cy.get('[data-testid="contact-submit-button"]').click();
      cy.get('[data-testid="contact-name-input"]').should(
        'have.attr',
        'required'
      );
      cy.get('[data-testid="contact-email-input"]').should(
        'have.attr',
        'required'
      );
      cy.get('[data-testid="contact-message-input"]').should(
        'have.attr',
        'required'
      );
    });

    it('should handle form submission', () => {
      // Fill out the form
      cy.get('[data-testid="contact-name-input"]').type('Test User');
      cy.get('[data-testid="contact-email-input"]').type('test@example.com');
      cy.get('[data-testid="contact-message-input"]').type(
        'This is a test message'
      );

      // Submit form
      cy.get('[data-testid="contact-submit-button"]').click();

      // Check for success message
      cy.get('[data-testid="contact-success-message"]').should('be.visible');

      // Form should be cleared
      cy.get('[data-testid="contact-name-input"]').should('have.value', '');
      cy.get('[data-testid="contact-email-input"]').should('have.value', '');
      cy.get('[data-testid="contact-message-input"]').should('have.value', '');
    });

    it('should validate email format', () => {
      cy.get('[data-testid="contact-name-input"]').type('Test User');
      cy.get('[data-testid="contact-email-input"]').type('invalid-email');
      cy.get('[data-testid="contact-message-input"]').type('Test message');

      cy.get('[data-testid="contact-submit-button"]').click();

      // Email input should show validation error
      cy.get('[data-testid="contact-email-input"]:invalid').should('exist');
    });
  });

  // Test responsive behavior
  it('should be responsive', () => {
    // Mobile view
    cy.viewport('iphone-6');
    cy.get('.grid').should('have.class', 'grid-cols-1');

    // Tablet/Desktop view
    cy.viewport('macbook-13');
    cy.get('.grid').should('have.class', 'md:grid-cols-2');
  });
});
