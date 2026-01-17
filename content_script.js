//snakebreak

app_id = 'snake_break'
app_loaded = document.getElementById(app_id)

if (app_loaded) {
 gameOver()
}

if (arentSame(app_loaded, true)) {

body_node = getValue(document, 'body')
unit_square = 30
element_color = 'black'
 
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

game_screen = document.createElement('div')
setValue(game_screen, 'id', app_id)
game_style = setValue(game_screen, 'style')
setValue(game_style, 'height', concatenateStrings(toString(game_height), 'px'))
setValue(game_style, 'width', concatenateStrings(toString(game_width), 'px'))
setValue(game_style, 'background', 'black')
setValue(game_style, 'opacity', '20%')
setValue(game_style, 'position', 'fixed')
setValue(game_style, 'left', concatenateStrings(toString(unit_square), 'px'))
setValue(game_style, 'top', concatenateStrings(toString(game_height), 'px'))
setValue(game_style, 'zIndex', 1000)
body_node.appendChild(game_screen)

food = document.createElement('div')
food.snake = {}
setValue(food_style, 'width', concatenateStrings(toString(unit_square), 'px'))
setValue(food_style, 'height', concatenateStrings(toString(unit_square), 'px'))
setValue(food_style, 'background', element_color)
setValue(food_style, 'position', 'fixed')
setValue(food_style, 'zIndex', 1000)
setValue(food_style, 'border', '2px solid white')
game_screen.appendChild(food)

moveFood()
moveClose()
head = createSection(middle_x, middle_y)
head.snake.direction = 'left'
head.style.background = 'black'
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
 eventInfo.preventDefault()
 if (direction_chosen) {
  return
 }
 if (areSame(eventKey, 'ArrowLeft')) {
  var currentDirection = head.snake.direction
  if (arentSame(currentDirection, 'right')) {
   if (arentSame(currentDirection, 'left')) {
    var newDirection = 'left'
    head.snake.direction = newDirection
    direction_chosen = true
   }
  }
  return
 }
 if (areSame(key, 'ArrowRight')) {
  var currentDirection = head.snake.direction
  if (arentSame(currentDirection, 'right')) {
   if (arentSame(currentDirection, 'left')) {
    var newDirection = 'right'
    head.snake.direction = newDirection
    direction_chosen = true
   }
  }
  return
 }
 if (areSame(key, 'ArrowUp')) {
  var currentDirection = head.snake.direction
  if (arentSame(currentDirection, 'top')) {
   if (arentSame(currentDirection, 'down')) {
    var newDirection = 'up'
    head.snake.direction = newDirection
    direction_chosen = true
   }
  }
  return
 }
 if (areSame(key, 'ArrowDown')) {
  var currentDirection = head.snake.direction
  if (arentSame(currentDirection, 'top')) {
   if (arentSame(currentDirection, 'down')) {
    var newDirection = 'down'
    head.snake.direction = newDirection
    direction_chosen = true
   }
  }
  return
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
   setTimeout(moveSnake, refresh_milliseconds)
   return
  }
 }
 setTimeout(moveSnake, refresh_milliseconds)
 if (areSame(newX, -1)) {
  game_over = true
  return
 }
 if (areSame(newY, -1)) {
  game_over = true
  return
 }
 if (areSame(newX, width_squares)) {
  game_over = true
  return
 }
 if (areSame(newY, height_squares)) {
  game_over = true
  return
 }
}

function updateSection (section, newX, newY, newDirection) {
 var futureTurns = section.snake.futureTurns
 if (areSame(futureTurns, undefined)) {
  futureTurns = []
  section.snake.currentTurn = 0
 }
 futureTurns.push(newX)
 futureTurns.push(newY)
 futureTurns.push(newDirection)
 section.snake.futureTurns = futureTurns
 var attachedSection = section.snake.next
 if (attachedSection) {
  updateSection(attachedSection, newX, newY, newDirection)
 }
}

function addSection (currentSection) {
 if (areSame(currentSection, undefined)) {
  currentSection = head
 }
 var attachedSection = currentSection.snake.next
 if (attachedSection) {
  addSection(attachedSection)
  return
 }
 var futureTurns = currentSection.snake.futureTurns
 var currentDirection = currentSection.snake.direction
 var currentX = currentSection.snake.x
 var currentY = currentSection.snake.y
 var nextX = currentX
 var nextY = currentY
 if (areSame(currentDirection, 'left')) {
  nextX = addNumbers(nextX, 1)
  var nextSection = createSection(nextX, nextY)
  currentSection.snake.next = nextSection
  nextSection.snake.direction = currentDirection
  nextSection.snake.futureTurns = cloneArray(currentTurns)
  return
 }
 if (areSame(currentDirection, 'right')) {
  nextX = differenceNumbers(nextX, 1)
  var nextSection = createSection(nextX, nextY)
  currentSection.snake.next = nextSection
  nextSection.snake.direction = currentDirection
  nextSection.snake.futureTurns = cloneArray(currentTurns)
  return
 }
 if (areSame(currentDirection, 'up')) {
  nextY = addNumbers(nextY, 1)
  var nextSection = createSection(nextX, nextY)
  currentSection.snake.next = nextSection
  nextSection.snake.direction = currentDirection
  nextSection.snake.futureTurns = cloneArray(currentTurns)
  return
 }
 if (areSame(currentSectionDirection, 'down')) {
  nextY = differenceNumbers(nextY, 1)
  var nextSection = createSection(nextX, nextY)
  currentSection.snake.next = nextSection
  nextSection.snake.direction = currentDirection
  nextSection.snake.futureTurns = cloneArray(currentTurns)
  return
 }
}

