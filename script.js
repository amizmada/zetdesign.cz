/* =========================================
   zet_design | MAIN SCRIPT 
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------
       1. TYPEWRITER EFEKT (JEN HLAVNÍ STRANA)
       ----------------------------------------- */
    const typeText = document.getElementById('type-text');
    
    if (typeText) {
        const words = ["webové stránky", "vizuální identity", "digitální produkty", "unikátní značky"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typeText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pauza po dopsání slova
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pauza před psaním nového
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }


    /* -----------------------------------------
       2. INTERAKTIVNÍ KARTY NA MOBILU (OPTIMALIZOVANÝ SCROLL)
       ----------------------------------------- */
    const panels = document.querySelectorAll('.service-panel');
    
    if (panels.length > 0) {
        let isScrolling = false;

        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    highlightOnScroll();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });

        function highlightOnScroll() {
            // Na PC (nad 1024px) funkci vypneme a vyčistíme třídy
            if (window.innerWidth > 1024) {
                panels.forEach(p => p.classList.remove('mobile-active'));
                return;
            }

            const centerScreen = window.innerHeight / 2;

            panels.forEach(panel => {
                const rect = panel.getBoundingClientRect();
                const panelCenter = rect.top + (rect.height / 2);
                const distance = Math.abs(centerScreen - panelCenter);

                // Pokud je karta blízko středu (tolerance 180px), aktivujeme ji
                if (distance < 180) {
                    panel.classList.add('mobile-active');
                } else {
                    panel.classList.remove('mobile-active');
                }
            });
        }
    }


    /* -----------------------------------------
       3. MOBILNÍ MENU
       ----------------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-menu-overlay');

    if (hamburger && mobileNav) {
        
        function toggleMenu() {
            const isActive = hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Zablokovat scroll stránky jen když je menu otevřené
            document.body.style.overflow = isActive ? 'hidden' : '';
        }

        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        // Globální funkce pro zavření menu (volaná z HTML onclick)
        window.closeMobileMenu = function() {
            if (mobileNav.classList.contains('active')) {
                toggleMenu();
            }
        };
    }
});