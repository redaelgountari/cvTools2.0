import React from "react";

export function ThemeSetup() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Syne:wght@400;700;800&family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
        
        :root {
          --bg: #080808;
          --fg: #f0ece4;
          --accent: #ff3c00;
          --muted: rgba(240,236,228,0.4);
          --border: rgba(240,236,228,0.08);
          color-scheme: dark;
        }

        :root[data-theme="light"] {
          --bg: #f4f2ee;       /* Editorial off-white/cream paper */
          --fg: #1a1a1a;       /* Deep charcoal ink */
          --accent: #d93800;   /* Slightly darker vermilion for readability on light */
          --muted: rgba(26,26,26,0.5);
          --border: rgba(26,26,26,0.15);
          color-scheme: light;
        }

        body {
          background: var(--bg);
          color: var(--fg);
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
          margin: 0;
          padding: 0;
          transition: background-color 0.7s ease, color 0.7s ease;
        }

        /* Essential resets for navigation and layouts */
        /* nav, header, footer { display: none !important; } */
        
        * {
          /* cursor: default; */
        }

        /* ---------------------------------
           EXPORT-SAFE UTILITY OVERRIDES
           Filters hardcoded Tailwind dark classes
           --------------------------------- */
        :root[data-theme="light"] .bg-\\[\\#080808\\],
        :root[data-theme="light"] .bg-\\[\\#0A0A0A\\] { background-color: var(--bg) !important; }
        :root[data-theme="light"] .bg-\\[\\#080808\\]\\/95,
        :root[data-theme="light"] .bg-\\[\\#0A0A0A\\]\\/95 { background-color: rgba(244, 242, 238, 0.95) !important; }
        :root[data-theme="light"] .bg-black\\/20,
        :root[data-theme="light"] .bg-black\\/40 { background-color: rgba(26,26,26,0.05) !important; }
        :root[data-theme="light"] .border-\\[\\#080808\\],
        :root[data-theme="light"] .border-\\[\\#0A0A0A\\] { border-color: var(--bg) !important; }
        
        :root[data-theme="light"] .text-white { color: var(--fg) !important; }
        :root[data-theme="light"] .text-white\\/5 { color: rgba(26,26,26,0.05) !important; }
        :root[data-theme="light"] .text-white\\/10 { color: rgba(26,26,26,0.1) !important; }
        :root[data-theme="light"] .text-white\\/20 { color: rgba(26,26,26,0.2) !important; }
        :root[data-theme="light"] .text-white\\/30 { color: rgba(26,26,26,0.3) !important; }
        :root[data-theme="light"] .text-white\\/40 { color: rgba(26,26,26,0.4) !important; }
        :root[data-theme="light"] .text-white\\/50 { color: rgba(26,26,26,0.5) !important; }
        :root[data-theme="light"] .text-white\\/60 { color: rgba(26,26,26,0.6) !important; }
        :root[data-theme="light"] .text-white\\/70 { color: rgba(26,26,26,0.7) !important; }
        :root[data-theme="light"] .text-white\\/80 { color: rgba(26,26,26,0.8) !important; }
        :root[data-theme="light"] .text-white\\/90 { color: rgba(26,26,26,0.9) !important; }
        :root[data-theme="light"] .text-white\\/95 { color: rgba(26,26,26,0.95) !important; }
        
        :root[data-theme="light"] .bg-white { background-color: var(--fg) !important; }
        :root[data-theme="light"] .bg-white\\/5 { background-color: rgba(26,26,26,0.05) !important; }
        :root[data-theme="light"] .bg-white\\/10 { background-color: rgba(26,26,26,0.1) !important; }
        :root[data-theme="light"] .bg-white\\/20 { background-color: rgba(26,26,26,0.2) !important; }
        :root[data-theme="light"] .bg-white\\/30 { background-color: rgba(26,26,26,0.3) !important; }
        :root[data-theme="light"] .bg-white\\/40 { background-color: rgba(26,26,26,0.4) !important; }
        :root[data-theme="light"] .bg-white\\/50 { background-color: rgba(26,26,26,0.5) !important; }
        :root[data-theme="light"] .bg-white\\/60 { background-color: rgba(26,26,26,0.6) !important; }
        :root[data-theme="light"] .bg-white\\/70 { background-color: rgba(26,26,26,0.7) !important; }
        :root[data-theme="light"] .bg-white\\/80 { background-color: rgba(26,26,26,0.8) !important; }
        :root[data-theme="light"] .bg-white\\/90 { background-color: rgba(26,26,26,0.9) !important; }
        :root[data-theme="light"] .bg-white\\/95 { background-color: rgba(26,26,26,0.95) !important; }
        :root[data-theme="light"] .bg-white\\/\\[0\\.01\\] { background-color: rgba(26,26,26,0.01) !important; }
        :root[data-theme="light"] .bg-white\\/\\[0\\.02\\] { background-color: rgba(26,26,26,0.02) !important; }
        :root[data-theme="light"] .bg-white\\/\\[0\\.03\\] { background-color: rgba(26,26,26,0.03) !important; }
        :root[data-theme="light"] .bg-white\\/\\[0\\.05\\] { background-color: rgba(26,26,26,0.05) !important; }
        
        :root[data-theme="light"] .border-white { border-color: var(--fg) !important; }
        :root[data-theme="light"] .border-white\\/5 { border-color: rgba(26,26,26,0.05) !important; }
        :root[data-theme="light"] .border-white\\/10 { border-color: rgba(26,26,26,0.1) !important; }
        :root[data-theme="light"] .border-white\\/20 { border-color: rgba(26,26,26,0.2) !important; }
        :root[data-theme="light"] .border-white\\/30 { border-color: rgba(26,26,26,0.3) !important; }
        :root[data-theme="light"] .border-white\\/40 { border-color: rgba(26,26,26,0.4) !important; }
        :root[data-theme="light"] .border-white\\/50 { border-color: rgba(26,26,26,0.5) !important; }
        :root[data-theme="light"] .border-white\\/60 { border-color: rgba(26,26,26,0.6) !important; }
        :root[data-theme="light"] .border-white\\/70 { border-color: rgba(26,26,26,0.7) !important; }
        :root[data-theme="light"] .border-white\\/80 { border-color: rgba(26,26,26,0.8) !important; }
        :root[data-theme="light"] .border-white\\/90 { border-color: rgba(26,26,26,0.9) !important; }
        :root[data-theme="light"] .border-white\\/95 { border-color: rgba(26,26,26,0.95) !important; }
        
        :root[data-theme="light"] .hover\\:text-white:hover { color: var(--fg) !important; }
        :root[data-theme="light"] .group-hover\\:text-white:hover { color: var(--fg) !important; }
        :root[data-theme="light"] .hover\\:bg-white:hover { background-color: var(--fg) !important; }
        :root[data-theme="light"] .group-hover\\:bg-white:hover { background-color: var(--fg) !important; }

        /* Icon Transitions based on theme state */
        :root[data-theme="light"] #icon-sun { transform: scale(0.5); opacity: 0; }
        :root[data-theme="light"] #icon-moon { transform: scale(1); opacity: 1; color: var(--fg); }
        :root[data-theme="dark"] #icon-sun { transform: scale(1); opacity: 1; }
        :root[data-theme="dark"] #icon-moon { transform: scale(0.5); opacity: 0; }

        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: var(--bg);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--border);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }
      `}} />
      {/* EXPORT-SAFE INLINE SCRIPT FOR THEME PARITY */}
      <script data-keep="true" dangerouslySetInnerHTML={{
        __html: `
            (function() {
              function setTheme(theme) {
                document.documentElement.setAttribute('data-theme', theme);
                try { localStorage.setItem('theme', theme); } catch(e) {}
              }
              
              var savedTheme;
              try { savedTheme = localStorage.getItem('theme'); } catch(e) {}
              
              if (savedTheme === 'light' || savedTheme === 'dark') {
                  setTheme(savedTheme);
              } else {
                  var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
                  setTheme(prefersLight ? 'light' : 'dark');
              }

              // Event delegation for both runtime and static environments
              document.addEventListener('click', function(e) {
                var btn = e.target.closest('#theme-toggle');
                if (btn) {
                  e.preventDefault();
                  var current = document.documentElement.getAttribute('data-theme') || 'dark';
                  setTheme(current === 'light' ? 'dark' : 'light');
                }
              });
            })();
          `
      }} />
    </>
  );
}
