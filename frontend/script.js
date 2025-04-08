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
    closeDialog();
});