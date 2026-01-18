/* --- script.js --- */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. TYPEWRITER EFEKT
    const textElement = document.getElementById('type-text');
    
    if (textElement) {
        const phrases = ['webové stránky', 'vizuální identity', 'značky', 'řešení', 'loga', 'tiskoviny', 'vizitky'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 1000);
    }

    // 2. KONTAKTNÍ MODAL
    const contactModal = document.getElementById('contact-modal');
    const contactCloseBtn = contactModal ? contactModal.querySelector('.modal-close') : null;
    const contactTriggers = document.querySelectorAll('.btn-header, .btn-footer'); 

    if (contactModal) {
        const openContactModal = (e) => {
            e.preventDefault();
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeContactModal = () => {
            contactModal.classList.remove('active');
            document.body.style.overflow = ''; 
        };

        contactTriggers.forEach(btn => btn.addEventListener('click', openContactModal));
        
        if (contactCloseBtn) contactCloseBtn.addEventListener('click', closeContactModal);

        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) closeContactModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) closeContactModal();
        });
    }

    // 3. PROJEKTOVÝ MODAL
    const projectModal = document.getElementById('project-modal');
    
    // Globální funkce pro zavření, aby šla volat z HTML
    window.closeProjectModal = function() {
        if (projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Globální funkce pro otevření (volaná z onclick na kartě)
    window.openProject = function(element) {
        const title = element.getAttribute('data-title');
        const category = element.getAttribute('data-category');
        const desc = element.getAttribute('data-desc');
        const image = element.getAttribute('data-image');

        if (document.getElementById('modal-title-target')) {
            document.getElementById('modal-title-target').innerText = title;
            document.getElementById('modal-cat-target').innerText = category;
            document.getElementById('modal-desc-target').innerText = desc;
            document.getElementById('modal-img-target').style.backgroundImage = `url('${image}')`;
        }

        if (projectModal) {
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (projectModal) {
        // Zavření křížkem uvnitř modalu je řešeno přes onclick v HTML
        
        // Zavření kliknutím na pozadí
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) window.closeProjectModal();
        });

        // Zavření Escapem
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                window.closeProjectModal();
            }
        });
    }
});