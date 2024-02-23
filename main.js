const API_KEY = `ac0ee77ab7cb4975a4485d0265c3fc85`;

let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
    menu.addEventListener("click", (event) => getNewsByCategory(event))
);

let url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
);
// let url = new URL(`https://newsapi-1.netlify.app/top-headlines?country=kr`)

const getNews = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
                if(data.articles.length ===0){
                    throw new Error("No results for this search")
                }
            newsList = data.articles;
            render();
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        errorRender(error)
    }
};

const getLatestNews = async () => {
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    //url = new URL(`https://newsapi-1.netlify.app/top-headlines?country=kr`);
    getNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    //url = new URL(`https://newsapi-1.netlify.app/top-headlines?country=kr&category=${category}`);
    getNews();
};

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
    );
    // url = new URL(`https://newsapi-1.netlify.app/top-headlines?q=${keyword}&country=kr`);
    getNews();
};

const render = () => {
    const newsHTML = newsList
        .map(
            (news) => `<div class ="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src=${news.urlToImage}/>
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
        <div>
            ${news.source.name} * ${news.publishedAt}
        </div>
    </div>
</div>`
        )
        .join("");

    document.getElementById("news-board").innerHTML = newsHTML;
};

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};

const errorRender = (error)=>{
    const errorHTML = `<div class="alert alert-danger" role="alert">
  ${error.message}
</div>`

document.getElementById("news-board").innerHTML=errorHTML
}

getLatestNews();
