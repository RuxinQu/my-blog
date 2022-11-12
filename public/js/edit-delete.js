/* eslint-disable no-undef */
$(document).ready(() => {
    const postId = window.location.href.split('/').pop();

    const handleUpdate = async (event) => {
        event.preventDefault();
        const title = $('#title').val();
        const content = $('#content').val();
        const requestOption = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        };
        try {
            const response = await fetch(`/api/post/${postId}`, requestOption);
            response.ok
                ? window.location.assign('/user/dashboard')
                : alert('Failed to save!');
        } catch (err) { alert(err); }
    };

    const handleDelete = async(event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/post/${postId}`, {method: 'DELETE'});
            response.ok
                ? window.location.assign('/user/dashboard')
                : alert('Failed to delete!');
        } catch (err) { alert(err); }
    };

    $('#update').on('click', handleUpdate);
    $('#delete').on('click', handleDelete);


});



