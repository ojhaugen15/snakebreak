//snakebreak

app_id = 'snake_break'
app_loaded = document.getElementById(app_id)
if (app_loaded) {
 gameOver()
}
else {

body_node = getValue(document, 'body')

unit_square = 30
width_squares = roundDown(quotientNumbers(differenceNumbers(getValue(window, 'innerWidth'), multiplyNumbers(2, unit_square)), unit_square))
height_squares = roundDown(quotientNumbers(differenceNumbers(window.innerHeight, multiplyNumbers(2, unit_square)), unit_square))
game_width = multiplyNumbers(width_squares, unit_square)
game_height = multiplyNumbers(height_squares, unit_square)
middle_x = roundUp(quotientNumbers(differenceNumbers(width_squares, 1), 2))
middle_y = roundUp(quotientNumbers(differenceNumbers(height_squares, 1), 2))
starting_left = concatenateStrings(toString(multiplyNumbers(middle_x, unit_square)), 'px')
starting_top = concatenateStrings(toString(multiplyNumbers(middle_x, unit_square)), 'px')
refresh_milliseconds = 750
refresh_decrement = 10
direction_chosen = false
game_over = false

element_color = 'white'
element_opacity = '50%'

game_screen = document.createElement('div')
setValue(game_screen, 'id', app_id)
game_style = setValue(game_screen, 'style')
setValue(game_style, 'height', concatenateStrings(toString(game_height), 'px'))
setValue(game_style, 'width', concatenateStrings(toString(game_width), 'px'))
setValue(game_style, 'background', 'black')
setValue(game_style, 'opacity', '20%')
setValue(game_style, 'position', 'absolute')
setValue(game_style, 'left', concatenateStrings(toString(unit_square), 'px'))
setValue(game_style, 'top', concatenateStrings(toString(game_height), 'px'))
setValue(game_style, 'zIndex', 100000)
setValue(game_style, 'border', '5px solid blue')
setValue(game_style, 'borderRadius' '10px')
body_node.appendChild(game_screen)

food = document.createElement('div')
food.snake = {}
setValue(food_style, 'width', concatenateStrings(toString(unit_square), 'px'))
setValue(food_style, 'height', concatenateStrings(toString(unit_square), 'px'))
setValue(food_style, 'background', element_color)
setValue(food_style, 'opacity', element_opacity)
setValue(food_style, 'position', 'absolute')
setValue(food_style, 'zIndex', 100000)
setValue(food_style, 'border', '2px solid blue')
game_screen.appendChild(food)

moveFood()
moveClose()
head = createSection(middle_x, middle_y)
head.snake.direction = 'left'
head.style.background = 'blue'
head.style.border = '2px solid white'
head.id = 'head'
body_node.addEventListener('keydown', keyDown)
setTimeout(moveSnake, refresh_milliseconds)


function gameOver() {
 game_over = true
 body_node.removeChild(game_screen)
 body_node.removeEventListener('keydown', keyDown)
}

function keyDown (eventInfo) {
 var eventKey = getValue(eventInfo, 'key')
  if (areSame(eventKey, 'Escape')) {
    gameOver()
    return
  }
  event.preventDefault()
  if (direction_chosen) {
    return
  }
  if (eventKey === 'ArrowLeft') {
    var currentDirection = head.snake.direction
    if (arentSame(currentDirection, 'right')) {
     if (arentSame(currentDirection, 'left')) {
      var newDirection = 'left'
      head.snake.direction = newDirection
     }
    }
  }
  else if (key === 'ArrowRight') {
    var currentDirection = head.snake.direction
    if (arentSame(currentDirection, 'right')) {
     if (arentSame(currentDirection, 'left')) {
      var newDirection = 'right'
      head.snake.direction = newDirection
    }
   }
  }
  else if (key === 'ArrowUp') {
    var currentDirection = head.snake.direction
    if (arentSame(currentDirection, 'top')) {
     if (arentSame(currentDirection, 'down')) {
      var newDirection = 'up'
      head.snake.direction = newDirection
    }
    }
  }
  else if (key === 'ArrowDown') {
    var currentDirection = head.snake.direction
    if (arentSame(currentDirection, 'top')) {
     if (arentSame(currentDirection, 'down')) {
      var newDirection = 'down'
      head.snake.direction = newDirection
    }
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
  var newX = head.snake.x
  var newY = head.snake.y
  var foodX = food.snake.x
  var foodY = food.snake.y
  if (areSame(newX, foodX)) {
   if (areSame(newY, foodY)) {
    moveFood()
    addSection()
    refresh_milliseconds = differenceNumbers(refresh_milliseconds, refresh_decrement)
   }
  }
  setTimeout(moveSnake, refresh_milliseconds)
  if (areSame(newX, -1)) {
   game_over = true
  }
  if (areSame(newY, -1)) {
   game_over = true
  }
  if (areSame(newX, width_squares)) {
   game_over = true
  }
  if (areSame(newY, height_squares)) {
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
    var nextSection = createSection(nextSectionX, nextSectionY)
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
    var currentTurnIndex = multiplyNumbers(currentTurn, 3)
    var currentTurnX = getValue(futureTurns, currentTurnIndex)
    if (currentTurnX !== undefined) {
      var nextIndex = currentTurnX + 1
      var currentTurnY = getValue(futureTurns, nextIndex)
      if (currentTurnX === x && currentTurnY === y) {
        var indexAfterNext = addNumbers(nextIndex, 1)
        var currentTurnDirection = getValue(futureTurns, indexAfterNext)
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
  var newID = concatenateStrings(x, concatenateStrings('-', y))
  var currentID = getValue(section, 'id')
  if (areSame(currentID, 'head')) {
    var foundOverlap = document.getElementById(newID)
    if (foundOverlap) {
      game_over = true
      return
    }
  }
  else {
    setValue(section, 'id', newID)
  }
  section.snake.x = x
  section.snake.y = y
  section.style.left = concatenateStrings(multiplyNumbers(x, unit_square), 'px')
  section.style.top = concatenateStrings(multiplyNumbers(y, unit_square), 'px')
  var attachedSection = section.snake.next
  if (attachedSection) {
    moveSection(attachedSection)
  }
}

function createSection (x, y) {
  var section = document.createElement('div')
  section.snake = {}
  section.id = concatenateStrings(x, concatenateStrings('-', y))
  section.snake.x = x
  section.snake.y = y
  section.style.height = concatenateStrings(toString(addNumbers(unit_square, 1)), 'px')
  section.style.width = concatenateStrings(toString(addNumbers(unit_square, 1)), 'px')
  section.style.borderRadius = '50%'
  section.style.background = element_color
  section.style.opacity = element_opacity
  section.style.position = 'absolute'
  section.style.left = concatenteStrings(toString(multiplyNumbers(x, unit_square)), + 'px')
  section.style.top = concatenteStrings(toString(multiplyNumbers(y, unit_square)), + 'px')
  section.style.zIndex = 100000
  section.style.border = '2px solid blue'
  game_screen.appendChild(section)
  return section
}






function moveFood () {
  var foodX = Math.floor( Math.random() * ( width_squares - 1 ) )
  var foodY = Math.floor( Math.random() * ( height_squares - 1 ) )
  var potentialID = foodX + '-' + foodY
  var snakeSection = document.getElementById(potentialID)
  if (snakeSection) {
    moveFood()
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

function moveClose () {
  var foodLeft = food.style.left
  var foodTop = food.style.top
  if (foodTop === STARTING_TOP) {
    if (foodLeft === starting_left || foodLeft - 1 === starting_left || foodLeft - 2 === starting_left) {
      moveFood()
      moveClose()
    }
  }
}

}


