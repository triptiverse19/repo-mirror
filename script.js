const btn = document.getElementById("analyzeBtn");
const input = document.getElementById("repoInput");

btn.addEventListener("click", async () => {
  console.log("Button clicked"); // DEBUG LINE

  const value = input.value.trim();
  if (!value) {
    alert("Enter a GitHub repo");
    return;
  }

  const repoPath = value.includes("github.com")
    ? value.split("github.com/")[1]
    : value;

  try {
    const res = await fetch(`https://api.github.com/repos/${repoPath}`);
    if (!res.ok) throw new Error("Repo not found");

    const data = await res.json();

    let score = 50;
    if (data.stargazers_count > 1000) score += 20;
    if (data.forks_count > 100) score += 10;
    if (data.language) score += 10;
    if (data.open_issues_count < 20) score += 10;

    if (score > 100) score = 100;

    const level =
      score >= 85 ? "Advanced" :
      score >= 65 ? "Intermediate" :
      "Beginner";

    document.getElementById("score").innerText =
      `${score} / 100 — ${level}`;

    document.getElementById("summary").innerText =
      `Primary language: ${data.language || "Unknown"}.
       Stars: ${data.stargazers_count}.
       Forks: ${data.forks_count}.`;

    const roadmap = document.getElementById("roadmap");
    roadmap.innerHTML = "";

    if (!data.description)
      roadmap.innerHTML += "<li>Add a clear project description</li>";

    roadmap.innerHTML += "<li>Add tests</li>";
    roadmap.innerHTML += "<li>Improve documentation</li>";

  } catch (err) {
    alert("Error: " + err.message);
    console.error(err);
  }
});

