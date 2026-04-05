import os
from flask_frozen import Freezer
from app import app

app.config["FREEZER_DEFAULT_MIMETYPE"] = "text/html"
freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()

    # fixes wonky way Flask-Frozen saves success page
    os.rename("build/success", "build/success.html")
    
    # add local _redirects file to build folder
    with open('_redirects', 'r') as f:
        redirects = f.read()
    with open('build/_redirects', 'w') as f:
        f.write(redirects)
