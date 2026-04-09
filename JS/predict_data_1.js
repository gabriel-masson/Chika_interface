
        // Toggle Switch Function
        function toggleSwitch(element) {
            const toggle = element.querySelector('.toggle');
            toggle.classList.toggle('active');
        }

        // FAQ Toggle Function
        function toggleFaq(element) {
            const faqItem = element.parentElement;
            const wasActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!wasActive) {
                faqItem.classList.add('active');
            }
        }

        // Smooth Scroll
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

        // Form Validation
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

        // Navbar Scroll Effect
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

        // Animate Stats on Load
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
