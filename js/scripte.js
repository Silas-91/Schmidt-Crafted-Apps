document.addEventListener("DOMContentLoaded", function() {
    // ScrollMagic Controller erstellen
    var controller = new ScrollMagic.Controller();

    // Hero Animation (kann testweise auskommentiert werden)
    var heroAnimation = gsap.fromTo('.hero-content h1, .hero-content p', 
        { opacity: 0, y: 20 },  // Kleinere y-Verschiebung
        { opacity: 1, y: 0, duration: 1, stagger: 0.3 }
    );

    new ScrollMagic.Scene({
        triggerElement: '.hero-content',
        triggerHook: 0.5
    })
    .setTween(heroAnimation)
    .addTo(controller);

    // Section Animations (deaktiviert)
    // Project Animations (deaktiviert)
});
