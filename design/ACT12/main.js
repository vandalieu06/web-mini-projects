const TOTAL_FRAMES = 90;
const FRAME_WIDTH = 1280;
const FRAME_HEIGHT = 716;
const ASPECT_RATIO = FRAME_WIDTH / FRAME_HEIGHT;

const canvas = document.getElementById('frameCanvas');
const ctx = canvas.getContext('2d');
const loadingOverlay = document.getElementById('loadingOverlay');
const animationSection = document.querySelector('.animation-section');
const progressFill = document.getElementById('progressFill');

const frames = [];
let framesLoaded = 0;
let currentFrame = 0;
let isReady = false;
let ticking = false;

function initCanvas() {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    let width = maxWidth;
    let height = width / ASPECT_RATIO;

    if (height > maxHeight) {
        height = maxHeight;
        width = height * ASPECT_RATIO;
    }

    canvas.width = width;
    canvas.height = height;

    if (isReady && frames[currentFrame]) {
        drawFrame(currentFrame);
    }
}

function preloadFrames() {
    const loadPromises = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const promise = new Promise((resolve) => {
            const frameNum = String(i).padStart(3, '0');
            const img = new Image();
            img.src = `frames/frame_${frameNum}.webp`;

            img.onload = () => {
                frames[i - 1] = img;
                framesLoaded++;
                resolve();
            };

            img.onerror = () => {
                console.warn(`Failed to load frame ${frameNum}`);
                frames[i - 1] = null;
                resolve();
            };
        });

        loadPromises.push(promise);
    }

    Promise.all(loadPromises).then(() => {
        if (framesLoaded > 0) {
            isReady = true;
            loadingOverlay.classList.add('hidden');
            initCanvas();
            updateFrame();
        }
    });
}

function drawFrame(index) {
    const frame = frames[index];
    if (!frame) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.min(
        canvas.width / FRAME_WIDTH,
        canvas.height / FRAME_HEIGHT
    );

    const scaledWidth = FRAME_WIDTH * scale;
    const scaledHeight = FRAME_HEIGHT * scale;

    const x = (canvas.width - scaledWidth) / 2;
    const y = (canvas.height - scaledHeight) / 2;

    ctx.drawImage(frame, x, y, scaledWidth, scaledHeight);
}

function updateFrame() {
    const rect = animationSection.getBoundingClientRect();
    const sectionHeight = animationSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = sectionHeight - viewportHeight;

    const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));

    progressFill.style.width = `${scrollProgress * 100}%`;

    if (rect.top >= 0 || rect.bottom > viewportHeight) {
        const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(scrollProgress * TOTAL_FRAMES)
        );

        if (targetFrame !== currentFrame && isReady) {
            currentFrame = targetFrame;
            drawFrame(currentFrame);
        }
    }
}

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateFrame();
            ticking = false;
        });
        ticking = true;
    }
}

function onResize() {
    initCanvas();
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onResize);

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    preloadFrames();
});