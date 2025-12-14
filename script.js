async function analyzeRepo() {
  const input = document.getElementById("repoInput").value.trim();

  if (!input.includes("/")) {
    alert("Use format: owner/repo");
    return;
  }

  const scoreEl = document.getElementById("score");
  const summaryEl = document.getElementById("summary");
  const roadmapEl = document.getElementById("roadmap");

  scoreEl.innerText = "Analyzing...";
  summaryEl.innerText = "";
  roadmapEl.innerHTML = "";

  try {
    const response = await fetch(`https://api.github.com/repos/${input}`);
    const data = await response.json();

    if (data.message) {
      scoreEl.innerText = "Error";
      summaryEl.innerText = data.message;
      return;
    }

    let score = 50;

    if (data.stargazers_count > 100) score += 15;
    if (data.forks_count > 50) score += 10;
    if (data.language) score += 10;
    if (data.open_issues_count < 20) score += 10;

    let level =
      score >= 80 ? "Advanced" :
      score >= 60 ? "Intermediate" :
      "Beginner";

    scoreEl.innerText = `${score} / 100 — ${level}`;

    summaryEl.innerText =
      `This repository uses ${data.language || "multiple technologies"}.
       It has ${data.stargazers_count} stars and ${data.forks_count} forks.
       Overall maturity: ${level}.`;

    const roadmap = [];
    if (!data.description) roadmap.push("Add a clear project description");
    if (data.open_issues_count > 20) roadmap.push("Reduce open issues");
    roadmap.push("Improve documentation");
    roadmap.push("Maintain consistent commits");

    roadmap.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      roadmapEl.appendChild(li);
    });

  } catch (e) {
    scoreEl.innerText = "Failed";
    summaryEl.innerText = "Could not analyze repository.";
  }
}

