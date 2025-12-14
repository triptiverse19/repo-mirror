async function analyzeRepository() {
  const input = document.getElementById("repoInput").value.trim();
  if (!input) {
    alert("Please enter a GitHub repository (owner/repo)");
    return;
  }

  const url = `https://api.github.com/repos/${input}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Repository not found");

    const data = await res.json();

    // Basic signals
    const stars = data.stargazers_count;
    const forks = data.forks_count;
    const issues = data.open_issues_count;
    const updated = new Date(data.updated_at);

    // Simple scoring logic (VERY IMPORTANT for hackathon)
    let score = 40;
    if (stars > 1000) score += 20;
    else if (stars > 100) score += 10;

    if (forks > 500) score += 15;
    else if (forks > 50) score += 8;

    if (issues < 50) score += 10;
    if (data.description) score += 5;

    if (score > 90) score = 90;

    let level =
      score >= 80 ? "Advanced" :
      score >= 60 ? "Intermediate" :
      "Beginner";

    // Update UI
    document.getElementById("score").innerText =
      `${score} / 100 — ${level}`;

    document.getElementById("summary").innerText =
      `This repository "${data.full_name}" is written primarily in ${
        data.language || "multiple languages"
      }. It has ${stars} stars and ${forks} forks. Last updated on ${updated.toDateString()}.`;

    document.getElementById("roadmap").innerHTML = `
      <li>Add or improve README documentation</li>
      <li>Increase test coverage</li>
      <li>Maintain consistent commit history</li>
      <li>Improve issue management and labels</li>
    `;
  } catch (err) {
    alert(err.message);
  }
}

