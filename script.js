async function analyzeRepo() {
  const url = document.getElementById("repoInput").value.trim();
  const result = document.getElementById("result");

  if (!url.includes("github.com")) {
    result.innerHTML = "<p>Please enter a valid GitHub repository URL.</p>";
    return;
  }

  const parts = url.replace("https://github.com/", "").split("/");
  const owner = parts[0];
  const repo = parts[1];

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!response.ok) throw new Error("Repo not found");

    const data = await response.json();

    // Simple heuristic scoring
    let score = 50;
    if (data.stargazers_count > 100) score += 15;
    if (data.forks_count > 50) score += 10;
    if (data.description) score += 10;
    if (!data.archived) score += 5;
    if (data.open_issues_count < 20) score += 10;

    let level =
      score >= 85 ? "Advanced" :
      score >= 65 ? "Intermediate" :
      "Beginner";

    result.innerHTML = `
      <h3>Repository Reflection</h3>
      <p><strong>Score:</strong> ${score} / 100 — ${level}</p>
      <p><strong>Stars:</strong> ${data.stargazers_count}</p>
      <p><strong>Forks:</strong> ${data.forks_count}</p>
      <p><strong>Language:</strong> ${data.language}</p>
      <p><strong>Summary:</strong> ${data.description || "No description provided."}</p>
    `;

  } catch (err) {
    result.innerHTML = "<p>Error fetching reposito
