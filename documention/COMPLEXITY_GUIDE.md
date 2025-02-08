COMPLEXITY GUIDE

````markdown
# Complexity Management Guide

Current Date and Time (UTC): 2025-01-28 19:54:13
Author: @Samraffi

## Project Structure Guide

### 1. Directory Complexity

❌ Stop and Reorganize when:

- Directory depth > 4 levels
- More than 10 files in a directory
- Mixed responsibilities in one directory

✅ Best Practice:

```typescript
src/
  ├── core/           # Core business logic
  │   ├── parser/     # Parser related
  │   ├── ai/        # AI/LLM related
  │   └── types/     # Shared types
  ├── features/      # Feature modules
  │   ├── analysis/  # Analysis feature
  │   ├── projects/  # Projects feature
  │   └── auth/      # Auth feature
  └── shared/        # Shared utilities
      ├── ui/        # UI components
      ├── hooks/     # Custom hooks
      └── utils/     # Utilities
```
````

### 2. Component Structure

❌ Warning Signs:

- Props > 5
- Nested components > 3 levels
- Mixed responsibilities

✅ Recommended:

```typescript
// Good Component Structure
interface ProjectCardProps {
  id: string;
  title: string;
  status: ProjectStatus;
  onStatusChange: (status: ProjectStatus) => void;
}

export const ProjectCard = ({
  id,
  title,
  status,
  onStatusChange
}: ProjectCardProps) => {
  // Single responsibility
  return (...)
}
```

### 3. Code Organization

❌ Avoid:

- Files > 200 lines
- Functions > 30 lines
- Classes > 200 lines

✅ Maintain:

```typescript
// Split into smaller functions
export class ProjectAnalyzer {
  private validateInput(input: ProjectInput): ValidationResult;
  private parseMetadata(data: RawData): Metadata;
  private analyzeComplexity(metadata: Metadata): ComplexityScore;

  public async analyze(project: ProjectInput): Promise<Analysis> {
    const isValid = this.validateInput(project);
    const metadata = this.parseMetadata(project.data);
    return this.analyzeComplexity(metadata);
  }
}
```

## Code Quality Rules

### 1. Function Complexity

❌ Stop and Refactor when:

- Cyclomatic complexity > 10
- Number of parameters > 4
- Nesting level > 3
- More than one responsibility

✅ Good Practice:

```typescript
// Before
function processProject(data: any) {
  if (data.type === 'analysis') {
    if (data.status === 'pending') {
      if (data.priority === 'high') {
        // Deep nesting...
      }
    }
  }
}

// After
const shouldProcessProject = (data: ProjectData): boolean => {
  return (
    data.type === 'analysis' &&
    data.status === 'pending' &&
    data.priority === 'high'
  );
};

function processProject(data: ProjectData) {
  if (!shouldProcessProject(data)) return;
  // Process...
}
```

### 2. Type Safety

❌ Warning Signs:

- Using 'any' type
- Type assertions without validation
- Complex union types

✅ Recommended:

```typescript
// Use discriminated unions
type ProjectState =
  | { status: 'draft'; data: DraftData }
  | { status: 'active'; data: ActiveData }
  | { status: 'completed'; data: CompletedData };

function handleProject(project: ProjectState) {
  switch (project.status) {
    case 'draft':
      return handleDraft(project.data);
    case 'active':
      return handleActive(project.data);
    case 'completed':
      return handleCompleted(project.data);
  }
}
```

### 3. Error Handling

❌ Avoid:

- Generic error catching
- Swallowing errors
- Inconsistent error patterns

✅ Maintain:

```typescript
class ProjectError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

async function analyzeProject(url: string) {
  try {
    const data = await fetchProject(url);
    return processData(data);
  } catch (error) {
    if (error instanceof NetworkError) {
      throw new ProjectError('NETWORK_ERROR', 'Failed to fetch project');
    }
    throw new ProjectError('UNKNOWN_ERROR', 'Unknown error occurred');
  }
}
```

## Best Practices

