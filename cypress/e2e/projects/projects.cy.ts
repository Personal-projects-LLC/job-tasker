describe('Projects page', () => {
  before(() => {
    // Используем кастомную команду для имитации аутентификации
    cy.login();
  });

  it('Должна отображаться страница projects для аутентифицированного пользователя', () => {
    // Переход на страницу projects с отключенной проверкой кода статуса
    cy.visit('/projects', { failOnStatusCode: false });

    // Проверка наличия уникального элемента на странице.
    // Замените "Projects" на текст или селектор, который однозначно идентифицирует вашу страницу.
    cy.contains('Projects').should('exist');
  });
});
