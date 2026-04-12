const container = document.getElementById("news-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const toggleBtn = document.getElementById("toggle");
const loading = document.getElementById("loading");

let allArticles = [];

fetch("https://api.spaceflightnewsapi.net/v4/articles/")
  .then(res => res.json())
  .then(data => {
    loading.style.display = "none";
    allArticles = data.results;
    showNews(allArticles);
  })
  .catch(err => console.log(err));

function showNews(articles) {
  container.innerHTML = "";

  articles.slice(0, 10).forEach(article => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${article.title}</h3>
      <img src="${article.image_url}">
      <p>${article.summary.substring(0, 80)}...</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;

    container.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allArticles.filter(article =>
    article.title.toLowerCase().includes(value)
  );

  showNews(filtered);
});

sortSelect.addEventListener("change", () => {
  let sorted = [...allArticles];

  if (sortSelect.value === "asc") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortSelect.value === "desc") {
    sorted.sort((a, b) => b.title.localeCompare(a.title));
  }

  showNews(sorted);
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});