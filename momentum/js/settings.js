const settingsBtn = document.querySelector('.settings-btn');
const settingsContainer = document.querySelector('.settings')

const langH1 = document.querySelector('.sett-lang')
const sourceH1 = document.querySelector('.sett-img')
const hideH1 = document.querySelector('.sett-hide')

const sourceUl = document.querySelector('.img-source-ul')
const tagContainer = document.querySelector('.tags-container')
const unsplashTags = document.querySelector('.unsplash-tags')
const flickrTags = document.querySelector('.flickr-tags')

const hideUl = document.querySelector('.hide-ul')

settingsBtn.addEventListener('click', function() {
    settingsBtn.classList.toggle('active')
    settingsContainer.classList.toggle('active')
})

const settings = {
    lang: 'en',
    picSource: 'Github',
    picTags: '',
    blocks: [],
}

for (let i = 0; i < hideUl.children.length; i++) {
    hideUl.children[i].addEventListener('click', function() {
        hideUl.children[i].classList.toggle('active')

        if (hideUl.children[i].classList.contains('active')) {
            settings.blocks.push(hideUl.children[i].id)
            hideElem()
            
        } else {
            let elem
            settings.blocks = settings.blocks.filter((e) => {
                if (e != hideUl.children[i].id) {
                    return e
                } else {
                    elem = e
                }
            })
            
            document.querySelector(`.${elem}`).classList.remove('hidden')
        }
    })
}

function hideElem() {
    for (let i = 0; i < settings.blocks.length; i++) {
        document.querySelector(`#${settings.blocks[i]}`).classList.add('active')
        document.querySelector(`.${settings.blocks[i]}`).classList.add('hidden')
    }
}

const langToggleBtns = document.querySelectorAll('.lang')
const turnEn = langToggleBtns[0]
const turnRu = langToggleBtns[1]

turnRu.addEventListener('click', setRuLang)

turnEn.addEventListener('click', function() {
    if (!turnEn.classList.contains('active')) {
        turnRu.classList.remove('active')
        turnEn.classList.add('active')
    }

    settings.lang = 'en'
    setGreeting()
    getWeather()
    showDate()
    setQuote()

    city.setAttribute('placeholder', '[Enter city]')
    userName.setAttribute('placeholder', '[Enter name]')
    todoInput.setAttribute('placeholder', '[Enter task]')

    turnRu.textContent = 'RU'
    turnEn.textContent = 'EN'
    langH1.textContent = 'Language'
    sourceH1.textContent = 'Picture sources'
    hideH1.textContent = 'Hide elements'
    city.value = 'Minsk'

    hideUl.children[0].textContent = 'Time'
    hideUl.children[1].textContent = 'Date'
    hideUl.children[2].textContent = 'Greeting'
    hideUl.children[3].textContent = 'Quotes'
    hideUl.children[4].textContent = 'Weather'
    hideUl.children[5].textContent = 'Audio'
    hideUl.children[6].textContent = 'Todo List'

    unsplashTags.children[0].textContent = 'nature'
    unsplashTags.children[1].textContent = 'city'
    unsplashTags.children[2].textContent = 'modern'

    flickrTags.children[0].textContent = 'day'
    flickrTags.children[1].textContent = 'night'
})

sourceUl.addEventListener('click', setSource)

function setSource(e) {
    for (let i = 0; i < sourceUl.children.length; i++) {
        if (!e.target.classList.contains('active') && e.target.classList.contains('img-source')) {
            for (let i = 0; i < sourceUl.children.length; i++) {
                sourceUl.children[i].classList.remove('active')
            }
            sourceUl.children[i].classList.add('active')
            settings.picSource = e.target.textContent
    
            if (e.target.textContent == 'Github') {
                tagContainer.classList.remove('active')
            } else {
                tagContainer.classList.add('active')
                
                if (sourceUl.children[i].textContent == 'Unsplash') {
                    unsplashTags.classList.add('active') 
                    flickrTags.classList.remove('active')   
                } else {
                    flickrTags.classList.add('active')   
                    unsplashTags.classList.remove('active')  
                }
            }
            
            setBg()
        }

    }
}

