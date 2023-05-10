import Alpine from 'alpinejs';

window.Alpine = Alpine;

// Alpine.data('dark-mode', () => ({
//     mode: 'light',
//     toggle() {
//         this.mode = this.mode === 'light' ? 'dark' : 'light';
//     },
// }));



Alpine.start();


const modeButton = document.getElementById('js-dark-mode');
const mode = localStorage.getItem('mode');


function changeMode() {
	document.body.classList.toggle('dark');

	if (document.body.classList.contains('dark')) {
		localStorage.setItem('mode', 'dark');
	} else {
		localStorage.setItem('mode', 'light');
	}
}

function checkMode() {
    console.log(mode, 'mode')
	if (mode) {
		if (mode == 'dark') {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}
}

checkMode();

modeButton.addEventListener('click', changeMode);