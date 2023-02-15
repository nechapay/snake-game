const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const ground = new Image()
ground.src = 'img/ground.png'

const foodImg = new Image()
foodImg.src = 'img/food.png'

let box = 32

let score = 0

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
}

let snake = []
snake.push({ x: 9 * box, y: 10 * box })

document.addEventListener('keydown', direction)

function drawGame() {
  ctx.drawImage(ground, 0, 0)
  ctx.drawImage(foodImg, food.x, food.y)

  drawSnake()

  ctx.fillStyle = 'white'
  ctx.font = '50px Arial'
  ctx.fillText(score, box * 2.5, box * 1.7)

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (snakeX === food.x && snakeY === food.y) {
    score++
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    }
  } else {
    snake.pop()
  }

  if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
    clearInterval(game)
  }

  switch (dir) {
    case 'left':
      snakeX -= box
      break
    case 'right':
      snakeX += box
      break
    case 'up':
      snakeY -= box
      break
    case 'down':
      snakeY += box
      break
    default:
      break
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }
  checkCollision(newHead, snake)
  snake.unshift(newHead)
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'red'
    ctx.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

let dir

function direction(evt) {
  switch (evt.keyCode) {
    case 37:
      if (dir !== 'right') dir = 'left'
      break
    case 38:
      if (dir !== 'down') dir = 'up'
      break
    case 39:
      if (dir !== 'left') dir = 'right'
      break
    case 40:
      if (dir !== 'up') dir = 'down'
      break
  }
}

function checkCollision(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) clearInterval(game)
  }
}

function animate() {
  drawGame()
  // requestAnimationFrame(animate)
}

let game = setInterval(animate, 100)
