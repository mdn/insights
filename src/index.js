import Header from './components/header.js';
import SignUp from './components/sign-up.js';

import './styles/main.scss';

function init() {
  new Header(document.getElementById('header'));
  new SignUp(document.getElementById('sign-up-form'));
}

init();
