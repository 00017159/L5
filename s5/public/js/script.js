document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        const errorElement = document.getElementById('error');
        if (errorElement) 
            errorElement.textContent = '';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Example client-side validation
        if (!validateEmail(email)) {
            // Show error message
            showError('Please enter a valid email.', form);
            return; // Stop here if validation fails
        }

        if(!password){
            showError('Please enter a valid password.', form);
            return;
        }

        // If validation passes, proceed with Axios POST request
        axios.post('/api/user/register', { email, password })
            .then(function(response) {
                alert('User has been successfully added')
                // Handle success, maybe redirect or show a success message
                location.href = "/user/register"
            })
            .catch(function(error) {
                if (error.response && error.response.data) {
                    // Assuming the server responds with an error message under "message"
                    showError(error.response.data.errors.map(error => error.msg).join(' '), form);
                } else {
                    // Generic error message if the response cannot be parsed
                    showError('An error occurred. Please try again.', form);
                }
            });
    });
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(message, form) {
    let errorElement = document.getElementById('error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'error';
        errorElement.style.color = 'red';
    }
    errorElement.textContent = message;
}
