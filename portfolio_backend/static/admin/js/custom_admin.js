
// Custom Portfolio Admin JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add dashboard statistics if on index page
    if (document.querySelector('.dashboard')) {
        createDashboardStats();
    }
    
    // Add smooth animations
    addSmoothAnimations();
    
    // Enhance form interactions
    enhanceFormInteractions();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
});

function createDashboardStats() {
    const contentTitle = document.querySelector('#content-main h1');
    if (!contentTitle) return;
    
    // Create stats container
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-grid';
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-number" id="profile-count">1</div>
            <div class="stat-label">Profile</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" id="skills-count">0</div>
            <div class="stat-label">Skills</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" id="projects-count">0</div>
            <div class="stat-label">Projects</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" id="messages-count">0</div>
            <div class="stat-label">Messages</div>
        </div>
    `;
    
    // Insert after the title
    contentTitle.parentNode.insertBefore(statsContainer, contentTitle.nextSibling);
    
    // Animate numbers
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

function addSmoothAnimations() {
    // Add fade-in animation to modules
    const modules = document.querySelectorAll('.module');
    modules.forEach((module, index) => {
        module.style.opacity = '0';
        module.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            module.style.transition = 'all 0.5s ease';
            module.style.opacity = '1';
            module.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('#result_list tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function enhanceFormInteractions() {
    // Add focus effects to form fields
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
            this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        field.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });
    
    // Auto-save form data to localStorage
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const formId = form.id || 'admin-form';
        
        // Load saved data
        const savedData = localStorage.getItem(`admin-form-${formId}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && field.type !== 'file') {
                    field.value = data[key];
                }
            });
        }
        
        // Save data on input
        form.addEventListener('input', function() {
            const formData = new FormData(form);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                if (key !== 'csrfmiddlewaretoken') {
                    data[key] = value;
                }
            }
            
            localStorage.setItem(`admin-form-${formId}`, JSON.stringify(data));
        });
        
        // Clear saved data on successful submit
        form.addEventListener('submit', function() {
            setTimeout(() => {
                localStorage.removeItem(`admin-form-${formId}`);
            }, 1000);
        });
    });
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + S to save form
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            const saveButton = document.querySelector('input[type="submit"], button[type="submit"]');
            if (saveButton) {
                saveButton.click();
                showNotification('Form saved!', 'success');
            }
        }
        
        // Ctrl/Cmd + D to go to dashboard
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            window.location.href = '/admin/';
        }
        
        // Escape to close any modals or go back
        if (e.key === 'Escape') {
            const backButton = document.querySelector('.breadcrumbs a');
            if (backButton && backButton.textContent.includes('‹')) {
                window.location.href = backButton.href;
            }
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#667eea'};
        color: white;
        padding: 15px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Progress bar for long-running operations
function showProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'admin-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    return progressBar;
}

// Show progress bar on form submissions
document.addEventListener('submit', function() {
    const progressBar = showProgressBar();
    let width = 0;
    
    const interval = setInterval(() => {
        width += Math.random() * 15;
        if (width >= 90) {
            width = 90;
            clearInterval(interval);
        }
        progressBar.style.width = width + '%';
    }, 100);
    
    // Complete progress bar when page loads
    window.addEventListener('load', function() {
        progressBar.style.width = '100%';
        setTimeout(() => {
            progressBar.remove();
        }, 500);
        clearInterval(interval);
    });
});
