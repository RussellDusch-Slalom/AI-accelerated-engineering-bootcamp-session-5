---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['read', 'execute', 'todo']
---

# Commit and Push Changes

Analyze current changes, generate a conventional commit message, and push to a feature branch.

## Context

This prompt works with whatever agent is currently active. It handles the Git workflow after you've completed work and are ready to commit.

## Input Required

**Branch Name** (REQUIRED): ${input:branchName:Enter feature branch name (e.g., feature/add-delete-button)}

## Instructions to Execute

### Step 1: Validate Input

Check if branch name was provided:
- If provided: Proceed with Git workflow
- If NOT provided: **STOP and ask the user for the branch name**

The branch name is REQUIRED. Suggested format:
- `feature/<descriptive-name>` for new features
- `fix/<descriptive-name>` for bug fixes

### Step 2: Analyze Changes

Review what has changed in the workspace:

```bash
git status
git diff
```

Examine the output to understand:
- Which files were modified, added, or deleted
- What specific changes were made
- The scope and nature of the work

### Step 3: Generate Commit Message

Based on the changes, create a commit message following **Conventional Commit** format:

**Format**: `<type>: <description>`

**Types**:
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring without functional changes
- `style:` - Code style/formatting changes

**Examples**:
- `feat: add delete button to TODO items`
- `fix: resolve CORS issue for API requests`
- `test: add integration tests for delete endpoint`
- `refactor: extract todo finding logic into helper`
- `chore: update ESLint configuration`

Create a clear, descriptive commit message that summarizes the changes.

### Step 4: Create or Switch to Branch

Handle branch creation/switching:

```bash
# Check if branch exists
git branch --list <branch-name>

# If branch doesn't exist, create it
git checkout -b <branch-name>

# If branch exists, switch to it
git checkout <branch-name>
```

**CRITICAL**: 
- ✅ ONLY use the user-provided branch name
- ❌ NEVER commit to `main` branch
- ❌ NEVER commit to any other existing branch without explicit permission

### Step 5: Stage All Changes

Stage all changes for commit:

```bash
git add .
```

### Step 6: Commit Changes

Commit with the generated message:

```bash
git commit -m "<generated-commit-message>"
```

### Step 7: Push to Remote

Push the branch to the remote repository:

```bash
git push origin <branch-name>
```

If this is the first push for a new branch, Git may suggest setting upstream. Follow the suggestion if needed:

```bash
git push --set-upstream origin <branch-name>
```

### Step 8: Confirm Success

Report back to the user with:

```
✅ Changes committed and pushed successfully!

Branch: <branch-name>
Commit message: <generated-commit-message>

Files changed:
[List of modified files]

Next steps:
- Create a Pull Request if needed
- Continue with next exercise step
- Run `/validate-step` to verify success criteria
```

## Success Indicators

- ✓ Branch name was provided (or requested from user)
- ✓ Changes analyzed and understood
- ✓ Conventional commit message generated
- ✓ Correct branch created or switched to
- ✓ All changes staged
- ✓ Changes committed with proper message
- ✓ Branch pushed to remote successfully
- ✓ Did NOT commit to main branch

## Error Handling

If any step fails:
1. **Explain what went wrong**
2. **Provide guidance to resolve**
3. **Do not proceed to next steps**

Common issues:
- Missing branch name → Ask user to provide it
- Merge conflicts → Guide user to resolve manually
- Push rejected → Check for remote changes and advise pulling first
- No changes to commit → Inform user and explain why

## Remember

- Branch name is REQUIRED - ask if not provided
- Use conventional commit format consistently
- NEVER commit to main branch
- Stage ALL changes with `git add .`
- Push to the user-specified branch only
- Provide clear confirmation of success
