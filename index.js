

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

// Add this function to your existing JavaScript
function displayData() {
  fetch(scriptURL)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('data-container');
      if (data.length === 0) {
        container.innerHTML = '<p>No data available</p>';
        return;
      }

      let tableHtml = `
        <table>
          <thead>
            <tr>
              ${Object.keys(data[0]).map(key => `<th>${key}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      container.innerHTML = tableHtml;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      document.getElementById('data-container').innerHTML = 
        '<p>Error loading data. Please try again later.</p>';
    });
}

// Call displayData when the page loads and after form submission
document.addEventListener('DOMContentLoaded', displayData);

// Update your form submission success handler to refresh data
then(response => {
  if (response.ok) {
    alert('Form submitted successfully!');
    form.reset();
    displayData(); // Refresh the table
  }
  // ... rest of your existing code
})