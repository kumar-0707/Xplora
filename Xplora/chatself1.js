
const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
  
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    
    if (seconds < 10) {
        return "just now";
    }

    return Math.floor(seconds) + " seconds ago";
}


const users = {
    'alex1': {
        name: 'Mukesh',
        src: ''
    },
    'anna1': {
        name: 'Daniel',
        src: ''
    },
    'drew1': {
        name: 'Amar',
        src: ''
    },
    'liliya': {
        name: 'Nellai',
        src: ''
    }
};


const loggedUser = users['alex1'];


let comments = [
    {
        id: 1,
        text: 'Hi everyone! I\'m planning a trip to Tamil Nadu next month. Any recommendations on must-visit places?',
        author: users['liliya'],
        createdAt: '2024-04-06 10:00:00',
    },
    {
        id: 2,
        text: 'Hey Nellai! That\'s exciting! You definitely have to visit Mahabalipuram for its beautiful beaches and historic temples.',
        author: users['anna1'],
        createdAt: '2024-04-06 11:00:00',
    },
    {
        id: 3,
        text: 'Hi there! Don\'t forget to explore the hill stations like Ooty and Kodaikanal for a refreshing escape from the heat.',
        author: users['drew1'],
        createdAt: '2024-04-06 12:00:00',
    }
];

const authedUser = document.querySelector('.authed-user');

const authorHTML = DOMPurify.sanitize(``);

authedUser.innerHTML = authorHTML;

const commentsWrapper = document.querySelector('.discussion__comments');


const createComment = (comment) => {
    const newDate = new Date(comment.createdAt);
    
    return DOMPurify.sanitize(`<div class="comment">
        <div class="avatar">
           
        </div>
        <div class="comment__body">
            <div class="comment__author">
                ${comment.author.name}
                <time
                    datetime="${comment.createdAt}"
                    class="comment__date"
                >
                    ${timeSince(newDate)}
                </time>
            </div>
            <div class="comment__text">
                <p>${comment.text}</p>
            </div>
        </div>
    </div>`);
}


const commentsMapped = comments.map(comment =>
    createComment(comment)
);


const innerComments = commentsMapped.join('');
commentsWrapper.innerHTML = innerComments;

const newCommentForm = document.getElementById('newcomment__form');
const newCommentTextarea = document.querySelector('#newcomment__form textarea');

document.getElementById('reset-button').addEventListener(
    'click', 
    () => {
        newCommentForm.reset();
    }
);

newCommentForm.addEventListener(
    'submit', 
    (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newCommentTextareaValue = newCommentTextarea.value;

        const newComment = {
            id: comments.length + 1,
            text: newCommentTextareaValue,
            author: loggedUser,
            createdAt: new Date().toISOString(),
        };

        const comment = document.createElement('div');
        comment.innerHTML = createComment(newComment);

        if (commentsWrapper.hasChildNodes()) {
            commentsWrapper.insertBefore(comment, commentsWrapper.childNodes[0]);          
        } else {
            commentsWrapper.appendChild(comment);
        }

        
        newCommentForm.reset();
    }
);

