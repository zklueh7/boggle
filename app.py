from flask import Flask, request, render_template, session, jsonify
#from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

#debug = DebugToolbarExtension(app)

game = Boggle()

@app.route('/')
def start_page():
    """Show page with start button"""
    return render_template("start.html")

@app.route('/boggle')
def boggle():
    """Boggle game"""
    board = game.make_board()
    session["board"] = board
    return render_template("boggle.html", board=board)

@app.route('/check_guess')
def check_guess():
    """Check boggle guess"""
    guess = request.args["guess"]
    board = session["board"]
    response = game.check_valid_word(board, guess)
    return jsonify({"response": response})

