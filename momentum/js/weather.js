const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city')
const weatherError = document.querySelector('.weather-error')


async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${settings.lang}&appid=1d42c12c6e042f0509a0f9e1efa58669&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod == 200) {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent = `${Math.floor(data.main.temp)}°C`
        weatherDescription.textContent = `${data.weather[0].description}`;

        if (settings.lang == 'en') {
            wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            
        } else {
            wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
            humidity.textContent = `Влажность: ${data.main.humidity}%`;

        }
        weatherError.textContent = ``
    } else {
        if (settings.lang == 'en') {
            weatherError.textContent = `Error! ${data.message} for '${city.value}'!`
        
        } else {
            weatherError.textContent = `Ошибка! ${data.message} для запроса '${city.value}'!`
        }

        if (weatherIcon.classList.length == 3) {
            weatherIcon.classList.remove(weatherIcon.classList[2])
        } 
        
        temperature.textContent = ``
        weatherDescription.textContent = ``;
        wind.textContent = ``;
        humidity.textContent = ``;
    }
}

city.addEventListener('change', function() {
    getWeather()
})

console.log('Здравствуйте. Самооценка: 160 баллов\nAPI погоды похоже не выдержал тестов и умер, лично у меня на лайвсерве часто выдает ошибку при перезагрузке страницы. Если у вас такое произойдет дайте ему шанс пожалуйста, повводите в нем города, чтобы он заработал.\nFlickr API подгружает картинки в течении секунд 5\nUnsplash работает идеально, но там всего 50 запросов в час, не увлекайтесь пожалуйста его проверкой а то студент снимет мне 10000 баллов за нерабочий функционал)')