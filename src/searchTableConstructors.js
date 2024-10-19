// break data down to table parts
export function constructTable(Data){
    let tableElement = ""
    const attributes = Object.keys(Data[0]);
    tableElement = returnTableHead(attributes) + returnTableBody(Data)
    return tableElement
}

// Function to create the table header
export function returnTableHead(headers) {
    let headerString = ""; // Initialize headerString as an empty string
    headers.forEach(header => {
        headerString += `<th>${header}</th>`; // Concatenate each header
    });
    return `<thead>\n<tr>${headerString}</tr>\n</thead>`; // Wrap headers in a <tr>
}

// Function to create the table body
export function returnTableBody(Data) {
    let entriesString = ""; // Initialize entriesString as an empty string
    Data.forEach(row => {
        entriesString += returnTableBodyEntry(row); // Concatenate each row entry
    });
    return `<tbody>\n${entriesString}\n</tbody>`; // Wrap all entries in <tbody>
}

// Function to create a table row entry
function returnTableBodyEntry(row) {
    let dataString = ""; // Initialize dataString as an empty string
    // Use Object.values to get the values of the row
    Object.values(row).forEach(item => {
        dataString += `<td>${item}</td>`; // Concatenate each cell
    });
    return `<tr>\n${dataString}\n</tr>`; // Wrap the data in <tr>
}

// Function to create the table footer
export function returnTFooter(footers) {
    let footerString = ""; // Initialize footerString as an empty string
    footers.forEach(footer => {
        footerString += `<th>${footer}</th>`; // Concatenate each footer
    });
    return `<tfoot>\n<tr>${footerString}</tr>\n</tfoot>`; // Wrap footers in a <tr>
}







