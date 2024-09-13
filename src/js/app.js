// Function to load and display the cards from a given file
function loadWordsFromFile(filename) {
    // Fetch and parse the txt file
    fetch("txt/" + filename)
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
        loadWordsFromFile(filename);  // Load the words from the selected file
    });
});

// Load default file (verbs.txt) on page load
window.onload = () => {
    loadWordsFromFile('articles.txt');
};
