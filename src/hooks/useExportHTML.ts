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
                if (el.id === 'lightbox-container') return;
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
        var dot = document.createElement('div');
        dot.style.cssText = 'position:fixed;top:0;left:0;width:8px;height:8px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9999;transition:transform 0.1s ease-out;';
        document.body.appendChild(dot);
        var mouse = {x:0, y:0}, hov = false;
        window.addEventListener('mousemove', function(e) {
            mouse.x = e.clientX; mouse.y = e.clientY;
            dot.style.transform = 'translate('+(e.clientX-4)+'px,'+(e.clientY-4)+'px) scale('+(hov?4:1)+')';
        });
        document.querySelectorAll('a,button').forEach(function(t) {
            t.addEventListener('mouseenter', function(){ hov=true; });
            t.addEventListener('mouseleave', function(){ hov=false; });
        });
    })();

    // B. NAV & SCROLL
    (function initNav() {
        var allNavLinks = document.querySelectorAll('[data-section], #desktop-sec-nav button, #mobile-menu-popup button');
        var sectionEls = document.querySelectorAll('section[id]');
        
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                var currentId = entry.target.id;
                allNavLinks.forEach(function(link) {
                    var linkId = link.getAttribute('data-section');
                    var isActive = linkId === currentId;
                    
                    if (link.querySelector('span')) {
                        link.querySelector('span').style.opacity = isActive ? '1' : '0.2';
                        link.querySelector('span').style.color = isActive ? 'var(--accent)' : '';
                        link.querySelector('span').style.fontWeight = isActive ? 'bold' : 'normal';
                    }
                    var bar = link.querySelector('div');
                    if (bar) {
                        bar.style.height = isActive ? '32px' : '0px';
                    }
                });
            });
        }, { threshold: 0.3 });
        sectionEls.forEach(function(s) { io.observe(s); });

        allNavLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                var id = link.getAttribute('data-section');
                if (id) document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
            });
        });
    })();

    // C. PROJECT CLUSTERS (Vanilla Hover)
    (function initProjectClusters() {
        document.querySelectorAll('[data-project-cluster]').forEach(function(container) {
            var images = container.querySelectorAll('[data-anim="project-image"]');
            if (images.length === 0) return;

            function reset() {
                images.forEach(function(img, i) {
                    var total = parseInt(img.getAttribute('data-total') || 1);
                    var idx = parseInt(img.getAttribute('data-index') || 0);
                    if (total <= 1) { 
                        img.style.transform = 'none'; 
                        img.style.position = 'relative';
                        return; 
                    }
                    var offset = (idx - (total - 1) / 2) * 20;
                    img.style.transform = 'translate(' + offset + 'px, ' + (idx * 10) + 'px) rotate(' + ((idx - (total - 1) / 2) * 5) + 'deg)';
                    img.style.zIndex = 10 - idx;
                });
            }

            container.addEventListener('mouseenter', function() {
                images.forEach(function(img, i) {
                    var total = parseInt(img.getAttribute('data-total') || 1);
                    if (total <= 1) { img.style.transform = 'scale(1.05)'; return; }
                    var idx = parseInt(img.getAttribute('data-index') || 0);
                    var x = (idx - (total - 1) / 2) * 160;
                    var y = idx * -20;
                    var r = (idx - (total - 1) / 2) * 12;
                    img.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + r + 'deg) scale(1.05)';
                    img.style.zIndex = 50;
                });
            });

            container.addEventListener('mouseleave', reset);
            reset();
        });
    })();

    // D. COUNTERS
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
    // E. LIGHTBOX / CAROUSEL
    (function initLightbox() {
        var container = document.getElementById('lightbox-container');
        var img = document.getElementById('lightbox-image');
        var prevBtn = document.getElementById('lightbox-prev');
        var nextBtn = document.getElementById('lightbox-next');
        var counter = document.getElementById('lightbox-counter');
        var pagination = document.getElementById('lightbox-pagination');
        if (!container || !img) return;

        var currentImages = [];
        var currentIndex = 0;

        function update() {
            if (!currentImages[currentIndex]) return;
            img.src = currentImages[currentIndex];
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            
            if (counter) counter.innerText = 'IMAGE_' + String(currentIndex + 1).padStart(2, '0') + ' // TOTAL_' + String(currentImages.length).padStart(2, '0');
            if (prevBtn) prevBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
            if (nextBtn) nextBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
            
            if (pagination) {
                pagination.innerHTML = '';
                pagination.style.opacity = '1';
                currentImages.forEach(function(_, i) {
                    var dot = document.createElement('div');
                    dot.style.cssText = 'width:6px;height:6px;transform:rotate(45deg);transition:all 0.5s;';
                    dot.style.backgroundColor = (i === currentIndex ? 'var(--accent)' : 'rgba(255,255,255,0.2)');
                    if (i === currentIndex) dot.style.transform += ' scale(1.25)';
                    pagination.appendChild(dot);
                });
            }
        }

        window.openLightbox = function(images, index) {
            currentImages = images;
            currentIndex = index;
            update();
            container.style.opacity = '1';
            container.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden';
        };

        function close() {
            container.style.opacity = '0';
            container.style.pointerEvents = 'none';
            document.body.style.overflow = '';
        }

        container.addEventListener('click', close);
        img.addEventListener('click', function(e) { e.stopPropagation(); });
        
        if (prevBtn) prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            update();
        });

        if (nextBtn) nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % currentImages.length;
            update();
        });

        document.querySelectorAll('[data-anim="project-image"]').forEach(function(el) {
            el.addEventListener('click', function(e) {
                e.stopPropagation();
                var cluster = el.closest('[data-project-cluster]');
                if (!cluster) return;
                try {
                    var images = JSON.parse(cluster.getAttribute('data-images'));
                    var index = parseInt(el.getAttribute('data-index'));
                    window.openLightbox(images, index);
                } catch(err) { console.error(err); }
            });
        });
    })();

    // F. GSAP ANIMATIONS
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

            // General Section Fade
            gsap.utils.toArray('section > div').forEach(function(panel) {
                if (panel.hasAttribute('data-anim') || panel.closest('[data-anim]')) return; 
                gsap.from(panel, { opacity: 0, y: 30, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: panel, start: 'top 90%' } });
            });
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
            fontsLink.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Syne:wght@400;700;800&family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap';

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
