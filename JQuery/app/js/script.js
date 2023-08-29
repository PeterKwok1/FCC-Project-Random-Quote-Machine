// fetch quotes
let quotes
async function fetchQuotes() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        const obj = await response.json()
        quotes = obj['quotes']
        newQuote()
    } catch (error) {
        console.error(`Could not get quotes: ${error}`)
    }
}
fetchQuotes()

function newQuote() {
    // select quote
    const quotePair = quotes[Math.floor(Math.random() * quotes.length)]
    const quote = quotePair['quote']
    const author = quotePair['author']

    // select color
    function rndRGB() {
        return Math.floor(Math.random() * 192)
    }
    const color = `rgba(${rndRGB()}, ${rndRGB()}, ${rndRGB()}, 0.75)`

    // fade quote and change color 
    const textTag = document.querySelector('#text')
    const authorTag = document.querySelector('#author')
    function fadeIn() {
        textTag.textContent = `"${quote}"`
        authorTag.textContent = `- ${author}`
        textTag.classList.toggle('fadeOut')
        authorTag.classList.toggle('fadeOut')
        // change text color after fadeout
        textTag.setAttribute('style', `color: ${color}`)
        authorTag.setAttribute('style', `color: ${color}`)
    }
    function fadeOut() {
        textTag.classList.toggle('fadeOut')
        authorTag.classList.toggle('fadeOut')
    }
    if (textTag.textContent === '' && authorTag.textContent === '') {
        fadeIn()
    } else {
        fadeOut()
        setTimeout(fadeIn, 1000)
    }
    const body = document.querySelector('body')
    const newQuoteBtn = document.querySelector('#new-quote')
    body.setAttribute('style', `background-color: ${color}`)
    newQuoteBtn.setAttribute('style', `background-color: ${color}`)
    // change tweek link
    const tweetBtn = document.querySelector('#tweet-quote')
    tweetBtn.setAttribute('href', `https://twitter.com/intent/tweet?text="${quote}" - ${author}`)
}

// add button 
const newQuoteBtn = document.querySelector('#new-quote')
newQuoteBtn.addEventListener('click', newQuote)