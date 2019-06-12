import Header from './components/header.js';
import SignUp from './components/sign-up.js';
import { EventTracker } from './components/ga.js';

import './styles/main.scss';

/**
 * Initialise.
 */
function init() {
  new Header(document.getElementById('header'));
  new SignUp(document.getElementById('sign-up-form'));

  document
    .querySelectorAll('[data-ga-on]')
    .forEach(element => new EventTracker(element));
}

init();
