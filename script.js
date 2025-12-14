function analyzeRepo() {
  const url = document.getElementById("repoUrl").value.trim();

  if (url === "") {
    alert("Please paste a GitHub repository URL.");
    return;
  }

  // Show results section
  document.getElementById("results").classList.remove("hidden");

  // Score (prototype logic)
  document.getElementById("scoreValue").innerText =
    "72 / 100 — Intermediate";

  // Summary
  document.getElementById("summaryText").innerText =
    "This repository demonstrates a clear project goal and basic structure. However, documentation, testing, and consistent version control practices can be improved to make it recruiter-ready.";

  // Roadmap steps
  const roadmapSteps = [
    "Add a detailed README.md explaining the project purpose and setup",
    "Organize files into clear folders for better maintainability",
    "Write basic unit tests for important components",
    "Use meaningful and consistent Git commit messages",
    "Explore CI/CD pipelines to automate checks and testing"
  ];

  const roadmapList = document.getElementById("roadmapList");
  roadmapList.innerHTML = "";

  roadmapSteps.forEach(step => {
    const li = document.createElement("li");
    li.innerText = step;
    roadmapList.appendChild(li);
  });
}
