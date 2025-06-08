// Get the search bar input element by its ID
const searchBar = document.getElementById('searchBar');

// Get the dropdown container element by its ID
const dropdown = document.getElementById('dropdown');
const searchButton = document.getElementById('searchButton');
// Load search history from localStorage (if available), otherwise use an empty array
// This allows the search history to persist across page reloads
// and browser sessions, making it more user-friendly.
// If no history exists, initialize it as an empty array
// This is useful for maintaining a record of past searches.
// JSON (JavaScript Object Notation) is a lightweight data interchange format.
// It is easy for humans to read and write, and easy for machines to parse and generate.
// JSON is often used to store and exchange data between a server and a web application.
// It is a text format that is completely language independent but uses conventions that are familiar to programmers of the C family of languages, which includes C, C++, C#, Java, JavaScript, Perl, Python, and many others.
// JSON is often used to serialize and transmit structured data over a network connection.
// It is commonly used in web applications to send data from a server to a client and vice versa.

// A common use of JSON is to exchange data to/from a web server.

// When receiving data from a web server, the data is always a string.

// Parse the data with JSON.parse(), and the data becomes a JavaScript object.
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Function to save the current search history array to localStorage
// This function converts the search history array to a JSON string
// and stores it in localStorage under the key 'searchHistory'.
// This allows the search history to be retrieved later, even after the browser is closed.
// This is useful for maintaining a record of past searches.  
const saveSearchHistory = () => {
  // Convert the search history array to a JSON string
  // and store it in localStorage under the key 'searchHistory'.
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
};

// Variable to track which dropdown option is currently selected (for arrow navigation)
// This variable is used to keep track of the currently highlighted option in the dropdown.
// It starts at -1, meaning no option is selected initially.
let selectedIndex = -1;

// Function to update and show the dropdown based on the current query
// This function filters the search history based on the user's input
// and updates the dropdown with matching items.
const updateDropdown = (query) => {
  // Clear any existing dropdown options
  dropdown.innerHTML = '';

  // Filter the search history to only include items that match the query
  const filteredHistory = searchHistory.filter(item =>
    item.toLowerCase().includes(query) // Case-insensitive search
  );

  // For each matching item in the history
  filteredHistory.forEach((item, index) => {
    // Create a new div element to represent this suggestion
    const option = document.createElement('div');
    //option.style.cursor = 'pointer'; // Change cursor to pointer for better UX
    //option.style.padding = '8px'; // Add padding for better spacing
    //option.style.borderBottom = '1px solid #ccc'; // Add a border for separation
    //option.style.backgroundColor = index === selectedIndex ? '#eee' : ''; // Highlight if selected
    //option.style.transition = 'background-color 0.2s'; // Smooth transition for background color
    //option.style.fontSize = '14px'; // Set font size for readability
    //option.style.color = 'green'; // Set text color for better contrast
    //option.style.whiteSpace = 'nowrap'; // Prevent text wrapping
    //option.style.overflow = 'hidden'; // Hide overflow text
    //option.style.textOverflow = 'ellipsis'; // Add ellipsis for overflow text
    //option.style.maxWidth = '300px'; // Set a maximum width for the dropdown options
   
    // Set the text content to the history item
    option.textContent = item;

    // When a user clicks this option, populate it into the search bar
    option.addEventListener('click', () => {
      searchBar.value = item;          // Set input value to selected item
      dropdown.style.display = 'none'; // Hide the dropdown
    });

    // Add the option to the dropdown
    dropdown.appendChild(option);
  });

  // Show the dropdown if there are matching results; otherwise hide it
  dropdown.style.display = filteredHistory.length ? 'block' : 'none';
};

// Event listener for user typing in the search bar
searchBar.addEventListener('input', () => {
  // Get the current input value in lowercase
  const query = searchBar.value.toLowerCase();

  // Reset selection index when typing
  selectedIndex = -1;

  // If there is a query, show matching dropdown options
  if (query) {
    updateDropdown(query);
  } else {
    // If empty, hide the dropdown
    dropdown.style.display = 'none';
  }
});




