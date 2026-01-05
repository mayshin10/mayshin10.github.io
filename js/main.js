// Theme toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    // Get theme: saved preference or system preference (for first visit)
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        // First visit: use system preference (already set by inline script)
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
    
    themeToggle.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Highlight active tab based on scroll position
    const sections = ['about', 'research-interests', 'experience', 'education', 'publications', 'projects'];
    const tabLinks = document.querySelectorAll('.header-tab');
    
    function updateActiveTab() {
        const scrollPosition = window.scrollY + 150;
        
        let activeSection = null;
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop <= scrollPosition) {
                activeSection = sections[i];
                break;
            }
        }
        
        tabLinks.forEach(tab => {
            if (tab.dataset.section === activeSection) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveTab);
    updateActiveTab();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
