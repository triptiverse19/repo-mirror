async function analyzeRepo() {
  const repo = document.getElementById("repoInput").value.trim();

  if (!repo.includes("/")) {
    alert("Enter repo as owner/repo");
    return;
  }

  const scoreEl = document.getElementById("score");
  const summaryEl = document.getElementById("summary");
  const roadmapEl = document.getElementById("roadmap");

  scoreEl.innerText = "Analyzing...";
  summaryEl.innerText = "";
  roadmapEl.innerHTML = "";

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`);
    const data = await res.json();

    if (data.message) {
      scoreEl.innerText = "Error";
      summaryEl.innerText = data.message;
      return;
    }

    let score = 50;

    if (data.stargazers_count > 100) score += 10;
    if (data.forks_count > 50) score += 10;
    if (data.open_issues_count < 20) score += 5;
    if (data.language) score += 5;
    if (data.size > 1000) score += 10;

    let level =
      score >= 80 ? "Advanced" :
      score >= 60 ? "Intermediate" :
      "Beginner";

    scoreEl.innerText = `${score} / 100 — ${level}`;

    summaryEl.innerText =
      `This repository uses ${data.language || "multiple technologies"}.
       It has ${data.stargazers_count} stars and ${data.forks_count} forks.
       The project shows ${level.toLowerCase()} maturity and real-world relevance.`;

    const roadmap = [];

    if (!data.description)
      roadmap.push("Add a clear project description");

    if (data.open_issues_count > 20)
      roadmap.push("Reduce open issues and improve stability");

    if (!data.language)
      roadmap.push("Define a primary programming language");

    roadmap.push("Improve documentation and add usage examples");
    roadmap.push("Maintain consistent commit history");

    roadmap.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      roadmapEl.appendChild(li);
    });

  } catch (err) {
    scoreEl.innerText = "Failed";
    summaryEl.innerText = "Could not analyze repository.";
  }
}
