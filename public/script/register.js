$(document).ready(() => {
    const handleRegister = async () => {
        const email = $('#email').val();
        const password = $('#password').val();
        const username = $('#username').val();
        try {
            const response = await fetch('/user/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })
            response.ok
            ? window.location.assign('/')
            : alert('Password should be at least 8 charactors!\nUsername should be alphanumeric!')
        } catch (err) { console.log(err) }
    }

    $('#submitbtn').on('click', (event) => {
        event.preventDefault();
        handleRegister();
    });

})