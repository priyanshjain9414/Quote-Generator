const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const generateQuoteButton = document.getElementById("generate-quote");
const saveFavoriteButton = document.getElementById("save-favorite");
const categorySelect = document.getElementById("category-select");

// Fetch quote from API Ninja
async function fetchQuoteFromAPI(category) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      method: "GET",
      headers: {
        "X-Api-Key": "EMYTddSCboBxvQ5hiuTjjg==CSANQIhmpgdf37zV",  
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.length > 0) {
      displayQuote(data[0].quote, data[0].author);
    } else {
      displayQuote("No quotes found. Try again later.", "- Unknown");
    }
  } catch (error) {
    console.error("Failed to fetch quote", error);
    displayQuote("Error fetching quote. Try again later.", "- Unknown");
  }
}

// Display quote on the UI
function displayQuote(text, author) {
  quoteText.textContent = `"${text}"`;
  quoteAuthor.textContent = author ? `- ${author}` : "- Unknown";
}

// Save favorite quote (simple alert for demonstration)
function saveFavorite() {
  alert(`Saved: "${quoteText.textContent}" ${quoteAuthor.textContent}`);
}

// Event listener for generating a new quote
generateQuoteButton.addEventListener("click", () => {
  const selectedCategory = categorySelect.value;
  fetchQuoteFromAPI(selectedCategory);
});

saveFavoriteButton.addEventListener("click", saveFavorite);
