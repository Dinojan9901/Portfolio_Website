// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or use system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    input.classList.add('error');
    errorMessage.textContent = message;
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    input.classList.remove('error');
    errorMessage.textContent = '';
}

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Real-time validation
    nameInput.addEventListener('blur', () => {
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Name must be at least 2 characters');
        } else {
            clearError(nameInput);
        }
    });
    
    emailInput.addEventListener('blur', () => {
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
        } else {
            clearError(emailInput);
        }
    });
    
    messageInput.addEventListener('blur', () => {
        if (!validateMessage(messageInput.value)) {
            showError(messageInput, 'Message must be at least 10 characters');
        } else {
            clearError(messageInput);
        }
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!validateMessage(messageInput.value)) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Message Sent!';
            button.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                this.reset();
            }, 3000);
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        nav.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down & past header
        nav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add animation to skill tags
const skillTags = document.querySelectorAll('.skill-tags span');
skillTags.forEach(tag => {
    tag.addEventListener('mouseover', () => {
        tag.style.transform = 'scale(1.1)';
        tag.style.transition = 'transform 0.3s';
    });
    
    tag.addEventListener('mouseout', () => {
        tag.style.transform = 'scale(1)';
    });
});
