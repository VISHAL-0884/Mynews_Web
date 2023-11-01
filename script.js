const API_Key = "325209d6f52d4d5481b0983f650f40bf";
const url = "https://newsapi.org/v2/everything?q=";

// connect to NEWSapi.org using APIKey...
window.addEventListener('load',() => fetchnews("India"));

function reload() {
      window.location.reload();
}

async function fetchnews(query) {

      // get the news to using fetch() library..
      const res = await fetch(`${url}${query}&apiKey=${API_Key}`);
      //convert to data in json formet
      const data = await res.json()
      bindData(data.articles);
}

function bindData(articles) {
      const cardContainer = document.getElementById("cards-container");
      const newsCardTemplate = document.getElementById("template-card-news");
      
      
      cardContainer.innerHTML = "";  // empty to the cardcontainer..

      articles.forEach((article) => {

            if(!article.urlToImage) return;       //article that do not have a image will be returned from here..
            const cardClone = newsCardTemplate.content.cloneNode(true);   // create the clone and clone the all element..
            fillDataInCard(cardClone,article);
            cardContainer.appendChild(cardClone);
      });
}

// put the data in cardclone (template div)
function fillDataInCard(cardClone,article) {
      const newsIMG =  cardClone.querySelector('#news-img');  
      const newsTitle = cardClone.querySelector('#news-title');
      const newsSource = cardClone.querySelector("#news-source");
      const newsDesc = cardClone.querySelector("#news-desc");   

      newsIMG.src = article.urlToImage;
      newsTitle.innerHTML = article.title;
      newsDesc.innerHTML = article.description;
      
      const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });

        newsSource.innerHTML = `${article.source.name} · ${date}`;

}

let curSelectedNav = null;

 function onNavItemClick(id) {
      fetchnews(id);
      const navItem = document.getElementById(id);
      curSelectedNav?.classList.remove("active");
      curSelectedNav = navItem;
      curSelectedNav.classList.add("active");
 }

 const searchButton = document.getElementById("search-button");
 const searchText = document.getElementById("search-text");

 searchButton.addEventListener('click',() => {
      const query = searchText.value;
      if(!query) return;
      fetchnews(query)
      curSelectedNav?.classList.remove("active");
      curSelectedNav = null;
 })