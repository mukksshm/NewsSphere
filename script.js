const container = document.getElementById("news-container");

// simple fetch
fetch("https://api.spaceflightnewsapi.net/v4/articles/")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    showNews(data.results);
  })
  .catch(function(error) {
    console.log("Error:", error);
  });

// display function
function showNews(articles) {

  articles.slice(0, 10).forEach(function(article) {

    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${article.title}</h3>
      <img src="${article.image_url}" width="200">
      <p>${article.summary.substring(0, 80)}...</p>
      <a href="${article.url}" target="_blank">Read More</a>
      <hr>
    `;

    container.appendChild(div);
  });

}