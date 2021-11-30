const time = document.querySelector('.time');
const calendar  = document.querySelector('.date')


function showDate() {
    const date = new Date()
    const dateOpitons = {weekday: 'long', month: 'long', day: 'numeric'}

    if (settings.lang == 'ru') {
        currentDate = date.toLocaleDateString('ru-RU', dateOpitons).split(' ').map((v) => {
            if (v.length > 2) {
                return v[0].toUpperCase() + v.slice(1)
            } else {
                return v
            }
        }).join(' ')

        calendar.textContent = currentDate
        
    } else {
        currentDate = date.toLocaleDateString('en-US', dateOpitons)
        calendar.textContent = currentDate
    }
}

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();

    time.textContent = currentTime;
    
    showDate()
    setGreeting()

    setTimeout(showTime, 1000)
}

showTime()