// Get the search bar input element by its ID
const searchBar = document.getElementById('searchBar');

// Get the dropdown container element by its ID
const dropdown = document.getElementById('dropdown');

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
  // Get all suggestion options currently in the dropdown
  const options = dropdown.querySelectorAll('div');

  // If the down arrow is pressed
  if (e.key === 'ArrowDown') {
    e.preventDefault(); // Prevent cursor from moving in input

    // Move selection down, wrap around using modulo
    selectedIndex = (selectedIndex + 1) % options.length;
    highlightOption(options); // Highlight the new selection
  }

  // If the up arrow is pressed
  else if (e.key === 'ArrowUp') {
    e.preventDefault(); // Prevent cursor from moving

    // Move selection up, wrap around if needed
    selectedIndex = (selectedIndex - 1 + options.length) % options.length;
    highlightOption(options); // Highlight the new selection
  }

  // If Enter is pressed
  else if (e.key === 'Enter') {
    e.preventDefault(); // Prevent form submission or new line

    // Get the input value, trimmed of whitespace
    let value = searchBar.value.trim();

    // If an item is selected from dropdown, use that instead of typed input
    if (selectedIndex >= 0 && options[selectedIndex]) {
      value = options[selectedIndex].textContent;
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

    // Clear the input field and hide the dropdown
    searchBar.value = '';
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

// Event listener for clicks anywhere in the document
document.addEventListener('click', (e) => {
  // If the click is outside both the dropdown and the search bar, hide the dropdown
  if (!e.target.closest('#dropdown') && e.target !== searchBar) {
    dropdown.style.display = 'none';
  }
});
