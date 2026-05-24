function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

function getUrlParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

var loader = document.querySelector('#loader');
if (loader) {
    setTimeout(function () {
        loader.style.top = '-100%';
    }, 5000);
}

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    if (!hamburger || !navbarMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbarMenu.classList.toggle('open');
    });

    navbarMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbarMenu.classList.remove('open');
        });
    });
}

function initActiveNavLink() {
    const currentFilename = window.location.pathname.replace(/^.*\//, '');
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkFilename = (link.getAttribute('href') || '').replace(/^.*\//, '').split('?')[0];
        if (linkFilename === currentFilename) {
            link.classList.add('nav-link--active');
        } else {
            link.classList.remove('nav-link--active');
        }
    });
}

function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-top-btn');
    if (!scrollBtn) return;

    const toggleVisibility = throttle(() => {
        scrollBtn.classList.toggle('visible', window.scrollY > 300);
    }, 100);

    window.addEventListener('scroll', toggleVisibility);
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initHeroSwiper() {
    if (typeof Swiper === 'undefined') return;
    if (!document.querySelector('.hero-swiper')) return;

    new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        speed: 800,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        gsap.fromTo(heroTitle,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        gsap.fromTo(heroSubtitle,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.45 }
        );
    }

    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        gsap.fromTo(heroButtons,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
        );
    }

    gsap.utils.toArray('.gsap-fade-up').forEach((el, i) => {
        gsap.fromTo(el,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.75,
                ease: 'power2.out',
                delay: (i % 4) * 0.1,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });

    gsap.utils.toArray('.gsap-fade-left').forEach(el => {
        gsap.fromTo(el,
            { x: -60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });

    gsap.utils.toArray('.gsap-fade-right').forEach(el => {
        gsap.fromTo(el,
            { x: 60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });
}

function initBrandFilter() {
    const filterButtons = document.querySelectorAll('.brand-filter-btn');
    const productCards = document.querySelectorAll('[data-brand]');
    if (filterButtons.length === 0 || productCards.length === 0) return;

    const filterProducts = (filterValue) => {
        productCards.forEach(card => {
            const brand = card.getAttribute('data-brand');
            if (filterValue === 'all' || brand === filterValue) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('brand-filter-btn--active'));
            btn.classList.add('brand-filter-btn--active');
            filterProducts(btn.getAttribute('data-filter'));
        });
    });

    const brandParam = getUrlParam('brand');
    const categoryParam = getUrlParam('category');

    if (brandParam) {
        const targetBtn = document.querySelector(`.brand-filter-btn[data-filter="${brandParam}"]`);
        if (targetBtn) {
            filterButtons.forEach(b => b.classList.remove('brand-filter-btn--active'));
            targetBtn.classList.add('brand-filter-btn--active');
            filterProducts(brandParam);
        }
    } else if (categoryParam) {
        const categoryBrandMap = {
            'l-shape': 'grand-sofas',
            'recliner': 'grand-sofas',
            'corner': 'luxury-line',
            'office': 'office-pro',
            'hotel': 'grand-sofas',
            'sectional': 'luxury-line',
            'sofa-bed': 'luxury-line',
            'compact': 'classic-home',
        };
        const mappedBrand = categoryBrandMap[categoryParam];
        if (mappedBrand) {
            const targetBtn = document.querySelector(`.brand-filter-btn[data-filter="${mappedBrand}"]`);
            if (targetBtn) {
                filterButtons.forEach(b => b.classList.remove('brand-filter-btn--active'));
                targetBtn.classList.add('brand-filter-btn--active');
                filterProducts(mappedBrand);
            }
        }
    }
}

function initProductDetailModal() {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');

    const openModal = (product) => {
        document.getElementById('modalImg').src = product.image || '';
        document.getElementById('modalImg').alt = product.name || '';
        document.getElementById('modalBrand').textContent = product.brand || '';
        document.getElementById('modalName').textContent = product.name || '';
        document.getElementById('modalPrice').textContent = product.price || '';
        document.getElementById('modalMaterial').textContent = product.material || '-';
        document.getElementById('modalSize').textContent = product.size || '-';
        document.getElementById('modalUsage').textContent = product.usage || '-';
        document.getElementById('modalComfort').textContent = product.comfort || '-';
        document.getElementById('modalWarranty').textContent = product.warranty || '-';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            try {
                const product = JSON.parse(btn.getAttribute('data-product'));
                openModal(product);
            } catch (e) {
                console.error('Modal data parse error:', e);
            }
        });
    });

    if (overlay) overlay.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

