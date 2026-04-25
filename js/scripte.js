/**
 * Schmidt Ruhr Apps - Interactive Logic
 * Author: Codex / Silas Schmidt
 * Date: 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn?.querySelector('i');
    const menuToggle = document.getElementById('mobile-menu');
    const navigation = document.getElementById('site-navigation');
    const navbar = document.querySelector('.navbar');
    const faqButtons = document.querySelectorAll('.faq-question');
    const revealElements = document.querySelectorAll('.reveal');

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(savedTheme || preferredTheme);

    themeBtn?.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    const closeMenu = () => {
        if (!menuToggle || !navigation) {
            return;
        }

        navigation.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        const menuIcon = menuToggle.querySelector('i');
        if (menuIcon) {
            menuIcon.className = 'fa-solid fa-bars';
        }
    };

    const openMenu = () => {
        if (!menuToggle || !navigation) {
            return;
        }

        navigation.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
        const menuIcon = menuToggle.querySelector('i');
        if (menuIcon) {
            menuIcon.className = 'fa-solid fa-xmark';
        }
    };

    menuToggle?.addEventListener('click', () => {
        const isOpen = navigation?.classList.contains('is-open');
        if (isOpen) {
            closeMenu();
            return;
        }
        openMenu();
    });

    navigation?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 980) {
                closeMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 980) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    faqButtons.forEach((button) => {
        const answerId = button.getAttribute('aria-controls');
        const answer = answerId ? document.getElementById(answerId) : null;

        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            faqButtons.forEach((otherButton) => {
                const otherAnswerId = otherButton.getAttribute('aria-controls');
                const otherAnswer = otherAnswerId ? document.getElementById(otherAnswerId) : null;
                otherButton.setAttribute('aria-expanded', 'false');
                otherAnswer?.setAttribute('hidden', '');
            });

            if (!isExpanded) {
                button.setAttribute('aria-expanded', 'true');
                answer?.removeAttribute('hidden');
            }
        });
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add('active'));
    }

    const updateNavbar = () => {
        if (!navbar) {
            return;
        }

        if (window.scrollY > 16) {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
});
