# RepoMirror

RepoMirror is an intelligent GitHub repository evaluation system that converts a public repository into a **Score, Summary, and Personalized Improvement Roadmap**.

## Problem Statement
Students often upload projects to GitHub without knowing how their code quality, structure, and activity appear to recruiters or mentors. RepoMirror acts as a “repository mirror” to reflect strengths and weaknesses based on real repository data.

## Approach
The system accepts a GitHub repository URL and fetches real metadata using the GitHub REST API.  
It evaluates the repository using explainable, rule-based heuristics and generates:

- A numerical score and level
- A human-readable summary
- A personalized roadmap for improvement

The focus is on **honest feedback, clarity, and actionable guidance**, similar to an AI coding mentor.

## Evaluation Signals Used
- Primary language
- Commit activity
- Repository freshness (last updated)
- Stars and forks
- Presence of description and maintenance signals

## Outputs
- **Score / Level** (Beginner, Intermediate, Advanced)
- **Written Summary** describing current quality
- **Personalized Roadmap** suggesting concrete next steps

## Tech Stack
- HTML, CSS, JavaScript
- GitHub REST API
- Deployed on Vercel

## Future Scope
- Deeper file-level analysis
- README and test coverage detection
- LLM-based feedback generation for richer mentor-style summaries

## Live Demo
👉 https://repo-mirror-deploy.vercel.app
