document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal animation for premium feel
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate on scroll (progressive enhancement)
    const elementsToAnimate = document.querySelectorAll(`
        .feature-card, .section-header, 
        .community-container, .meaning-container, 
        .architecture-diagram-wrapper, .code-window, 
        .enterprise-container, .bottom-cta-container
    `);
    
    elementsToAnimate.forEach((el, index) => {
        if (!el.classList.contains('fade-in-up')) {
            el.classList.add('fade-in-up');
        }
        // Add a slight delay based on the index for staggered effect in grids
        if (el.classList.contains('feature-card')) {
            el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        }
        observer.observe(el);
    });
    
    // ======== i18n Localization ========
    const translations = {
        'pt': {
            'nav.docs': 'Docs',
            'hero.subtitle': 'Arquitetura modular para Delphi: módulos por rota, DI e pipeline extensível, com integração nativa ao Horse.',
            'hero.start': 'Começar Agora',
            'hero.home': 'Nossa Home',
            'community.title': 'Uma fundação sólida para ecossistemas Delphi',
            'meaning.title': 'Por que <span class="text-gradient">Nidus</span>?',
            'meaning.core.title': 'O Núcleo Central',
            'meaning.core.desc': 'Um ambiente organizado e estruturado onde todo o seu código reside com segurança.',
            'meaning.birth.title': 'Onde Módulos Nascem',
            'meaning.birth.desc': 'O local exato onde lógicas independentes são criadas, encapsuladas e se conectam.',
            'meaning.growth.title': 'Crescimento Incremental',
            'meaning.growth.desc': 'Totalmente plugável e modular, pensado para expandir organicamente com a sua aplicação.',
            'meaning.quote': '"Nidus significa literalmente <strong>ninho, berçário ou foco</strong>. Na arquitetura de software, é o Hub central onde sua aplicação escala e ganha vida."',
            'feat.ext.title': 'Extensível',
            'feat.ext.desc': 'Oferece uma arquitetura maleável que acompanha o crescimento e a complexidade do seu código Delphi.',
            'feat.ver.title': 'Versátil',
            'feat.ver.desc': 'Serve como uma fundação extremamente robusta e elegante para qualquer padrão de servidor.',
            'feat.pro.title': 'Progressivo',
            'feat.pro.desc': 'Traz padrões de design consagrados e soluções solidificadas para o ecossistema Delphi moderno.',
            'grid.title': 'Tudo o que você precisa.',
            'grid.desc': 'Crie aplicações do lado do servidor robustas, poderosas e massivamente escaláveis sem ter que reinventar a roda.',
            'grid.mod.title': 'Modularidade',
            'grid.mod.desc': 'Simplifique a manutenção, organizando toda a aplicação de ponta a ponta em módulos autocontidos.',
            'grid.di.title': 'Injeção de Dependências',
            'grid.di.desc': 'Controle preciso do ciclo de vida das instâncias e um design voltado à maior testabilidade do seu software.',
            'grid.pipe.title': 'Pipeline Extensível',
            'grid.pipe.desc': 'Intercepte fluxos livremente através de Guards e Middlewares independentemente de onde ocorrerem.',
            'grid.int.title': 'Integração Padrão',
            'grid.int.desc': 'Compatibilidade nativa total com REST APIs, trazendo suporte imediato ao consagrado microframework Horse.',
            'code.title': 'O Fluxo Descomplicado',
            'code.desc': 'Veja como definimos rotas, injetamos middlewares e organizamos a cadeia de chamada arquitetural do Nidus.',
            'code.diag.title': 'O Ciclo de Vida do HTTP',
            'supp.title': 'O framework de código aberto desenhado para o futuro. Construa de forma Enterprise.',
            'supp.desc1': 'Nidus é gratuito e de código aberto. Mas para empresas que precisam de máxima segurança, ajudamos com um kit completo de desenvolvimento de APIs escaláveis.',
            'supp.desc2': 'Entre em contato conosco para saber mais sobre assinaturas, consultoria de especialistas, suporte corporativo on-site, treinamentos e sessões privadas no ecossistema Delphi.',
            'supp.btn': 'Saiba mais sobre Suporte Enterprise',
            'cta.title': 'Pronto para modernizar seu código?',
            'cta.desc': 'Junte-se à comunidade de desenvolvedores e arquitetos que estão elevando o padrão de seus projetos em Delphi com Nidus.',
            'cta.btn1': 'Ler a Documentação',
            'cta.btn2': 'Acessar GitHub',
            'foot.desc': 'O futuro da estruturação de APIs no ecossistema Delphi.',
            'foot.group1': 'Nidus',
            'foot.repo': 'Repositório GitHub',
            'foot.group2': 'Comunidade',
            'foot.disc': 'Discord Oficial',
            'foot.dev': 'Desenvolvedor',
            'foot.copy': '&copy; 2026 Isaque Pinheiro. Feito com Nidus para a comunidade Delphi.'
        },
        'en': {
            'nav.docs': 'Docs',
            'hero.subtitle': 'Modular architecture for Delphi: route-based modules, DI, and an extensible pipeline perfectly integrated with Horse.',
            'hero.start': 'Get Started',
            'hero.home': 'Our Home',
            'community.title': 'A solid foundation for Delphi ecosystems',
            'meaning.title': 'Why <span class="text-gradient">Nidus</span>?',
            'meaning.core.title': 'The Central Core',
            'meaning.core.desc': 'An organized and structured environment where all your code resides safely.',
            'meaning.birth.title': 'Where Modules are Born',
            'meaning.birth.desc': 'The exact place where independent business logic is created, encapsulated, and connected.',
            'meaning.growth.title': 'Incremental Growth',
            'meaning.growth.desc': 'Fully pluggable and modular, designed to scale organically alongside your application.',
            'meaning.quote': '"Nidus literally means <strong>nest, nursery, or focus</strong>. In software architecture, it is the central Hub where your app scales and comes to life."',
            'feat.ext.title': 'Extensible',
            'feat.ext.desc': 'Provides a malleable architecture that follows the growth and complexity of your Delphi codebase.',
            'feat.ver.title': 'Versatile',
            'feat.ver.desc': 'Acts as an extremely robust and elegant foundation for any server pattern.',
            'feat.pro.title': 'Progressive',
            'feat.pro.desc': 'Brings established design patterns and solidified solutions to the modern Delphi ecosystem.',
            'grid.title': 'Everything you need.',
            'grid.desc': 'Build robust, powerful, and massively scalable server-side applications without reinventing the wheel.',
            'grid.mod.title': 'Modularity',
            'grid.mod.desc': 'Simplify maintenance by organizing the entire application end-to-end into self-contained modules.',
            'grid.di.title': 'Dependency Injection',
            'grid.di.desc': 'Precise control of instance lifecycles and a design aimed at higher testability of your software.',
            'grid.pipe.title': 'Extensible Pipeline',
            'grid.pipe.desc': 'Freely intercept flows through Guards and Middlewares regardless of where they occur.',
            'grid.int.title': 'Native Integration',
            'grid.int.desc': 'Full native compatibility with REST APIs, bringing immediate support to the renowned Horse microframework.',
            'code.title': 'The Uncomplicated Flow',
            'code.desc': 'See how we define routes, inject middlewares, and organize the architectural call chain of Nidus.',
            'code.diag.title': 'The HTTP Lifecycle',
            'supp.title': 'The open-source framework designed for the future. Build Enterprise.',
            'supp.desc1': 'Nidus is free and open-source. But for companies needing maximum security, we help with a complete kit for developing scalable APIs.',
            'supp.desc2': 'Contact us to learn more about subscriptions, expert consulting, on-site enterprise support, training, and private sessions in the Delphi ecosystem.',
            'supp.btn': 'Learn more about Enterprise Support',
            'cta.title': 'Ready to modernize your code?',
            'cta.desc': 'Join the community of developers and architects who are raising the standard of their Delphi projects with Nidus.',
            'cta.btn1': 'Read the Documentation',
            'cta.btn2': 'Access GitHub',
            'foot.desc': 'The future of API structuring in the Delphi ecosystem.',
            'foot.group1': 'Nidus',
            'foot.repo': 'GitHub Repository',
            'foot.group2': 'Community',
            'foot.disc': 'Official Discord',
            'foot.dev': 'Developer',
            'foot.copy': '&copy; 2026 Isaque Pinheiro. Made with Nidus for the Delphi community.'
        }
    };

    let currentLang = 'pt';
    const langToggleBtn = document.getElementById('langToggle');

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            langToggleBtn.textContent = currentLang === 'pt' ? 'EN' : 'PT';
            
            document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
            
            if (currentLang === 'pt') {
                document.title = "Nidus - Arquitetura Modular para Delphi";
            } else {
                document.title = "Nidus - Modular Architecture for Delphi";
            }

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[currentLang] && translations[currentLang][key]) {
                    el.innerHTML = translations[currentLang][key]; // Using innerHTML to preserve spans like <span class="text-gradient">
                }
            });
        });
    }
});
