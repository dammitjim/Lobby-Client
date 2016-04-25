'use babel';

require('babel-core/register');

const mount = document.getElementById('mount');

function goToTop() {
  mount.scrollTop = 0;
}

function scrollFunction() {
  const header = document.getElementById('table-header');
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('back-to-top');

  if (mount.scrollTop > 60) {
    header.style.position = 'fixed';
    nav.style.margin = '30px 0px';
    backToTop.classList.add('active');
    backToTop.onclick = goToTop;
  } else {
    header.style.position = 'relative';
    nav.style.margin = '0';
    backToTop.onclick = null;
    backToTop.classList.remove('active');
  }
}

mount.onscroll = scrollFunction;
