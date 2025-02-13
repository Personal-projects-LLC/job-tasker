describe('Task Management', () => {
  let projectId: string;

  beforeEach(() => {
    cy.login();

    // Create a test project and store its ID
    cy.createProject('Test Project for Tasks');
    cy.url().then((url) => {
      projectId = url.split('/').pop() || '';
    });
  });

  it('should create a new task', () => {
    const taskTitle = 'Test Task';
    const taskDescription = 'This is a test task description';

    cy.createTask(projectId, taskTitle, taskDescription);

    cy.get('[data-testid="task-card"]').should('contain', taskTitle);
    cy.get('[data-testid="task-card"]').should('contain', taskDescription);
  });

  it('should change task status', () => {
    const taskTitle = 'Status Change Task';

    cy.createTask(projectId, taskTitle);

    cy.get('[data-testid="task-card"]')
      .contains(taskTitle)
      .parent()
      .find('[data-testid="task-status-select"]')
      .click();

    cy.get('[data-value="IN_PROGRESS"]').click();

    cy.get('[data-testid="task-card"]')
      .contains(taskTitle)
      .parent()
      .find('[data-testid="task-status-select"]')
      .should('contain', 'In Progress');
  });

  it('should edit task details', () => {
    const originalTitle = 'Task to Edit';
    const newTitle = 'Edited Task';
    const newDescription = 'Updated task description';

    cy.createTask(projectId, originalTitle);

    cy.get('[data-testid="task-card"]')
      .contains(originalTitle)
      .parent()
      .find('[data-testid="edit-task-button"]')
      .click();

    cy.get('[data-testid="task-title-input"]').clear().type(newTitle);
    cy.get('[data-testid="task-description-input"]')
      .clear()
      .type(newDescription);
    cy.get('[data-testid="submit-task-button"]').click();

    cy.get('[data-testid="task-card"]').should('contain', newTitle);
    cy.get('[data-testid="task-card"]').should('contain', newDescription);
  });

  it('should delete a task', () => {
    const taskTitle = 'Task to Delete';

    cy.createTask(projectId, taskTitle);

    cy.get('[data-testid="task-card"]')
      .contains(taskTitle)
      .parent()
      .find('[data-testid="delete-task-button"]')
      .click();

    cy.get('[data-testid="confirm-delete-button"]').click();

    cy.get('[data-testid="task-card"]').should('not.contain', taskTitle);
  });

  it('should filter tasks by status', () => {
    const todoTask = 'Todo Task';
    const inProgressTask = 'In Progress Task';

    cy.createTask(projectId, todoTask);
    cy.createTask(projectId, inProgressTask);

    // Change second task to In Progress
    cy.get('[data-testid="task-card"]')
      .contains(inProgressTask)
      .parent()
      .find('[data-testid="task-status-select"]')
      .click();
    cy.get('[data-value="IN_PROGRESS"]').click();

    // Filter by In Progress
    cy.get('[data-testid="task-filter"]').click();
    cy.get('[data-value="IN_PROGRESS"]').click();

    cy.get('[data-testid="task-card"]').should('have.length', 1);
    cy.get('[data-testid="task-card"]').should('contain', inProgressTask);
    cy.get('[data-testid="task-card"]').should('not.contain', todoTask);
  });
});
