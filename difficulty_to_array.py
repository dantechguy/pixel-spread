from PIL import Image
import numpy as np

img = Image.open('difficulty.png')
mat = np.array(img) / 256
lst = np.repeat(np.repeat(mat,10, axis=0), 10, axis=1).tolist()
# lst = mat.tolist()
with open('data.js', 'w') as f:
    f.write('var difficultyGrid = ' + str(lst))