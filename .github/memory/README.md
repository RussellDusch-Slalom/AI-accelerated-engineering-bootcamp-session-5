# Working Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It serves as a knowledge base that both human developers and AI assistants can reference to maintain context across sessions and build on past discoveries.

## Memory Types

### Persistent Memory
The `.github/copilot-instructions.md` file contains:
- Foundational development principles
- Core workflows and patterns
- Project architecture and tech stack
- Long-term conventions and standards

This is your "project constitution" - the unchanging rules and guidance.

### Working Memory
The `.github/memory/` directory contains:
- **session-notes.md**: Historical summaries of completed work sessions (committed to git)
- **patterns-discovered.md**: Accumulated code patterns and solutions (committed to git)
- **scratch/working-notes.md**: Active session notes for current work (NOT committed to git)

This is your "project journal" - evolving discoveries and context.

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical session summaries (COMMITTED)
├── patterns-discovered.md       # Accumulated patterns (COMMITTED)
└── scratch/
    ├── .gitignore               # Ignores all files in scratch/
    └── working-notes.md         # Active session notes (NOT COMMITTED)
```

## When to Use Each File

### During TDD Workflow (Red-Green-Refactor)

**scratch/working-notes.md** - Use while actively working:
- Document failing tests and their root causes
- Track implementation decisions as you code
- Note unexpected behaviors discovered during testing
- Record refactoring decisions and their rationale

**Example during TDD**:
```markdown
## Current Task
Implement DELETE /todos/:id endpoint

## Approach
1. Write test that expects 200 status and removal
2. Run test (RED)
3. Implement endpoint logic
4. Run test (GREEN)

## Key Findings
- Initial implementation returned undefined on success
- Tests expected actual deleted item to be returned
- Response body should match REST conventions

## Decisions Made
- Return deleted item in response body
- Use 404 if item not found
- Return 200 (not 204) to include response body
```

### During Linting Workflow

**scratch/working-notes.md** - Track systematic fixes:
- Categorize lint errors by type
- Document why certain warnings were addressed or suppressed
- Note patterns that cause repeated lint issues

**Example during linting**:
```markdown
## Current Task
Fix ESLint errors in backend

## Key Findings
- 15 "no-unused-vars" warnings from test files
- Jest globals (describe, test, expect) not recognized
- Need to configure Jest environment in ESLint

## Decisions Made
- Add jest: true to env in .eslintrc.json
- Remove genuinely unused imports
- Keep _prefixed vars for intentionally unused parameters
```

### During Debugging Workflow

**scratch/working-notes.md** - Capture debugging discoveries:
- Document symptoms vs. root causes
- Track investigation steps and dead ends
- Note the "aha moment" when you find the issue

**Example during debugging**:
```markdown
## Current Task
Fix frontend failing to fetch todos

## Approach
1. Check network tab - seeing CORS errors
2. Verify backend CORS configuration
3. Check API endpoint URLs

## Key Findings
- Frontend using http://localhost:3000 (wrong port)
- Backend runs on port 5001
- CORS was configured correctly, just wrong URL

## Decisions Made
- Updated API_URL in frontend to http://localhost:5001
- Added .env support for configurable backend URL
```

## How AI Reads and Applies These Patterns

### When You Start a New Session

1. **AI reads** `.github/copilot-instructions.md` for foundational principles
2. **AI reads** `.github/memory/patterns-discovered.md` for known solutions
3. **AI reads** `.github/memory/session-notes.md` for recent context
4. **AI creates/updates** `.github/memory/scratch/working-notes.md` during work

### During Active Development

- AI references patterns-discovered.md when encountering similar problems
- AI suggests solutions based on past decisions documented in session-notes.md
- AI takes notes in scratch/working-notes.md to maintain context within the session
- AI can reference scratch/working-notes.md if you ask "what were we just doing?"

### At End of Session

1. **Review** scratch/working-notes.md for key learnings
2. **Summarize** important discoveries into session-notes.md (commit this)
3. **Extract** new patterns into patterns-discovered.md (commit this)
4. **Keep or delete** scratch/working-notes.md (it's not committed, so it's ephemeral)

## Key Distinction: Session Notes vs. Working Notes

### session-notes.md (Historical Record - COMMITTED)
- **Purpose**: Permanent record of completed work
- **When**: Written at END of session
- **Content**: Polished summaries of what was accomplished
- **Audience**: Future you, future AI sessions, team members
- **Git status**: Committed to repository
- **Example**: "Session on Jan 15: Implemented DELETE endpoint, fixed CORS issue, added input validation tests"

### scratch/working-notes.md (Active Session - NOT COMMITTED)
- **Purpose**: Temporary notes during active development
- **When**: Written DURING session as you work
- **Content**: Raw notes, debugging thoughts, trial-and-error
- **Audience**: Current you, current AI session
- **Git status**: Ignored by git (listed in scratch/.gitignore)
- **Example**: "Trying approach A... didn't work because X. Now trying approach B... still getting error Y. Wait, maybe the issue is Z..."

**The Flow**:
```
Work → Take notes in scratch/working-notes.md → Session ends →
Review and distill → Add summary to session-notes.md → Commit →
scratch/working-notes.md can be cleared for next session
```

## Workflow Integration

### Example: Complete TDD Cycle with Memory

1. **Start**: Read patterns-discovered.md for similar patterns
2. **Write Test**: Note test intent in scratch/working-notes.md
3. **RED**: Document failure reason in scratch/working-notes.md
4. **Implement**: Note key decisions in scratch/working-notes.md
5. **GREEN**: Document what made it work in scratch/working-notes.md
6. **Refactor**: Note improvements in scratch/working-notes.md
7. **End Session**: 
   - Extract key findings to session-notes.md
   - Add new pattern to patterns-discovered.md if discovered
   - Commit session-notes.md and patterns-discovered.md
   - Clear or keep scratch/working-notes.md (your choice, it's not committed)

## Benefits

- **Continuity**: Resume work with full context from previous sessions
- **Learning**: Build institutional knowledge about the codebase
- **Efficiency**: Don't repeat mistakes or rediscover solutions
- **Collaboration**: Share discoveries with team members and AI
- **Debugging**: Trace decision history when issues arise

## Best Practices

1. **Be specific**: Include file names, line numbers, and code snippets
2. **Be honest**: Document dead ends and mistakes, they're valuable
3. **Be timely**: Take notes during work, not after (memory fades)
4. **Be selective**: Not everything needs to be in session-notes.md, only key learnings
5. **Be consistent**: Update scratch/working-notes.md throughout active work
6. **Be thoughtful**: At session end, distill scratch notes into polished session summaries

## Getting Started

1. Start your work session
2. Open `.github/memory/scratch/working-notes.md`
3. Fill in "Current Task" with what you're working on
4. Take notes as you work in the other sections
5. When done, review and extract key points to `session-notes.md`
6. Commit session-notes.md and any updated patterns-discovered.md
7. Your scratch/working-notes.md stays local (not tracked by git)
