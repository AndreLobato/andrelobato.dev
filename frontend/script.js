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
    closeDialog();
    openThankYouDialog();
});

// Close dialogs when clicking outside
document.querySelectorAll('.dialog-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});

// Check for #thank-you hash on page load
window.addEventListener('load', function() {
    if (window.location.hash === '#thank-you') {
        openThankYouDialog();
        // Remove the hash without triggering a page jump
        history.pushState('', document.title, window.location.pathname);
    }
});