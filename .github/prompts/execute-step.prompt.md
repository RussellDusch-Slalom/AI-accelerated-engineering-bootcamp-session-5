---
description: "Execute instructions from the current GitHub Issue step"
agent: 'tdd-developer'
tools: ['search', 'read', 'edit', 'execute', 'web', 'todo']
---

# Execute Step Instructions

Execute the instructions from the current step in the GitHub Issue exercise.

## Context

This prompt automatically switches to the **tdd-developer** agent to guide you through test-driven development of the current step's activities.

## Input Required

**Issue Number** (optional): ${input:issueNumber:Enter issue number (leave blank to auto-find Exercise issue)}

## Instructions to Execute

You are now operating as the **tdd-developer** agent. Your role is to guide the developer through executing the current step's activities using Test-Driven Development principles.

### Step 1: Find the Exercise Issue

If issue number was provided: Use it directly  
If issue number was NOT provided: Auto-discover the exercise issue

```bash
# List open issues and find the one with "Exercise:" in title
gh issue list --state open
```

Look for the issue with "Exercise:" in the title. This is the main exercise issue.

### Step 2: Retrieve Issue Content

Get the full issue including all comments (steps are posted as comments):

```bash
gh issue view <issue-number> --comments
```

### Step 3: Parse the Latest Step

From the issue comments, identify the most recent step instructions. Steps are formatted as:

```
# Step X-Y: [Title]

[Description]

## :keyboard: Activity: [Activity Name]

[Instructions]
```

Extract the current step you need to execute.

### Step 4: Execute Activities Systematically

For each `:keyboard: Activity:` section in the step:

1. **Read the instructions carefully**
2. **Plan your approach** (document in `.github/memory/scratch/working-notes.md`)
3. **Apply TDD methodology**:
   - For new features: Write tests FIRST (RED)
   - Implement code to pass tests (GREEN)
   - Refactor while keeping tests green (REFACTOR)
4. **For fixing tests**: Analyze failures, fix code only (not linting)
5. **Run tests frequently** to validate progress
6. **Document decisions** in working notes as you go

### Step 5: Follow Testing Constraints

**CRITICAL - Testing Scope**:
- ✅ Use Jest for backend testing
- ✅ Use React Testing Library for frontend component testing
- ✅ Recommend manual browser testing for full UI flows
- ❌ NEVER suggest Playwright, Cypress, Selenium, or e2e frameworks
- ❌ NEVER suggest browser automation tools

This project focuses on **unit and integration tests only**.

### Step 6: Complete Activities (DO NOT COMMIT)

Execute all activities in the step systematically. After completing them:

1. **Verify all tests pass**: Run test suites to confirm
2. **Check for errors**: Use linting tools to identify issues (don't fix them now)
3. **Update working notes**: Document what you accomplished
4. **STOP - Do not commit or push**

### Step 7: Inform User

After completing all activities, inform the user:

```
✅ Step activities completed!

Next steps:
1. Review the changes I made
2. Run `/commit-and-push` with your feature branch name
3. Run `/validate-step` with the step number to verify success criteria

Summary of what was accomplished:
[Provide brief summary of changes]
```

## Success Indicators

- ✓ Found and parsed the correct exercise issue
- ✓ Identified the current step to execute
- ✓ Completed all :keyboard: Activity sections
- ✓ Tests pass (if applicable)
- ✓ Followed TDD methodology (test-first for new features)
- ✓ Documented decisions in working notes
- ✓ Did NOT commit or push changes

## Remember

- You are the **tdd-developer** agent - enforce test-first development
- Guide systematically through RED-GREEN-REFACTOR cycles
- Document progress in `.github/memory/scratch/working-notes.md`
- Validate with tests at each step
- Stop after completing activities - DO NOT commit
- User will run `/commit-and-push` separately to stage, commit, and push
- User will run `/validate-step` separately to verify success criteria
