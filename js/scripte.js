// Hier könnten Animationen oder Interaktionen hinzugefügt werden
document.addEventListener("DOMContentLoaded", function() {
    // Beispiel: Smooth Scroll zu bestimmten Abschnitten
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});