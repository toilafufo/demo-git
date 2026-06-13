const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
// Get the actual current date and time
const today = new Date();
const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

// Variable storing the "base month" currently displayed on the screen (Defaults to the current month)
let currentBaseDate = new Date(today.getFullYear(), today.getMonth(), 1);

function buildCalendars() {
    const container = document.getElementById('calendarsContainer');
    if (!container) return; 
    
    container.innerHTML = '';

    // Left month
    const month1 = new Date(currentBaseDate.getFullYear(), currentBaseDate.getMonth(), 1);
    // Right month
    const month2 = new Date(currentBaseDate.getFullYear(), currentBaseDate.getMonth() + 1, 1);

    // Check if going back a month is allowed (Cannot go back past the actual current month)
    const canGoBack = month1 > new Date(today.getFullYear(), today.getMonth(), 1);

    container.appendChild(createMonthHTML(month1, canGoBack, false)); // Left calendar has Prev button (❮)
    container.appendChild(createMonthHTML(month2, false, true));      // Right calendar has Next button (❯)
}

// Function to render each month
function createMonthHTML(date, hasPrevBtn, hasNextBtn) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Calculate the number of days in the month and the starting day index
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday...

    const monthBlock = document.createElement('div');
    monthBlock.className = 'month-block';

    // Create the Header section containing the Title and Month navigation buttons
    let headerHTML = `<div class="month-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">`;

    if (hasPrevBtn) {
        // Previous month button
        headerHTML += `<button onclick="changeMonth(-1)" style="cursor:pointer; border:1px solid #ddd; background:#fff; border-radius:8px; width:30px; height:30px; font-weight:bold; transition: 0.2s;">❮</button>`;
    } else {
        headerHTML += `<div style="width: 30px;"></div>`; // Invisible spacer to balance the layout
    }

    headerHTML += `<h3 class="month-title" style="margin: 0; text-align: center; flex: 1;">${monthNames[month]} ${year}</h3>`;

    if (hasNextBtn) {
        // Next month button
        headerHTML += `<button onclick="changeMonth(1)" style="cursor:pointer; border:1px solid #ddd; background:#fff; border-radius:8px; width:30px; height:30px; font-weight:bold; transition: 0.2s;">❯</button>`;
    } else {
        headerHTML += `<div style="width: 30px;"></div>`;
    }

    headerHTML += `</div>`;

    // Start creating the calendar grid
    let gridHTML = `<div class="calendar-grid">
        <div class="weekday">S</div><div class="weekday">M</div><div class="weekday">T</div>
        <div class="weekday">W</div><div class="weekday">T</div><div class="weekday">F</div><div class="weekday">S</div>`;

    // 1. Insert empty cells at the beginning of the month
    for(let i = 0; i < firstDayIndex; i++) {
        gridHTML += `<div class="day empty"></div>`;
    }

    // 2. Insert the actual days
    for(let d = 1; d <= daysInMonth; d++) {
        const currentIterDate = new Date(year, month, d);
        
        // Check if the current iterated date is in the past
        if (currentIterDate < todayDateOnly) {
            gridHTML += `<div class="day disabled">${d}</div>`;
        } else {
            const dateStr = `${String(d).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
            gridHTML += `<div class="day selectable" onclick="selectDate(this, '${dateStr}')">${d}</div>`;
        }
    }
    gridHTML += `</div>`; 

    monthBlock.innerHTML = headerHTML + gridHTML;
    return monthBlock;
}

// --- NEW FUNCTION: Handle month change button click ---
function changeMonth(offset) {
    // Add or subtract 1 from the current base month
    currentBaseDate.setMonth(currentBaseDate.getMonth() + offset);
    // Redraw the calendars
    buildCalendars();
}

// Function to handle the visual effect when clicking on a date
function selectDate(element, dateString) {
    document.querySelectorAll('.day').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    document.getElementById('displayDate').innerText = dateString;
    
    // ADD THIS LINE: Save the selected date to the browser's local storage
    localStorage.setItem('bookingDate', dateString);
}

// Clear selection button
function clearSelection() {
    document.querySelectorAll('.day').forEach(el => el.classList.remove('selected'));
    document.getElementById('displayDate').innerText = "None";
    
    // ADD THIS LINE: Remove the date from local storage if the user clicks Clear
    localStorage.removeItem('bookingDate');
}

// Run the calendar rendering function when the HTML file has finished loading
window.onload = function() {
    buildCalendars();
};