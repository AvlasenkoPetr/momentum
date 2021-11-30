const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

async function setQuote() {
    let quotes_json

    if (settings.lang == 'en') {
        quotes_json = 'quotes.json'
    } else {
        quotes_json = 'quotes-ru.json'
    } 

    const res = await fetch(quotes_json);
    const data = await res.json(); 

    let randomQuote

    if (settings.lang == 'en') {
        randomQuote = Math.ceil(Math.random() * 102)
    } else {
        randomQuote = Math.ceil(Math.random() * 60)
    }
    
    if (settings.lang == 'en') {
        author.textContent = data.quotes[randomQuote].author
        quote.textContent = `"${data.quotes[randomQuote].quote}"`
    } else {
        author.textContent = data.quotes[randomQuote].author
        quote.textContent = `"${data.quotes[randomQuote].text}"`
    }
}

changeQuote.addEventListener('click', setQuote)

setQuote()