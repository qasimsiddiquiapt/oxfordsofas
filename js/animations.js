// ============================================================
//  OXFORD SOFAS — GSAP + ScrollTrigger Animations
//  Har page ke har element pe animation hai
// ============================================================

function initAllAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // ─────────────────────────────────────────────
    //  NAVBAR — slide down from top on page load
    // ─────────────────────────────────────────────
    gsap.fromTo('.site-navbar',
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );

    // Nav links stagger in
    gsap.fromTo('.nav-link',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07, delay: 0.4 }
    );

    // ─────────────────────────────────────────────
    //  PAGE HERO (inner pages) — text animate in
    // ─────────────────────────────────────────────
    const pageHeroH1 = document.querySelector('.page-hero-content h1');
    const pageHeroBreadcrumb = document.querySelector('.page-hero-content .breadcrumb');

    if (pageHeroH1) {
        gsap.fromTo(pageHeroH1,
            { y: 60, opacity: 0, skewY: 4 },
            { y: 0, opacity: 1, skewY: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
        );
    }
    if (pageHeroBreadcrumb) {
        gsap.fromTo(pageHeroBreadcrumb,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.85 }
        );
    }

    // ─────────────────────────────────────────────
    //  HOME HERO (swiper) — title, subtitle, buttons
    // ─────────────────────────────────────────────
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');

    if (heroTitle) {
        gsap.fromTo(heroTitle,
            { y: 70, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
            { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power4.out', delay: 0.6 }
        );
    }
    if (heroSubtitle) {
        gsap.fromTo(heroSubtitle,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.95 }
        );
    }
    if (heroButtons) {
        gsap.fromTo(heroButtons.children,
            { y: 30, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)', stagger: 0.15, delay: 1.25 }
        );
    }

    // ─────────────────────────────────────────────
    //  SECTION HEADERS — fade up with line wipe
    // ─────────────────────────────────────────────
    gsap.utils.toArray('.section-header').forEach(el => {
        const h2 = el.querySelector('h2');
        const p = el.querySelector('p');

        if (h2) {
            gsap.fromTo(h2,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
                }
            );
        }
        if (p) {
            gsap.fromTo(p,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2,
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
                }
            );
        }
    });

    // ─────────────────────────────────────────────
    //  PRODUCT CARDS — staggered rise + scale
    // ─────────────────────────────────────────────
    const productCardGroups = document.querySelectorAll('.product-grid');
    productCardGroups.forEach(grid => {
        const cards = grid.querySelectorAll('.product-card');
        gsap.fromTo(cards,
            { y: 70, opacity: 0, scale: 0.94 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 0.75, ease: 'power2.out', stagger: 0.12,
                scrollTrigger: { trigger: grid, start: 'top 82%', toggleActions: 'play none none none' }
            }
        );
    });

    // ─────────────────────────────────────────────
    //  CATEGORY CARDS — slide up with stagger
    // ─────────────────────────────────────────────
    const categoryGrids = document.querySelectorAll('.grid-3');
    categoryGrids.forEach(grid => {
        const cards = grid.querySelectorAll('.category-card');
        if (cards.length === 0) return;
        gsap.fromTo(cards,
            { y: 60, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.7, ease: 'power2.out', stagger: 0.1,
                scrollTrigger: { trigger: grid, start: 'top 83%', toggleActions: 'play none none none' }
            }
        );
    });

    // ─────────────────────────────────────────────
    //  BRAND CARDS — scale + fade stagger
    // ─────────────────────────────────────────────
    const brandsSection = document.querySelector('.brands-flex');
    if (brandsSection) {
        const brandCards = brandsSection.querySelectorAll('.brand-card');
        gsap.fromTo(brandCards,
            { scale: 0.8, opacity: 0, y: 30 },
            {
                scale: 1, opacity: 1, y: 0,
                duration: 0.6, ease: 'back.out(1.4)', stagger: 0.1,
                scrollTrigger: { trigger: brandsSection, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // ─────────────────────────────────────────────
    //  ICON CARDS (Why Choose Us) — bounce up
    // ─────────────────────────────────────────────
    const iconCardGroups = document.querySelectorAll('.grid-4');
    iconCardGroups.forEach(grid => {
        const cards = grid.querySelectorAll('.icon-card');
        if (cards.length === 0) return;
        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.65, ease: 'back.out(1.6)', stagger: 0.12,
                scrollTrigger: { trigger: grid, start: 'top 84%', toggleActions: 'play none none none' }
            }
        );
    });

    // ─────────────────────────────────────────────
    //  ABOUT GRID — image from left, text from right
    // ─────────────────────────────────────────────
    gsap.utils.toArray('.about-grid').forEach(grid => {
        const img = grid.querySelector('.about-grid__image');
        const content = grid.querySelector('.about-grid__content');

        if (img) {
            gsap.fromTo(img,
                { x: -80, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: grid, start: 'top 80%', toggleActions: 'play none none none' }
                }
            );
        }
        if (content) {
            gsap.fromTo(content,
                { x: 80, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15,
                    scrollTrigger: { trigger: grid, start: 'top 80%', toggleActions: 'play none none none' }
                }
            );
        }
    });

    // ─────────────────────────────────────────────
    //  GALLERY TILES — zoom-in stagger
    // ─────────────────────────────────────────────
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        const tiles = galleryGrid.querySelectorAll('.gallery-tile');
        gsap.fromTo(tiles,
            { scale: 0.85, opacity: 0, y: 40 },
            {
                scale: 1, opacity: 1, y: 0,
                duration: 0.65, ease: 'power2.out', stagger: 0.08,
                scrollTrigger: { trigger: galleryGrid, start: 'top 82%', toggleActions: 'play none none none' }
            }
        );
    }

    // ─────────────────────────────────────────────
    //  CONTACT INFO CARDS — slide from bottom
    // ─────────────────────────────────────────────
    const infoCards = document.querySelectorAll('.info-card');
    if (infoCards.length > 0) {
        gsap.fromTo(infoCards,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.7, ease: 'power2.out', stagger: 0.15,
                scrollTrigger: { trigger: infoCards[0], start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // ─────────────────────────────────────────────
    //  CONTACT FORM — fade + slide up
    // ─────────────────────────────────────────────
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        gsap.fromTo(contactForm,
            { y: 60, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: contactForm, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );

        // Each form group staggers in
        const formGroups = contactForm.querySelectorAll('.form-group');
        gsap.fromTo(formGroups,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.1, delay: 0.3,
                scrollTrigger: { trigger: contactForm, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // ─────────────────────────────────────────────
    //  MAP SECTION — fade in
    // ─────────────────────────────────────────────
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        gsap.fromTo(mapContainer,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 1, ease: 'power2.out',
                scrollTrigger: { trigger: mapContainer, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // ─────────────────────────────────────────────
    //  COMPARE TABLE — slide up
    // ─────────────────────────────────────────────
    const compareContainer = document.getElementById('comparison-table-container');
    if (compareContainer) {
        gsap.fromTo(compareContainer,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
                scrollTrigger: { trigger: compareContainer, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // ─────────────────────────────────────────────
    //  INFO BOX (About / Showroom section)
    // ─────────────────────────────────────────────
    const infoBox = document.querySelector('.info-box');
    if (infoBox) {
        gsap.fromTo(infoBox,
            { x: -50, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
                scrollTrigger: { trigger: infoBox, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // ─────────────────────────────────────────────
    //  BRAND FILTER BUTTONS — stagger slide down
    // ─────────────────────────────────────────────
    const filterBar = document.querySelector('.brand-filter-bar');
    if (filterBar) {
        gsap.fromTo(filterBar.querySelectorAll('.brand-filter-btn'),
            { y: -25, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07,
                scrollTrigger: { trigger: filterBar, start: 'top 90%', toggleActions: 'play none none none' }
            }
        );
    }

    // ─────────────────────────────────────────────
    //  FOOTER — columns fade up staggered
    // ─────────────────────────────────────────────
    const footerCols = document.querySelectorAll('.footer-col');
    if (footerCols.length > 0) {
        gsap.fromTo(footerCols,
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.15,
                scrollTrigger: { trigger: '.site-footer', start: 'top 90%', toggleActions: 'play none none none' }
            }
        );
    }

    // Footer bottom line
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        gsap.fromTo(footerBottom,
            { opacity: 0 },
            {
                opacity: 1, duration: 0.8, delay: 0.4, ease: 'power1.out',
                scrollTrigger: { trigger: '.site-footer', start: 'top 88%', toggleActions: 'play none none none' }
            }
        );
    }

    // ─────────────────────────────────────────────
    //  SCROLL PARALLAX on page-hero image
    // ─────────────────────────────────────────────
    const pageHero = document.querySelector('.page-hero--img');
    if (pageHero) {
        gsap.to(pageHero, {
            backgroundPositionY: '30%',
            ease: 'none',
            scrollTrigger: { trigger: pageHero, start: 'top top', end: 'bottom top', scrub: true }
        });
    }
}

// Run after DOM ready
document.addEventListener('DOMContentLoaded', initAllAnimations);
