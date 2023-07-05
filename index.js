var API_URL = "https://icanhazdadjoke.com/api"; //Es una variable de tipo string que almacena la URL de la API dadjokes.
var API_URL_ChuckNorris = "https://api.chucknorris.io/jokes/random"; //Es una variable de tipo string que amacena la URL de la API chucknorrisJokes.
var scoreButtons = document.getElementById("scoreButtons"); // Es una variable de tipo HTMLElement (o cualquier tipo) que hace referencia a un elemento del DOM (Documento Object Model) con el id "scoreButtons".
var getJoke = document.getElementById("nextJoke");
var counter = 0;
function dadJoke() {
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (response) { return response.json(); }) //Recibe la respuesta de la API y se llama al método response.json() para convertir la respuesta en formato JSON en un objeto JavaScript.
        .then(function (json) {
        document.getElementById("chiste").innerHTML = json.joke; //Recibe el objeto JavaScript (en este caso llamado json) que representa la respuesta de la API. Se utiliza document.getElementById("chiste") para obtener el elemento del DOM con el id "chiste", y se actualiza su contenido con el chiste obtenido de json.joke utilizando innerHTML
        scoreButtons.style.display = "block"; //  Muestra los botones de puntuación. Se refiere a un elemento del DOM.
    })
        .catch(function (error) { return console.log(error); }); //Si ocurre algún error durante el proceso se captura en el .catch()  y se muestra el error en consola.
}
function chuckJoke() {
    fetch('https://api.chucknorris.io/jokes/random') //Utiliza el método fetch() para realizar una solicitud HTTP GET a la URL "https://api.chucknorris.io/jokes/random".
        .then(function (response) { return response.json(); }) //Recibe la respuesta de la API y se llama al método response.json() para convertir la respuesta en formato JSON en un objeto JavaScript.
        .then(function (json) {
        document.getElementById("chiste").innerHTML = json.value; //Se utiliza document.getElementById("chiste") para obtener el elemento del DOM con el id "chiste", y se actualiza su contenido con el chiste obtenido de json.value utilizando innerHTML.
        scoreButtons.style.display = "block"; //Para mostrar los botones de puntuación 
    })
        .catch(function (error) { return console.log(error); }); //Si ocurre algún error durante el proceso de solicitud, se captura en el .catch(), y se muestra el error en la consola utilizando console.log(error).
}
getJoke.addEventListener('click', function () {
    if (counter % 2 === 0) {
        dadJoke();
    }
    else {
        chuckJoke();
    }
    if (counter === 0) {
        scoreButtons.style.display = "block";
    }
});
var reportJoke = []; //Es una array donde solo podran entrar datos conforme a la intefaz.
function punctuation(number) {
    var _a;
    var joke = (_a = document.getElementById('chiste')) === null || _a === void 0 ? void 0 : _a.innerHTML; //Se utiliza document.getElementById('chiste') para obtener el elemento del DOM con el id "chiste". El operador de encadenamiento opcional ?. se utiliza para verificar si existe un elemento con ese id. Si existe, se accede a la propiedad innerHTML para obtener el contenido del elemento, y se asigna a la constante joke. Si no existe un elemento con el id "chiste", joke se establecerá en undefined.
    reportJoke.forEach(function (item, index) {
        if (item.joke === joke) {
            reportJoke.splice(index, 1);
        }
    });
    var score = number;
    var date = new Date().toISOString(); // El método to ISOString pasa a formato ISO el contenido de la clase Date.
    var scoredJoke = { joke: joke, score: score, date: date };
    reportJoke.push(scoredJoke);
    console.log(reportJoke);
}
var API_URL_WEATHER = "http://api.weatherapi.com/v1";
var weatherIcon = document.getElementById("weatherIcon");
var weatherInfo = document.getElementById("weatherInfo");
var API_KEY = '1c9c6cb101e7e4d9930b3d50a680e21a';
function getWeather() {
    navigator.geolocation.getCurrentPosition(function (success) {
        var _a = success.coords, latitude = _a.latitude, longitude = _a.longitude;
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(latitude, "&lon=").concat(longitude, "&units=metric&appid=").concat(API_KEY))
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var temp = data.main.temp;
            weatherInfo.innerHTML = "".concat(Math.trunc(temp), "\u00BAC");
            var icon = data.weather[0].icon;
            weatherIcon.src = "http://openweathermap.org/img/wn/".concat(icon, "@2x.png");
        });
    });
}
getWeather();
