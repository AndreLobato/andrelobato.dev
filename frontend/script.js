function openDialog() {
    const dialog = document.getElementById('dialogOverlay');
    dialog.style.display = 'flex';
}

function closeDialog() {
    const dialog = document.getElementById('dialogOverlay');
    dialog.style.display = 'none';
}

// Close dialog when clicking outside
document.getElementById('dialogOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('dialogOverlay')) {
        closeDialog();
    }
});

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        // Get reCAPTCHA token
        const token = await grecaptcha.enterprise.execute('6LdhrgsrAAAAAPII4HF2pHn2BVKdxQwjmn7T8Vxk', {action: 'submit'});
        document.getElementById('g-recaptcha-response').value = token;
        
        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            recaptchaToken: token
        };

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // ...rest of your code...
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again.');
    }
    closeDialog();
});