// Function to validate and dynamically update the table
function validateAndUpdateTable() {
    if ($("#tableForm").valid()) {
        updateDynamicTable();
    }
}

// Function to dynamically update the table in the placeholder
function updateDynamicTable() {
    const minRow = parseInt(document.getElementById('minRow').value);
    const maxRow = parseInt(document.getElementById('maxRow').value);
    const minCol = parseInt(document.getElementById('minCol').value);
    const maxCol = parseInt(document.getElementById('maxCol').value);

    const container = document.getElementById('dynamic-table-container');
    container.innerHTML =''; // Clear the existing table

    // Create the table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody= document.createElement('tbody');

    // Create header row
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // Empty top-left cell
    for (let col = minCol; col <= maxCol; col++) {
        const th =document.createElement('th');
        th.innerText = col;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    // Create the rows
    for (let row = minRow; row <= maxRow; row++) {
        const tr =document.createElement('tr');
        const rowHeader = document.createElement('th');
        rowHeader.innerText = row; // Row header
        tr.appendChild(rowHeader);

        for (let col = minCol; col <= maxCol; col++) {
            const td = document.createElement('td');
            td.innerText = row*col; // Cell value
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table); // Add the table to the placeholder
}

// Function to create a new tab with the current dynamic table
function createNewTab() {
    const dynamicTable = document.querySelector('#dynamic-table-container table');
    if (!dynamicTable) {
        alert('No table to add!');
        return;
    }

    // Create a unique ID for the new tab
    const tabId = `tab-${Date.now()}`;
    const tabTitle = `Table`;

    // Add a new tab header with a checkbox
    const tabsList = document.getElementById('tabs-list');
    const newTabHeader = document.createElement('li');
    newTabHeader.id = `header-${tabId}`;
    newTabHeader.innerHTML = `
        <input type="checkbox" class="tab-checkbox" data-tab="${tabId}">
        <a href="#${tabId}">${tabTitle}</a>
    `;
    tabsList.appendChild(newTabHeader);

    // Create a new tab content container
    const newTabContent = document.createElement('div');
    newTabContent.id = tabId;

    // Wrap the table in a .table-container div
    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-container');

    // Clone the current table into the new tab
    const tableClone = dynamicTable.cloneNode(true);
    tableContainer.appendChild(tableClone);
    newTabContent.appendChild(tableContainer);

    // Add the tab content to the tabs container
    document.getElementById('tabs').appendChild(newTabContent);

    // Refresh the tabs widget
    $("#tabs").tabs("refresh");

    // Activate the newly created tab
    const newTabIndex = $(`#tabs-list li`).length - 1;
    $("#tabs").tabs("option", "active", newTabIndex);
}

// Function to delete selected tabs
function deleteSelectedTabs() {
    const selectedCheckboxes = document.querySelectorAll('.tab-checkbox:checked');

    selectedCheckboxes.forEach(checkbox => {
        const tabId = checkbox.getAttribute('data-tab');
        const tabHeader = document.getElementById(`header-${tabId}`);
        const tabContent = document.getElementById(tabId);

        if (tabHeader && tabContent) {
            // Remove the tab header and content
            tabHeader.parentNode.removeChild(tabHeader);
            tabContent.parentNode.removeChild(tabContent);
        }
    });

    // Refresh the tabs widget
    $("#tabs").tabs("refresh");
}

// Attach the delete button logic
document.getElementById('deleteSelectedTabs').addEventListener('click', deleteSelectedTabs);
