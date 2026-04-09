
        function toggleFaq(element) {
            const faqItem = element.parentElement;
            const wasActive = faqItem.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!wasActive) {
                faqItem.classList.add('active');
            }
        }

        document.getElementById('painForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.btn-continue');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                btn.style.background = 'linear-gradient(135deg, #27ae60 0%, #219a52 100%)';
                
                setTimeout(() => {
                    alert('Redirecionando para a tela de Resultado...');
                    btn.innerHTML = originalHTML;
                    btn.style.pointerEvents = '';
                    btn.style.opacity = '';
                    btn.style.background = '';
                }, 1500);
            }, 1200);
        });