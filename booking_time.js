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
    const sessionSelect = document.getElementById("session"); // id sesson phân biệt ô dropdown vs ô time, hàm get lấy đúng ptu ô đó cất vào biến sessionSelect
    const timeSelect = document.getElementById("time");
    const selectedSession = sessionSelect.value; // sessionselect value lưu gtri đã chọn biến selected 

    // 1. Clear the currently displayed times, keeping only the "Select Time" option
    timeSelect.innerHTML = '<option value="" disabled selected>Select Time</option>'; 

    // 2. If the user selects a valid session present in the data
    if (selectedSession && timeSlots[selectedSession]) { //check xem buổi chọn của user và buổi đấy có trong data timeSlots không
        // Get the list of times for that session and create new <option> elements
        timeSlots[selectedSession].forEach(slot => { //lặp từng vòng để lấy thời gian ra và tạo option
            const option = document.createElement("option"); 
            option.value = slot.value;
            option.textContent = slot.text;// gán text hiển thị cho option
            timeSelect.appendChild(option);//   thêm option vào dropdown timeSelect để hiển thị cho user chọn
        });
    }
}

// Function to clear selections when clicking "Clear selection"
function clearTimeSelection() {
    document.getElementById('session').selectedIndex = 0; //vdu chọn afternoon và chọn giờ, sau đó chọn morning thì sẽ clear hết cả 2
    document.getElementById('time').innerHTML = '<option value="" disabled selected>Select Time</option>';
}

// Listen for the event when the page has finished loading
window.onload = function() { //chuyển dữ liệu bookdate từ page 1 sang page 2 và hiển thị
    // --- NEW SECTION: GET THE DATE FROM PAGE 1 AND DISPLAY IT ON THE SCREEN ---
    const savedDate = localStorage.getItem('bookingDate'); // lấy dữ liệu từ dán vào saved date qua biến localstorage
    const displayElement = document.getElementById('selectedDateDisplay'); // tìm thẻ hiển thị ngày đã chọn qua id và gán vào biến displayElement
    
    if (savedDate) {
        displayElement.innerText = savedDate; // If there is a date, display it
    } else {
        displayElement.innerText = "Please select a date first!"; // If error/not selected, display a warning
        displayElement.style.color = "red";
    }

    // --- OLD SECTION: Listen for changes in the Session dropdown ---
    const sessionSelect = document.getElementById("session"); // Get the Session dropdown element by its ID and store it in a variable
    if (sessionSelect) {
        sessionSelect.addEventListener('change', updateTimeSlots); // Listen for changes in the Session dropdown and update the Time dropdown accordingly
    }
};

// Function to save Time and Session before moving to the Success page
function saveTimeAndContinue(event) { //chuyển trang 3 success và lưu  dữ liệu đã
    event.preventDefault(); // Prevent the <a> tag from redirecting immediately
    
    const sessionSelect = document.getElementById("session"); // trích xuất giá trị đã chọn của session và time để lưu vào local storage trước khi chuyển trang
    const timeSelect = document.getElementById("time");

    // Check if the user has made a selection
    if (sessionSelect.selectedIndex === 0 || timeSelect.selectedIndex === 0) { // check xem chọn đủ ch
        alert("Please select both a Session and a Time before continuing!");
        return;
    }

    // Get the text content displayed in the Dropdown (e.g., "08:00 AM - 10:00 AM")
    const sessionText = sessionSelect.options[sessionSelect.selectedIndex].text; // tìm buổi đã chọn và lấy text hiển thị của nó để lưu vào local storage, tương tự với time
    const timeText = timeSelect.options[timeSelect.selectedIndex].text;

    // Save to local storage
    localStorage.setItem('bookingSession', sessionText);// lưu session đã chọn vào local storage với key 'bookingSession' và giá trị là text hiển thị của session đã chọn
    localStorage.setItem('bookingTime', timeText); // giờ vừa dc lưu nhét vào biến local và gọi tên là booking time để máy tìm đúng dữ liệu đã lưu và hiển thị ở trang success

    // Start redirecting to the Success page
    window.location.href = "booking_success.html";
}
