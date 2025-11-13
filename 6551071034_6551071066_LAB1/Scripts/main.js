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
document.addEventListener('DOMContentLoaded', () => {
    const newsGrid = document.querySelector('.news-grid');
    const allNews = Array.from(newsGrid.children);
    const perPage = 6;
    let currentPage = 1;

    const pagination = document.querySelector('.pagination');
    const prevBtn = pagination.querySelector('.prev');
    const nextBtn = pagination.querySelector('.next');
    const pageButtons = Array.from(pagination.querySelectorAll('.page-btn')).filter(btn => !btn.classList.contains('prev') && !btn.classList.contains('next'));

    function showPage(page) {
        const start = (page - 1) * perPage;
        const end = page * perPage;

        allNews.forEach((news, index) => {
            news.style.display = index >= start && index < end ? 'block' : 'none';
        });

        currentPage = page;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === pageButtons.length;

        pageButtons.forEach(btn => btn.classList.remove('active'));
        pageButtons[page - 1].classList.add('active');
    }

    // click số trang
    pageButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => showPage(index + 1));
    });

    // click prev/next
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) showPage(currentPage - 1);
    });
    nextBtn.addEventListener('click', () => {
        if (currentPage < pageButtons.length) showPage(currentPage + 1);
    });

    // hiển thị trang 1 mặc định
    showPage(1);
});
// ===============================================
// === DỮ LIỆU SẢN PHẨM MẪU (SIMULATED BACKEND) ===
// ===============================================
const productsData = [
    { id: 1, name: "Giày Victor A970 ACE", price: 1850000, size: [39, 40, 41, 42], isNew: false, image: "./Images/giay2.webp" },
    { id: 2, name: "Giày Yonex 65Z3", price: 2340000, size: [40, 41, 43], isNew: false, image: "./Images/giay1.webp" },
    { id: 3, name: "Giày Lining AYAR001", price: 1290000, size: [38, 39, 40], isNew: true, image: "./Images/giay_lining.webp" },
    { id: 4, name: "Giày Mizuno Sky Blaster 3", price: 980000, size: [41, 42], isNew: false, image: "./Images/giay_mizuno.webp" },
    { id: 5, name: "Giày VNB V2", price: 590000, size: [38, 39, 40, 41], isNew: false, image: "./Images/giay_vnb_v2.webp" },
]; // Chỉ giữ 5 sản phẩm mẫu để code gọn nhẹ nhất

const formatVND = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
let cartCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    
    const cartButton = document.getElementById('cart-button');
    const productGrid = document.querySelector('.product-grid.shop-grid');
    
    // --- 1. CHỨC NĂNG CƠ BẢN (MOBILE MENU VÀ GIỎ HÀNG) ---

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => mainNav.classList.toggle('active'));
    }

    // Thêm vào Giỏ hàng (Kèm Thông báo)
    function handleAddToCart(event) {
        const productCard = event.target.closest('.product-card');
        if (!productCard) return;
        
        const productName = productCard.querySelector('h3') ? productCard.querySelector('h3').textContent : 'Sản phẩm không tên';
        cartCount++;
        if (cartButton) {
            cartButton.innerHTML = `<i class="fas fa-shopping-cart"></i> Giỏ hàng (${cartCount})`;
        }
        alert(`Đã thêm "${productName}" vào giỏ hàng!`); 
    }
    
    // Gán sự kiện Giỏ hàng cho các nút ban đầu
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    // ===========================================
    // 2. LOGIC LỌC/SẮP XẾP CHO TRANG SHOP
    // ===========================================
    
    if (productGrid) {
        initializeShopPage(handleAddToCart);
    }
    
    function initializeShopPage(onAddToCart) {
        
        const sortBySelect = document.getElementById('sort-by');
        const sizeOptionsContainer = document.querySelector('.size-options');
        const priceSlider = document.querySelector('.price-slider');
        const priceMinSpan = document.getElementById('price-min');
        const priceMaxSpan = document.getElementById('price-max');


        let currentFilters = {
            sizes: [], 
            sortBy: sortBySelect ? sortBySelect.value : 'default'
        };
        
        // Hàm tạo HTML cho sản phẩm
        function createProductCardHTML(product) {
            const saleTag = product.oldPrice ? `<p class="sale-tag">-${Math.round((product.oldPrice - product.price) / product.oldPrice * 100)}%</p>` : '';
            const oldPriceHTML = product.oldPrice ? `<p class="price old-price">${product.oldPrice}</p>` : '';
            
            return `
                <div class="product-card" data-id="${product.id}">
                    ${saleTag}
                    <img src="${product.image}" onerror="this.src='./Images/placeholder.webp';" alt="${product.name}">
                    <h3>${product.name}</h3>
                    ${oldPriceHTML}
                    <p class="price current-price">${formatVND(product.price)}</p>
                    <button class="add-to-cart">Thêm vào giỏ</button>
                </div>
            `;
        }
        
        // Hàm Hiển thị Sản phẩm (cập nhật lưới)
        function renderProducts(filteredProducts) {
            productGrid.innerHTML = filteredProducts.map(createProductCardHTML).join('');
            
            // Cập nhật số lượng sản phẩm
            const titleCount = document.querySelector('.page-shop-title');
            if (titleCount) {
                 titleCount.textContent = `GIÀY CẦU LÔNG CHÍNH HÃNG (${filteredProducts.length} Sản Phẩm)`;
            }
            
            // Gán lại sự kiện giỏ hàng cho các nút mới
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', onAddToCart);
            });
        }

        // Hàm Chính: Lọc và Sắp xếp
        function applyFiltersAndSort() {
            let filtered = [...productsData];

            // 1. Lọc theo Kích cỡ (SIZE)
            if (currentFilters.sizes.length > 0) {
                filtered = filtered.filter(p => 
                    p.size && p.size.some(s => currentFilters.sizes.includes(s))
                );
            }

            // 2. Sắp xếp (GIÁ)
            switch (currentFilters.sortBy) {
                case 'price-asc':
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                default:
                    filtered.sort((a, b) => a.id - b.id);
                    break;
            }

            renderProducts(filtered);
        }

        // --- Lắng nghe sự kiện ---

        // A. Lọc theo Kích cỡ (SIZE)
        if (sizeOptionsContainer) {
             sizeOptionsContainer.addEventListener('click', (event) => {
                const target = event.target;
                if (target.tagName === 'SPAN') {
                    target.classList.toggle('active');
                    currentFilters.sizes = Array.from(document.querySelectorAll('.size-options span.active'))
                                          .map(s => parseInt(s.textContent));
                    applyFiltersAndSort();
                }
            });
        }

        // B. Sắp xếp theo Giá (SORT BY PRICE)
        if (sortBySelect) {
            sortBySelect.addEventListener('change', function() {
                currentFilters.sortBy = this.value;
                applyFiltersAndSort();
            });
        }
        
        // C. Thanh trượt Giá (Chỉ hiển thị)
        if (priceSlider) {
            priceMinSpan.textContent = formatVND(priceSlider.min);
            priceMaxSpan.textContent = formatVND(priceSlider.max);
            priceSlider.addEventListener('input', function() {
                priceMaxSpan.textContent = formatVND(parseInt(this.value));
            });
        }
        
        // Tải trang lần đầu
        applyFiltersAndSort(); 
    }
});