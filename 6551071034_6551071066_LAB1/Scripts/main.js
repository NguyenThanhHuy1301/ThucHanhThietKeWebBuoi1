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