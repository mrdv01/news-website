const hamburgerMenu = document.querySelector('.hamburger-container');

const sideBar = document.querySelector('.side-bar');

hamburgerMenu.addEventListener('click',()=>{
    
    sideBar.classList.toggle('side-bar-active')
    
})


const API_KEY = "e9cefe751f034117a8b7063c61790ba6";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article)=> {
        if(!article.urlToImage) return;
        const cardClone =  newsCardTemplate.content.cloneNode(true);
        fillDataIncard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataIncard(cardClone,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let currentSelectedNavItem = null;

function clickOnNavItem(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNavItem?.classList.remove("active");
    currentSelectedNavItem = navItem;
    currentSelectedNavItem.classList.add('active');

}


const searchBtn = document.getElementById("search-button");
const searchTerm = document.getElementById("search-text");

searchBtn.addEventListener('click',()=>{
    const searchtext = searchTerm.value;
    if(!searchtext) return;

    fetchNews(searchtext);
    currentSelectedNavItem?.classList.remove("active");
    currentSelectedNavItem = null;
})