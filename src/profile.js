// profile.js

// Function to get the URL parameter
function getUrlParameter(name) {
    const results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results ? decodeURIComponent(results[1]) : null;
}

// Function to fetch profile data from the server
async function fetchProfileData(userId) {
    try {
        const response = await fetch(`/api/profiles/${userId}`); // Adjust the URL as needed
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const profileData = await response.json();
        populateProfile(profileData);
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}

// Function to populate the profile data in the HTML
function populateProfile(data) {
    document.getElementById('username').textContent = data.username;
    document.getElementById('email').textContent = data.email;
    document.getElementById('bio').textContent = data.bio;
}

// Main function to execute
(function () {
    const userId = getUrlParameter('id'); // Get the 'id' parameter from the URL
    if (userId) {
        fetchProfileData(userId); // Fetch profile data
    } else {
        console.error('No user ID provided in the URL');
    }
})();
