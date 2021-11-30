import playList from './playlist.js'

const audio = new Audio()

const playerBlock = document.querySelector('.player')

const audioPlay = document.querySelector('.play')
const audioPrev = document.querySelector('.play-prev')
const audioNext = document.querySelector('.play-next')

const playListContainer = document.querySelector('.play-list')

const audioName = document.querySelector('.audio-name')
const audioProgress = document.querySelector('.audio-progress')
const audioDuration = document.querySelector('.duration')
const audioCurrentTime = document.querySelector('.current-time')

const soundBtn = document.querySelector('.sound');
const soundProgress = document.querySelector('.sound-progress');



let isPlay = false;
let playNum = 0

createPlayList()

const liButton = document.querySelectorAll('.li-btn')

function playMusic() {
    audioPlay.classList.toggle('pause')
    
    if (!audio.src) {
        audio.src = playList[playNum].src
        audioName.textContent = playList[playNum].title
        playListContainer.children[playNum].classList.add('item-active')
    }
    
    if (!isPlay) {
        audio.play()
        isPlay = true
    } else {
        document.querySelectorAll('.li-btn')[playNum].classList.remove('active')
        audio.pause()
        isPlay = false
    }
}

function playNext() {
    
    playListContainer.children[playNum].classList.remove('item-active')
    liButton[playNum].classList.remove('active')
    if (playNum == 3) {
        playNum = 0
    } else {
        ++playNum
    }
    playListContainer.children[playNum].classList.add('item-active')
    liButton[playNum].classList.add('active')

    
    audioName.textContent = playList[playNum].title
    audio.src = playList[playNum].src
    
    if(!isPlay) {
        audioPlay.classList.add('pause')
    }
    
    audio.play()
    isPlay = true  
}

function playPrev() {
    playListContainer.children[playNum].classList.remove('item-active')
    liButton[playNum].classList.remove('active')
    if (playNum == 0) {
        playNum = 3
    } else {
        --playNum
    }
    playListContainer.children[playNum].classList.add('item-active')
    
    audioName.textContent = playList[playNum].title
    audio.src = playList[playNum].src
    
    if(!isPlay) {
        audioPlay.classList.add('pause')
    }
    
    audio.play()
    isPlay = true
}

function createPlayList() {
    for (let i = 0; i < playList.length; i++) {
        const li = document.createElement('li')
        const liBtn = document.createElement('button')
        
        li.classList.add('play-item')
        liBtn.classList.add('li-btn')
        
        li.textContent = playList[i].title
        playListContainer.append(li)
        li.prepend(liBtn)
    }
}


audioPlay.addEventListener('click', playMusic)
audioPrev.addEventListener('click', playPrev)
audioNext.addEventListener('click', playNext)



audio.addEventListener('timeupdate', function() {
    
    if(audio.currentTime < 0.5) {
        audioProgress.value = 0
    } else {
        audioProgress.value = (audio.currentTime / audio.duration) * 100
    }
    
    let currentSeconds
    
    if (Math.floor(audio.currentTime % 60) < 10) {
        currentSeconds = `0${Math.floor(audio.currentTime % 60)}`
    } else {
        currentSeconds = Math.floor(audio.currentTime % 60)
    }
    
    audioCurrentTime.textContent = `${Math.floor(audio.currentTime / 60)}:${currentSeconds}`
    audioProgress.setAttribute('style', `background: linear-gradient(to right,rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) ${audioProgress.value}%, rgba(255, 255, 255, 0.5) ${audioProgress.value}%, rgba(255, 255, 255, 0.5) 100%);`)
    
    if (audio.ended) {
        playNext()
    }
})

audioProgress.addEventListener('input', function() {
    audio.currentTime = (audioProgress.value * audio.duration) / 100
    
    audioProgress.setAttribute('style', `background: linear-gradient(to right,rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) ${audioProgress.value}%, rgba(255, 255, 255, 0.5) ${audioProgress.value}%, rgba(255, 255, 255, 0.5) 100%);`)
})

audio.addEventListener('loadeddata', function() {
    let floorDuration = Math.floor(audio.duration)
    audioDuration.textContent = `${Math.floor(floorDuration / 60)}:${floorDuration % 60}`  
})

soundProgress.addEventListener('input', function() {
    audio.volume = soundProgress.value / 100
    soundProgress.setAttribute('style', `background: linear-gradient(to right,rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) ${soundProgress.value}%, rgba(255, 255, 255, 0.5) ${soundProgress.value}%, rgba(255, 255, 255, 0.5) 100%);`)
    
    if (audio.volume == 0) {
        soundBtn.classList.add('sound-off');
    } else {
        soundBtn.classList.remove('sound-off')
    }
})

soundBtn.addEventListener('click', function() {
    if (soundProgress.value == 0) {
        soundProgress.value = 50
        soundBtn.classList.remove('sound-off')
    } else {
        soundProgress.value = 0;
        soundBtn.classList.add('sound-off');
    }
    
    soundProgress.setAttribute('style', `background: linear-gradient(to right,rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) ${soundProgress.value}%, rgba(255, 255, 255, 0.5) ${soundProgress.value}%, rgba(255, 255, 255, 0.5) 100%);`)
    audio.volume = soundProgress.value / 100;
})



const playItems = document.querySelectorAll('.play-item')


for (let i = 0; i < liButton.length; i++) {
    liButton[i].addEventListener('click', function() {
        
        if (!isPlay && !audio.src) {
            playNum = i
        
            playMusic()
        } else if (playItems[i].classList.contains('item-active')) {
            playMusic()

        } else if (!isPlay && !playItems[i].classList.contains('item-active')) {

            for (let j = 0; j < liButton.length; j++) {
                liButton[j].classList.remove('active')
                playItems[j].classList.remove('item-active')
            }

            audio.src = playList[i].src
            audioName.textContent = playList[i].title
            liButton[i].classList.add('active')
            playItems[i].classList.add('item-active')
            playNum = i

            playMusic()

        } else if (isPlay && !playItems[i].classList.contains('item-active')) {

            for (let j = 0; j < liButton.length; j++) {
                liButton[j].classList.remove('active')
                playItems[j].classList.remove('item-active')
            }

            audio.src = playList[i].src
            audioName.textContent = playList[i].title
            liButton[i].classList.add('active')
            playItems[i].classList.add('item-active')
            playNum = i
            audioPlay.classList.add('pause')

            audio.play()
        }
    })
}


playerBlock.addEventListener('click', function() {
    for (let i = 0; i < playItems.length; i++) {
        if (playItems[i].classList.contains('item-active') && isPlay) {
            liButton[i].classList.add('active')
        }
    }
})