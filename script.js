// Custom JavaScript for Aerodyne International

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initScrollProgress();
    initSmoothScrolling();
    initAnimations();
    initNavbarBehavior();
    initCopyToClipboard();
    
    // Scroll Progress Bar
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Intersection Observer for Animations
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Add fade-in class to elements and observe them
        const animateElements = document.querySelectorAll('.mission-card, .connect-card, .contact-info, .display-5, .lead');
        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    // Navbar Behavior
    function initNavbarBehavior() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            // Add/remove scrolled class for styling
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Copy to Clipboard Functionality
    function initCopyToClipboard() {
        console.log('initCopyToClipboard function called');
        const fullCaAddress = 'Ci7F8StvnrSAFqNQN5wQRNP3FoALaRD15WQiCz1dpump';
        
        // Function to truncate CA address
        function truncateAddress(address) {
            if (address.length <= 8) return address;
            return address.substring(0, 4) + '...' + address.substring(address.length - 4);
        }
        
        // Update the display with truncated address
        const caAddressDisplay = document.querySelector('.ca-address-display');
        if (caAddressDisplay) {
            caAddressDisplay.textContent = truncateAddress(fullCaAddress);
            console.log('CA address display updated');
        } else {
            console.log('CA address display not found');
        }
        
        // Handle copy button click
        const copyBtn = document.querySelector('.copy-ca-btn');
        console.log('Copy button found:', copyBtn);
        
        if (copyBtn) {
            copyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Copy button clicked');
                
                // Try modern clipboard API first
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(fullCaAddress).then(() => {
                        console.log('Address copied successfully');
                        // Change button appearance
                        this.classList.add('copied');
                        this.innerHTML = '<i class="fas fa-check"></i>';
                        
                        // Show success message
                        const originalText = this.getAttribute('title');
                        this.setAttribute('title', 'Address copied!');
                        
                        // Reset after 2 seconds
                        setTimeout(() => {
                            this.classList.remove('copied');
                            this.innerHTML = '<i class="fas fa-copy"></i>';
                            this.setAttribute('title', originalText);
                        }, 2000);
                    }).catch(err => {
                        console.error('Modern clipboard API failed:', err);
                        // Fallback to execCommand
                        copyToClipboardFallback(fullCaAddress, this);
                    });
                } else {
                    console.log('Using fallback copy method');
                    // Fallback for older browsers
                    copyToClipboardFallback(fullCaAddress, this);
                }
            });
        } else {
            console.log('Copy button not found in DOM');
        }
        
        // Fallback copy function
        function copyToClipboardFallback(text, button) {
            try {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                
                if (successful) {
                    console.log('Address copied using fallback method');
                    // Show success
                    button.classList.add('copied');
                    button.innerHTML = '<i class="fas fa-check"></i>';
                    
                    const originalText = button.getAttribute('title');
                    button.setAttribute('title', 'Address copied!');
                    
                    setTimeout(() => {
                        button.classList.remove('copied');
                        button.innerHTML = '<i class="fas fa-copy"></i>';
                        button.setAttribute('title', originalText);
                    }, 2000);
                } else {
                    console.error('Fallback copy failed');
                    alert('Failed to copy address. Please copy manually: ' + text);
                }
            } catch (err) {
                console.error('Fallback copy error:', err);
                alert('Failed to copy address. Please copy manually: ' + text);
            }
        }
    }
    
    // Parallax Effect for Hero Section
    function initParallax() {
        const heroSection = document.querySelector('.hero-section');
        const heroIcon = document.querySelector('.hero-icon');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroIcon) {
                heroIcon.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Initialize parallax
    initParallax();
    
    // Mobile Menu Toggle Enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on a link
        const mobileNavLinks = navbarCollapse.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Form validation (if contact form is added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll events with debouncing
    const debouncedScrollHandler = debounce(() => {
        // Any scroll-based calculations can go here
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Add some interactive hover effects
    const cards = document.querySelectorAll('.mission-card, .connect-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Console welcome message
    console.log('%c🚀 Welcome to Aerodyne International!', 'color: #0d6efd; font-size: 20px; font-weight: bold;');
    console.log('%cInnovating Everything, Everywhere', 'color: #6c757d; font-size: 14px;');
}); 