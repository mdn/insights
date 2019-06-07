class SignUp {
  constructor(element) {
    if (!element) {
      return;
    }

    this.form = element;
    this.emailInput = element.querySelector('input[name="email"]');
    this.privacyInput = element.querySelector('input[name="privacy"]');
    this.submitButton = element.querySelector('button[type="submit"]');
    this.successMessage = document.querySelector('.survey-sign-up__success');
    this.errorMessage = element.querySelector('.survey-sign-up__error');

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.emailInput.addEventListener('focus', this.handleInputFocus.bind(this));
  }

  handleInputFocus() {
    this.privacyInput
      .closest('.survey-sign-up__privacy')
      .classList.remove('display-none');
  }

  handleSubmit(event) {
    event.preventDefault();

    this.request = new XMLHttpRequest();
    const formData = new FormData(this.form);

    formData.append('source_url', document.location.href);

    console.info(formData);

    this.request.onload = this.handleXHRComplete.bind(this);
    this.request.onerror = this.handleXHRError.bind(this);
    this.request.ontimeout = this.handleXHRError.bind(this);
    this.request.open('POST', this.form.getAttribute('action'), false);
    this.request.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );
    this.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    this.request.send(formData);
  }

  handleXHRComplete(response) {
    const status = response.target.status;

    if (status >= 200 && status < 300) {
      // Response is null if handled by service worker.
      if (response === null) {
        this.handleXHRError().bind(this);

        return;
      }

      this.showSuccessMessage();
    } else {
      this.handleXHRError();
    }

    this.request = null;
  }

  handleXHRError() {
    this.showErrorMessage();

    this.request = null;
  }

  showSuccessMessage() {
    this.form.classList.add('display-none');
    this.successMessage.classList.remove('display-none');
  }

  showErrorMessage() {
    this.errorMessage.classList.remove('display-none');
  }
}

export default SignUp;
