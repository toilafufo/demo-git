const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
// Lấy ngày giờ hiện tại thực tế trên máy tính
const today = new Date();
const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

// Biến lưu trữ "tháng gốc" đang hiển thị trên màn hình (Mặc định là tháng hiện tại)
let currentBaseDate = new Date(today.getFullYear(), today.getMonth(), 1);

function buildCalendars() {
    const container = document.getElementById('calendarsContainer');
    if (!container) return; 
    
    container.innerHTML = '';

    // Tháng bên trái
    const month1 = new Date(currentBaseDate.getFullYear(), currentBaseDate.getMonth(), 1);
    // Tháng bên phải
    const month2 = new Date(currentBaseDate.getFullYear(), currentBaseDate.getMonth() + 1, 1);

    // Kiểm tra xem có được phép lùi tháng không (Không lùi quá tháng hiện tại ở ngoài đời thực)
    const canGoBack = month1 > new Date(today.getFullYear(), today.getMonth(), 1);

    container.appendChild(createMonthHTML(month1, canGoBack, false)); // Lịch trái có nút Prev (❮)
    container.appendChild(createMonthHTML(month2, false, true));      // Lịch phải có nút Next (❯)
}

// Hàm vẽ từng tháng
function createMonthHTML(date, hasPrevBtn, hasNextBtn) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Tính số ngày trong tháng và ngày bắt đầu (thứ mấy)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Chủ Nhật, 1 = Thứ Hai...

    const monthBlock = document.createElement('div');
    monthBlock.className = 'month-block';

    // Tạo phần Header chứa Tiêu đề và Nút chuyển tháng
    let headerHTML = `<div class="month-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">`;

    if (hasPrevBtn) {
        // Nút lùi tháng
        headerHTML += `<button onclick="changeMonth(-1)" style="cursor:pointer; border:1px solid #ddd; background:#fff; border-radius:8px; width:30px; height:30px; font-weight:bold; transition: 0.2s;">❮</button>`;
    } else {
        headerHTML += `<div style="width: 30px;"></div>`; // Khoảng trống tàng hình để cân bằng bố cục
    }

    headerHTML += `<h3 class="month-title" style="margin: 0; text-align: center; flex: 1;">${monthNames[month]} ${year}</h3>`;

    if (hasNextBtn) {
        // Nút tiến tháng
        headerHTML += `<button onclick="changeMonth(1)" style="cursor:pointer; border:1px solid #ddd; background:#fff; border-radius:8px; width:30px; height:30px; font-weight:bold; transition: 0.2s;">❯</button>`;
    } else {
        headerHTML += `<div style="width: 30px;"></div>`;
    }

    headerHTML += `</div>`;

    // Bắt đầu tạo khung lưới lịch
    let gridHTML = `<div class="calendar-grid">
        <div class="weekday">S</div><div class="weekday">M</div><div class="weekday">T</div>
        <div class="weekday">W</div><div class="weekday">T</div><div class="weekday">F</div><div class="weekday">S</div>`;

    // 1. Chèn các ô trống ở đầu tháng
    for(let i = 0; i < firstDayIndex; i++) {
        gridHTML += `<div class="day empty"></div>`;
    }

    // 2. Chèn các ngày có thật
    for(let d = 1; d <= daysInMonth; d++) {
        const currentIterDate = new Date(year, month, d);
        
        // So sánh xem ngày đang xét có nằm trong quá khứ không
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

// --- HÀM MỚI: Xử lý khi bấm nút chuyển tháng ---
function changeMonth(offset) {
    // Cộng hoặc trừ tháng hiện hành đi 1
    currentBaseDate.setMonth(currentBaseDate.getMonth() + offset);
    // Vẽ lại lịch
    buildCalendars();
}

// Hàm xử lý hiệu ứng khi click vào ngày
function selectDate(element, dateString) {
    document.querySelectorAll('.day').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    document.getElementById('displayDate').innerText = dateString;
    
    // THÊM DÒNG NÀY: Lưu ngày vừa chọn vào bộ nhớ tạm của trình duyệt
    localStorage.setItem('bookingDate', dateString);
}

// Nút Xóa lựa chọn
function clearSelection() {
    document.querySelectorAll('.day').forEach(el => el.classList.remove('selected'));
    document.getElementById('displayDate').innerText = "None";
    
    // THÊM DÒNG NÀY: Xóa ngày trong bộ nhớ nếu người dùng ấn Clear
    localStorage.removeItem('bookingDate');
}

// Chạy hàm vẽ lịch khi file HTML đã tải xong
window.onload = function() {
    buildCalendars();
};