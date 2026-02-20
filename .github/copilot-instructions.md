# GitHub Copilot Instructions - TODO Application

## Project Context

This is a full-stack TODO application with a React frontend and Express backend. The project emphasizes iterative, feedback-driven development with a focus on test-driven development practices.

**Current Phase**: Backend stabilization and frontend feature completion

**Tech Stack**:
- Frontend: React with React Testing Library
- Backend: Express.js with Jest and Supertest
- Monorepo structure under `packages/`

## Documentation References

Reference these existing documentation files to understand the project better:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles throughout development:

- **Test-Driven Development**: Follow the Red-Green-Refactor cycle
- **Incremental Changes**: Make small, testable modifications rather than large sweeping changes
- **Systematic Debugging**: Use test failures as guides to identify and fix issues
- **Validation Before Commit**: Ensure all tests pass and there are no lint errors before committing

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

- **Backend**: Jest + Supertest for API endpoint testing
- **Frontend**: React Testing Library for component unit and integration tests
- **Manual Testing**: Browser-based manual testing for full UI verification

### Important Testing Constraints

- **DO NOT** suggest or implement e2e test frameworks (Playwright, Cypress, Selenium)
- **DO NOT** suggest browser automation tools
- **Reason**: This lab focuses on unit and integration testing without the complexity of e2e frameworks

### Testing Approach by Context

- **Backend API changes**: Write Jest tests FIRST, then implement (RED-GREEN-REFACTOR)
- **Frontend component features**: Write React Testing Library tests FIRST for component behavior, then implement (RED-GREEN-REFACTOR). Follow with manual browser testing for full UI flows.

**This is true TDD**: Test first, then code to pass the test.

## Workflow Patterns

### 1. TDD Workflow (Red-Green-Refactor)

1. **Write or fix tests** - Define expected behavior before implementation
2. **Run tests** - Execute test suite
3. **See tests fail (RED)** - Confirm test failure for expected reasons
4. **Implement code** - Write minimal code to pass tests
5. **See tests pass (GREEN)** - Verify implementation meets requirements
6. **Refactor** - Improve code quality while maintaining passing tests

### 2. Code Quality Workflow

1. **Run linter** - Execute `npm run lint` to identify issues
2. **Categorize issues** - Separate errors, warnings, and style violations
3. **Fix systematically** - Address issues in logical groups
4. **Re-validate** - Run linter again to confirm all issues resolved

### 3. Integration Workflow

1. **Identify issue** - Understand the problem or feature requirement
2. **Debug** - Use logging, tests, and inspection to understand current behavior
3. **Test** - Write tests that verify desired behavior
4. **Fix** - Implement the solution
5. **Verify end-to-end** - Confirm the fix works in the full application context

## Agent Usage

Use specialized agents for specific types of work:

- **tdd-developer**: For test-related work and Red-Green-Refactor cycles. This agent specializes in writing tests first, running them, implementing code to pass tests, and refactoring.
- **code-reviewer**: For addressing lint errors and code quality improvements. This agent focuses on code standards, style consistency, and static analysis issues.

Switch to the appropriate agent based on the task at hand to get the most relevant assistance.

## Memory System

The project uses a dual-memory system to maintain context and track learnings:

### Persistent Memory
This file (`.github/copilot-instructions.md`) contains foundational principles and workflows that remain constant across sessions.

### Working Memory
The `.github/memory/` directory contains evolving discoveries and patterns:

- **session-notes.md**: Historical summaries of completed work sessions (committed to git)
- **patterns-discovered.md**: Accumulated code patterns and solutions (committed to git)
- **scratch/working-notes.md**: Active session notes for current work (NOT committed to git)

### Usage Guidance

**During active development**:
- Take notes in `.github/memory/scratch/working-notes.md` as you work
- Document findings, decisions, and blockers in real-time
- Reference `patterns-discovered.md` when encountering similar problems

**At end of session**:
- Review `scratch/working-notes.md` for key learnings
- Summarize important discoveries into `session-notes.md` (commit this)
- Extract new patterns into `patterns-discovered.md` (commit this)
- Clear or keep `scratch/working-notes.md` (it's not tracked by git)

**When providing context-aware suggestions**:
- Reference these files to understand past decisions and patterns
- Build on documented learnings rather than repeating past work
- Suggest solutions consistent with established patterns

See `.github/memory/README.md` for detailed guidance on using the memory system.

## Workflow Utilities

GitHub CLI commands are available for workflow automation:

### Issue Management

- **List open issues**: `gh issue list --state open`
- **Get issue details**: `gh issue view <issue-number>`
- **Get issue with comments**: `gh issue view <issue-number> --comments`

### Exercise Navigation

- The main exercise issue will have "Exercise:" in the title
- Steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked

## Git Workflow

### Conventional Commits

Use conventional commit format for all commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring without functional changes
- `style:` - Code style/formatting changes

**Example**: `feat: add delete button to TODO items`

### Branch Strategy

- **Feature branches**: `feature/<descriptive-name>`
- **Bug fixes**: `fix/<descriptive-name>`

### Commit Process

1. **Stage all changes**: `git add .`
2. **Commit with descriptive message**: `git commit -m "feat: descriptive message"`
3. **Push to correct branch**: `git push origin <branch-name>`

## Code Style Guidelines

- Use ES6+ JavaScript features consistently
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Use async/await over raw promises where readability improves
- Keep functions small and focused on a single responsibility
- Write descriptive variable and function names
