// renderer.js
import {
  navigateTo,
  goBack,
  goForward,
} from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  // Example: Navigate to the home page
  navigateTo("home");

  // Back arrow button
  const backButton = document.getElementById("backButton");
  const forwardButton = document.getElementById("forwardButton");
  const favoriteButton = document.getElementById("favoriteButton");
  const searchButton = document.getElementById("searchButton");
  const homeButton = document.getElementById("homeButton");
  const careerCenterButton = document.getElementById("careerCenterButton");

  // Check if buttons exist before adding listeners
  if (backButton) {
      backButton.addEventListener("click", goBack);
  } else {
      console.error("Back button not found");
  }

  if (forwardButton) {
      forwardButton.addEventListener("click", goForward);
  } else {
      console.error("Forward button not found");
  }

  if (favoriteButton) {
      favoriteButton.addEventListener("click", () => navigateTo("favorites"));
  } else {
      console.error("Favorite button not found");
  }

  if (searchButton) {
      searchButton.addEventListener("click", () => navigateTo("search"));
  } else {
      console.error("Search button not found");
  }
  if (homeButton) {
      homeButton.addEventListener("click", () => navigateTo("home"));
  } else {
      console.error("Search button not found");
  }
  if (careerCenterButton) {
      careerCenterButton.addEventListener("click", () => navigateTo("careerCenter"));
  } else {
      console.error("Career center button not found");
  }
  if (mapButton) {
      mapButton.addEventListener("click", () => navigateTo("map"));
  } else {
      console.error("Map button not found");
  }
});

//DataBase Nonsense

async function fetchProfiles() {
    try {
        const rows = await window.electron.invoke('db-query', "SELECT * FROM supervisors");
        return rows; // Return the fetched rows
    } catch (error) {
        console.error('Error querying database:', error);
        return []; // Return an empty array or handle the error as needed
    }
}

// Example usage of the function
fetchProfiles().then(profiles => {
    console.log(profiles); // Log the retrieved users or do something else with them
});