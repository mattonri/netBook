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
      favoriteButton.addEventListener("click", () => navigateTo("favorite"));
  } else {
      console.error("Favorite button not found");
  }

  if (searchButton) {
      searchButton.addEventListener("click", () => navigateTo("search"));
  } else {
      console.error("Search button not found");
  }
});