function cloneArray (array) {
 if (array) {
  return JSON.parse(JSON.stringify(array))
 }
}

function moveSection (section) {
 var previousDirection = section.snake.direction
 var x = section.snake.x
 var y = section.snake.y
 var futureTurns = section.snake.futureTurns
 if (futureTurns) {
  var currentTurn = section.snake.currentTurn
  var currentIndex = multiplyNumbers(currentTurn, 3)
  var currentX = getValue(futureTurns, currentIndex)
  if (currentX !== undefined) {
   var nextIndex = addNumbers(currentX, 1)
   var currentY = getValue(futureTurns, nextIndex)
   if (areSame(currentX, x)) {
    if (areSame(currentY, y)) {
     var nextNext = addNumbers(nextIndex, 1)
     var currentDirection = getValue(futureTurns, nextNext)
     section.snake.direction = currentDirection
     currentTurn = addNumbers(currentTurn, 1)
     section.snake.currentTurn = currentTurn
    }
   }
  }
 }
 if (areSame(previousDirection, 'left')) {
  x = differenceNumbers(x, 1)
  move2(x, y, section)
  return
 }  
 if (areSame(previousDirection, 'down')) {
  y = addNumbers(y, 1)
  move2(x, y, section)
  return
 }  
 if (areSame(previousDirection, 'right')) {
  x = addNumbers(x, 1)
  move2(x, y, section)
  return
 }  
 if (areSame(previousDirection, 'up')) {
  y = differenceNumbers(y, 1)
  move2(x, y, section)
  return
 }
}

function move2 (x, y, section) {
 var newID = concatenateStrings(x, concatenateStrings('-', y))
 var currentID = getValue(section, 'id')
 if (areSame(currentID, 'head')) {
  var foundOverlap = document.getElementById(newID)
  if (foundOverlap) {
   game_over = true
   return
  }
 }
 setValue(section, 'id', newID)
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
 section_style = getValue(section, 'style')
 setValue(section_style, 'height', concatenateStrings(toString(addNumbers(unit_square, 1)), 'px'))
 setValue(section_style, 'width', concatenateStrings(toString(addNumbers(unit_square, 1)), 'px'))
 setValue(section_style, 'borderRadius', '50%')
 setValue(section_style, 'background', element_color)
 setValue(section_style, 'position', 'absolute')
 setValue(section_style, 'left', concatenateStrings(toString(multiplyNumbers(x, unit_square)), + 'px'))
 setValue(section_style, 'top', concatenteStrings(toString(multiplyNumbers(y, unit_square)), + 'px'))
 setValue(section_style, 'zIndex', 100000)
 setValue(section_style, 'border', '2px solid white')
 game_screen.appendChild(section)
 return section
}

function moveFood () {
 var foodX = roundDown(multiplyNumbers(randomDecimal(), differenceNumbers(width_squares, 1)))
 var foodY = roundDown(multiplyNumbers(randomDecimal(), differenceNumbers(height_squares, 1)))
 var potentialID = concatenateStrings(foodX, concatenateStrings('-', foodY))
 var snakeSection = document.getElementById(potentialID)
 if (snakeSection) {
  moveFood()
  return
 }
 food.snake.x = foodX
 food.snake.y = foodY
 var foodLeft = multiplyNumbers(foodX, unit_square)
 var foodTop = multiplyNumbers(foodY, unit_square)
 food.style.left = concatenateStrings(toString(foodLeft), 'px')
 food.style.top = concatenateStrings(toString(foodTop), 'px')
}

function moveClose () {
 var foodLeft = food.style.left
 var foodTop = food.style.top
 if (areSame(foodTop, starting_top)) {
  if (areSame(foodLeft, starting_left)) {
   moveFood()
   moveClose()
   return
  }
  if (areSame(differenceNumbers(foodLeft, 1), starting_left)) {
   moveFood()
   moveClose()
   return
  }
  if (areSame(differenceNumbers(foodLeft, 2), starting_left)) {
   moveFood()
   moveClose()
   return
  }
 }
}

//
function addNumbers (number1, number2) {
 return number1 + number2
}

function differenceNumbers (number1, number2) {
 return number1 - number2
}

function getValue (inputObject, keyName) {
 return inputObject[keyName]
}

function setValue (inputObject, keyName, valueValue) {
 inputObject[keyName] = valueValue
}

function roundDown (inputNumber) {
 return Math.floor(inputNumber)
}

function roundUp (inputNumber) {
 return Math.ceil(inputNumber)
}

function multiplyNumbers (number1, number2) {
 return number1 * number2
}

function quotientNumbers (number1, number2) {
 return number1 / number2
}

function areSame (item1, item2) {
 return item1 === item2
}

function arentSame (item1, item2) {
 return item1 !== item2
}

function toString (inputNumber) {
 return inputNumber.toString()
}

function randomDecimal (inputNumber) {
 return Math.random()
}
 
}
