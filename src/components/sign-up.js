class SignUp {
  constructor(element) {
    if (!element) {
      return;
    }

    this.element = element;
    this.submitButton = element.querySelector('input[type="submit"]');

    element.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();

    const request = new XMLHttpRequest();
    const formData = new FormData(this.element);

    formData.append('source_url', document.location.href);

    request.onload = () => {
      console.log('Done'); // eslint-disable-line
      console.log(request.response); // eslint-disable-line
    };

    request.onerror = () => {
      console.log('Error'); // eslint-disable-line
    };

    request.open('POST', 'https://httpbin.org/post', false);
    request.send(formData);
  }
}

export default SignUp;
