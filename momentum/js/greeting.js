const greeting = document.querySelector('.greeting')
const userName = document.querySelector('.name')

function getTimeOfDay() {
    const date = new Date()
    const hours = date.getHours()
    const period = ['night', 'morning', 'afternoon', 'evening']

    return period[Math.floor(hours/6)]
}

let timeOfDay = getTimeOfDay();


function setGreeting() {
    let greetingText

    if (settings.lang == 'en') {
        greetingText = `Good ${getTimeOfDay()}`

    } else {
        if (timeOfDay == 'night') {
            greetingText = 'Спокойной ночи'

        } else if (timeOfDay == 'morning') {
            greetingText = 'Доброе утро'

        } else if (timeOfDay == 'afternoon') {
            greetingText = 'Добрый день'

        } else {
            greetingText = 'Добрый вечер'
        }
    }

    greeting.textContent = greetingText
}

setGreeting()


function setLocalStorage() {

    localStorage.setItem('lang', settings.lang)
    localStorage.setItem('hiddenItems', settings.blocks)
    localStorage.setItem('picSource', settings.picSource)
    localStorage.setItem('picTags', settings.picTags)
    localStorage.setItem('name', userName.value);
    localStorage.setItem('city', city.value)
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {

    if(localStorage.getItem('lang')) {
        if (localStorage.getItem('lang') == 'ru') {
            setRuLang()
        }
    }

    if(localStorage.getItem('hiddenItems')) {
        settings.blocks = localStorage.getItem('hiddenItems').split(',')
        hideElem()
    }

    if(localStorage.getItem('picSource')){
        settings.picSource = localStorage.getItem('picSource')
        setSourceFromLocal()

        if(localStorage.getItem('picTags')) {
            settings.picTags = localStorage.getItem('picTags')

            if(settings.picTags == 'nature' || settings.picTags == 'city' || settings.picTags == 'modern') {
                setTagFromLocal()
            } else {
                setFlickrTagFromLocal()
            }
        }

        setBg()

    } else {
        settings.picSource = 'Github'
        setBg()
    }

    if(localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name');
    }

    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        getWeather();
    } else {
        if (localStorage.getItem('lang') == 'ru') {
            city.value = 'Минск';
        } else {
            city.value = 'Minsk'
        }
        
        getWeather();
    }

}

window.addEventListener('load', getLocalStorage)