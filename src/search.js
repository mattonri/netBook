import { constructTable } from "./searchTableConstructors.js";

// Function to initialize the table and set up the search functionality
function init() {
    const tableElement = document.getElementById('search_table');
    const tableElementContent = constructTable(testData);
    tableElement.innerHTML = tableElementContent;

    // Initialize DataTable
    const dataTable = $('#search_table').DataTable({
        searching: false, // Disable the default search input provided by DataTables
    });

    // Search bar functionality: listen for input changes and filter table rows
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchFiltersContainer = document.getElementById('searchFilters');
    let currentSearchType = 'name'; // Default search type

    // Dropdown for search type
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            currentSearchType = item.getAttribute('data-search-type');
            document.getElementById('searchTypeButton').textContent = item.textContent; // Update button text
            searchInput.placeholder = `Search by ${item.textContent}`; // Update placeholder
        });
    });

    // Handle search button click
    searchButton.addEventListener('click', () => {
        const searchValue = searchInput.value.trim();
        if (searchValue !== "") {
            // Add a filter tag below the search bar
            addFilterTag(currentSearchType, searchValue);
            searchInput.value = ""; // Clear input after adding filter
        }
    });

    // Function to add a filter tag
    function addFilterTag(type, value) {
        // Create filter tag element
        const filterTag = document.createElement('div');
        filterTag.className = 'badge bg-primary filter-tag me-2'; // Bootstrap badge with margin-right
        filterTag.innerHTML = `
            ${type}: ${value}
            <button type="button" class="btn-close btn-close-white ms-2" aria-label="Close"></button>
        `;

        // Append filter tag to container
        searchFiltersContainer.appendChild(filterTag);

        // Handle remove filter event
        filterTag.querySelector('.btn-close').addEventListener('click', () => {
            filterTag.remove();
        });
    }

    // Autofill search input from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        searchInput.value = searchParam;
        searchInput.dispatchEvent(new Event('input')); // Trigger input event to filter table
    }
}

// Wait for the DOM content to load, then run the init function
document.addEventListener('DOMContentLoaded', init);
