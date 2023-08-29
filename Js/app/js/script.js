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
    const textTag = $('#text')
    const authorTag = $('#author')
    function fadeIn() {
        textTag.text(`"${quote}"`).toggleClass('fadeOut').css('color', color)
        authorTag.text(`- ${author}`).toggleClass('fadeOut').css('color', color)
    }
    function fadeOut() {
        textTag.toggleClass('fadeOut')
        authorTag.toggleClass('fadeOut')
    }
    if (textTag.text() === '' && authorTag.text() === '') {
        fadeIn()
    } else {
        fadeOut()
        setTimeout(fadeIn, 1000)
    }
    $('body').css('background-color', color)
    $('#new-quote').css('background-color', color)
    // change tweek link
    $('#tweet-quote').attr('href', `https://twitter.com/intent/tweet?text="${quote}" - ${author}`)
}

// add button 
$('#new-quote').click(() => { newQuote() }) 