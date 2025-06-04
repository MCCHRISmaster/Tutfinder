const searchBar = document.getElementById('searchBar');
const dropdown = document.getElementById('dropdown');

// Load search history from localStorage or initialize an empty array
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Function to save search history to localStorage
const saveSearchHistory = () => {
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
};

searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  dropdown.innerHTML = '';

  if (query) {
    const filteredHistory = searchHistory.filter(item => item.toLowerCase().includes(query));
    filteredHistory.forEach(item => {
      const option = document.createElement('div');
      option.textContent = item;
      option.addEventListener('click', () => {
        searchBar.value = item;
        dropdown.style.display = 'none';
      });
      dropdown.appendChild(option);
    });
    dropdown.style.display = filteredHistory.length ? 'block' : 'none';
  } else {
    dropdown.style.display = 'none';
  }
});

searchBar.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && searchBar.value.trim()) {
    const value = searchBar.value.trim();
    if (!searchHistory.includes(value)) {
      searchHistory.push(value);
      saveSearchHistory(); // Save updated history to localStorage
    }
    dropdown.style.display = 'none';
    searchBar.value = '';
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('#dropdown') && e.target !== searchBar) {
    dropdown.style.display = 'none';
  }
});