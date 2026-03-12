import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('nav button.md\\:hidden');
    const desktopMenu = document.querySelector('.md\\:flex.items-center.gap-8');
    let isMenuOpen = false;

    if (menuBtn && desktopMenu) {
        // We create a mobile menu container
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'fixed inset-0 bg-background-dark/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 transform translate-x-full transition-transform duration-300 md:hidden';

        // Copy links
        const links = desktopMenu.querySelectorAll('a, button');
        links.forEach(link => {
            const clone = link.cloneNode(true);
            clone.classList.add('text-lg');
            mobileMenu.appendChild(clone);
        });

        document.body.appendChild(mobileMenu);

        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileMenu.style.transform = isMenuOpen ? 'translateX(0)' : 'translateX(100%)';
            menuBtn.innerHTML = isMenuOpen
                ? '<span class="material-symbols-outlined">close</span>'
                : '<span class="material-symbols-outlined">menu</span>';
        });

        mobileMenu.querySelectorAll('a, button').forEach(item => {
            item.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.style.transform = 'translateX(100%)';
                menuBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
            });
        });
    }

    // Before/After Sliders
    const sliders = document.querySelectorAll('.cursor-ew-resize');

    sliders.forEach(slider => {
        let isDown = false;
        let startX;

        // The "before" image container has w-1/2 initially
        const beforeImage = slider.querySelector('.w-1\\/2');
        const handle = slider.querySelector('.slider-handle');

        if (!beforeImage || !handle) return;

        // Reset initial state to be dynamic based on %
        beforeImage.style.width = '50%';
        handle.style.left = '50%';

        const updateSlider = (e) => {
            if (!isDown) return;

            let x;
            // Handle Desktop (mouse) and Mobile (touch)
            if (e.type.includes('mouse')) {
                x = e.pageX - slider.offsetLeft;
            } else if (e.type.includes('touch')) {
                x = e.touches[0].pageX - slider.offsetLeft;
            }

            // Calculate percentage
            const percent = Math.max(0, Math.min((x / slider.offsetWidth) * 100, 100));

            beforeImage.style.width = `${percent}%`;
            handle.style.left = `${percent}%`;
        };

        // Mouse Events
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('cursor-grabbing');
        });

        window.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('cursor-grabbing');
        });

        window.addEventListener('mousemove', updateSlider);

        // Touch Events
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDown = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (isDown) updateSlider(e);
        }, { passive: true });
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('section > div, section h2, section p, .group');

    // Add reveal classes to elements
    revealElements.forEach((el, index) => {
        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
            el.classList.add('reveal');
            // Add staggered delay to child cards
            if (el.classList.contains('group')) {
                el.classList.add(`delay-${(index % 3 + 1) * 100}`);
            }
        }
    });

    const reveal = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger initial check
});
