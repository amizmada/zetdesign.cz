/* --- script.js --- */

document.addEventListener('DOMContentLoaded', () => {
    
    // Typewriter efekt - Pouze pokud existuje element na stránce
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
        
        // Spustit psaní po 1s
        setTimeout(type, 1000);
    }
});