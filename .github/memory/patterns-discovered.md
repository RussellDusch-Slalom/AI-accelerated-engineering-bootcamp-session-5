# Patterns Discovered

## Purpose
This file documents recurring code patterns, solutions, and best practices discovered during development. Each pattern includes context, problem statement, solution, and examples. Reference these patterns when implementing similar features or debugging similar issues.

**Note**: This file is committed to git and accumulates learnings over time.

---

## Pattern Template

Use this template when documenting a new pattern:

```markdown
## Pattern: [Pattern Name]

**Context**: When/where this pattern applies

**Problem**: What issue or need this pattern addresses

**Solution**: How to implement this pattern

**Example**:
```code
// Code example demonstrating the pattern
```

**Related Files**: 
- path/to/file1.js
- path/to/file2.js

**Notes**: Additional considerations, trade-offs, or warnings

---
```

---

## Discovered Patterns

## Pattern: Service Initialization - Empty Array vs Null

**Context**: When initializing collections (arrays) in service classes or modules

**Problem**: 
- Using `null` or `undefined` for initial state requires null checks before every array operation
- This adds boilerplate and increases chance of runtime errors
- Inconsistent initialization patterns lead to defensive programming throughout codebase

**Solution**: 
Initialize collections as empty arrays `[]` rather than `null`:
```javascript
// Good: Empty array initialization
class TodoService {
  constructor() {
    this.todos = [];  // Start with empty array
  }
  
  getAll() {
    return this.todos;  // No null check needed
  }
  
  add(todo) {
    this.todos.push(todo);  // Direct array operation
  }
}

// Avoid: Null initialization
class TodoService {
  constructor() {
    this.todos = null;  // Requires null checks everywhere
  }
  
  getAll() {
    return this.todos || [];  // Defensive null check
  }
  
  add(todo) {
    if (!this.todos) this.todos = [];  // Required check
    this.todos.push(todo);
  }
}
```

**Related Files**: 
- packages/backend/src/app.js (TodoService initialization)

**Notes**: 
- This pattern applies to any collection data structure (arrays, sets, maps)
- Empty collections are "falsy" but still allow safe method calls
- Trade-off: Must ensure array methods (map, filter, etc.) handle empty arrays correctly
- Exception: Use `null` when you need to distinguish "not loaded yet" from "loaded but empty"

---

## Pattern: [Next Pattern]

*Add new patterns below as they are discovered*
