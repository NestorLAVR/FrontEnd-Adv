const input = document.querySelector('.search_input');
const search = document.querySelector('.search_button');
const searchBlock = document.querySelector('.searcher');
const resultBlock = document.querySelector('.results');
const back = document.querySelector('.back');
const wrap = document.querySelector('.wrap');

back.addEventListener('click', () => {
    input.value = "";  
    wrap.innerHTML = "";
    resultBlock.style.display = "none";
    searchBlock.style.display = "block";
})
search.addEventListener('click', () => {
    const query = input.value;
    if(query !== '') { 
        searchWikipedia(query)
        .then(res => {
            const htmlArticles = res.query.search.reduce((res, curr) => {
                let article = 
                    `<a class = "result" href = "https://en.wikipedia.org/?curid=${curr.pageid}">
                        <h2 class = "result_title">${curr.title}</h2>
                        <p class = "result_text">${curr.snippet}</p>
                    </a>`
                return res.concat(article);
            }, '')
            wrap.innerHTML = htmlArticles;
            searchBlock.style.display = "none";
            resultBlock.style.display = "block";
        })       
    }
})
async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
}