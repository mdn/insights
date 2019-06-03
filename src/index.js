import Header from './components/header.js';

import './styles/main.scss';

function init() {
  new Header(document.querySelector('.header'));
}

init();
