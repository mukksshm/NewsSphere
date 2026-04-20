const container = document.getElementById("news-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const toggleBtn = document.getElementById("toggle");
const loading = document.getElementById("loading");

let allArticles = [];

fetch("https://api.spacexdata.com/v4/launches")
  .then(res => res.json())
  .then(data => {
    loading.style.display = "none";
    allArticles = data;
    showNews(allArticles);
  })
  .catch(err => {
    loading.textContent = "Failed to load data. Please try again.";
    console.log(err);
  });

function showNews(articles) {
  container.innerHTML = "";

  articles.slice(0, 15).forEach(article => {
    const div = document.createElement("div");
    div.classList.add("card");

    const img = article.links.patch.small || "https://via.placeholder.com/150?text=No+Image";
    const title = article.name;
    const summary = article.details ? article.details.substring(0, 100) + "..." : "No details provided for this launch.";
    const link = article.links.article || article.links.wikipedia || article.links.webcast || "#";

    div.innerHTML = `
      <h3>${title}</h3>
      <img src="${img}" alt="${title}">
      <p>${summary}</p>
      <a href="${link}" target="_blank">View Details</a>
    `;

    container.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allArticles.filter(article =>
    article.name.toLowerCase().includes(value)
  );

  showNews(filtered);
});

sortSelect.addEventListener("change", () => {
  let sorted = [...allArticles];

  if (sortSelect.value === "asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortSelect.value === "desc") {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  }

  showNews(sorted);
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});