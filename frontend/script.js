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
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Web3Forms returns a status field instead of success
        if (data.status === 'success') {
            closeDialog();
            form.reset();
            setTimeout(() => {
                openThankYouDialog();
            }, 300); // Small delay to allow the first dialog to close
        } else {
            console.error('Form submission failed:', data);
            alert('Failed to send message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
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