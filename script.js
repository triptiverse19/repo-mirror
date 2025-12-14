const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", async () => {
  const input = document.getElementById("repoInput").value.trim();
  if (!input) {
    alert("Enter a GitHub repo (owner/repo)");
    return;
  }

  // normalize input
  const repoPath = input.includes("github.com")
    ? input.split("github.com/")[1]
    : input;

  const url = `https://api.github.com/repos/${repoPath}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Repo not found");
    const data = await res.json();

    // ---- REAL METRICS ----
    let score = 50;
    if (data.stargazers_count > 1000) score += 20;
    if (data.forks_count > 100) score += 10;
    if (data.open_issues_count < 20) score += 10;
    if (data.language) score += 10;

    if (score > 100) score = 100;

    let level =
      score >= 85 ? "Advanced" :
      score >= 65 ? "Intermediate" :
      "Beginner";

    document.getElementById("score").innerText =
      `${score} / 100 — ${level}`;

    document.getElementById("summary").innerText =
      `This repository is primarily written in ${data.language || "multiple languages"}.
       It has ${data.stargazers_count} stars and ${data.forks_count} forks,
       indicating ${score >= 80 ? "strong" : "moderate"} community interest.`;

    const roadmap = document.getElementById("roadmap");
    roadmap.innerHTML = "";

    if (!data.description) {
      roadmap.innerHTML += "<li>Add a clear project description</li>";
    }
    if (data.open_issues_count > 20) {
      roadmap.innerHTML += "<li>Address open issues to improve stability</li>";
    }
    roadmap.innerHTML += "<li>Add contribution guidelines</li>";
    roadmap.innerHTML += "<li>Introduce automated testing</li>";

  } catch (err) {
    alert("Invalid repository or API limit hit");
  }
});


