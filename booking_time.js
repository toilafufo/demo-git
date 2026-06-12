// Danh sách các khung giờ 2 tiếng tương ứng với từng buổi
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

// Hàm cập nhật danh sách giờ khi người dùng chọn buổi
function updateTimeSlots() {
    const sessionSelect = document.getElementById("session");
    const timeSelect = document.getElementById("time");
    const selectedSession = sessionSelect.value;

    // 1. Xóa sạch các giờ cũ đang hiển thị, chỉ giữ lại dòng "Select Time"
    timeSelect.innerHTML = '<option value="" disabled selected>Select Time</option>';

    // 2. Nếu người dùng chọn đúng 1 buổi có trong dữ liệu
    if (selectedSession && timeSlots[selectedSession]) {
        // Lấy danh sách giờ của buổi đó và tạo các thẻ <option> mới
        timeSlots[selectedSession].forEach(slot => {
            const option = document.createElement("option");
            option.value = slot.value;
            option.textContent = slot.text;
            timeSelect.appendChild(option);
        });
    }
}

// Hàm dọn dẹp các lựa chọn khi bấm "Clear selection"
function clearTimeSelection() {
    document.getElementById('session').selectedIndex = 0;
    document.getElementById('time').innerHTML = '<option value="" disabled selected>Select Time</option>';
}

// Lắng nghe sự kiện khi trang vừa tải xong
window.onload = function() {
    // --- PHẦN MỚI: LẤY NGÀY TỪ TRANG 1 VÀ IN RA MÀN HÌNH ---
    const savedDate = localStorage.getItem('bookingDate'); // Lấy ngày từ bộ nhớ
    const displayElement = document.getElementById('selectedDateDisplay');
    
    if (savedDate) {
        displayElement.innerText = savedDate; // Nếu có ngày thì in ra
    } else {
        displayElement.innerText = "Please select a date first!"; // Nếu lỗi/chưa chọn thì báo
        displayElement.style.color = "red";
    }

    // --- PHẦN CŨ: Lắng nghe sự thay đổi của ô Session ---
    const sessionSelect = document.getElementById("session");
    if (sessionSelect) {
        sessionSelect.addEventListener('change', updateTimeSlots);
    }
};
// Hàm lưu Giờ và Buổi trước khi chuyển sang trang Thành công
function saveTimeAndContinue(event) {
    event.preventDefault(); // Ngăn chặn thẻ <a> chuyển trang ngay lập tức
    
    const sessionSelect = document.getElementById("session");
    const timeSelect = document.getElementById("time");

    // Kiểm tra xem người dùng đã chọn chưa
    if (sessionSelect.selectedIndex === 0 || timeSelect.selectedIndex === 0) {
        alert("Please select both a Session and a Time before continuing!");
        return;
    }

    // Lấy nội dung chữ hiển thị trên ô Dropdown (Ví dụ: "08:00 AM - 10:00 AM")
    const sessionText = sessionSelect.options[sessionSelect.selectedIndex].text;
    const timeText = timeSelect.options[timeSelect.selectedIndex].text;

    // Lưu vào bộ nhớ cục bộ
    localStorage.setItem('bookingSession', sessionText);
    localStorage.setItem('bookingTime', timeText);

    // Bắt đầu chuyển hướng sang trang Thành công
    window.location.href = "booking_success.html";
}