import {red, green, blue, charWidth} from './Sliders'

const maxWidth = 1920
const maxHeight = 1080

console.log('started work')

class Cell {
  x
  y
  symbol
  color
  fontSize
  constructor(x: number, y: number, symbol: string, color: string, fontSize: number) {
    this.x = x
    this.y = y
    this.symbol = symbol
    this.color = color
    this.fontSize = fontSize
  }

  draw (ctx: OffscreenCanvasRenderingContext2D) {
    // Shadows apparently cause long processing times in Firefox, so draw same font twice, but slightly offset to fake a shadow on each character
    ctx.font = `${this.fontSize * 1.2}px Verdana`

    // TODO: When dark mode is added, detect what color shadow to use
    ctx.fillStyle = 'black'
    ctx.fillText(this.symbol, this.x + 0.5, this.y + 0.5)
    ctx.fillStyle = this.color
    ctx.fillText(this.symbol, this.x, this.y)
  }
}

self.addEventListener('message', function(e) {
  console.log('message')
  console.log(e.data.imageData)
  let x = 0
  let y = 0
  const imageWidth = e.data.imageData.width
  const imageHeight = e.data.imageData.height
  const imageData = e.data.imageData.data
  const canvas: OffscreenCanvas = new OffscreenCanvas(imageWidth, imageHeight)
  const ctx = canvas.getContext('2d')! as OffscreenCanvasRenderingContext2D
  const cellSize = e.data.cellSize
  console.log(canvas)
  console.log(canvas.width)

  const newImageArray = []
  for (let y = 0; y < imageHeight; y += cellSize) {
    for (let x = 0; x < imageWidth; x += cellSize) {
      const posX = x * 4
      const posY = y * 4
      const pos = (posY * imageWidth) + posX // Completed rows + current x position in the current row

      if (imageData[pos + 3] > 128) { // Ignore transparent and semi transparent pixels
        const red = imageData[pos]
        const green = imageData[pos+1]
        const blue = imageData[pos+2]
        const total = red + green + blue
        const averageColorValue = total/3
        const color = `rgb(${red}, ${green}, ${blue})`
        const symbol = convertToChar(averageColorValue)
        if (total > 200) newImageArray.push(new Cell(x, y, symbol, color, cellSize)) // Exclude very dark/dim colors with if statement
      }
    }
  }
  console.log(newImageArray)
  console.log('finished')
  drawAscii(ctx, newImageArray)
  const asciiImageData = ctx.getImageData(0, 0, imageWidth, imageHeight)
  canvas.convertToBlob().then((blob: Blob) => { 
    console.log(blob)
    const blobUrl = URL.createObjectURL(blob)
    this.postMessage({blobUrl, asciiImageData})
  })
  // const ascii = canvas.transferToImageBitmap()
  // this.postMessage({ascii}, [ascii])
}, false)

function drawAscii(ctx: OffscreenCanvasRenderingContext2D, newImageArray: Cell[]) {
  for (const cell of newImageArray) {
    cell.draw(ctx)
  }
}

function draw(cellSize) {

}

const _reduceDimension = (width, height, maxWidth, maxHeight) => {

  if (width > maxWidth) {
      //Calculating new height using maximum width as the width
      height = Math.floor((height * maxWidth) / width);
      width = maxWidth;
  }
  if (height > maxHeight) {
      //Calculating new width using  maximum height and height
      width = Math.floor((width * maxHeight) / height);
      height = maxHeight;
  }

  return [width, height];
}

const asciiIntensityArray = ["$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "/", "|", "(", ")", "1", "{", "}", "[", "]", "?", "-", "_", "+", "~", "<", ">", "i", "!", "l", "I", ";", ":", ",", '"', "^", "`", "'", ".", " "];

function convertToChar(averageColorValue: number) {
  return asciiIntensityArray[Math.ceil((averageColorValue / 255) * (asciiIntensityArray.length - 1))]
}