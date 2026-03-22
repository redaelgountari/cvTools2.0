"use client";

import { useState } from 'react';

export function useExportHTML(displayName: string) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExportHTML = async () => {
        setIsExporting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            // 1. CAPTURE & CLONE
            const docClone = document.documentElement.cloneNode(true) as HTMLElement;

            // 2. STRIP UNWANTED
            docClone.querySelectorAll('script').forEach(s => {
                const src = s.getAttribute('src') || '';
                if (src.includes('_next') || src.includes('webpack') || src.includes('chunk')) s.remove();
                else if (!src && !s.getAttribute('data-keep')) s.remove();
            });
            docClone.querySelectorAll('[data-export-exclude]').forEach(el => el.remove());
            docClone.querySelector('[data-export-button]')?.remove();
            docClone.querySelectorAll('.fixed.inset-0.z-\\[1000\\]').forEach(el => el.remove());
            docClone.querySelectorAll('.fixed.top-0.left-0.right-0.h-\\[2px\\]').forEach(el => el.remove());

            // 3. SANITIZE MOTION
            docClone.querySelectorAll<HTMLElement>('*').forEach(el => {
                if (el.id === 'lightbox-container') {
                    el.classList.add('opacity-0', 'pointer-events-none');
                    el.classList.remove('opacity-100', 'pointer-events-auto');
                    return;
                }
                el.classList.remove('is-visible');
                el.style.opacity = '';
                el.style.transform = '';
                el.style.clipPath = '';
                el.style.willChange = '';
                el.style.visibility = '';
                if (el.style.overflow === 'hidden' || el.classList.contains('overflow-hidden')) {
                    const child = el.firstElementChild as HTMLElement | null;
                    if (child && child.tagName === 'DIV' && el.children.length === 1) el.style.overflow = 'visible';
                }
            });

            // 4. INJECT ENGINE
            const engineScript = document.createElement('script');
            engineScript.setAttribute('data-keep', 'true');
            engineScript.textContent = `
(function() {
    // A. CURSOR
    (function initCursor() {
        var dot = document.getElementById('cursor-dot');
        var ring = document.getElementById('cursor-ring');
        if (!dot && !ring) {
            dot = document.createElement('div');
            dot.style.cssText = 'position:fixed;top:0;left:0;width:8px;height:8px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9999;transition:transform 0.1s ease-out;';
            document.body.appendChild(dot);
        }
        
        var mouse = {x:0, y:0}, ringPos = {x:0, y:0}, hov = false;
        
        window.addEventListener('mousemove', function(e) {
            mouse.x = e.clientX; mouse.y = e.clientY;
            if (dot && !ring) {
                dot.style.transform = 'translate('+(e.clientX-4)+'px,'+(e.clientY-4)+'px) scale('+(hov?4:1)+')';
            }
        });
        
        function animateCursor() {
            if (dot && ring) {
                ringPos.x += (mouse.x - ringPos.x) * 0.15;
                ringPos.y += (mouse.y - ringPos.y) * 0.15;
                dot.style.transform = hov ? 'scale(0)' : 'translate(' + mouse.x + 'px, ' + mouse.y + 'px)';
                ring.style.transform = (hov ? 'translate(' + mouse.x + 'px, ' + mouse.y + 'px) scale(1.5)' : 'translate(' + ringPos.x + 'px, ' + ringPos.y + 'px) scale(1)');
                ring.style.backgroundColor = hov ? 'var(--gold-dim)' : 'transparent';
            }
            requestAnimationFrame(animateCursor);
        }
        if (dot && ring) animateCursor();

        document.querySelectorAll('a, button, .project-row').forEach(function(t) {
            t.addEventListener('mouseenter', function(){ hov=true; });
            t.addEventListener('mouseleave', function(){ hov=false; });
        });
    })();

    // B. NAV & SCROLL
    (function initNav() {
        var header = document.querySelector('header');
        var allNavLinks = document.querySelectorAll('.nav-link, [data-section], #desktop-sec-nav button, #mobile-menu-popup button');
        var sectionEls = document.querySelectorAll('section[id]');
        var dots = document.querySelectorAll('.nav-dot');
        
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                var currentId = entry.target.id;
                
                // Active link underlining/dots
                allNavLinks.forEach(function(link) {
                    var lId = link.getAttribute('data-section') || link.getAttribute('href')?.replace('#','');
                    var isActive = lId === currentId;
                    if (isActive) link.classList.add('active'); else link.classList.remove('active');
                });
                
                // Luxury Side Dots
                dots.forEach(function(dot) {
                    var parent = dot.parentElement;
                    var dId = parent ? (parent.querySelector('.absolute')?.textContent?.toLowerCase() || '') : '';
                    if (dId === 'start') dId = 'hero';
                    if (dId === currentId) dot.classList.add('active'); else dot.classList.remove('active');
                });
            });
        }, { threshold: 0.25 });
        sectionEls.forEach(function(s) { io.observe(s); });

        // Header scroll class
        window.addEventListener('scroll', function() {
            if (header) {
                if (window.scrollY > 50) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
            }
        });

        // Hamburger Menu Logic
        var hamburger = document.querySelector('.hamburger');
        var navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Theme Toggle Logic
        var themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                var isDark = document.body.classList.contains('dark-mode');
                if (isDark) {
                    document.body.classList.remove('dark-mode');
                    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                } else {
                    document.body.classList.add('dark-mode');
                    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                }
            });
        }

        allNavLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var id = link.getAttribute('data-section') || link.getAttribute('href')?.replace('#','');
                if (id) {
                    e.preventDefault();
                    if (hamburger && navMenu) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                    document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
                }
            });
        });
    })();

    // C. REVEAL ANIMATIONS
    (function initReveals() {
        var reveals = document.querySelectorAll('.fade-in, .reveal, .stagger-reveal');
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var idx = parseInt(el.getAttribute('data-index') || '0');
                    el.style.transitionDelay = (idx * 100) + 'ms';
                    el.classList.add('fade-in-visible');
                    el.classList.add('visible');
                    io.unobserve(el);
                }
            });
        }, { threshold: 0.1 });
        reveals.forEach(function(r, i) { 
            r.setAttribute('data-index', i.toString());
            io.observe(r); 
        });

        var neoReveals = document.querySelectorAll('.neo-reveal');
        var neoIo = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        neoReveals.forEach(function(r) { neoIo.observe(r); });

        var currentScrollY = window.scrollY;
        var targetScrollY = window.scrollY;
        function animateScroll() {
            targetScrollY = window.scrollY;
            currentScrollY += (targetScrollY - currentScrollY) * 0.1;
            document.querySelectorAll('.parallax').forEach(function(el) {
                var speed = parseFloat(el.getAttribute('data-speed') || '0.2');
                var baseTransform = el.getAttribute('data-base') || '';
                el.style.transform = baseTransform + ' translateY(' + (currentScrollY * speed) + 'px)';
            });
            document.querySelectorAll('.scroll-marquee').forEach(function(el) {
                var speed = parseFloat(el.getAttribute('data-speed') || '0.5');
                var baseTransform = el.getAttribute('data-base') || '';
                el.style.transform = baseTransform + ' translateX(' + (-currentScrollY * speed) + 'px)';
            });
            requestAnimationFrame(animateScroll);
        }
        animateScroll();
    })();

    // D. PROJECT CLUSTERS (Vanilla Hover)
    (function initProjectClusters() {
        document.querySelectorAll('[data-project-cluster]').forEach(function(container) {
            var images = container.querySelectorAll('[data-anim="project-image"]');
            if (images.length === 0) return;

            function reset() {
                images.forEach(function(img, idx) {
                    var total = parseInt(img.getAttribute('data-total') || 1);
                    if (total <= 1) { img.style.transform = 'none'; return; }
                    img.style.transform = 'translate(' + (idx * 20) + 'px, ' + (idx * -20) + 'px) rotate(' + (idx * 2) + 'deg)';
                    img.style.zIndex = 10 - idx;
                    img.style.opacity = idx === 0 ? '1' : '0.4';
                });
            }

            container.addEventListener('mouseenter', function() {
                images.forEach(function(img, idx) {
                    var total = parseInt(img.getAttribute('data-total') || 1);
                    if (total <= 1) { img.style.transform = 'scale(1.02)'; return; }
                    var x = idx * 40;
                    var y = idx * -40;
                    var r = idx * 6;
                    img.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + r + 'deg) scale(1.02)';
                    img.style.opacity = '1';
                    img.style.filter = 'grayscale(0) brightness(1)';
                });
            });

            container.addEventListener('mouseleave', function() {
                reset();
                images.forEach(function(img, idx) {
                    img.style.filter = '';
                    img.style.opacity = idx === 0 ? '1' : '0.4';
                });
            });
            reset();
        });
    })();

    // E. COUNTERS
    (function initCounters() {
        var counters = document.querySelectorAll('[data-counter-value]');
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = parseInt(el.getAttribute('data-counter-value'));
                    var count = 0;
                    var step = Math.ceil(target / 40) || 1;
                    var interval = setInterval(function() {
                        count += step;
                        if (count >= target) { el.innerText = target + (el.innerText.includes('+') ? '+' : ''); clearInterval(interval); }
                        else { el.innerText = count + (el.innerText.includes('+') ? '+' : ''); }
                    }, 30);
                    io.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(function(c) { io.observe(c); });
    })();

    // F. LIGHTBOX / CAROUSEL
    (function initLightbox() {
        var container = document.getElementById('lightbox-container');
        var img = document.getElementById('lightbox-image');
        var placeholder = document.getElementById('lightbox-image-placeholder');
        var prev = document.getElementById('lightbox-prev');
        var next = document.getElementById('lightbox-next');
        var infoPanel = document.getElementById('lightbox-info');
        var thumbContainer = document.getElementById('lightbox-thumbnails');
        if (!container) return;

        var currentImages = [];
        var currentIndex = 0;

        function update() {
            var hasImages = currentImages.length > 0;
            if (img) img.style.display = hasImages ? 'block' : 'none';
            if (placeholder) placeholder.style.display = hasImages ? 'none' : 'flex';
            if (prev) prev.style.display = currentImages.length > 1 ? 'flex' : 'none';
            if (next) next.style.display = currentImages.length > 1 ? 'flex' : 'none';

            if (hasImages && img) {
                img.src = currentImages[currentIndex];
            }
            
            if (infoPanel) {
                var title = container.getAttribute('data-title');
                var desc = container.getAttribute('data-description');
                var github = container.getAttribute('data-github');
                var live = container.getAttribute('data-live');
                
                var tEl = infoPanel.querySelector('.lightbox-title');
                var dEl = infoPanel.querySelector('.lightbox-description');
                if (tEl) tEl.innerText = title || "UNTITLED_ENTRY";
                if (dEl) {
                    var html = (desc || "NO_DESCRIPTION_PROVIDED_BY_SOURCE");
                    
                    if (github || live) {
                        html += '<div class="mt-12 pt-10 border-t border-accent/20">' +
                                '<div class="font-mono text-[10px] text-accent font-bold mb-6 tracking-widest uppercase opacity-60">PROJECT_CONNECT</div>' +
                                '<div class="space-y-4">';
                        
                        if (github) {
                            html += '<a href="' + github + '" target="_blank" class="flex items-center justify-between p-4 border border-white/5 bg-white/5 hover:border-accent hover:bg-accent/10 transition-all" style="text-decoration:none;color:inherit;">' +
                                    '<div class="flex items-center gap-4"><i class="fab fa-github"></i><span class="font-mono text-[10px]">GITHUB REPOSITORY</span></div>' +
                                    '<i class="fas fa-external-link-alt opacity-20"></i></a>';
                        }
                        if (live) {
                            html += '<a href="' + live + '" target="_blank" class="flex items-center justify-between p-4 border border-white/5 bg-white/5 hover:border-accent hover:bg-accent/10 transition-all" style="text-decoration:none;color:inherit;">' +
                                    '<div class="flex items-center gap-4"><i class="fas fa-globe"></i><span class="font-mono text-[10px]">LIVE DEPLOYMENT</span></div>' +
                                    '<i class="fas fa-external-link-alt opacity-20"></i></a>';
                        }
                        
                        html += '</div></div>';
                    }
                    dEl.innerHTML = html;
                }
            }

            if (hasImages && thumbContainer) {
                thumbContainer.style.display = 'flex';
                thumbContainer.innerHTML = '';
                currentImages.forEach(function(src, i) {
                    var div = document.createElement('div');
                    div.className = 'w-16 h-16 flex-shrink-0 border-2 cursor-pointer transition-all ' + (i === currentIndex ? 'border-accent scale-110' : 'border-white/20 opacity-30 hover:opacity-100 hover:border-white');
                    div.innerHTML = '<img src="' + src + '" class="w-full h-full object-cover">';
                    div.onclick = function(e) { e.stopPropagation(); currentIndex = i; update(); };
                    thumbContainer.appendChild(div);
                });
            } else if (thumbContainer) {
                thumbContainer.style.display = 'none';
            }
        }

        window.openLightbox = function(images, index, title, description, github, live) {
            currentImages = images || [];
            currentIndex = index || 0;
            container.setAttribute('data-title', title || '');
            container.setAttribute('data-description', description || '');
            container.setAttribute('data-github', github || '');
            container.setAttribute('data-live', live || '');
            update();
            container.classList.remove('opacity-0', 'pointer-events-none');
            container.classList.add('opacity-100', 'pointer-events-auto');
            if (infoPanel) {
                infoPanel.classList.remove('translate-x-full');
                infoPanel.classList.add('translate-x-0');
            }
            document.body.style.overflow = 'hidden';
        };

        function close() {
            container.classList.add('opacity-0', 'pointer-events-none');
            container.classList.remove('opacity-100', 'pointer-events-auto');
            if (infoPanel) {
                infoPanel.classList.add('translate-x-full');
                infoPanel.classList.remove('translate-x-0');
            }
            document.body.style.overflow = '';
        }

        container.addEventListener('click', close);
        
        document.querySelectorAll('.project-card, .project-show-more').forEach(function(el) {
            el.addEventListener('click', function(e) {
                e.stopPropagation();
                var card = el.closest('.project-card');
                if (!card) return;
                try {
                    var images = JSON.parse(card.getAttribute('data-images') || '[]');
                    var title = card.getAttribute('data-title');
                    var desc = card.getAttribute('data-description');
                    var github = card.getAttribute('data-github');
                    var live = card.getAttribute('data-live');
                    window.openLightbox(images, 0, title, desc, github, live);
                } catch(err) { console.error(err); }
            });
        });

        if (prev) prev.onclick = function(e) { e.stopPropagation(); currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; update(); };
        if (next) next.onclick = function(e) { e.stopPropagation(); currentIndex = (currentIndex + 1) % currentImages.length; update(); };
    })();

    // G. GSAP ANIMATIONS (STILL LOADED FOR MAGAZINE)
    function loadScript(src, cb) {
        var s = document.createElement('script'); s.src = src; s.onload = cb; document.head.appendChild(s);
    }
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', function() {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', function() {
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero Text Slide
            gsap.utils.toArray('[data-anim="text-slide"]').forEach(function(el) {
                var h1 = el.querySelector('h1');
                var delay = parseFloat(el.getAttribute('data-delay') || 0);
                if (h1) {
                    gsap.fromTo(h1, 
                        { y: '100%' }, 
                        { y: 0, duration: 1, delay: delay, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 95%' } }
                    );
                }
            });

            // General Section Fade (Only for pages NOT luxury)
            if (!document.querySelector('.luxury-portfolio')) {
                gsap.utils.toArray('section > div').forEach(function(panel) {
                    if (panel.hasAttribute('data-anim') || panel.closest('[data-anim]')) return; 
                    gsap.from(panel, { opacity: 0, y: 30, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: panel, start: 'top 90%' } });
                });
            }
        });
    });
})();
`;
            docClone.querySelector('body')?.appendChild(engineScript);

            // 5. CSS & FONTS
            let inlinedCSS = `
:root { --accent: #ff3c00; --border: rgba(255,255,255,0.05); --bg: #080808; --fg: #f0ece4; }
:root[data-theme="light"] { --bg: #f4f2ee; --fg: #1a1a1a; --accent: #d93800; --border: rgba(26,26,26,0.15); }
body { margin: 0; padding: 0; background-color: var(--bg); color: var(--fg); font-family: 'Inter', sans-serif; overflow-x: hidden; }
*, *::before, *::after { box-sizing: border-box; }
nav button, header button { cursor: pointer; }
`;
            for (let i = 0; i < document.styleSheets.length; i++) {
                try {
                    const rules = (document.styleSheets[i] as CSSStyleSheet).cssRules;
                    if (rules) for (let j = 0; j < rules.length; j++) inlinedCSS += rules[j].cssText + '\n';
                } catch (e) { }
            }
            docClone.querySelectorAll('style, link[rel="stylesheet"]').forEach(el => {
                const href = el.getAttribute('href') || '';
                if (href.startsWith('/_next') || href.startsWith('/_vercel')) el.remove();
            });

            const fontsLink = document.createElement('link');
            fontsLink.rel = 'stylesheet';
            fontsLink.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Syne:wght@400;700;800&family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&family=EB+Garamond:ital@0;1&display=swap';

            const styleBlock = document.createElement('style');
            styleBlock.textContent = inlinedCSS;
            docClone.querySelector('head')?.appendChild(fontsLink);
            docClone.querySelector('head')?.appendChild(styleBlock);

            // 6. DOWNLOAD
            const htmlContent = `<!DOCTYPE html>\n${docClone.outerHTML}`;
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${displayName.replace(/\s+/g, '_')}_Portfolio.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Export failed:", error);
        } finally {
            setIsExporting(false);
        }
    };

    return { handleExportHTML, isExporting };
}
