async function analyzeRepo() {
  const repo = document.getElementById("repoInput").value.trim();
  if (!repo) {
    alert("Enter repository as owner/repo");
    return;
  }

  const resultDiv = document.getElementById("result");
  const scoreText = document.getElementById("scoreText");
  const summaryText = document.getElementById("summaryText");
  const roadmapList = document.getElementById("roadmapList");

  roadmapList.innerHTML = "";
  resultDiv.classList.add("hidden");

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`);
    if (!res.ok) throw new Error("Repository not found");

    const data = await res.json();

    // ---------- REAL SCORING LOGIC ----------
    let score = 0;

    if (data.description) score += 20;
    if (data.stargazers_count > 50) score += 20;
    if (data.forks_count > 20) score += 15;
    if (data.open_issues_count < 10) score += 15;
    if (data.size > 500) score += 15;
    if (data.language) score += 15;

    if (score > 100) score = 100;

    let level =
      score >= 85 ? "Advanced" :
      score >= 60 ? "Intermediate" :
      "Beginner";

    // ---------- SUMMARY ----------
    summaryText.textContent =
      `This repository is written primarily in ${data.language || "multiple languages"}. 
It has ${data.stargazers_count} stars and ${data.forks_count} forks, indicating ${
data.stargazers_count > 50 ? "good community interest" : "room for growth"
}.`;

    // ---------- ROADMAP ----------
    if (!data.description)
      roadmapList.innerHTML += "<li>Add a clear project description</li>";
    if (data.open_issues_count > 10)
      roadmapList.innerHTML += "<li>Resolve open issues regularly</li>";
    if (data.stargazers_count < 20)
      roadmapList.innerHTML += "<li>Improve visibility and documentation</li>";
    if (!data.language)
      roadmapList.innerHTML += "<li>Define a primary tech stack</li>";

    if (roadmapList.innerHTML === "")
      roadmapList.innerHTML = "<li>Project is in good shape. Maintain consistency.</li>";

    scoreText.textContent = `${score} / 100 — ${level}`;
    resultDiv.classList.remove("hidden");

  } catch (err) {
    alert("Error: " + err.message);
  }
}
