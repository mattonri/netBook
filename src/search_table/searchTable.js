import {constructTable} from "./searchTableConstructors.js";

$('#search_table').DataTable();

const testData = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', age: 28, email: 'alice@example.com' },
    { id: 4, name: 'Bob Brown', age: 35, email: 'bob@example.com' }
];


function init() {
    const tableElement = document.getElementById('search_table')
    const tableElementContent = constructTable(testData)
    tableElement.innerHTML = tableElementContent;
}


document.addEventListener('DOMContentLoaded', init);