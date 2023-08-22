// fetch quotes
let quotes

async function fetchQuotes() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        const quotesObj = await response.json()
        quotes = quotesObj['quotes']
        newQuote()
    } catch (error) {
        console.error(`Could not get quotes: ${error}`)
    }
}

fetchQuotes()

function newQuote() {
    // select tags
    const text = document.querySelector('#text')
    const authorTxt = document.querySelector('#author')

    // select quote
    const quotePair = quotes[Math.floor(Math.random() * quotes.length)]
    const quote = quotePair['quote']
    const author = quotePair['author']

    // change color
    function rndRGB() {
        return Math.floor(Math.random() * 256)
    }
    const color = `rgba(${rndRGB()}, ${rndRGB()}, ${rndRGB()}, 0.5)`

    const body = document.querySelector('body')
    const newQuoteBtn = document.querySelector('#new-quote')
    body.setAttribute('style', `background-color: ${color}`)
    newQuoteBtn.setAttribute('style', `background-color: ${color}`)

    // fade in and out
    if (text.textContent === '' && authorTxt.textContent === '') {
        fadeIn()
    } else {
        fadeOut()
        setTimeout(fadeIn, 1000)
    }

    function fadeIn() {
        text.textContent = `"${quote}"`
        authorTxt.textContent = `- ${author}`

        text.classList.remove('fadeOut')
        authorTxt.classList.remove('fadeOut')
        text.classList.add('fadeIn')
        authorTxt.classList.add('fadeIn')

        // change text color after fadeout
        const wrapper = document.querySelector('#wrapper')
        wrapper.setAttribute('style', `color: ${color}`)
    }

    function fadeOut() {
        text.classList.remove('fadeIn')
        authorTxt.classList.remove('fadeIn')
        text.classList.add('fadeOut')
        authorTxt.classList.add('fadeOut')
    }

    // tweet 
    const tweetBtn = document.querySelector('#tweet-quote')
    tweetBtn.setAttribute('href', `https://twitter.com/intent/tweet?text="${quote}" - ${author}`)


}

// add button 
const newQuoteBtn = document.querySelector('#new-quote')
newQuoteBtn.addEventListener('click', newQuote)