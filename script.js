async function analyzeRepo() {
  const repo = document.getElementById("repoInput").value.trim();
  if (!repo) {
    alert("Please enter a repository (owner/repo)");
    return;
  }

  const resultDiv = document.getElementById("result");
  const scoreText = document.getElementById("scoreText");
  const summaryText = document.getElementById("summaryText");
  const roadmapList = document.getElementById("roadmapList");

  resultDiv.classList.add("hidden");
  roadmapList.innerHTML = "";

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`);
    if (!response.ok) {
      alert("Repository not found or API limit exceeded");
      return;
    }

    const data = await response.json();

    // ---------- SCORING LOGIC ----------
    let score = 40;

    if (data.description) score += 10;
    if (data.language) score += 10;
    if (data.stargazers_count > 50) score += 10;
    if (data.stargazers_count > 1000) score += 10;
    if (data.forks_count > 20) score += 10;
    if (data.open_issues_count < 10) score += 10;

    if (score > 100) score = 100;

    let level =
      score >= 85 ? "Advanced" :
      score >= 65 ? "Intermediate" :
      "Beginner";

    // ---------- OUTPUT ----------
    scoreText.innerText = `${score} / 100 — ${level}`;

    summaryText.innerText = `
Primary language: ${data.language || "Not specified"}.
Stars: ${data.stargazers_count}.
Forks: ${data.forks_count}.
Open issues: ${data.open_issues_count}.
Last updated: ${new Date(data.updated_at).toDateString()}.
    `;

    // ---------- ROADMAP ----------
    if (!data.description)
      roadmapList.innerHTML += "<li>Add a clear project description</li>";

    if (data.open_issues_count > 20)
      roadmapList.innerHTML += "<li>Reduce open issues</li>";

    if (data.stargazers_count < 50)
      roadmapList.innerHTML += "<li>Improve documentation and visibility</li>";

    roadmapList.innerHTML += "<li>Add tests and CI/CD</li>";
    roadmapList.innerHTML += "<li>Improve commit consistency</li>";

    resultDiv.classList.remove("hidden");

  } catch (err) {
    alert("Something went wrong");
    console.error(err);
  }
}
