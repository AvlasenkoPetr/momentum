const slideNext = document.querySelector('.slide-next') 
const slidePrev = document.querySelector('.slide-prev') 
let randomNum = getRandomNum();

function getRandomNum() {
    return Math.ceil(Math.random() * 20)
}

function setBg() {
    
    // console.log('Выбран источник: ', settings.picSource)
    
    if (settings.picSource == 'Github') {  
        if (String(randomNum).length == 1) {
            randomNum = String(randomNum).padStart(2, '0')
        }
        
        const img = new Image();       
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg` 
        img.onload = () => {
            document.body.style.backgroundImage = `url('${img.src}')`
        }

    } else if (settings.picSource == 'Unsplash') {

        setUnplashBg()
        
    } else if (settings.picSource == 'Flickr') {

        setFlickrBg()

    }
}

function checkUrl(value) {
    // console.log('Проверяем url')
    if (!value.photos.photo[randomNum].url_l) {
        // console.log('Нет ссылки, меняем номер')
        ++randomNum
        checkUrl(value)
    } else {
        // console.log('Ссылка есть, проверка окончена')
        return
    }
}

let flickrLink

async function setFlickrBg() {  
    let url

    randomNum = getRandomNum() 
    
    for (let i = 0; i < flickrTags.children.length; i++) {
        if (flickrTags.children[i].classList.contains('active')) {
            settings.picTags = flickrTags.children[i].id
        }
    }

    // console.log('Установлен тег:', settings.picTags)

    if (!settings.picTags || settings.picTags == 'day') {
        url = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=217f5556520c483eea8e5a7b5c276674&gallery_id=185139453@N07-72157720111881805&extras=url_l&format=json&nojsoncallback=1';
    } else {
        url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=217f5556520c483eea8e5a7b5c276674&gallery_id=185139453@N07-72157720062587146&extras=url_l&format=json&nojsoncallback=1`
    }

    const res = await fetch(url);
    const data = await res.json();

    // console.log('Рандом номер:', randomNum)

    checkUrl(data)

    flickrLink = data
    
    // console.log('Объект:', data)
    // console.log('Ссылка:', url)

    // console.log('Flickr ссылка создана: ', data.photos.photo[randomNum].url_l)
    
    const img = new Image();
    img.src = data.photos.photo[randomNum].url_l
    img.onload = () => {
        document.body.style.backgroundImage = `url('${img.src}')`
    }
     
}

async function setUnplashBg() {   

        let url

        if (settings.picTags == 'night' || settings.picTags == 'day') {
            settings.picTags = ''
        }
        
        for (let i = 0; i < unsplashTags.children.length; i++) {
            if (unsplashTags.children[i].classList.contains('active')) {
                settings.picTags = unsplashTags.children[i].id
            }
        }

        console.log('Выбран тег: ', settings.picTags)

        if (!settings.picTags) {
            url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=&client_id=1_5GoYQPSFRMEDWehCtnROPAKVEZPUlZjbWB3STy6Ds';
        } else {
            url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${settings.picTags}&client_id=1_5GoYQPSFRMEDWehCtnROPAKVEZPUlZjbWB3STy6Ds`
        }
   
        const res = await fetch(url);
        const data = await res.json();
            
        const img = new Image();
        img.src = data.urls.regular
        img.onload = () => {
            document.body.style.backgroundImage = `url('${img.src}')`
        }
}

function getSlidePrev() {
    randomNum == 1? randomNum = 20: --randomNum

    if (settings.picSource == 'Flickr') {
        const img = new Image();

        img.src = flickrLink.photos.photo[randomNum].url_l
        img.onload = () => {
            document.body.style.backgroundImage = `url('${img.src}')`
        }
    } else {
        setBg()
    }
}

function getSlideNext() {
    randomNum == 20? randomNum = 1: ++randomNum 

    if (settings.picSource == 'Flickr') {
        const img = new Image();

        img.src = flickrLink.photos.photo[randomNum].url_l
        img.onload = () => {
            document.body.style.backgroundImage = `url('${img.src}')`
        }

    } else {
        setBg()
    }
}

slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)