function openDialog() {
    document.getElementById('dialogOverlay').style.display = 'flex';
}

function closeDialog() {
    document.getElementById('dialogOverlay').style.display = 'none';
}

function openThankYouDialog() {
    document.getElementById('thankYouOverlay').style.display = 'flex';
}

function closeThankYouDialog() {
    document.getElementById('thankYouOverlay').style.display = 'none';
}

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            closeDialog();
            form.reset();
            openThankYouDialog();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Close dialogs when clicking outside
document.querySelectorAll('.dialog-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});