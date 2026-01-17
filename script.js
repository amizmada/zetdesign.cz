/* --- script.js --- */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Typewriter efekt
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

    // 2. Logika pro Kontaktní Popup (Modal)
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.querySelector('.modal-close');
    const triggers = document.querySelectorAll('.btn-header, .btn-footer'); // Cílí na obě tlačítka

    if (modal) {
        const openModal = (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Zamezí scrollování pod popupem
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; 
        };

        triggers.forEach(btn => btn.addEventListener('click', openModal));
        
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        // Zavření kliknutím mimo obsah (na overlay)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Zavření klávesou Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
        });
    }
});