const COMPARE_STORAGE_KEY = 'oxford_sofas_compare';
const MAX_COMPARE_ITEMS = 3;

function getCompareItems() {
    try {
        const stored = localStorage.getItem(COMPARE_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveCompareItems(items) {
    try {
        localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
        console.error('Error saving compare items:', e);
    }
}

function updateCompareBadge() {
    const badge = document.querySelector('.compare-badge');
    if (!badge) return;
    const items = getCompareItems();
    badge.textContent = items.length;
    badge.style.display = items.length === 0 ? 'none' : 'inline-block';
}

function addToCompare(product) {
    const items = getCompareItems();
    if (items.some(item => item.name === product.name)) {
        alert('This sofa is already in your comparison list.');
        return;
    }
    if (items.length >= MAX_COMPARE_ITEMS) {
        alert(`You can only compare up to ${MAX_COMPARE_ITEMS} sofas. Please remove one first.`);
        return;
    }
    items.push(product);
    saveCompareItems(items);
    updateCompareBadge();
    alert(`${product.name} added to comparison!`);
}

function initCompareButtons() {
    document.querySelectorAll('.btn-compare').forEach(btn => {
        btn.addEventListener('click', () => {
            try {
                const product = JSON.parse(btn.getAttribute('data-product'));
                addToCompare(product);
            } catch (e) {
                console.error('Error parsing product data:', e);
            }
        });
    });
}

function initComparisonTable() {
    const tableContainer = document.getElementById('comparison-table-container');
    if (!tableContainer) return;
    const items = getCompareItems();

    if (items.length === 0) {
        tableContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__icon">🛋️</div>
                <h3 class="empty-state__title">No Sofas to Compare</h3>
                <p class="empty-state__text">Go to the Brands page and click "+ Compare" on any product.</p>
                <a href="brands.html" class="btn btn-primary">Browse Brands</a>
            </div>`;
        return;
    }

    const attributes = [
        { key: 'image', label: 'Image', isImage: true },
        { key: 'name', label: 'Product Name' },
        { key: 'brand', label: 'Brand' },
        { key: 'price', label: 'Price' },
        { key: 'material', label: 'Material' },
        { key: 'style', label: 'Design / Style' },
        { key: 'size', label: 'Size' },
        { key: 'usage', label: 'Usage Area' },
        { key: 'comfort', label: 'Comfort Level' },
        { key: 'warranty', label: 'Warranty' },
    ];

    let tableHTML = '<div class="comparison-table-wrapper"><table class="comparison-table"><thead><tr><th>Attribute</th>';
    items.forEach(item => { tableHTML += `<th>${item.name}</th>`; });
    tableHTML += '</tr></thead><tbody>';

    attributes.forEach(attr => {
        tableHTML += `<tr><td>${attr.label}</td>`;
        items.forEach(item => {
            let value = item[attr.key] || '-';
            if (attr.isImage) value = `<img src="${value}" alt="${item.name}" loading="lazy">`;
            tableHTML += `<td>${value}</td>`;
        });
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table></div>';
    tableContainer.innerHTML = tableHTML;

    const clearBtn = document.getElementById('clear-comparison-btn');
    if (clearBtn) {
        clearBtn.classList.remove('hidden');
        clearBtn.addEventListener('click', () => {
            localStorage.removeItem(COMPARE_STORAGE_KEY);
            updateCompareBadge();
            initComparisonTable();
        });
    }
}

function initLightbox() {
    const galleryTiles = document.querySelectorAll('.gallery-tile');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox__content img');
    const lightboxCaption = document.querySelector('.lightbox__caption');
    const lightboxClose = document.querySelector('.lightbox__close');
    if (!lightbox || galleryTiles.length === 0) return;

    galleryTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const img = tile.querySelector('img');
            const title = tile.querySelector('.gallery-tile__title');
            const brand = tile.querySelector('.gallery-tile__brand');
            if (img && lightboxImg) { lightboxImg.src = img.src; lightboxImg.alt = img.alt; }
            if (lightboxCaption) {
                const t = title ? title.textContent : '';
                const b = brand ? brand.textContent : '';
                lightboxCaption.innerHTML = t ? `<strong>${t}</strong>${b ? ' — ' + b : ''}` : '';
            }
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
}

function validateField(field) {
    const value = field.value.trim();
    const errorEl = document.getElementById(`${field.name}-error`);
    let isValid = true;
    let errorMessage = '';

    if (!value) {
        isValid = false;
        errorMessage = 'This field is required.';
    } else if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    } else if (field.name === 'phone' && !/^[+]?[\d\s-]{7,15}$/.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
    }

    field.classList.toggle('error', !isValid);
    if (errorEl) {
        errorEl.textContent = errorMessage;
        errorEl.classList.toggle('visible', !isValid);
    }
    return isValid;
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = form.querySelectorAll('.form-input, .form-textarea');
    fields.forEach(field => {
        field.addEventListener('blur', () => { if (field.value.trim()) validateField(field); });
        field.addEventListener('input', () => {
            field.classList.remove('error');
            const errorEl = document.getElementById(`${field.name}-error`);
            if (errorEl) errorEl.classList.remove('visible');
        });
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        let isFormValid = true;
        fields.forEach(field => { if (!validateField(field)) isFormValid = false; });
        if (isFormValid) {
            const formContainer = document.getElementById('contact-form-container');
            if (formContainer) {
                formContainer.innerHTML = `
                    <div class="form-success">
                        <div class="form-success__icon">✓</div>
                        <h3 class="form-success__title">Thank You!</h3>
                        <p class="form-success__text">Your message has been received. We'll get back to you shortly.</p>
                    </div>`;
            }
        }
    });
}

function initGeolocation() {
    const geoBtn = document.getElementById('geo-btn');
    const geoInfo = document.getElementById('geo-info');
    if (!geoBtn || !geoInfo) return;

    geoBtn.addEventListener('click', () => {
        geoBtn.textContent = 'Getting your location...';
        geoBtn.disabled = true;

        if (!navigator.geolocation) {
            showGeoError('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                const userLat = position.coords.latitude.toFixed(4);
                const userLng = position.coords.longitude.toFixed(4);
                geoInfo.innerHTML = `
                    <div class="location-info">
                        <p><strong>Our Showroom:</strong> North Nazimabad, Karachi</p>
                        <p><strong>Your Location:</strong> Lat: ${userLat}, Lng: ${userLng}</p>
                        <p style="margin-top:8px;color:var(--color-accent);">Thank you! Our showroom is marked on the map below.</p>
                    </div>`;
                geoInfo.classList.remove('hidden');
                geoBtn.textContent = 'Location Found!';
            },
            error => {
                let message = 'Unable to retrieve your location.';
                if (error.code === error.PERMISSION_DENIED) message = 'Location access was denied.';
                showGeoError(message);
            }
        );
    });

    function showGeoError(message) {
        geoInfo.innerHTML = `<div class="location-info"><p>${message}</p></div>`;
        geoInfo.classList.remove('hidden');
        geoBtn.textContent = 'Show My Location';
        geoBtn.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    initActiveNavLink();
    initScrollToTop();
    initHeroSwiper();
    initGSAPAnimations();
    initBrandFilter();
    initProductDetailModal();
    initCompareButtons();
    updateCompareBadge();
    initComparisonTable();
    initLightbox();
    initContactForm();
    initGeolocation();
});

const CART_STORAGE_KEY = 'oxford_sofas_cart';

function getCartItems() {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveCartItems(items) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
        console.error('Cart save error:', e);
    }
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (!badge) return;

    const items = getCartItems();

    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

    badge.textContent = totalQty;
    badge.style.display = totalQty === 0 ? 'none' : 'inline-block';
}

function addToCart(product) {
    const items = getCartItems();

    const existingIndex = items.findIndex(item => item.name === product.name);

    if (existingIndex !== -1) {

        items[existingIndex].quantity += 1;
        showCartToast(`${product.name} — quantity updated!`);
    } else {

        items.push({ ...product, quantity: 1 });
        showCartToast(`${product.name} added to cart!`);
    }

    saveCartItems(items);
    updateCartBadge();
    renderCartSidebar();
}

function removeFromCart(productName) {
    let items = getCartItems();
    items = items.filter(item => item.name !== productName);
    saveCartItems(items);
    updateCartBadge();
    renderCartSidebar();
}

function changeCartQty(productName, delta) {
    const items = getCartItems();
    const idx = items.findIndex(item => item.name === productName);
    if (idx === -1) return;

    items[idx].quantity += delta;

    if (items[idx].quantity <= 0) {
        items.splice(idx, 1);
    }

    saveCartItems(items);
    updateCartBadge();
    renderCartSidebar();
}

function renderCartSidebar() {
    const listEl = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total-price');
    const emptyMsg = document.getElementById('cart-empty-msg');
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (!listEl) return;

    const items = getCartItems();

    if (items.length === 0) {

        listEl.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
        if (totalEl) totalEl.textContent = 'PKR 0';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';
    if (checkoutBtn) checkoutBtn.disabled = false;

    listEl.innerHTML = items.map(item => {

        const priceNum = parseInt((item.price || '0').replace(/[^\d]/g, ''), 10);
        const itemTotal = priceNum * item.quantity;

        return `
        <div class="cart-item" data-name="${item.name}">
            <img src="${item.image || ''}" alt="${item.name}" class="cart-item__img">
            <div class="cart-item__info">
                <p class="cart-item__name">${item.name}</p>
                <p class="cart-item__price">${item.price}</p>
                <div class="cart-item__qty-controls">
                    <button class="cart-qty-btn" onclick="changeCartQty('${item.name}', -1)">−</button>
                    <span class="cart-item__qty">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="changeCartQty('${item.name}', 1)">+</button>
                </div>
                <p class="cart-item__subtotal">Subtotal: PKR ${itemTotal.toLocaleString()}</p>
            </div>
            <button class="cart-item__remove" onclick="removeFromCart('${item.name}')" title="Remove">✕</button>
        </div>`;
    }).join('');

    const grandTotal = items.reduce((sum, item) => {
        const priceNum = parseInt((item.price || '0').replace(/[^\d]/g, ''), 10);
        return sum + priceNum * item.quantity;
    }, 0);

    if (totalEl) totalEl.textContent = `PKR ${grandTotal.toLocaleString()}`;
}

function showCartToast(message) {

    const oldToast = document.querySelector('.cart-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('cart-toast--visible'), 10);
    setTimeout(() => {
        toast.classList.remove('cart-toast--visible');
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

function openCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
}

function initCartButtons() {
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            try {
                const product = JSON.parse(btn.getAttribute('data-product'));
                addToCart(product);
            } catch (e) {
                console.error('Cart button error:', e);
            }
        });
    });
}

function initCartIcon() {
    const cartIcon = document.querySelector('.cart-icon-btn');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            renderCartSidebar();
            openCartSidebar();
        });
    }

    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.addEventListener('click', closeCartSidebar);

    const closeBtn = document.getElementById('cart-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeCartSidebar);

    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Shukriya! Humara team jald aap se rabta karega. 🛋️');

        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCartButtons();
    initCartIcon();
    updateCartBadge();
    renderCartSidebar();
});
