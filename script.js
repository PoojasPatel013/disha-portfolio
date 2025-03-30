// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, input, textarea');
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const shapes = document.querySelectorAll('.shape');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonials = document.querySelectorAll('.testimonial');
    const currentTestimonialNum = document.querySelector('.testimonial-pagination .current');
    
    // Cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add slight delay to follower for smooth effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
        
        // Move shapes only when cursor is near them
        shapes.forEach(shape => {
            const shapeRect = shape.getBoundingClientRect();
            const shapeCenterX = shapeRect.left + shapeRect.width / 2;
            const shapeCenterY = shapeRect.top + shapeRect.height / 2;
            
            // Calculate distance between cursor and shape center
            const distanceX = e.clientX - shapeCenterX;
            const distanceY = e.clientY - shapeCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Move shape only if cursor is within certain range
            const moveThreshold = 300;
            if (distance < moveThreshold) {
                // Calculate movement based on distance (closer = more movement)
                const moveFactorX = (distanceX / moveThreshold) * 30;
                const moveFactorY = (distanceY / moveThreshold) * 30;
                
                // Apply movement with smooth transition
                shape.style.transform = `translate(${-moveFactorX}px, ${-moveFactorY}px)`;
            } else {
                // Reset position when cursor is far away
                shape.style.transform = 'translate(0, 0)';
            }
        });
    });
    
    // Cursor hover effect on interactive elements
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('menu-open');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('menu-open');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced bouncy animation for background shapes
    shapes.forEach(shape => {
        const speed = parseFloat(shape.getAttribute('data-speed')) || 0.05;
        const amplitude = parseFloat(shape.getAttribute('data-amplitude')) || 20;
        let posX = 0;
        let posY = 0;
        let time = 0;
        
        function animateShape() {
            time += speed;
            
            // Create bouncy, sloppy movement using sine and cosine with different frequencies
            posX = Math.sin(time) * amplitude;
            posY = Math.cos(time * 0.8) * amplitude;
            
            // Add some random jitter for more organic movement
            posX += (Math.random() - 0.5) * 2;
            posY += (Math.random() - 0.5) * 2;
            
            shape.style.transform = `translate(${posX}px, ${posY}px) rotate(${Math.sin(time * 0.5) * 5}deg)`;
            
            requestAnimationFrame(animateShape);
        }
        
        animateShape();
    });
    
    // Tabs functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Testimonial slider
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        
        // Handle wrapping
        if (index < 0) {
            index = testimonials.length - 1;
        } else if (index >= testimonials.length) {
            index = 0;
        }
        
        currentTestimonial = index;
        testimonials[currentTestimonial].classList.add('active');
        if (currentTestimonialNum) {
            currentTestimonialNum.textContent = (currentTestimonial + 1).toString().padStart(2, '0');
        }
    }
    
    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
        });
    }
    
    if (testimonialNext) {
        testimonialNext.addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
        });
    }
    
    // Auto-rotate testimonials
    if (testimonials.length > 0) {
        setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('section');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial styles for reveal animation
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', checkReveal);
    window.addEventListener('scroll', checkReveal);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
});