
/* ================================================================================
   JavaScript ESPECÍFICO - predict_data_1.html
   Inclui: predict_pages.js para funções compartilhadas
   ================================================================================ */

/**
 * Toggle Switch Function - Ativa/desativa toggle
 */
function toggleSwitch(element) {
    const toggle = element.querySelector('.toggle');
    toggle.classList.toggle('active');
}

/**
 * Form Validation - Validação e submit do formulário
 */
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Processando...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado com sucesso!';
        submitBtn.style.background = 'var(--success)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 2000);
    }, 1500);
});

