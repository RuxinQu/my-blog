$(document).ready(() => {
    const handleLogin = async () => {
        const email = $('#email').val();
        const password = $('#password').val();
        try {
            const response = await fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            response.ok
            ? window.location.assign('/')
            : alert('Login Failed!')
        } catch (err) { console.log(err) }
    }

    $('#submitbtn').on('click', (event) => {
        event.preventDefault();
        handleLogin();
    });

})