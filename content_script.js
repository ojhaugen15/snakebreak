//snakebreak

app_id = 'snake_game_screen'
app_loaded = document.getElementById(app_id)
if (app_loaded) {
  gameOver()
}
else {

body_node = document.body

unit_square = 30
width_squares = Math.floor( ( window.innerWidth - 2 * unit_square ) / unit_square )
height_squares = Math.floor( ( window.innerHeight - 2 * unit_square ) / unit_square )
game_width = width_squares * unit_square
game_height = height_squares * unit_square
middle_x = Math.ceil( ( width_squares - 1 ) / 2 )
middle_y = Math.ceil( ( height_squares - 1 ) / 2 )
starting_left = middle_x * unit_square + 'px'
starting_top = middle_y * unit_square + 'px'
refresh_milliseconds = 750
refresh_decrement = 10
direction_chosen = false
game_over = false

element_color = 'white'
element_opacity = '50%'

game_screen = document.createElement('div')
game_screen.id = APP_ID
game_screen.style.height = game_height + 'px'
game_screen.style.width = game_width + 'px'
game_screen.style.background = 'black'
game_screen.style.opacity = '20%'
game_screen.style.position = 'absolute'
game_screen.style.left = unit_square + 'px'
game_screen.style.top = unit_square + 'px'
game_screen.style.zIndex = 100000
game_screen.style.border = '5px solid blue'
game_screen.style.borderRadius = '10px'
body_node.appendChild(game_screen)

food = document.createElement('div')
food.snake = {}
food.style.width = unit_square + 'px'
food.style.height = unit_square + 'px'
food.style.background = ELEMENT_COLOR
food.style.opacity = ELEMENT_OPACITY
food.style.position = 'absolute'
food.style.zIndex = 100000
food.style.border = '2px solid blue'
game_screen.appendChild(food)

movefood()
movefoodIfTooCloseToStart()
head = createSnakeSection(middle_x, middle_y)
head.snake.direction = 'left'
head.style.background = 'blue'
head.style.border = '2px solid white'
head.id = 'head'
body_node.addEventListener('keydown', keyDown)
setTimeout(moveSnake, REFRESH_MILLISECONDS)


function gameOver() {
  game_over = true
  body_node.removeChild(game_screen)
  body_node.removeEventListener('keydown', keyDown)
}

function keyDown (event) {
  var key = event.key
  if (key === 'Escape') {
    gameOver()
    return
  }
  event.preventDefault()
  if (direction_chosen) {
    return
  }
  if (key === 'ArrowLeft') {
    var direction = head.snake.direction
    if (direction !== 'right' && direction !== 'left') {
      var newDirection = 'left'
      head.snake.direction = newDirection
    }
  }
  else if (key === 'ArrowRight') {
    var direction = head.snake.direction
    if (direction !== 'right' && direction !== 'left') {
      var newDirection = 'right'
      head.snake.direction = newDirection
    }
  }
  else if (key === 'ArrowUp') {
    var direction = head.snake.direction
    if (direction !== 'down' && direction !== 'up') {
      var newDirection = 'up'
      head.snake.direction = newDirection
    }
  }
  else if (key === 'ArrowDown') {
    var direction = head.snake.direction
    if (direction !== 'down' && direction !== 'up') {
      var newDirection = 'down'
      head.snake.direction = newDirection
    }
  }
  if (newDirection) {
    direction_chosen = true
  }
}

function moveSnake () {
  if (game_over) {
    return
  }
  var headX = head.snake.x
  var headY = head.snake.y
  if (direction_chosen) {
    direction_chosen = false
    var attachedSection = head.snake.next
    if (attachedSection) {
      var headDirection = head.snake.direction
      updateSection(attachedSection, headX, headY, headDirection)
    }
  }
  moveSection(head)
  var newheadX = head.snake.x
  var newheadY = head.snake.y
  var foodX = food.snake.x
  var foodY = food.snake.y
  if (newheadX === foodX && newheadY === foodY) {
    movefood()
    addSection()
    REFRESH_MILLISECONDS -= REFRESH_DECREMENT
  }
  setTimeout(moveSnake, REFRESH_MILLISECONDS)
  if (newheadX === -1 || newheadY === -1 || newheadX === width_squares || newheadY === height_squares) {
    game_over = true
  }
}

function updateSection (section, newTurnX, newTurnY, newTurnDirection) {
  var futureTurns = section.snake.futureTurns
  if (!futureTurns) {
    futureTurns = []
    section.snake.currentTurn = 0
  }
  futureTurns.push(newTurnX)
  futureTurns.push(newTurnY)
  futureTurns.push(newTurnDirection)
  section.snake.futureTurns = futureTurns
  var attachedSection = section.snake.next
  if (attachedSection) {
    updateSection(attachedSection, newTurnX, newTurnY, newTurnDirection)
  }
}

function addSection (currentSection) {
  if (!currentSection) {
    currentSection = head
  }
  var attachedSection = currentSection.snake.next
  if (attachedSection) {
    addSection(attachedSection)
  }
  else {
    var currentSectionFutureTurns = currentSection.snake.futureTurns
    var currentSectionDirection = currentSection.snake.direction
    var currentSectionX = currentSection.snake.x
    var currentSectionY = currentSection.snake.y
    var nextSectionX = currentSectionX
    var nextSectionY = currentSectionY
    if (currentSectionDirection === 'left') {
      nextSectionX++
    }
    else if (currentSectionDirection === 'right') {
      nextSectionX--
    }
    else if (currentSectionDirection === 'up') {
      nextSectionY++
    }
    else if (currentSectionDirection === 'down') {
      nextSectionY--
    }
    var nextSection = createSnakeSection(nextSectionX, nextSectionY)
    currentSection.snake.next = nextSection
    nextSection.snake.direction = currentSectionDirection
    nextSection.snake.futureTurns = cloneArray(currentSectionFutureTurns)
  }
}

function cloneArray (array) {
  if (array) {
    return JSON.parse(JSON.stringify(array))
  }
}

function moveSection (section) {
  var direction = section.snake.direction
  var x = section.snake.x
  var y = section.snake.y
  var futureTurns = section.snake.futureTurns
  if (futureTurns) {
    var currentTurn = section.snake.currentTurn
    var currentTurnIndex = currentTurn * 3
    var currentTurnX = futureTurns[currentTurnIndex]
    if (currentTurnX !== undefined) {
      var nextIndex = currentTurnX + 1
      var currentTurnY = futureTurns[nextIndex]
      if (currentTurnX === x && currentTurnY === y) {
        var indexAfterNext = nextIndex + 1
        var currentTurnDirection = futureTurns[indexAfterNext]
        section.snake.direction = currentTurnDirection
        currentTurn++
        section.snake.currentTurn = currentTurn
      }
    }
  }
  if (direction === 'left') {
    x--
  }  
  else if (direction === 'down') {
    y++
  }  
  else if (direction === 'right') {
    x++
  }  
  else if (direction === 'up') {
    y--
  }
  var newID = x + '-' + y
  var currentID = section.id
  if (currentID === 'head') {
    var foundOverlap = document.getElementById(newID)
    if (foundOverlap) {
      game_over = true
      return
    }
  }
  else {
    section.id = newID
  }
  section.snake.x = x
  section.snake.y = y
  section.style.left = x * unit_square + 'px'
  section.style.top = y * unit_square + 'px'
  var attachedSection = section.snake.next
  if (attachedSection) {
    moveSection(attachedSection)
  }
}

function createSnakeSection (x, y) {
  var section = document.createElement('div')
  section.snake = {}
  section.id = x + '-' + y
  section.snake.x = x
  section.snake.y = y
  section.style.height = unit_square + 1 + 'px'
  section.style.width = unit_square + 1 + 'px'
  section.style.borderRadius = '50%'
  section.style.background = ELEMENT_COLOR
  section.style.opacity = ELEMENT_OPACITY
  section.style.position = 'absolute'
  section.style.left = x * unit_square + 'px'
  section.style.top = y * unit_square + 'px'
  section.style.zIndex = 100000
  section.style.border = '2px solid blue'
  game_screen.appendChild(section)
  return section
}

function movefood () {
  var foodX = Math.floor( Math.random() * ( width_squares - 1 ) )
  var foodY = Math.floor( Math.random() * ( height_squares - 1 ) )
  var potentialID = foodX + '-' + foodY
  var snakeSection = document.getElementById(potentialID)
  if (snakeSection) {
    movefood()
  }
  else {
    food.snake.x = foodX
    food.snake.y = foodY
    var foodLeft = foodX * unit_square
    var foodTop = foodY * unit_square
    food.style.left = foodLeft + 'px'
    food.style.top = foodTop + 'px'
  }
}

function movefoodIfTooCloseToStart () {
  var foodLeft = food.style.left
  var foodTop = food.style.top
  if (foodTop === STARTING_TOP) {
    if (foodLeft === starting_left || foodLeft - 1 === starting_left || foodLeft - 2 === starting_left) {
      movefood()
      movefoodIfTooCloseToStart()
    }
  }
}

}


