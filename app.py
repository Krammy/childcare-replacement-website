from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/pricing')
@app.route('/security')
@app.route('/reviews')
@app.route('/availability')
@app.route('/system')
@app.route('/qualifications')
@app.route('/experience')
def home():
    return render_template('home.html')

@app.route('/success')
def success():
    return render_template('success.html')

if __name__ == "__main__":
    app.run(port=8000, debug=True)