### 1. State Management

❌ Warning Signs:

- Prop drilling > 3 levels
- Complex state updates
- Mixed global/local state

✅ Recommended:

```typescript
// Use context for global state
export const ProjectContext = createContext<ProjectContextType | null>(null);

// Use local state for component-specific state
const [isLoading, setIsLoading] = useState(false);
```

### 2. Testing

❌ Insufficient when:

- Coverage < 80%
- Missing integration tests
- No E2E for critical paths

✅ Required:

```typescript
describe('ProjectAnalyzer', () => {
  it('should validate input', () => {
    const analyzer = new ProjectAnalyzer();
    expect(() => analyzer.analyze(invalidInput)).toThrow(ValidationError);
  });
});
```

### 3. Documentation

❌ Incomplete without:

- API documentation
- Component props documentation
- Architecture decisions

✅ Required:

```typescript
/**
 * Analyzes project complexity and provides recommendations
 * @param {ProjectInput} input - Project details
 * @returns {Promise<Analysis>} Analysis results
 * @throws {ValidationError} When input is invalid
 */
```

````

А теперь промт для старта проекта:

```markdown
# Рекомендации по старту проекта

## 1. Подготовительный этап

### 1.1 Создание структуры проекта:
```bash
npx create-next-app@latest jobtasker --typescript --tailwind --app --src-dir --import-alias "@/*"
````

### 1.2 Установка базовых зависимостей:

```bash
pnpm add prisma @prisma/client @auth/prisma-adapter
pnpm add next-auth zod react-hook-form @hookform/resolvers/zod
pnpm add class-variance-authority clsx tailwind-merge
pnpm add openai puppeteer
```

### 1.3 Настройка ESLint:

```json
{
  "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "max-lines-per-function": ["error", 30],
    "max-depth": ["error", 3],
    "max-params": ["error", 4]
  }
}
```

## 2. Последовательность разработки

### 2.1 База данных (День 1-2):

1. Инициализация Prisma
2. Создание базовых моделей
3. Настройка миграций

### 2.2 Аутентификация (День 3-4):

1. Настройка NextAuth.js
2. Создание защищенных маршрутов
3. Интеграция с GitHub OAuth

### 2.3 Базовые компоненты (День 5-7):

1. Создание компонентов UI
2. Настройка форм
3. Реализация базовой навигации

### 2.4 Основной функционал (День 8-14):

1. Парсер проектов
2. AI интеграция
3. Система анализа

### 2.5 Тестирование (День 15-16):

1. Unit тесты
2. Integration тесты
3. E2E тесты

## 3. Советы по разработке

### 3.1 Организация кода:

- Следуйте feature-based структуре
- Используйте barrel exports
- Придерживайтесь принципа единой ответственности

### 3.2 Работа с Git:

- Создавайте feature branches
- Используйте conventional commits
- Регулярно обновляйте документацию

### 3.3 Документация:

- Обновляйте README.md
- Документируйте API
- Ведите CHANGELOG.md

### 3.4 Процесс разработки:

1. Создайте новую ветку для фичи
2. Напишите тесты
3. Реализуйте функционал
4. Обновите документацию
5. Создайте PR

## 4. CI/CD Setup

### 4.1 GitHub Actions:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
      - run: npm run lint
```

### 4.2 Husky pre-commit:

```bash
npx husky-init
npx husky add .husky/pre-commit "npm run lint && npm test"
```

## 5. Мониторинг прогресса

### 5.1 Ежедневные задачи:

1. Обновление PROGRESS.md
2. Code review
3. Обновление документации

### 5.2 Еженедельные задачи:

1. Рефакторинг
2. Оптимизация
3. Обновление зависимостей

### 5.3 Ежемесячные задачи:

1. Аудит безопасности
2. Проверка производительности
3. Обновление roadmap

```

Этот подход позволит:
1. Сохранять контроль над сложностью
2. Поддерживать качество кода
3. Обеспечивать масштабируемость
4. Облегчить поддержку проекта
```
