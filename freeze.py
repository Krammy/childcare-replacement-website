from flask_frozen import Freezer
from app import app

freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()
    # add local _redirects file to build folder
    with open('_redirects', 'r') as f:
        redirects = f.read()
    with open('build/_redirects', 'w') as f:
        f.write(redirects)
