const API_KEY = `ac0ee77ab7cb4975a4485d0265c3fc85`

let news = []

const getLatestNews = async ()=>{
    // 여기는 noona newsAPI (API KEY 필요 없음)
    let q = ""
    let page = 1
    let pageSize = 20
    let category = "technology"
    const url = new URL(`http://https://newsapi-1.netlify.app?${category}&${page}&${pageSize}`);
    // 여기까지 noona news API

    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const response = await fetch(url)
    const data = await response.json()
    news = data.articles
    console.log("ddd",news)
};

getLatestNews();
