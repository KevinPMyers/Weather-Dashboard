var inputEl= document.getElementById("city-search");
var searchEl = document.getElementById("search-btn");
var nameEl = document.getElementById("city-display");
var api = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&appid=9796890990a8a96f5f4b6c8840d069b8";
var units = "&units=imperial";
var cityIcon = document.getElementById("city-pic");
var temperature = document.getElementById("temp-display");
var wind = document.getElementById("wind-display");
var humidity = document.getElementById("humid-display");
var UV = document.getElementById("uv-display");
var clearSearch = document.getElementById("clear-history");
var historyEl = document.getElementById("search-history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);




function getWeather(inputEl) {
   var url = api + inputEl + apiKey + units;
   axios.get(url)
   .then(function(response){
       console.log(response);
// parse to display forecast
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
       var todayDate = new Date(response.data.dt*1000);
       console.log(todayDate);
       var day = todayDate.getDate();
       var month = todayDate.getMonth() + 1;
       var year = todayDate.getFullYear();
       nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
    //    Fetch and display current weather data
       var weatherPic = response.data.weather[0].icon
       cityIcon.setAttribute("src", "https://openweathermap.org/img/w/" + weatherPic + ".png");
       temperature.innerHTML = "Temperature: " + (response.data.main.temp) + "&#176F";
       wind.innerHTML = "Wind: " + (response.data.wind.speed) + "MPH";
       humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
       var lat = response.data.coord.lat;
       var long = response.data.coord.lat;
    // var uvUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + long + "appid=" + apiKey;
    //     axios.get(uvUrl).then(function(response){
    //         var uvIndex = document.createElement("span");
    //         uvIndex.setAttribute("class", "badge badge-danger");
    //         uvIndex.innerHTML = response.data[0].value;
    //         UV.innerHTML = "UV Index: ";
    //         UV.append(uvIndex);
    //     });
        
    })

    axios.get("https://api.openweathermap.org/data/2.5/forecast?q=" +inputEl + apiKey + units)
    .then(function(response){
        // console.log(response)
        console.log(response.data.list)

        var filteredArr = response.data.list.filter(index => index.dt_txt.includes("15:00:00"))
        console.log(filteredArr)
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
    renderSearchHistory(localStorage.clear);
    ;
})

function renderSearchHistory() {
historyEl.innerHTML = "";
for (let i=0; i<searchHistory.length; i++) {
    var historyVal = document.createElement("input");

    historyVal.setAttribute("type", "text");
    historyVal.setAttribute("readonly", true);
    historyVal.setAttribute("class", "form-control d-block bg-white");
    historyVal.setAttribute("value", searchHistory[i]);
    historyVal.addEventListener("click", function() {
        getWeather(historyVal.value);
    })
    historyEl.append(historyVal);
}
}

renderSearchHistory();
if (searchHistory.length > 0) {
    getWeather(searchHistory[searchHistory.length - 1]);
}
