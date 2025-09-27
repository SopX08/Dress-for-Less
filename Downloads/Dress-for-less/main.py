from flask import Flask, url_for, render_template, redirect, request, session

app = Flask(__name__)


# Navigation to other pages


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/generate_outfit')
def generate_outfit():
    return render_template('generate_outfit.html')


@app.route('/add_clothes')
def add_clothes():
    return render_template('add_clothes.html')


@app.route('/wardrobe')
def wardrobe():
    history = ["First entry", "Second entry", "Third entry"]
    return render_template('wardrobe.html', history=history)


@app.route('/friends')
def friends():
    return render_template('friends.html')


@app.route('/trade')
def trade():
    return render_template('trade.html')


@app.route('/donate')
def donate():
    return render_template('donate.html')


@app.route('/submit', methods=['POST'])
def submit_form():
    # Handling the form submission
    name = request.form.get('name')  # Retrieving the uploaded file

    # Process the data here (e.g., saving the file, storing data, etc.)
    return render_template('add_clothes.html')


if __name__ == "__main__":
    app.run(debug=True)
