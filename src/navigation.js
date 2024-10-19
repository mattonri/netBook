let backStack = [];
let forwardStack = [];
let currentPage = null;

export function navigateTo(page) {
  if (currentPage != null) {
    backStack.push(currentPage); // Push the current page to back stack
  }
  currentPage = page; // Set new page as current
  forwardStack = []; // Clear the forward stack as the user is navigating forward
  loadPage(currentPage);
  updateButtonState(); // Update button states after navigation
}

export function goBack() {
  if (backStack.length > 0) {
    forwardStack.push(currentPage); // Push current page to forward stack
    currentPage = backStack.pop(); // Pop the last page from back stack
    loadPage(currentPage);
  }
  updateButtonState(); // Update button states after going forward
}

export function goForward() {
  if (forwardStack.length > 0) {
    backStack.push(currentPage); // Push current page to the back stack
    currentPage = forwardStack.pop();
    loadPage(currentPage);
  }
  updateButtonState(); // Update button states after going forward
}

export function updateButtonState() {
  document.getElementById("backButton").disabled = backStack.length === 0;
  document.getElementById("forwardButton").disabled = forwardStack.length === 0;
}

function loadPage(page) {
  console.log(`Navigate to : ${page}`);
}
