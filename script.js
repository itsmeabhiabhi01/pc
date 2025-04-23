// GSAP Animation for Start Menu
const start = gsap.timeline({ paused: true });
start.to("#windowBar", {
    opacity: 1,
    bottom: "60px",
    duration: 0.5,
    ease: "power2.out"
});

// Toggle Start Menu
function toggleWindowBar() {
    start.reversed() ? start.play() : start.reverse();
    document.getElementById('context-menu').style.display = 'none';
}

// Toggle Maximize/Minimize
function toggleMaximize() {
    const windowBar = document.getElementById('windowBar');
    windowBar.classList.toggle('maximized');
}

// Toggle Tablet Mode
function toggleTabletMode() {
    const desktop = document.querySelector('.desktop');
    desktop.classList.toggle('tablet-mode');
}

// Update Time and Date
function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    timeElement.textContent = `${hours}:${minutes}`;
    dateElement.textContent = `${day}-${month}-${year}`;
}
updateTime();
setInterval(updateTime, 60000);

// Context Menu
document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
    document.getElementById('context-menu').style.display = 'none';
}

function rightClick(e) {
    e.preventDefault();
    const menu = document.getElementById('context-menu');
    const rect = menu.getBoundingClientRect();
    let x = e.pageX;
    let y = e.pageY;

    // Prevent menu from going off-screen
    if (x + rect.width > window.innerWidth) x = window.innerWidth - rect.width - 10;
    if (y + rect.height > window.innerHeight) y = window.innerHeight - rect.height - 10;

    menu.style.display = 'block';
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
}

// Search Functionality
function filterApps(query) {
    const icons = document.querySelectorAll('.iconBox, .AppBar ul li, .widget-grid div');
    const lowerQuery = query.toLowerCase();
    icons.forEach(icon => {
        const text = icon.querySelector('p').textContent.toLowerCase();
        icon.style.display = text.includes(lowerQuery) ? 'flex' : 'none';
    });
}

// Prevent closing when clicking inside overlays
document.getElementById('context-menu').onclick = e => e.stopPropagation();
document.getElementById('windowBar').onclick = e => e.stopPropagation();
