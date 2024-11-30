from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Sample reviews data (replace this with a database or persistent storage later)
reviews = [
    {'id': 1, 'album_name': 'The Fall of Ideals', 'artist': 'All That Remains', 'review_text': 'Amazing metalcore album!'},
    {'id': 2, 'album_name': 'Reign in Blood', 'artist': 'Slayer', 'review_text': 'A classic thrash album!'}
]

@app.route('/')
def index():
    return render_template('index.html', reviews=reviews)

@app.route('/add_review', methods=['POST'])
def add_review():
    album_name = request.json.get('album_name')
    artist = request.json.get('artist')
    review_text = request.json.get('review_text')

    review_id = len(reviews) + 1  # Simple id generation
    new_review = {'id': review_id, 'album_name': album_name, 'artist': artist, 'review_text': review_text}
    reviews.append(new_review)

    return jsonify(new_review), 200

@app.route('/delete_review/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    global reviews
    reviews = [review for review in reviews if review['id'] != review_id]
    return jsonify({'message': 'Review deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)