function setSourceFromLocal() {
    for (let i = 0; i < sourceUl.children.length; i++) {
        sourceUl.children[i].classList.remove('active')

        if (sourceUl.children[i].textContent == settings.picSource) {
            sourceUl.children[i].classList.add('active')

            if (sourceUl.children[i].textContent == 'Github') {
                tagContainer.classList.remove('active')
            } else {
                tagContainer.classList.add('active') 

                if (sourceUl.children[i].textContent == 'Unsplash') {
                    unsplashTags.classList.add('active')  
                    flickrTags.classList.remove('active')     
                } else {
                    flickrTags.classList.add('active')
                    unsplashTags.classList.remove('active') 
                }
            }
        }
    }
}

function setTagFromLocal() {
    for (let i = 0; i < unsplashTags.children.length; i++) {
        unsplashTags.children[i].classList.remove('active')

        if (unsplashTags.children[i].id == settings.picTags) {
            unsplashTags.children[i].classList.add('active')
        }
    }

}

function setFlickrTagFromLocal() {
    for (let i = 0; i < flickrTags.children.length; i++) {
        flickrTags.children[i].classList.remove('active')

        if (flickrTags.children[i].id == settings.picTags) {
            flickrTags.children[i].classList.add('active')
        }
    }

}

unsplashTags.addEventListener('click', function(e) {
    for (let i = 0; i < unsplashTags.children.length; i++) {
        (console.log('Клик по: ', e.target))

        if (e.target.classList.contains('tag') && !e.target.classList.contains('active')) {

            for (let j = 0; j < unsplashTags.children.length; j++) {
                unsplashTags.children[j].classList.remove('active')
            }

            
            unsplashTags.children[i].classList.add('active')
            settings.picTags = e.target.id

            if (unsplashTags.children[i].id != e.target.id) {
                console.log('Скип цикл')
                continue
            }
            
            setBg()
        }
    }
})

flickrTags.addEventListener('click', function(e) {
    for (let i = 0; i < flickrTags.children.length; i++) {
        if (e.target.classList.contains('tag') && !e.target.classList.contains('active')) {

            for (let j = 0; j < flickrTags.children.length; j++) {
                flickrTags.children[j].classList.remove('active')
            }

            flickrTags.children[i].classList.add('active')
            settings.picTags = e.target.id

            if (flickrTags.children[i].id != e.target.id) {
                console.log('Скип цикл')
                continue
            }

            setBg()
        }
    }
})

function setRuLang() {
    if (!turnRu.classList.contains('active')) {
        turnEn.classList.remove('active')
        turnRu.classList.add('active')

        settings.lang = 'ru'
        setGreeting()
        getWeather()
        showDate()
        setQuote()

        city.setAttribute('placeholder', '[Введите город]')
        userName.setAttribute('placeholder', '[Введите имя]')
        todoInput.setAttribute('placeholder', '[Введите заметку]')

        turnRu.textContent = 'РУС'
        turnEn.textContent = 'АНГЛ'
        langH1.textContent = 'Язык'
        sourceH1.textContent = 'Источники изображений'
        hideH1.textContent = 'Скрыть элементы'
        city.value = 'Минск'

        hideUl.children[0].textContent = 'Время'
        hideUl.children[1].textContent = 'Дата'
        hideUl.children[2].textContent = 'Приветствие'
        hideUl.children[3].textContent = 'Цитаты'
        hideUl.children[4].textContent = 'Погода'
        hideUl.children[5].textContent = 'Аудио'
        hideUl.children[6].textContent = 'Список дел'

        unsplashTags.children[0].textContent = 'природа'
        unsplashTags.children[1].textContent = 'город'
        unsplashTags.children[2].textContent = 'модерн'
        
        flickrTags.children[0].textContent = 'день'
        flickrTags.children[1].textContent = 'ночь'
    }
}