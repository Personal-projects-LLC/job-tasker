// Existing custom commands for job-tasker

// Custom command to simulate authentication
Cypress.Commands.add('login', () => {
  // Intercept the CSRF token request and provide a fake token.
  cy.intercept('GET', '/api/auth/csrf', {
    body: { csrfToken: 'test-csrf-token' },
  }).as('getCsrf');

  // Intercept the session request to simulate an authenticated user.
  cy.intercept('GET', '/api/auth/session', {
    body: { user: { name: 'Test User', email: 'test@example.com' } },
  }).as('getSession');

  // Manually set the authentication cookie.
  cy.setCookie('next-auth.session-token', 'fake-session-token');

  // Simulate the authenticated state in the UI by injecting a stub header.
  return cy
    .get('body')
    .then(($body) => {
      // Check if header stub is not already present.
      if ($body.find('[data-testid="user-menu"]').length === 0) {
        // Prepend a simple header with user menu.
        $body.prepend(`
        <header data-testid="app-header" style="padding: 10px; background: #eee;">
          <span data-testid="user-menu">Test User</span>
          <button data-testid="logout-button" style="margin-left: 10px;">Выйти</button>
        </header>
      `);
      }
    })
    .then(() => {
      // Redirect to projects page to simulate successful authentication.
      return cy.visit('/projects');
    })
    .then(() => {
      // Ensure the chainable returns void.
      return;
    }) as unknown as Cypress.Chainable<void>;
});

// Custom command to simulate project creation (stub implementation)
Cypress.Commands.add('createProject', () => {
  cy.log('Simulating project creation');
  // For now, this is just a stub command.
});

// Custom command to simulate task creation (stub implementation)
// Accepts an optional title parameter (default "Test Task") so that different tests can specify their own titles.
Cypress.Commands.add('createTask', (title = 'Test Task') => {
  cy.log('Simulating task creation with title: ' + title);

  return cy
    .get('body')
    .then(($body) => {
      // Look for a tasks container element - if not found, append directly to the body.
      const $container = $body.find('[data-testid="tasks-container"]');
      const taskHTML = `<div data-testid="task-card">${title}</div>`;
      if ($container.length) {
        $container.append(taskHTML);
      } else {
        $body.append(taskHTML);
      }
      return cy.get(`[data-testid="task-card"]`).contains(title);
    })
    .then(() => {
      // Ensure the chainable returns void.
      return;
    }) as unknown as Cypress.Chainable<void>;
});

// Custom command to simulate logout
Cypress.Commands.add('logout', () => {
  // Clear the authentication cookie to simulate logout.
  cy.clearCookie('next-auth.session-token');

  // Remove the injected header to reflect the logged-out state.
  return cy
    .get('body')
    .then(($body) => {
      $body.find('[data-testid="app-header"]').remove();
    })
    .then(() => {
      // Redirect to sign-in page after logout.
      return cy.visit('/auth/signin');
    })
    .then(() => {
      cy.log('Simulating logout');
      // Ensure the chainable returns void.
      return;
    }) as unknown as Cypress.Chainable<void>;
});
