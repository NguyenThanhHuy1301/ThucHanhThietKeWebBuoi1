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
// ===== Robust product slider (no HTML changes) =====
(function(){
  const productListing = document.querySelector('.product-listing');
  const productGrid = document.querySelector('.product-grid');

  console.log('Slider init — productListing:', !!productListing, 'productGrid:', !!productGrid);

  if (!productListing || !productGrid) return;

  // ensure productGrid is scrollable via styles (defensive)
  productGrid.style.overflowX = productGrid.style.overflowX || 'auto';
  productGrid.style.display = 'flex';
  productGrid.style.flexWrap = 'nowrap';

  // remove duplicate buttons if script ran twice
  const existingPrev = productListing.querySelector('.slider-btn.prev');
  const existingNext = productListing.querySelector('.slider-btn.next');
  if (existingPrev) existingPrev.remove();
  if (existingNext) existingNext.remove();

  // create buttons
  const prevBtn = document.createElement('button');
  const nextBtn = document.createElement('button');
  prevBtn.className = 'slider-btn prev';
  nextBtn.className = 'slider-btn next';
  prevBtn.setAttribute('aria-label', 'Previous');
  nextBtn.setAttribute('aria-label', 'Next');
  prevBtn.innerHTML = '<i class="fas fa-chevron-left" aria-hidden="true"></i>';
  nextBtn.innerHTML = '<i class="fas fa-chevron-right" aria-hidden="true"></i>';

  productListing.appendChild(prevBtn);
  productListing.appendChild(nextBtn);

  // computed scroll amount: one card width (if exists) or fallback
  const firstCard = productGrid.querySelector('.product-card, .product-item');
  const cardWidth = firstCard ? (firstCard.getBoundingClientRect().width + 20) : 300; // include gap approx

  function smoothScrollBy(el, amount) {
    // use scrollBy if available
    if ('scrollBy' in el) {
      try {
        el.scrollBy({ left: amount, behavior: 'smooth' });
        return;
      } catch (e) {
        // fallback below
      }
    }
    // fallback animate scrollLeft
    const start = el.scrollLeft;
    const end = start + amount;
    const duration = 350;
    const startTime = performance.now();
    function step(t) {
      const p = Math.min(1, (t - startTime) / duration);
      const ease = 0.5 - Math.cos(p * Math.PI) / 2; // easeInOut
      el.scrollLeft = start + (end - start) * ease;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('click prev — cardWidth:', cardWidth);
    smoothScrollBy(productGrid, -cardWidth);
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('click next — cardWidth:', cardWidth);
    smoothScrollBy(productGrid, cardWidth);
  });

  // Drag to scroll (desktop + mobile)
  (function enableDragScroll(container){
    let isDown = false;
    let startX, scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      e.preventDefault();
    });

    container.addEventListener('mouseleave', () => { isDown = false; container.classList.remove('dragging'); });
    container.addEventListener('mouseup', () => { isDown = false; container.classList.remove('dragging'); });
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1; // scroll-fast factor
      container.scrollLeft = scrollLeft - walk;
    });

    // touch
    let tStartX=0, tScrollLeft=0;
    container.addEventListener('touchstart', (e) => {
      tStartX = e.touches[0].pageX;
      tScrollLeft = container.scrollLeft;
    }, {passive: true});
    container.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - tStartX) * 1;
      container.scrollLeft = tScrollLeft - walk;
    }, {passive: true});

  })(productGrid);

  // optional: keyboard support - left/right arrows when focused
  productListing.tabIndex = -1; // make it focusable
  productListing.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); smoothScrollBy(productGrid, -cardWidth); }
    if (e.key === 'ArrowRight') { e.preventDefault(); smoothScrollBy(productGrid, cardWidth); }
  });

  console.log('Slider ready. Try click buttons or drag horizontally.');
})();
