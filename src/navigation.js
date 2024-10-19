// navigate.js
let backStack = [];
let forwardStack = [];
let currentPage = null;

export function navigateTo(page) {
    if (currentPage != null) {
        backStack.push(currentPage);
    }
    currentPage = page;
    forwardStack = [];
    loadPage(currentPage);
    updateButtonState();
}

export function goBack() {
    if (backStack.length > 0) {
        forwardStack.push(currentPage);
        currentPage = backStack.pop();
        loadPage(currentPage);
    }
    updateButtonState();
}

export function goForward() {
    if (forwardStack.length > 0) {
        backStack.push(currentPage);
        currentPage = forwardStack.pop();
        loadPage(currentPage);
    }
    updateButtonState();
}

function updateButtonState() {
    document.getElementById("backButton").disabled = backStack.length === 0;
    document.getElementById("forwardButton").disabled = forwardStack.length === 0;
}

function loadPage(page) {
    const mainContent = document.getElementById('main-content'); // Assuming you have a div to hold your content

    if (mainContent) {
        fetch(`${page}.html`) // Fetch the HTML content
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                mainContent.innerHTML = html; // Update the content
                console.log(`Loaded content for: ${page}`);

                // Check if the page is 'search' and load the corresponding script
                if (page === 'search') {
                    const script = document.createElement('script');
                    script.type = 'module'; // Specify that this is a module
                    script.src = 'search.js'; // Specify the path to your JavaScript file
                    script.onload = () => {
                        console.log('search.js loaded and executed.');
                    };
                    script.onerror = () => {
                        console.error('Error loading search.js.');
                    };
                    document.body.appendChild(script); // Append the script to the body
                }
                if (page === 'map') {
                    const script = document.createElement('script');
                    script.type = 'module'; // Specify that this is a module
                    script.src = 'map.js'; // Specify the path to your JavaScript file
                    script.onload = () => {
                        console.log('map.js loaded and executed.');
                    };
                    script.onerror = () => {
                        console.error('Error loading map.js.');
                    };
                    document.body.appendChild(script); // Append the script to the body

                    const script2 = document.createElement('script');
                    script2.type = 'module'; // Specify that this is a module
                    script2.src = 'https://unpkg.com/leaflet/dist/leaflet.js'; // Specify the path to your JavaScript file
                    script2.onload = () => {
                        console.log('https://unpkg.com/leaflet/dist/leaflet.js loaded and executed.');
                    };
                    script2.onerror = () => {
                        console.error('Error loading https://unpkg.com/leaflet/dist/leaflet.js.');
                    };
                    document.body.appendChild(script2); // Append the script to the body
                }
                
            })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    } else {
        console.error('Main content area not found in the DOM.');
    }
}
