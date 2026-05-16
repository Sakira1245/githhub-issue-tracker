document.getElementById('sign-in').addEventListener('click', function () {
    
    // get the username and password input
    const inputName = document.getElementById('input-name');
    const userName=inputName.value;
    const inputNumber = document.getElementById('input-password');
    const pin = inputNumber.value;

    // match pin and username
    if (userName === 'admin' && pin === 'admin123') {
        alert('Login Successful');
        // navigate to homepage
        window.location.assign('/home.html');
    } else {
        alert('Login Failed');
        return;
    }
})