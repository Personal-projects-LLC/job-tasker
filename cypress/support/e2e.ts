/// <reference types="cypress" />

// Import commands.ts using ES modules syntax
import './commands';

// Расширяем типы Cypress пользовательскими командами
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Выполняет вход через GitHub OAuth
       * @example
       * cy.login()
       */
      login(): Chainable<void>;

      /**
       * Выполняет выход из системы
       * @example
       * cy.logout()
       */
      logout(): Chainable<void>;

      /**
       * Создает новый проект
       * @param name - Название проекта
       * @param description - Описание проекта (опционально)
       * @example
       * cy.createProject('My Project', 'Project description')
       */
      createProject(name: string, description?: string): Chainable<void>;

      /**
       * Создает новую задачу в проекте
       * @param projectId - ID проекта
       * @param title - Название задачи
       * @param description - Описание задачи (опционально)
       * @example
       * cy.createTask('123', 'My Task', 'Task description')
       */
      createTask(
        projectId: string,
        title: string,
        description?: string
      ): Chainable<void>;
    }
  }
}

// Импортируем команды для TypeScript
import './commands';
