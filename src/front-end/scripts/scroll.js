var mount = document.getElementById('mount');

function scrollFunction() {
  var scrollPos = mount.scrollTop;

  if (scrollPos > 60) {
    document.getElementById('table-header').style.position = 'fixed';
    document.getElementById('nav').style.margin = '30px 0px';
  } else {
    document.getElementById('table-header').style.position = 'relative';
    document.getElementById('nav').style.margin = '0';
  }
}

mount.onscroll = scrollFunction;
