// Theme toggle. Dark is the default. The choice is saved so it carries
// over between pages. Each page also has a one-line script in <head>
// that applies the saved theme before the page is drawn.
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

function updateToggleLabel() {
    const isLight = root.dataset.theme === 'light';
    themeToggle.textContent = isLight ? 'Dark' : 'Light';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}

if (themeToggle) {
    updateToggleLabel();
    themeToggle.addEventListener('click', () => {
        if (root.dataset.theme === 'light') {
            delete root.dataset.theme;
        } else {
            root.dataset.theme = 'light';
        }
        try {
            localStorage.setItem('theme', root.dataset.theme || 'dark');
        } catch (e) {
            // Storage can be blocked (private mode). The toggle still works for this page.
        }
        updateToggleLabel();
    });
}

// Looping clips autoplay like gifs. If the visitor prefers reduced motion,
// stop them and show the normal video controls instead.
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[autoplay]').forEach(video => {
        video.pause();
        video.removeAttribute('autoplay');
        video.controls = true;
    });
}
