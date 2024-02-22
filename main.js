const API_KEY = `ac0ee77ab7cb4975a4485d0265c3fc85`

let newsList = []
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click", (event)=>getNewsByCategory(event)))

const getLatestNews = async ()=>{
    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const url = new URL(`https://newsapi-1.netlify.app/top-headlines?country=kr`);
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    render()
    console.log("ddd",newsList)
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    const url = new URL(`https://newsapi-1.netlify.app/top-headlines?country=kr&category=${category}`);
    const response = await fetch(url);  
    const data = await response.json();
    newsList = data.articles;
    render();
}

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    console.log("keyword", keyword)
    //const url = new URL(`https://newsapi.org/v2/top-headlines?q=${keyword}&country=us&apiKey=${API_KEY}`)
    const url = new URL(`https://newsapi-1.netlify.app/top-headlines?q=${keyword}&country=kr`);
    const response = await fetch(url);  
    const data = await response.json();
    console.log("keyword data", data);
    newsList = data.articles;
    render();
}
 
const render=()=>{
    const newsHTML = newsList.map(
        (news)=>`<div class ="row news">
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
    ).join('')

    document.getElementById("news-board").innerHTML=newsHTML
}

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

getLatestNews();

//1. 버튼들에 클릭 이벤트 주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기