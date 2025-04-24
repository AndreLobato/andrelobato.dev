let currentLang = localStorage.getItem('preferredLanguage') || 'en';

function updateContent(lang) {
    const content = translations[lang];
    
    document.title = content.headTitle;
    document.getElementById('pageTitle').textContent = content.title;
    document.getElementById('pageDescription').textContent = content.description;
    document.getElementById('pageClosure').textContent = content.pageClosure;
    document.getElementById('servicesTitle').textContent = content.servicesTitle;
    document.getElementById('contactButton').textContent = content.contactButton;
    document.getElementById('meetingButton').textContent = content.meetingButton;
    document.getElementById('contactFormTitle').textContent = content.contactFormTitle;
    document.getElementById('thankYouTitle').textContent = content.thankYouTitle;
    document.getElementById('thankYouMessage').textContent = content.thankYouMessage;
    document.getElementById('closeButton').textContent = content.closeButton;
    
    // Update services list
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = content.services
        .map(service => `<li>${service}</li>`)
        .join('');
}

function setLanguage(lang) {
    const otherLang = lang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('preferredLanguage', lang);
    document.getElementById('langIndicator').textContent = otherLang.toUpperCase();
    updateContent(lang);
}


function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'pt' : 'en';
    setLanguage(currentLang);
}

// Initialize content
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    updateContent(currentLang);
});

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