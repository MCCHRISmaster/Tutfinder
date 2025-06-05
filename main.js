const searchBar = document.getElementById('searchBar');
const dropdown = document.getElementById('dropdown');

// Load search history from localStorage or initialize an empty array
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Function to save search history to localStorage
const saveSearchHistory = () => {
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
};

let selectedIndex = -1;

// Function to update dropdown suggestions
const updateDropdown = (query) => {
  dropdown.innerHTML = '';
  const filteredHistory = searchHistory.filter(item =>
    item.toLowerCase().includes(query)
  );

  filteredHistory.forEach((item, index) => {
    const option = document.createElement('div');
    option.textContent = item;
    option.addEventListener('click', () => {
      searchBar.value = item;
      dropdown.style.display = 'none';
    });
    dropdown.appendChild(option);
  });

  dropdown.style.display = filteredHistory.length ? 'block' : 'none';
};

searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  selectedIndex = -1;
  if (query) {
    updateDropdown(query);
  } else {
    dropdown.style.display = 'none';
  }
});

searchBar.addEventListener('keydown', (e) => {
  const options = dropdown.querySelectorAll('div');

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIndex = (selectedIndex + 1) % options.length;
    highlightOption(options);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIndex = (selectedIndex - 1 + options.length) % options.length;
    highlightOption(options);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    let value = searchBar.value.trim();

    if (selectedIndex >= 0 && options[selectedIndex]) {
      value = options[selectedIndex].textContent;
      searchBar.value = value;
    }

    if (value && !searchHistory.includes(value)) {
      searchHistory.push(value);
      if (searchHistory.length > 10) {
        searchHistory.shift(); // Keep only 10 items
      }
      saveSearchHistory();
    }

    searchBar.value = '';
    dropdown.style.display = 'none';
    selectedIndex = -1;
  } else {
    selectedIndex = -1;
  }
});

function highlightOption(options) {
  options.forEach((opt, index) => {
    opt.style.backgroundColor = index === selectedIndex ? '#eee' : '';
  });
}

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('#dropdown') && e.target !== searchBar) {
    dropdown.style.display = 'none';
  }
});
