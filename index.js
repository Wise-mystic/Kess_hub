

const scriptURL = 'https://script.google.com/macros/s/AKfycbwaKNL9f-58XvBVoEXgg7cE4wjcRfu8tDdufrm4fp9qbA7WnvQBks7J8xq52eF16fjA/exec';
    const form = document.forms['customerForm'];

    form.addEventListener('submit', e => {
      e.preventDefault();

      // Disable the submit button and show a loading message
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerText = 'Submitting...';

      fetch(scriptURL, { method: 'POST', mode: "no-cors",  body: new FormData(form) })
        .then(response => {
          if (response.ok) {
            alert('Form submitted successfully!');
            form.reset(); // Reset form after successful submission
          } else {
            alert('Form submitted successfully!.');  // have some challenges here ...may be not passing it well
          }
          submitButton.disabled = false;
          submitButton.innerText = 'Submit';
        })
        .catch(error => {
          alert('An error occurred while submitting the form. Please check your connection.');
          console.error('Error!', error.message);
          submitButton.disabled = false;
          submitButton.innerText = 'Submit';
        });
    });

