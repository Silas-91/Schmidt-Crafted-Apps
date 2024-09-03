document.addEventListener("DOMContentLoaded", function() {
    var controller = new ScrollMagic.Controller();

    // Hero Animation
    var heroAnimation = gsap.fromTo('.hero-content h1, .hero-content p', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3 }
    );

    new ScrollMagic.Scene({
        triggerElement: '.hero-content',
        triggerHook: 0.5
    })
    .setTween(heroAnimation)
    .addTo(controller);

    // Section Visibility Animations
    var fadeInSections = document.querySelectorAll('.fade-in-section');

    fadeInSections.forEach(function(section) {
        // Create ScrollMagic Scene for each section
        var fadeInScene = new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 0.9,  // Adjust this value as needed (0.9 is near bottom of viewport)
            reverse: false     // Animation should only happen once
        })
        .on("enter", function() {
            section.classList.add('visible');
        })
        .addTo(controller);
    });
});
