// Add event listener for form submission
document.getElementById('review-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const albumName = document.getElementById('album-name').value;
    const artist = document.getElementById('album-artist').value;
    const reviewText = document.getElementById('review-text').value;

    const reviewData = {
        album_name: albumName,
        artist: artist,
        review_text: reviewText
    };

    fetch('/add_review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
        // Clear the form after successful submission
        document.getElementById('review-form').reset();

        // Add new review to the list (on the front end)
        const reviewList = document.getElementById('review-list');
        const newReview = document.createElement('li');
        newReview.innerHTML = `
            <strong>${data.album_name}</strong> by <em>${data.artist}</em>
            <p>${data.review_text}</p>
            <button class="delete-btn" data-id="${data.id}">Delete</button>
        `;
        reviewList.appendChild(newReview);

        // Add delete functionality to the new button
        newReview.querySelector('.delete-btn').addEventListener('click', function() {
            deleteReview(data.id, newReview);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Add event listeners for existing delete buttons
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
        const reviewId = button.getAttribute('data-id');
        const reviewItem = button.closest('li');
        deleteReview(reviewId, reviewItem);
    });
});

// Function to delete a review
function deleteReview(reviewId, reviewItem) {
    fetch(`/delete_review/${reviewId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        // Remove the review from the UI
        reviewItem.remove();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
