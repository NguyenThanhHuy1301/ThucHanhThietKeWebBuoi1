// Bật/tắt Menu điều hướng trên thiết bị di động
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Thêm/bỏ class 'active' để hiện/ẩn menu (đã định nghĩa trong CSS)
            mainNav.classList.toggle('active');
            
            // Thay đổi icon (tùy chọn)
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Icon đóng
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Icon menu
            }
        });
    }

    // Xử lý sự kiện Thêm vào giỏ hàng (giả lập)
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartButton = document.getElementById('cart-button');
    let cartCount = 0;

    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.closest('.product-card').querySelector('h3').textContent;
            cartCount++;
            
            // Cập nhật số lượng giỏ hàng trên Header
            cartButton.innerHTML = `<i class="fas fa-shopping-cart"></i> Giỏ hàng (${cartCount})`;
            
            // Thông báo cho người dùng
            alert(`Đã thêm "${productName}" vào giỏ hàng! Tổng cộng: ${cartCount} sản phẩm.`);
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử cần thiết
    const dropdownButton = document.getElementById('dropdown-button');
    const departmentsList = document.getElementById('departments-list');

    // Thêm lắng nghe sự kiện click vào nút
    dropdownButton.addEventListener('click', function() {
        // Hàm toggle() sẽ thêm class 'show' nếu nó không có, và xóa nếu nó đã có.
        departmentsList.classList.toggle('show');

        // (Tùy chọn) Thay đổi biểu tượng mũi tên khi mở/đóng
        const arrowIcon = dropdownButton.querySelector('.arrow-icon');
        if (departmentsList.classList.contains('show')) {
            arrowIcon.innerHTML = '&#9652;'; // Mũi tên lên
        } else {
            arrowIcon.innerHTML = '&#9662;'; // Mũi tên xuống
        }
    });
});
