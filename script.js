/* =========================================
   ZET_DESIGN | MAIN SCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------
       1. OBSLUHA MODÁLNÍCH OKEN (KONTAKT)
       ----------------------------------------- */
    const contactModal = document.getElementById('contact-modal');
    // Vybereme všechna tlačítka, která mají otevírat kontakt
    const openBtns = document.querySelectorAll('.btn-header, .btn-footer, a[href="#contact-modal"]');
    const closeBtns = document.querySelectorAll('.modal-close');

    if (contactModal) {
        // A) Otevření modalu
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Zabrání odskoku na #
                contactModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Zablokuje scrollování stránky
            });
        });

        // B) Zavření křížkem
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                closeAllModals();
            });
        });

        // C) Zavření kliknutím mimo okno (na tmavé pozadí)
        window.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal-overlay')) {
                closeAllModals();
            }
        });
    }

    // Pomocná funkce pro zavření všech modalů
    function closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = ''; // Obnoví scrollování
    }


    /* -----------------------------------------
       2. TYPEWRITER EFEKT (JEN HLAVNÍ STRANA)
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

            // Rychlost psaní vs. mazání
            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                // Slovo dopsáno, čekáme
                isDeleting = true;
                typeSpeed = 2000; 
            } else if (isDeleting && charIndex === 0) {
                // Slovo smazáno, jdeme na další
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // Spuštění efektu
        type();
    }


    /* -----------------------------------------
       3. INTERAKTIVNÍ KARTY NA MOBILU (SCROLL)
       ----------------------------------------- */
    // Tato funkce běží nezávisle na tom, zda jsme na HP nebo podstránce
    window.addEventListener('scroll', highlightOnScroll);

    function highlightOnScroll() {
        // Spustíme jen na zařízeních užších než 1024px
        if (window.innerWidth > 1024) {
            // Na PC vyčistíme případné třídy a ukončíme funkci
            document.querySelectorAll('.service-panel').forEach(p => p.classList.remove('mobile-active'));
            return;
        }

        const panels = document.querySelectorAll('.service-panel');
        const centerScreen = window.innerHeight / 2; // Střed obrazovky

        panels.forEach(panel => {
            const rect = panel.getBoundingClientRect();
            
            // Kde je střed dané karty?
            const panelCenter = rect.top + (rect.height / 2);
            
            // Vzdálenost středu karty od středu obrazovky
            const distance = Math.abs(centerScreen - panelCenter);

            // Tolerance 180px od středu - pokud je v zóně, svítí
            if (distance < 180) {
                panel.classList.add('mobile-active');
            } else {
                panel.classList.remove('mobile-active');
            }
        });
    }

});