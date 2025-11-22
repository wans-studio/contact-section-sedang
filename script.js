// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Form fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            showError(nameInput, nameError, 'Nama lengkap harus diisi');
            return false;
        } else if (name.length < 3) {
            showError(nameInput, nameError, 'Nama minimal 3 karakter');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError(nameInput, nameError, 'Nama hanya boleh berisi huruf');
            return false;
        } else {
            showSuccess(nameInput, nameError);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailInput, emailError, 'Email harus diisi');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Format email tidak valid');
            return false;
        } else {
            showSuccess(emailInput, emailError);
            return true;
        }
    }
    
    function validateSubject() {
        const subject = subjectInput.value.trim();
        
        if (subject === '') {
            showError(subjectInput, subjectError, 'Subjek harus diisi');
            return false;
        } else if (subject.length < 5) {
            showError(subjectInput, subjectError, 'Subjek minimal 5 karakter');
            return false;
        } else {
            showSuccess(subjectInput, subjectError);
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            showError(messageInput, messageError, 'Pesan harus diisi');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, messageError, 'Pesan minimal 10 karakter');
            return false;
        } else {
            showSuccess(messageInput, messageError);
            return true;
        }
    }
    
    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            validateName();
        }
    });
    
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '') {
            validateEmail();
        }
    });
    
    subjectInput.addEventListener('blur', validateSubject);
    subjectInput.addEventListener('input', function() {
        if (subjectInput.value.trim() !== '') {
            validateSubject();
        }
    });
    
    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim() !== '') {
            validateMessage();
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Disable submit button
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Mengirim...</span>';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Hide form and show success message
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                // Reset form after 3 seconds
                setTimeout(function() {
                    form.reset();
                    form.style.display = 'flex';
                    successMessage.classList.remove('show');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <span>Kirim Pesan</span>
                        <svg class="icon-send" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    `;
                    
                    // Remove all validation classes
                    nameInput.classList.remove('success', 'error');
                    emailInput.classList.remove('success', 'error');
                    subjectInput.classList.remove('success', 'error');
                    messageInput.classList.remove('success', 'error');
                }, 3000);
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
    
    console.log('Contact form initialized successfully!');
});