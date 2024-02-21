const API_KEY = `ac0ee77ab7cb4975a4485d0265c3fc85`

let newsList = []

const getLatestNews = async ()=>{
    /* 여기는 noona newsAPI (API KEY 필요 없음)
    let q = ""
    let page = 1
    let pageSize = 20
    let category = "technology"
    const url = new URL(`https://newsapi-1.netlify.app/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}`);
    // 여기까지 noona news API */

    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    render()
    console.log("ddd",newsList)
};

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

getLatestNews();
