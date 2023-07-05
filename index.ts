const API_URL: string = "https://icanhazdadjoke.com/api"  //Es una variable de tipo string que almacena la URL de la API dadjokes.
const API_URL_ChuckNorris: string = "https://api.chucknorris.io/jokes/random"; //Es una variable de tipo string que amacena la URL de la API chucknorrisJokes.
const scoreButtons: HTMLElement | any = document.getElementById("scoreButtons")  // Es una variable de tipo HTMLElement (o cualquier tipo) que hace referencia a un elemento del DOM (Documento Object Model) con el id "scoreButtons".
const getJoke: HTMLElement |any = document.getElementById("nextJoke")
let counter: number = 0


function dadJoke() {
    fetch('https://icanhazdadjoke.com/', {   // Utiliza el método fetch() para realizar una solicitud HTTP GET a la URL "https://icanhazdadjoke.com/".
      headers: {                            //Se especifica un encabezado (header) con la clave 'Accept' y el valor 'application/json'. Esto indica al servidor que se espera recibir una respuesta en formato JSON.
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())  //Recibe la respuesta de la API y se llama al método response.json() para convertir la respuesta en formato JSON en un objeto JavaScript.
      .then(json => {
        document.getElementById("chiste")!.innerHTML = json.joke  //Recibe el objeto JavaScript (en este caso llamado json) que representa la respuesta de la API. Se utiliza document.getElementById("chiste") para obtener el elemento del DOM con el id "chiste", y se actualiza su contenido con el chiste obtenido de json.joke utilizando innerHTML
        scoreButtons.style.display = "block"  //  Muestra los botones de puntuación. Se refiere a un elemento del DOM.
      })
      .catch(error => console.log(error)) //Si ocurre algún error durante el proceso se captura en el .catch()  y se muestra el error en consola.
  }
  



  function chuckJoke() {
    fetch('https://api.chucknorris.io/jokes/random')  //Utiliza el método fetch() para realizar una solicitud HTTP GET a la URL "https://api.chucknorris.io/jokes/random".
      .then(response => response.json()) //Recibe la respuesta de la API y se llama al método response.json() para convertir la respuesta en formato JSON en un objeto JavaScript.
      .then(json => { // El .then recibe el objeto JavaScript (en este caso llamado json) que representa la respuesta de la API
        document.getElementById("chiste")!.innerHTML = json.value  //Se utiliza document.getElementById("chiste") para obtener el elemento del DOM con el id "chiste", y se actualiza su contenido con el chiste obtenido de json.value utilizando innerHTML.
        scoreButtons.style.display = "block" //Para mostrar los botones de puntuación 
      })
      .catch(error => console.log(error)) //Si ocurre algún error durante el proceso de solicitud, se captura en el .catch(), y se muestra el error en la consola utilizando console.log(error).
  }


getJoke.addEventListener('click',()=>{

  if (counter % 2 === 0){
    dadJoke()
  } else {chuckJoke()}

  if(counter === 0) {

    scoreButtons.style.display = "block"
  }



})
  
  
  

  interface Joke {  //Una interfaz en TypeScript se utiliza para definir la estructura o forma de un objeto. Actúa como un contrato que especifica qué propiedades y métodos debe tener un objeto.
    joke: string;
    score: number;
    date: string;
  }
  
  const reportJoke: Joke[] = []  //Es una array donde solo podran entrar datos conforme a la intefaz.
  
  function punctuation(number: number) {
    const joke: HTMLElement | any = document.getElementById('chiste')?.innerHTML //Se utiliza document.getElementById('chiste') para obtener el elemento del DOM con el id "chiste". El operador de encadenamiento opcional ?. se utiliza para verificar si existe un elemento con ese id. Si existe, se accede a la propiedad innerHTML para obtener el contenido del elemento, y se asigna a la constante joke. Si no existe un elemento con el id "chiste", joke se establecerá en undefined.
  
    reportJoke.forEach((item, index) => {
      if (item.joke === joke) {
        reportJoke.splice(index, 1)
      }
    })
  
    const score = number
    const date: string = new Date().toISOString() // El método to ISOString pasa a formato ISO el contenido de la clase Date.
    const scoredJoke = { joke, score, date }
    reportJoke.push(scoredJoke)
    console.log(reportJoke)
  }
  
  

  const API_URL_WEATHER: string = "http://api.weatherapi.com/v1"
  const weatherIcon: HTMLElement | any = document.getElementById("weatherIcon");
  const weatherInfo: HTMLElement | any = document.getElementById("weatherInfo");
  const API_KEY: string = '1c9c6cb101e7e4d9930b3d50a680e21a';
  
  function getWeather() {
    navigator.geolocation.getCurrentPosition((success) => {
      let { latitude, longitude } = success.coords;
  
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          let { temp } = data.main;
          weatherInfo.innerHTML = `${Math.trunc(temp)}ºC`;
          let icon = data.weather[0].icon;
          weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        })
    })
  }
  
  getWeather();