// Get quotes from api
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
    
//SHOW LOADING
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//HIDE LOADING
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true; 
}

function newQuote() {
    loading();
    //get random quote so only 1 quote is generated from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //console.log(quote);
    //CHECK IF AUTHOR FIELD IS BLANK AND REPLACE WITH  UKNOWN
    if (!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //CHECK QUOTE LENGTH TO DETERMINE STYLING
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //SET QUOTE AND HIDE LOADER
    // authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
    complete();
}

    // allows you to attempt and complete fetch request
//GET QUOTES FUNCTION
async function getQuotes() {
loading();
const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl)
        //get response from API and pass it into apiQuotes array
        apiQuotes = await response.json();
        //console.log(apiQuotes[]);
        newQuote();
    } catch(error){
        //handle error here
    }
}

//TWITTER TWEET QUOTE
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//EVENT LISTENERS
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
//run gets quotes function
getQuotes();
//loading();
