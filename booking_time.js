// List of 2-hour time slots corresponding to each session
const timeSlots = {
    morning: [
        { value: "0800-1000", text: "08:00 AM - 10:00 AM" },
        { value: "0900-1100", text: "09:00 AM - 11:00 AM" },
        { value: "1000-1200", text: "10:00 AM - 12:00 PM" }
    ],
    afternoon: [
        { value: "1300-1500", text: "01:00 PM - 03:00 PM" },
        { value: "1400-1600", text: "02:00 PM - 04:00 PM" },
        { value: "1500-1700", text: "03:00 PM - 05:00 PM" }
    ],
    evening: [
        { value: "1800-2000", text: "06:00 PM - 08:00 PM" },
        { value: "1900-2100", text: "07:00 PM - 09:00 PM" },
        { value: "2000-2200", text: "08:00 PM - 10:00 PM" }
    ]
};

// Function to update the list of times when the user selects a session
function updateTimeSlots() {
    const sessionSelect = document.getElementById("session");
    const timeSelect = document.getElementById("time");
    const selectedSession = sessionSelect.value;

    // 1. Clear the currently displayed times, keeping only the "Select Time" option
    timeSelect.innerHTML = '<option value="" disabled selected>Select Time</option>';

    // 2. If the user selects a valid session present in the data
    if (selectedSession && timeSlots[selectedSession]) {
        // Get the list of times for that session and create new <option> elements
        timeSlots[selectedSession].forEach(slot => {
            const option = document.createElement("option");
            option.value = slot.value;
            option.textContent = slot.text;
            timeSelect.appendChild(option);
        });
    }
}

// Function to clear selections when clicking "Clear selection"
function clearTimeSelection() {
    document.getElementById('session').selectedIndex = 0;
    document.getElementById('time').innerHTML = '<option value="" disabled selected>Select Time</option>';
}

// Listen for the event when the page has finished loading
window.onload = function() {
    // --- NEW SECTION: GET THE DATE FROM PAGE 1 AND DISPLAY IT ON THE SCREEN ---
    const savedDate = localStorage.getItem('bookingDate'); // Get the date from local storage
    const displayElement = document.getElementById('selectedDateDisplay');
    
    if (savedDate) {
        displayElement.innerText = savedDate; // If there is a date, display it
    } else {
        displayElement.innerText = "Please select a date first!"; // If error/not selected, display a warning
        displayElement.style.color = "red";
    }

    // --- OLD SECTION: Listen for changes in the Session dropdown ---
    const sessionSelect = document.getElementById("session");
    if (sessionSelect) {
        sessionSelect.addEventListener('change', updateTimeSlots);
    }
};

// Function to save Time and Session before moving to the Success page
function saveTimeAndContinue(event) {
    event.preventDefault(); // Prevent the <a> tag from redirecting immediately
    
    const sessionSelect = document.getElementById("session");
    const timeSelect = document.getElementById("time");

    // Check if the user has made a selection
    if (sessionSelect.selectedIndex === 0 || timeSelect.selectedIndex === 0) {
        alert("Please select both a Session and a Time before continuing!");
        return;
    }

    // Get the text content displayed in the Dropdown (e.g., "08:00 AM - 10:00 AM")
    const sessionText = sessionSelect.options[sessionSelect.selectedIndex].text;
    const timeText = timeSelect.options[timeSelect.selectedIndex].text;

    // Save to local storage
    localStorage.setItem('bookingSession', sessionText);
    localStorage.setItem('bookingTime', timeText);

    // Start redirecting to the Success page
    window.location.href = "booking_success.html";
}