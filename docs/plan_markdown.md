# Plan for Markdown Session Viewer

## Goal

To create a system for displaying session data from Markdown files with mathematical formulas in a clean format for students.

## Steps

1.  **Choose Libraries:**
    *   Select a JavaScript Markdown parser library that supports plugins (e.g., `markdown-it`).
    *   Choose a LaTeX rendering engine (e.g., `MathJax` or `KaTeX`). Stick with KaTeX since it's already used in the project.
2.  **Modify `session_viewer.js`:**
    *   Replace the existing simple Markdown parsing logic with the chosen Markdown parser library.
    *   Configure the Markdown parser to support LaTeX math formulas using a plugin (e.g., `markdown-it-katex`).
    *   Ensure that the `renderMathInElement` function is still called to render the math formulas using KaTeX.
    *   Modify the `loadSession` function to load `.md` files instead of `.json` files.
3.  **Update `session_viewer.html`:**
    *   Include the necessary CSS styles for the Markdown parser and KaTeX.
4.  **Create a Sample Session:**
    *   Create a sample Markdown file (e.g., `data/s2.md`) with standard Markdown syntax and LaTeX math formulas to test the system.
5.  **Test and Refine:**
    *   Test the system to ensure that Markdown content and math formulas are rendered correctly.
    *   Refine the design and implementation based on testing and user feedback.
6.  **Document the System:**
    *   Update `README.md` to document the new system, including the supported Markdown syntax, math formula syntax, and any other relevant information.

## Mermaid Diagram

```mermaid
graph TD
    A[Choose Libraries] --> B(Modify session_viewer.js);
    A --> C(Update session_viewer.html);
    B --> D(Create Sample Session);
    C --> D;
    D --> E{Test and Refine};
    E --> F[Document the System];
    F --> G(Attempt Completion);