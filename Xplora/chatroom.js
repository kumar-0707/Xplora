document.addEventListener('DOMContentLoaded', function() {
    const threadForm = document.getElementById('threadForm');
    const threadList = document.getElementById('threadList');

    function handleSubmit(event) {
        event.preventDefault();

        const threadTitle = document.getElementById('threadTitle').value;
        const threadContent = document.getElementById('threadContent').value;

        if (threadTitle.trim() === '' || threadContent.trim() === '') {
            alert('Please fill in both title and content fields.');
            return;
        }

        const thread = document.createElement('div');
        thread.classList.add('thread');
        thread.innerHTML = `
            <h2>${threadTitle}</h2>
            <p>${threadContent}</p>
        `;

        threadList.appendChild(thread);

        threadForm.reset();
    }

    threadForm.addEventListener('submit', handleSubmit);


    threadForm.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    });
});
