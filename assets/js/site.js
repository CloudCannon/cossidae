import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();


const modeButton = document.getElementById('js-dark-mode');
const body = document.body;


function toggleMode() {
	const mode = localStorage.getItem('mode') || 'light';
	const isDark = mode === 'dark';
	body.classList.toggle('dark', isDark);
	body.classList.toggle('light', !isDark);
	localStorage.setItem('mode', isDark ? 'light' : 'dark');
}
  
toggleMode(); 

modeButton.addEventListener('click', toggleMode);