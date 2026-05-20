document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. STICKY HEADER SCROLL HANDLING
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. MOBILE DRAWER MENU NAVIGATION
       ========================================================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       3. HERO TYPING TEXT ANIMATION
       ========================================================================== */
    const typingSpan = document.querySelector('.typing-text');
    if (typingSpan) {
        const words = JSON.parse(typingSpan.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        let erasingDelay = 50;
        let nextWordDelay = 2000;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Delete letters
                typingSpan.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = erasingDelay;
            } else {
                // Type letters
                typingSpan.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100;
            }

            // Word completed typing
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingDelay = nextWordDelay; // Wait before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Loop back
                typingDelay = 500; // Small pause before next word
            }

            setTimeout(type, typingDelay);
        }

        // Start typing loop
        setTimeout(type, 1000);
    }

    /* ==========================================================================
       4. SCROLLSPY (ACTIVE LINK ON SCROLL)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    function scrollSpy() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Highlight a bit early before hitting the exact top edge
            const sectionTop = current.offsetTop - 120; 
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-link[href*=${sectionId}]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollSpy);

    /* ==========================================================================
       5. SKILLS CATEGORY TABS
       ========================================================================== */
    const skillsTabButtons = document.querySelectorAll('.skills-tab-btn');
    const skillsPanels = document.querySelectorAll('.skills-panel');

    skillsTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from other buttons
            skillsTabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');
            
            // Toggle visibility of category grids
            skillsPanels.forEach(panel => {
                if (panel.getAttribute('id') === targetId) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });

    /* ==========================================================================
       6. FEATURED PROJECTS CATEGORY FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active selection from other buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    // Add modern scale animation
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* ==========================================================================
       7. CONTACT FORM CLIENT-SIDE VALIDATION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

            // Validate fields
            inputs.forEach(input => {
                const formGroup = input.parentElement;
                
                if (input.type === 'email') {
                    // Regular expression for validating Email addresses
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        formGroup.classList.add('error');
                        isFormValid = false;
                    } else {
                        formGroup.classList.remove('error');
                    }
                } else {
                    if (input.value.trim() === '') {
                        formGroup.classList.add('error');
                        isFormValid = false;
                    } else {
                        formGroup.classList.remove('error');
                    }
                }

                // Remove error styling instantly on keystroke / focus
                input.addEventListener('input', () => {
                    formGroup.classList.remove('error');
                });
            });

            if (isFormValid) {
                // Mock form submission response
                showToastNotification();
                contactForm.reset();
            }
        });
    }

    // Success Toast trigger helper
    function showToastNotification() {
        if (toast) {
            toast.classList.add('show');
            
            // Automatically hide notice after 4 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }
    }
});
