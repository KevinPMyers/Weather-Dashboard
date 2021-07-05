var inputEl= document.getElementById("city-search");
var searchEl = document.getElementById("search-btn");
var nameEl = document.getElementById("city-display");
var api = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&appid=9796890990a8a96f5f4b6c8840d069b8";
var units = "&units=standard";
var clearSearch = document.getElementById("clear-history");
var historyEl = document.getElementById("search-history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);




function getWeather(inputEl) {
   var url = api + inputEl + apiKey + units;
   axios.get(url)
   .then(function(response){
       console.log(response);
   }) 
}

// function getData(data) {
//     nameEl = data
// }



searchEl.addEventListener("click", function() {
    var searchTerm = inputEl.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
})

clearSearch.addEventListener("click", function() {
    searchHistory = [];
    renderSearchHistory();
})

function renderSearchHistory() {
historyEl.innerHTML = "";
for (let i=0; i<searchHistory.length; i++) {
    var historyVal = document.createElement("input");
    
}
}
