// Function to load and display the cards from a given file
function loadWordsFromFile(filepath) {
  // Fetch and parse the txt file
  fetch(filepath)
    .then(response => response.text())
    .then(data => {
      const lines = data.trim().split('\n'); // Split into lines
      const cardContainer = document.getElementById('card-container');

      // Clear existing cards
      cardContainer.innerHTML = '';

      // Create a new card for each line
      lines.forEach(line => {
        const [english, spanish] = line.split(','); // Split each line by comma to get English and Spanish verbs
        if (english && spanish) {
          // Create a new card element for each pair
          const card = document.createElement('div');
          card.classList.add('card');

          const cardInner = document.createElement('div');
          cardInner.classList.add('card-inner');

          const cardFront = document.createElement('div');
          cardFront.classList.add('card-front');
          cardFront.innerHTML = `<h3>${english}</h3>`;

          const cardBack = document.createElement('div');
          cardBack.classList.add('card-back');
          cardBack.innerHTML = `<h3>${spanish}</h3>`;

          cardInner.appendChild(cardFront);
          cardInner.appendChild(cardBack);
          card.appendChild(cardInner);
          cardContainer.appendChild(card);

          // Add click event listener to toggle flip
          card.addEventListener('click', () => {
            card.classList.toggle('flipped');
          });
        }
      });
    })
    .catch(error => console.error('Error fetching word list:', error));
}

const languageTitle = document.getElementById('language-title');
const dropdownContent = document.querySelector('.dropdown-content');

// Function to initialize the dropdown menu
function initializeDropdown() {
  // List of languages to populate the dropdown, excluding the default
  const languages = ['Portuguese', 'Italian'];

  // Set the default language
  languageTitle.textContent = 'Spanish';

  // Populate the dropdown menu
  dropdownContent.innerHTML = ''; // Clear any existing items
  languages.forEach(language => {
    const item = document.createElement('a');
    item.href = '#';
    item.setAttribute('data-language', language);
    item.textContent = language;
    dropdownContent.appendChild(item);
  });

  // Attach event listener to each dropdown item
  dropdownContent.querySelectorAll('a').forEach(item => {
    item.addEventListener('click', handleDropdownClick);
  });
}

function handleDropdownClick(event) {
  event.preventDefault();
  const currentLanguage = languageTitle.textContent;
  const selectedLanguage = event.target.getAttribute('data-language');

  languageTitle.textContent = selectedLanguage;
  loadWordsFromFile(`txt/${selectedLanguage}/articles.txt`);

  const newDropdownItem = document.createElement('a');
  newDropdownItem.href = '#';
  newDropdownItem.setAttribute('data-language', currentLanguage);
  newDropdownItem.textContent = currentLanguage;

  dropdownContent.appendChild(newDropdownItem);
  newDropdownItem.addEventListener('click', handleDropdownClick);

  event.target.remove();
  dropdownContent.classList.remove('show');
}

// Toggle dropdown on click of the title
languageTitle.addEventListener('click', () => {
  dropdownContent.classList.toggle('show');
});

// Hide dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!languageTitle.contains(event.target) && !dropdownContent.contains(event.target)) {
    dropdownContent.classList.remove('show');
  }
});

// Initialize dropdown on page load
initializeDropdown();

// Hamburger menu toggle for mobile
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Event listener for navigation menu links
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', (event) => {
    event.preventDefault();  // Prevent the default link behavior
    const filename = event.target.getAttribute('data-file');  // Get the corresponding file name
    loadWordsFromFile(`txt/${languageTitle.textContent}/${filename}`);  // Load the words from the selected file
    navLinks.classList.remove('active');
  });
});

// Load default file on page load
window.onload = () => {
  loadWordsFromFile('txt/Spanish/articles.txt');
};
