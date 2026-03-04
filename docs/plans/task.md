# Project Task List: Refatoração e Correções DEPPI

| Status | Task | Description | Goal |
| :--- | :--- | :--- | :--- |
| [X] | Task 1 | Fix Contact Module Compilation | Resolve the "Cannot find name 'inject'" error in `contact.module.ts`. |
| [X] | Task 2 | Fix SCSS Backdrop-Filter | Fix Safari compatibility and IDE warnings by reordering/adding prefixes. |
| [X] | Task 3 | Fix Environment Replacements | Ensure `environment.prod.ts` is used in production builds. |
| [X] | Task 4 | Unify Theme Management | Make `ThemeService` the single source of truth. |
| [X] | Task 5 | Refactor Header to use ThemeService | Remove direct DOM/localStorage manipulation from Header. |
| [X] | Task 6 | Extract Header CSS | Resolve budget warnings by moving component styles to SCSS. |
| [X] | Task 7 | Optimize Budgets | Adjust build budgets to reasonable production values. |
