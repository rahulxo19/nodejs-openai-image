function onSubmit(e) {
  e.preventDefault();

  showAlert('This alert will disappear in 5 seconds', 5000);

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = document.querySelector('#prompt').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt);
}

function showAlert(message, duration) {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.classList.add('alert');

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, duration);
}



async function generateImageRequest(prompt) {
  try {

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    // console.log(data);

    const imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
