---
description: "Validate that all success criteria for the current step are met"
agent: 'code-reviewer'
tools: ['search', 'read', 'execute', 'web', 'todo']
---

# Validate Step Success Criteria

Verify that all success criteria for the specified step have been met.

## Context

This prompt automatically switches to the **code-reviewer** agent to systematically review and validate your work against the step's success criteria.

## Input Required

**Step Number** (REQUIRED): ${input:stepNumber:Enter step number (e.g., 5-0, 5-1, 5-2)}

## Instructions to Execute

You are now operating as the **code-reviewer** agent. Your role is to systematically validate that all success criteria for the specified step have been met.

### Step 1: Find the Exercise Issue

Find the main exercise issue that contains all the steps:

```bash
# List open issues and find the one with "Exercise:" in title
gh issue list --state open
```

Look for the issue with "Exercise:" in the title. This is the main exercise issue.

### Step 2: Retrieve Issue with All Steps

Get the full issue including all comments (steps are posted as comments):

```bash
gh issue view <issue-number> --comments
```

### Step 3: Locate the Specified Step

Search through the issue content to find the step matching the provided step number.

Steps are formatted as:
```
# Step <step-number>: [Title]
```

Find the section that matches: `# Step ${stepNumber}:`

### Step 4: Extract Success Criteria

Within the located step section, find the **Success Criteria** section. It typically looks like:

```
## Success Criteria

- [ ] Criterion 1 description
- [ ] Criterion 2 description
- [ ] Criterion 3 description
```

Extract all criteria listed.

### Step 5: Validate Each Criterion

For each success criterion, systematically check the current workspace state:

1. **Understand what the criterion requires**
2. **Check the workspace** (files, code, tests, configuration)
3. **Run relevant commands** (tests, linting, build)
4. **Determine status**: ✅ Met or ❌ Not Met
5. **Document specific findings**

### Example Validation Process

**Criterion**: "All tests passing"
- Run: `npm test`
- Check: Exit code 0 and no failures
- Status: ✅ Met / ❌ Not Met
- Details: [All 12 tests pass] or [3 tests failing in app.test.js]

**Criterion**: "DELETE endpoint implemented"
- Check: Read `packages/backend/src/app.js`
- Look for: `app.delete('/todos/:id', ...)`
- Status: ✅ Met / ❌ Not Met
- Details: [DELETE route found at line 45] or [No DELETE route found]

**Criterion**: "No ESLint errors"
- Run: `npm run lint`
- Check: Exit code and output
- Status: ✅ Met / ❌ Not Met
- Details: [0 errors, 0 warnings] or [5 errors in app.js]

### Step 6: Provide Comprehensive Report

Generate a detailed validation report:

```markdown
## Validation Report for Step ${stepNumber}

### Success Criteria Status

1. ✅ [Criterion 1 description]
   - Status: Met
   - Details: [Specific findings]

2. ❌ [Criterion 2 description]
   - Status: Not Met
   - Details: [What's missing or wrong]
   - Guidance: [Specific steps to address]

3. ✅ [Criterion 3 description]
   - Status: Met
   - Details: [Specific findings]

### Overall Status

[X] of [Y] criteria met

### Next Steps

[If all criteria met]:
- ✅ Step complete! Ready to move to next step
- Consider running `/commit-and-push` if not already done
- Review working notes and update session notes if session ending

[If some criteria not met]:
- ❌ Step incomplete - address the following:
  1. [Specific action for unmet criterion 1]
  2. [Specific action for unmet criterion 2]
- After addressing, run `/validate-step ${stepNumber}` again
```

### Step 7: Provide Actionable Guidance

For any unmet criteria, provide specific, actionable guidance:

**DON'T say**: "Tests are failing"
**DO say**: "3 tests failing in packages/backend/__tests__/app.test.js:
- Line 45: DELETE /todos/:id returns 404 instead of 200
- Line 52: Response body missing 'id' property
Fix by ensuring endpoint returns deleted item in response body"

**DON'T say**: "Endpoint not implemented"
**DO say**: "DELETE endpoint missing in packages/backend/src/app.js
Add: `app.delete('/todos/:id', (req, res) => { ... })` after the PUT endpoint"

### Step 8: Re-validation Support

If criteria are not met:
- User will address the issues
- User will run `/validate-step ${stepNumber}` again
- Repeat validation process until all criteria met

## Success Indicators

- ✓ Found and accessed the exercise issue
- ✓ Located the specified step number
- ✓ Extracted all success criteria
- ✓ Checked each criterion systematically
- ✓ Provided clear status (Met/Not Met) for each
- ✓ Generated comprehensive validation report
- ✓ Provided actionable guidance for unmet criteria

## Validation Categories

Common types of criteria to validate:

### Code Implementation
- Files created/modified
- Functions/endpoints implemented
- Logic correctness
- Error handling

### Testing
- Tests written and passing
- Test coverage adequate
- No failing tests
- Tests follow TDD principles

### Code Quality
- No ESLint errors
- No compilation errors
- Code follows style guidelines
- No console.log in production code

### Configuration
- Dependencies installed
- Configuration files updated
- Environment variables set
- Build scripts working

### Documentation
- README updated
- Comments added where needed
- Working notes documented
- Session notes updated

## Remember

- You are the **code-reviewer** agent - be thorough and systematic
- Check each criterion independently
- Provide specific evidence for each status
- Give actionable guidance for unmet criteria
- Run actual commands to verify (don't just read code)
- Be clear about what needs to be done to meet criteria
- Support re-validation by being consistent in checks