// Event listener for key presses inside the search bar
searchBar.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    const options = dropdown.querySelectorAll('div');
    if (options.length > 0) {
      selectedIndex = (selectedIndex + 1) % options.length;
      highlightOption(options);
      scrollActiveOptionIntoView(); // <-- Add this line
    }
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    const options = dropdown.querySelectorAll('div');
    if (options.length > 0) {
      selectedIndex = (selectedIndex - 1 + options.length) % options.length;
      highlightOption(options);
      scrollActiveOptionIntoView(); // <-- Add this line
    }
    e.preventDefault();
  } else if (e.key === 'Enter') {
    e.preventDefault(); // Prevent form submission or new line

    // Get the input value, trimmed of whitespace
    let value = searchBar.value.trim();

    // If an item is selected from dropdown, use that instead of typed input
    if (selectedIndex >= 0 && options[selectedIndex]) {
      value = options[selectedIndex].textContent;
      searchBar.value = value;
    } //else {
      // If no selection, use the current input value
      //value = searchBar.value.trim();
    //}

    // If the value is non-empty and not already in history
    if (value && !searchHistory.includes(value)) {
      searchHistory.push(value); // Add to history

      // Limit history to the most recent 10 items
      if (searchHistory.length > 100) {
        searchHistory.shift(); // Remove the oldest item
      }

      saveSearchHistory(); // Save updated history
    }

    // Clear the input field and hide the dropdown
    //searchBar.value = '';
    dropdown.style.display = 'none';
    selectedIndex = -1; // Reset selection
  }

  // If any other key is pressed, reset the selection index
  else {
    selectedIndex = -1;
  }
});

// Function to visually highlight the currently selected option
function highlightOption(options) {
  options.forEach((opt, index) => {
    // Highlight the selected option, un-highlight others
    opt.style.backgroundColor = index === selectedIndex ? '#eee' : '';
  });
}
// if the button is clicked, it will search for the input value


function myFunction() {
  // Get the input value, trimmed of whitespace
  let value = searchBar.value.trim();

  // If an item is selected from dropdown, use that instead of typed input
  if (selectedIndex >= 0 && dropdown.querySelectorAll('div')[selectedIndex]) {
    value = dropdown.querySelectorAll('div')[selectedIndex].textContent;
    searchBar.value = value;
  }

  // If the value is non-empty and not already in history
  if (value && !searchHistory.includes(value)) {
    searchHistory.push(value); // Add to history

    // Limit history to the most recent 10 items
    if (searchHistory.length > 10) {
      searchHistory.shift(); // Remove the oldest item
    }

    saveSearchHistory(); // Save updated history
    
  }
  if(value == "math"){
      window.location.href = "math.html"; // Redirect to math page

    }
    if (value) {
      // You can customize categories as needed
      let categories = [];
      if (value.toLowerCase() === "math") {
        categories = ["Algebra", "Geometry", "Calculus", "Statistics"];
      } else {
        categories = ["General"];
      }

      fetch('/create-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `title=${encodeURIComponent(value)}&categories=${encodeURIComponent(categories.join(','))}`
      })
      .then(response => {
        if (response.redirected) {
          window.location.href = response.url;
        }
      });
      return; // Prevent further code execution
    }

  // Clear the input field and hide the dropdown
  searchBar.value = '';
  dropdown.style.display = 'none';
  selectedIndex = -1; // Reset selection
}
// Event listener for clicks anywhere in the document
document.addEventListener('click', (e) => {
  // If the click is outside both the dropdown and the search bar, hide the dropdown
  if (!e.target.closest('#dropdown') && e.target !== searchBar) {
    dropdown.style.display = 'none';
  }
});

searchButton.addEventListener("click", myFunction);

clearSuggestionsButton.addEventListener("click", () => {

  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  dropdown.innerHTML = ''; // Clear the dropdown display
  dropdown.style.display = 'none'; // Hide the dropdown
  searchBar.value = ''; // Clear the search bar input
  selectedIndex = -1; // Reset selection index
  searchHistory = []; // Reset the search history array
  localStorage.removeItem('searchHistory'); // Clear history from localStorage
  saveSearchHistory(); // Save the empty history to localStorage
  alert("Search history cleared!"); // Notify the user
  console.log("Search history cleared!"); // Log to console for debugging
  console.log("Search history:", searchHistory); // Log the current search history
  

});

function scrollActiveOptionIntoView() {
  const options = dropdown.querySelectorAll('div');
  if (selectedIndex >= 0 && options[selectedIndex]) {
    options[selectedIndex].scrollIntoView({ block: 'nearest' });
  }
}