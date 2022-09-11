// // const url = "http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=5222ce258bd605b82baa0cba06eac015";
// // console.log(url);
// // async function loadData() {
// //     const URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=5222ce258bd605b82baa0cba06eac015`;
// //     const res = await fetch(`${URL}`);
// //     const data = await res.json();
// //     console.log(data);
// // }
// // loadData();
// fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=5222ce258bd605b82baa0cba06eac015`)
//     .then(response => response.json())
//     .then(data => console.log(data));

const searchBtn = document.getElementById('search-btn');
const weatherList = document.getElementById('weather');
const weatherDetailsContent = document.querySelector('.weather-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
let latitude = 0;
let longitude = 0;
var val;
var arr;
//event listeners
searchBtn.addEventListener('click',getweatherList);
weatherList.addEventListener('click',getweatherRecipe);
recipeCloseBtn.addEventListener('click',()=>{
    weatherDetailsContent.parentElement.classList.remove('showRecipe');
});
//get weather list that matches the searched ingridient

const app = document.querySelector('.weather-wrapper');
async function getweatherList(){
    
    let searchInputTxt = document.getElementById('search-input').value.trim();
    let html = "";
    // const secURL = "https://api.openweathermap.org/geo/1.0/direct?q=${searchInputTxt}&appid=5222ce258bd605b82baa0cba06eac015";
    await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchInputTxt}&appid=baa5170f101745868a30bd3d542b15a6`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.length);
            val = data.length;
            if(data[0] == null){
                weatherList.classList.add('notFound');
            }else{
            latitude = data[0].lat;
            longitude = data[0].lon;
            console.log(latitude);
            console.log(longitude);
            }
        });
 
    await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=5222ce258bd605b82baa0cba06eac015`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
        // console.log(data.list[0].components.co);
        // console.log(data.list[0].main.aqi);
        
        
        if(val == 1)
        {
            var aqi= data.list[0].main.aqi;
            html += `
                <div class="weather-item fadeInRight" id="centerBox">
                    <h3 class="title3">${searchInputTxt.toUpperCase()}</h3>
                    <h4 class = "title4">AQI: ${aqi}</h4>
                    <div class="weather-name">
                        <a href="#" onClick="getweatherRecipe()" class="recipe-btn">More Details</a>
                    </div>
                </div>
            `;
            app.style.backgroundImage = `url(./images${aqi}.avif)`;
            weatherList.classList.remove('notFound');
        }
        else{
            html += `
            <div class="weather-item fadeInRight" id="centerBox">
                <h2 class="title2">Sorry, the city you entered does not exist!</h2>
            </div>
            `;
            weatherList.classList.add('notFound');
        }
        weatherList.innerHTML = html;
    })
}

//get recipe of the weather
function getweatherRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let weatherItem = e.target.parentElement.parentElement;
        console.log(e.target.parentElement);
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=5222ce258bd605b82baa0cba06eac015`)
        .then(response => response.json())
        .then(data => weatherRecipeModal(data.list));
    }
}

//create a modal
function weatherRecipeModal(weather) {
    var eDiv = document.getElementById("centerBox");
    eDiv.parentNode.removeChild(eDiv);
    weather = weather[0];
    let html = `
           
           <h2 class="title5">Major Pollutants</h2>
           <div class="recipe-instruct"></div>
            
        <section class="section section-Left">
        <div class="paras">
        <h3>Carbon MonoOxide</h3>
         <p>
         ${weather.components.co}
         </p>
         <h3>Nitrogen MonoOxide</h3>
         <p>
         ${weather.components.no}
         </p>
         <h3>Ozone</h3>
         <p>
         ${weather.components.o3}
         </p>
         <h3>Nitrogen DiOxide</h3>
         <p>
         ${weather.components.no2}
         </p>
         <h3>Sulphur DiOxide</h3>
         <p>
         ${weather.components.so2}
         </p>
        </div>
        <div class="thumbnail">
            
        </div>
    </section>
                
    `;
                weatherDetailsContent.innerHTML = html;
                weatherDetailsContent.parentElement.classList.add('showRecipe');
}