/* ================================================================================
   JavaScript COMPARTILHADO - Funções Reutilizáveis
   ================================================================================ */

/**
 * Toggle FAQ Item - Abre/fecha item FAQ
 */
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const wasActive = faqItem.classList.contains('active');
    
    // Fecha todos os items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abre o item clicado se não estava ativo
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

/**
 * Smooth Scroll - Scroll suave para seções
 */
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

/**
 * Navbar Scroll Effect - Efeito de sombra ao scroll
 */
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(30, 58, 95, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 16px rgba(30, 58, 95, 0.12)';
    }
    
    lastScroll = currentScroll;
});

/**
 * Animate Stats on Load - Anima números de stats ao carregar
 */
window.addEventListener('load', () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = stat.textContent;
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            stat.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 300);
    });
});
