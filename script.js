/* --- script.js (FINAL VERSION) --- */

// 1. OTEVŘENÍ DETAILU PROJEKTU
function openProject(card) {
    const modal = document.getElementById('project-modal');
    
    // Načtení textů z data atributů karty
    const title = card.getAttribute('data-title');
    const category = card.getAttribute('data-category');
    const desc = card.getAttribute('data-desc');
    
    // Vložení textů do modalu
    document.getElementById('modal-title-target').innerText = title;
    document.getElementById('modal-cat-target').innerText = category;
    document.getElementById('modal-desc-target').innerText = desc;

    // --- LOGIKA PRO OBRÁZKY (GALERIE) ---
    const galleryContainer = document.getElementById('modal-gallery-target');
    
    // Pokud kontejner pro galerii v HTML neexistuje (máš staré HTML), zkusíme staré ID
    if (!galleryContainer) {
        console.warn("Nenalezen 'modal-gallery-target'. Zkontroluj HTML v project-modal.");
        const oldImgTarget = document.getElementById('modal-img-target');
        if (oldImgTarget) {
            // Fallback pro starou verzi (jedna fotka na pozadí)
            const singleImg = card.getAttribute('data-image');
            oldImgTarget.style.backgroundImage = `url('${singleImg}')`;
        }
    } else {
        // NOVÁ VERZE: Vyčistit galerii a naplnit novými fotkami
        galleryContainer.innerHTML = ''; 
        
        const imagesRaw = card.getAttribute('data-images'); // Hledáme pole fotek
        const singleImageRaw = card.getAttribute('data-image'); // Hledáme jednu fotku (staré data)
        
        let images = [];

        // Zkusíme načíst data-images (JSON pole)
        if (imagesRaw) {
            try {
                images = JSON.parse(imagesRaw);
            } catch (e) {
                console.error("Chyba v JSON obrázků, beru to jako jeden string.");
                images = [imagesRaw];
            }
        } 
        // Pokud není pole, zkusíme data-image (starý formát)
        else if (singleImageRaw) {
            images = [singleImageRaw];
        }

        // Vytvoření <img> elementů
        if (images.length > 0) {
            images.forEach(imgUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.alt = title;
                imgElement.style.width = "100%";
                imgElement.style.display = "block";
                imgElement.style.marginBottom = "4px"; // Mezera mezi fotkami
                galleryContainer.appendChild(imgElement);
            });
        }
    }

    // Zobrazení modalu (přidání třídy active)
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Zamezí scrollování stránky na pozadí
}

// 2. ZAVŘENÍ MODALU (Projekt i Kontakt)
function closeProjectModal() {
    const activeModals = document.querySelectorAll('.modal-overlay.active');
    activeModals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = ''; // Obnoví scrollování
}

// 3. ZAVŘENÍ KLIKEM MIMO OKNO (Overlay)
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 4. OBSLUHA KONTAKTNÍHO MODALU (pokud není řešeno inline v HTML)
const contactBtns = document.querySelectorAll('a[href="#contact-modal"], .btn-header, .footer-cta .btn-footer');
const contactModal = document.getElementById('contact-modal');

if (contactModal) {
    // Otevření
    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Pokud tlačítko nemá onclick v HTML, otevřeme modal JS
            if (!btn.getAttribute('onclick')) {
                e.preventDefault();
                contactModal.classList.add('active');
            }
        });
    });

    // Zavření křížkem
    const closeBtn = contactModal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            contactModal.classList.remove('active');
        });
    }
}

// 5. TYPEWRITER EFEKT (Pro hlavní stranu)
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

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000); // Čekání po napsání slova
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    type();
}