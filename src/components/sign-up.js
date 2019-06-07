class SignUp {
  constructor(element) {
    if (!element) {
      return;
    }

    this.element = element;
    this.emailInput = element.querySelector('input[name="email"]');
    this.privacyInput = element.querySelector('input[name="privacy"]');
    this.submitButton = element.querySelector('button[type="submit"]');
    this.successMessage = document.querySelector('.survey-sign-up__success');

    this.element.addEventListener('submit', this.handleSubmit.bind(this));
    this.emailInput.addEventListener('focus', this.handleInputFocus.bind(this));
  }

  handleInputFocus() {
    this.privacyInput
      .closest('.survey-sign-up__privacy')
      .classList.remove('display-none');
  }

  handleSubmit(event) {
    event.preventDefault();

    const request = new XMLHttpRequest();
    const formData = new FormData(this.element);

    formData.append('source_url', document.location.href);

    request.onload = () => {
      console.log('Done'); // eslint-disable-line
      console.log(request.response); // eslint-disable-line

      this.element.classList.add('display-none');
      this.successMessage.classList.remove('display-none');
    };

    request.onerror = () => {
      console.log('Error'); // eslint-disable-line
    };

    request.open('POST', this.element.getAttribute('action'), false);
    request.send(formData);
  }
}

export default SignUp;
