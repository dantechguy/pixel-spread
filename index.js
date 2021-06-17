var width = 1000
var height = 1000
var scale = 1
var germGrid = [...Array(height)].map(e => Array(width).fill(null))
var germColours = ['red', 'green', 'blue', 'orange', '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


var darkFrame = 0

// var difficultyGrid = []
// for (let y=0; y<height; y++) {
// 	let temp = []
// 	for (let x=0; x<width; x++) {
// 		if (x > 40 && x < 60 && y > 40 && y < 60) {
// 			temp.push(0.01)
// 		} else {
// 			// temp.push(Math.random())
// 			temp.push(2)
// 		}
// 	}
// 	difficultyGrid.push(temp)
// }

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
canvas.width = width*scale
canvas.height = height*scale


// create initial germs
for (let i=0; i<8; i++) {
	germGrid[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = i
}
// germGrid[0][0] = 0
// germGrid[height-1][width-1] = 1
// germGrid[0][width-1] = 2
// germGrid[height-1][0] = 3

function frame() {
	for (let y=0; y<height; y++) {
		for (let x=0; x<width; x++) {
			
			if (Math.random() < Math.pow(difficultyGrid[y][x],1)) {
				// directions
				let takeOverOptions = []
				for (let dy=-1; dy<=1; dy++) {
					for (let dx=-1; dx<=1; dx++) {
						if (!(dx === 0 && dy === 0)) {
							nx = x + dx
							ny = y + dy
							if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
								takeOverOptions.push(germGrid[ny][nx])
							}
						}
					}
				}
				let takeOverChoice = takeOverOptions[Math.floor(Math.random()*takeOverOptions.length)]
				if (takeOverChoice !== null && takeOverChoice !== germGrid[y][x]) {
					germGrid[y][x] = takeOverChoice
					ctx.fillStyle = germColours[takeOverChoice]
					ctx.fillRect(x*scale, y*scale, scale, scale)
				}
			}
		}
	}
	darkFrame++
	if (darkFrame > 8) {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.01)'
		ctx.fillRect(0, 0, width*scale, height*scale)
		darkFrame = 0
	}
	
	requestAnimationFrame(frame)
	// setTimeout(frame,100)
}

function drawAll() {
	ctx.clearRect(0, 0, width*scale, height*scale)
	for (let y=0; y<height; y++) {
		for (let x=0; x<width; x++) {
			if (germGrid[y][x] !== null) {
				ctx.fillStyle = germColours[germGrid[y][x]]
			} else {
				ctx.fillStyle = `hsl(0, 0%, ${Math.floor(difficultyGrid[y][x]*100)}%)`
			}
			ctx.fillRect(x*scale, y*scale, scale, scale)
		}
	}
}

drawAll()
requestAnimationFrame(frame)