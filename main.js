const API_KEY = `ac0ee77ab7cb4975a4485d0265c3fc85`;

let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
    menu.addEventListener("click", (event) => getNewsByCategory(event))
);

//let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
let url = new URL(`https://newsapi-1.netlify.app/top-headlines?country=kr`)

let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5


const getNews = async () => {
    try {
        url.searchParams.set("page",page) // => &page=page
        url.searchParams.set("pageSize",pageSize) // => => &pageSize=pageSize
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
                if(data.articles.length ===0){
                    throw new Error("No results for this search")
                }
            newsList = data.articles;
            totalResults = data.totalResults
            render();
            paginationRender();
        } else {
            throw new Error(data.message)
        }
    } catch (error) {
        errorRender(error)
    }
};

const getLatestNews = async () => {
    //url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
    url = new URL(`https://newsapi-1.netlify.app/top-headlines?country=kr`);
    getNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    //url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`    );
    url = new URL(`https://newsapi-1.netlify.app/top-headlines?country=kr&category=${category}`);
    getNews();
};

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    //url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`    );
    url = new URL(`https://newsapi-1.netlify.app/top-headlines?q=${keyword}&country=kr`);
    getNews();
};

const render = () => {
    const newsHTML = newsList
        .map(
            (news) => `<div class ="row news">
    <div class="col-lg-4">
        <!-- <img class="news-img-size" src=${news.urlToImage}/> -->
        <img class="news-img-size" src=${news.urlToImage ? news.urlToImage : "img/no-image.png"} onerror="this.onerror=null; this.src='img/404.png';" alt="기사 이미지">
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

const paginationRender=()=>{
    //totalResult,
    //page
    //pageSize
    //groupSize
    //totalpages
    const totalPages = Math.ceil(totalResults/pageSize)
    //pageGroup
    const pageGroup = Math.ceil(page/groupSize)
    //lastPage
    let lastPage =pageGroup*groupSize
    //마지막 페이지 그룹이 그룹사이즈 보다 작다? lastpage = totalpage
    if(lastPage > totalPages){lastPage=totalPages}

    //firstPage
    const firstPage = lastPage - (groupSize -1) <=0? 1: lastPage - (groupSize -1)


    let paginationHTML=
        
        `
        <li class="page-item" onclick="moveToPage(1)"><a class="page-link"> |<< </a></li>
        <li class="page-item" onclick="moveToPage(${page-10})"><a class="page-link"> -10 </a></li>
        <li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link">Previous</a></li>
        `

    for(let i=firstPage;i<=lastPage;i++){
        paginationHTML+=`
        <li class="page-item ${i===page? "active":''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>
        `
    }
    paginationHTML+=`
        <li class="page-item" onclick="moveToPage(${page+1}, ${lastPage})"><a class="page-link">Next</a></li>
        <li class="page-item" onclick="moveToPage(${page+10}, ${lastPage})"><a class="page-link"> +10 </a></li>
        <li class="page-item" onclick="moveToPage(${lastPage})"><a class="page-link"> >>| </a></li>
        `

    document.querySelector(".pagination").innerHTML=paginationHTML

    // <nav aria-label="Page navigation example">
    //     <ul class="pagination">
    //         <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    //         <li class="page-item"><a class="page-link" href="#">1</a></li>
    //         <li class="page-item"><a class="page-link" href="#">2</a></li>
    //         <li class="page-item"><a class="page-link" href="#">3</a></li>
    //         <li class="page-item"><a class="page-link" href="#">Next</a></li>
    //     </ul>
    // </nav>
}

const moveToPage = (pageNum, condition) =>{
    
    if (pageNum<=0) {pageNum = 1}
    if (pageNum>condition) {pageNum=condition}
    console.log("movetopage", pageNum)
    page = pageNum
    getNews()
}

getLatestNews();
