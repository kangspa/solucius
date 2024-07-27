from PIL import Image
from pix2tex.cli import LatexOCR
from matplotlib.pyplot import imshow
from IPython.display import HTML, Math


def upload_files():
  from google.colab import files
  from io import BytesIO
  uploaded = files.upload()
  return [(name, BytesIO(b)) for name, b in uploaded.items()]

def img2tex():
    imgs = upload_files()
    predictions = []

    for name, f in imgs:
        img = Image.open(f)
        model = LatexOCR()
        math = model(img)
        print(math)
        predictions.append('\\mathrm{%s} & \\displaystyle{%s}'%(name, math))
    
    return Math(table%'\\\\'.join(predictions))


if __name__ == '__main__':
    
    display(HTML("<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/"
                "latest.js?config=default'></script>"))
    table = r'\begin{array} {l|l} %s  \end{array}'
    img2tex()
