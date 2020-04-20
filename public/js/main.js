const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);

window.onload = () => {
  const dtfOptions = { dateStyle: 'medium', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
  const dtf = new Intl.DateTimeFormat('en-US', dtfOptions);
}