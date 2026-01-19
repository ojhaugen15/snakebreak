chrome.runtime.onMessage.addListener(messageReceived)

function messageReceived (request, sender, sendResponse) {
if (request.message === "icon_clicked") {



screen_id = 'snakeojhaugen'
screen_element = document.getElementById(screen_id)
body_node = getValue(document, 'body')

if (screen_element) {
 clearGame()
}

if (isFalsey(screen_element)) {




grid_unit = 30
game_x = quotientNumbers(30, 2)
game_y = game_x
unit_width = roundDown(quotientNumbers(differenceNumbers(innerWidth, grid_unit), grid_unit))
unit_height = roundDown(quotientNumbers(differenceNumbers(innerHeight, grid_unit), grid_unit))
game_width = multiplyNumbers(unit_width, grid_unit)
game_height = multiplyNumbers(unit_height, grid_unit)
food_start = multiplyNumbers(grid_unit, 3)

all_turns = []
current_turn = 0
nodes_information = []
current_direction = randomDirection()
next_direction = current_direction 
refresh_interval = 1000
refresh_decrement = 10
food_x = null
food_y = null

startGame()

setTimeout(function () {
 body_node.addEventListener('keyup', changeDirection)
}, multiplyNumbers(refresh_interval, .9))

function changeDirection (eventInfo) {
 eventInfo.preventDefault()
 var keyPressed = getValue(eventInfo, 'keyCode')
 if (areSame(keyPressed, 74)) {
  next_direction = 2
  return
 }
 if (areSame(keyPressed, 76)) {
  next_direction = 0
  return
 }
 if (areSame(keyPressed, 73)) {
  next_direction = 1
  return
 }
 if (areSame(keyPressed, 75)) {
  next_direction = 3
  return
 }
}

function growX (lastX, lastDirection) {
 if (areSame(moduloNumber(lastDirection, 2), 0)) {
  return differenceNumbers(lastX, multiplyNumbers(differenceNumbers(1, lastDirection), grid_unit))
 }
 return lastX
}

function growY (lastY, lastDirection) {
 if (areSame(moduloNumber(lastDirection, 2), 1)) {
  return differenceNumbers(lastY, multiplyNumbers(differenceNumbers(lastDirection, 2), grid_unit))
 }
 return lastY
}

function getX (previousX, currentDirection) {
 if (areSame(moduloNumber(currentDirection, 2), 0)) {
  return addNumbers(previousX, multiplyNumbers(differenceNumbers(1, currentDirection), grid_unit))
 }
 return previousX
}

function getY (previousY, currentDirection) {
 if (areSame(moduloNumber(currentDirection, 2), 1)) {
  return addNumbers(previousY, multiplyNumbers(differenceNumbers(currentDirection, 2), grid_unit))
 }
 return previousY
}

function randomDirection () {
 return roundNumber(multiplyNumbers(randomNumber(), 3))
}

function setBoundaries () {
 var boundaryBox = document.createElement('div')
 setValue(boundaryBox, 'id', 'snakeboundariesojhaugen')
 screen_element.appendChild(boundaryBox)
 var boundaryStyle = getValue(boundaryBox, 'style')
 setValue(boundaryStyle, 'position', 'fixed')
 setValue(boundaryStyle, 'top', concatenateStrings(toString(game_y), 'px'))
 setValue(boundaryStyle, 'left', concatenateStrings(toString(game_x), 'px'))
 setValue(boundaryStyle, 'width', concatenateStrings(toString(game_width), 'px'))
 setValue(boundaryStyle, 'height', concatenateStrings(toString(game_height), 'px'))
 setValue(boundaryStyle, 'border', '2px dashed black')
}

function createNode (positionX, positionY, isHead, isFood) {
 var snakeNode = document.createElement('div')
 screen_element.appendChild(snakeNode)
 var nodeStyle = getValue(snakeNode, 'style')
 setValue(nodeStyle, 'height', concatenateStrings(toString(grid_unit), 'px'))
 setValue(nodeStyle, 'width', concatenateStrings(toString(grid_unit), 'px'))
 if (areSame(isHead, true)) {
  setValue(nodeStyle, 'borderRadius', '50%')
  setValue(nodes_information, 0, positionX)
  setValue(nodes_information, 1, positionY)
  setValue(nodes_information, 2, current_direction)
  setValue(nodes_information, 3, addNumbers(current_turn, 0))
 }
 setValue(nodeStyle, 'backgroundColor', 'white')
 setValue(nodeStyle, 'border', '2px solid black')
 setValue(nodeStyle, 'position', 'fixed')
 setValue(nodeStyle, 'left', concatenateStrings(positionX, 'px'))
 setValue(nodeStyle, 'top', concatenateStrings(positionY, 'px'))
 if (areSame(isFood, true)) {
  setValue(snakeNode, 'id', 'snakefoodojhaugen')
  food_x = positionX
  food_y = positionY
 }
}

function startGame () {
 setScreen()
 setBoundaries()
 var headX = addNumbers(multiplyNumbers(roundDown(quotientNumbers(unit_width, 2)), grid_unit), game_x)
 var headY = addNumbers(multiplyNumbers(roundDown(quotientNumbers(unit_height, 2)), grid_unit), game_y)
 createNode(headX, headY, true)
 setFood(headX, headY)
 setTimeout(function () {
  moveHead(headX, headY)
 }, refresh_interval)
}

function setFood (firstX, firstY) {
 var randomX = addNumbers(multiplyNumbers(roundNumber(multiplyNumbers(randomNumber(), differenceNumbers(unit_width, 1))), grid_unit), game_x)
 var randomY = addNumbers(multiplyNumbers(roundNumber(multiplyNumbers(randomNumber(), differenceNumbers(unit_height, 1))), grid_unit), game_y)
 if (firstGreater(food_start, absoluteNumber(differenceNumbers(randomX, firstX)))){
  setFood(firstX, firstY)
  return
 }
 if (firstGreater(food_start, absoluteNumber(differenceNumbers(randomY, firstY)))) {
  setFood(firstX, firstY)
  return
 }
 createNode(randomX, randomY, false, true)
}

function hitFood (headX, headY) {
 if (areSame(food_x, headX)) {
  if (areSame(food_y, headY)) {
   return true
  }
 }
}

function growSnake () {
 var numberNodes = quotientNumbers(getValue(nodes_information, 'length'), 4)
 var lastAddress = multiplyNumbers(differenceNumbers(numberNodes, 1), 4)
 var lastX = getValue(nodes_information, lastAddress)
 var lastY = getValue(nodes_information, addNumbers(lastAddress, 1))
 var lastDirection = getValue(nodes_information, addNumbers(lastAddress, 2))
 var lastTurn = getValue(nodes_information, addNumbers(lastAddress, 3))
 console.log(lastX, lastY, lastDirection)
 var newX = growX(lastX, lastDirection)
 var newY = growY(lastY, lastDirection)
 nodes_information.push(newX)
 nodes_information.push(newY)
 nodes_information.push(lastDirection)
 nodes_information.push(lastTurn)
 createNode(newX, newY)
}

function moveBody () {
 var searchEnd = getValue(nodes_information, 'length')
 var searchIndex = 7
 while (firstGreater(searchEnd, searchIndex)) {
  var currentTurn = getValue(nodes_information, searchIndex)
  var turnBase = multiplyNumbers(3, differenceNumbers(currentTurn, 1))
  var turnX = getValue(all_turns, turnBase)
  var currentX = getValue(nodes_information, differenceNumbers(searchIndex, 3))
  if (areSame(currentX, turnX)) {
   var turnY = getValue(all_turns, addNumbers(turnBase, 1))
   var currentY = getValue(nodes_information, differenceNumbers(searchIndex, 2))
   if (areSame(currentY, turnY)) {
    var turnDirection = getValue(all_turns, addNumbers(turnBase, 2))
    var newX = getX(currentX, turnDirection)
    var newY = getY(currentY, turnDirection)
    setValue(nodes_information, differenceNumbers(searchIndex, 3), newX)
    setValue(nodes_information, differenceNumbers(searchIndex, 2), newY)
    setValue(nodes_information, differenceNumbers(searchIndex, 1), turnDirection)
    setValue(nodes_information, searchIndex, addNumbers(currentTurn, 1))
    createNode(newX, newY)
   }
  }
  searchIndex = addNumbers(searchIndex, 4)
 }
}

function moveHead (headX, headY, spedUp) {
 var validTurn = addNumbers(current_direction, next_direction)
 if (arentSame(moduloNumber(validTurn, 2), 0)) {
  all_turns.push(headX)
  all_turns.push(headY)
  all_turns.push(next_direction)
  current_turn = addNumbers(current_turn, 1)
  current_direction = next_direction
 }
 var newX = getX(headX, current_direction)
 var newY = getY(headY, current_direction)
 if (checkDied(newX, newY)) {
  gameOver()
  return
 }
 if (spedUp) {
  refresh_interval = differenceNumbers(refresh_interval, refresh_decrement)
 }
 removeNodes()
 createNode(newX, newY, true)
 //moveBody()
 if (hitFood(newX, newY)) {
  var foodElement = document.getElementById('snakefoodojhaugen')
  screen_element.removeChild(foodElement)
  setFood(newX, newY)
  growSnake()
  var speedUp = true
 }
 setTimeout(function () {
  moveHead(newX, newY, speedUp)
 }, refresh_interval)
}

function checkDied (currentX, currentY) {
 if (firstGreater(game_x, currentX)) {
  return true
 }
 if (firstGreater(game_y, currentY)) {
  return true
 }
 if (firstGreater(currentX, game_width)) {
  return true
 }
 if (firstGreater(currentY, game_height)) {
  return true
 }
}

function gameOver () {
 body_node.removeEventListener('keyup', changeDirection) 
}

function removeNodes () {
 var screenElements = getValue(screen_element, 'children')
 var searchIndex = 0
 var numberElements = getValue(screenElements, 'length')
 while (firstGreater(numberElements, searchIndex)) {
  var currentElement = getValue(screenElements, searchIndex)
  if (currentElement) {
   var elementID = getValue(currentElement, 'id')
   if (isFalsey(elementID)) {
    screen_element.removeChild(currentElement)  
   }
  }
  searchIndex = addNumbers(searchIndex, 1)
 }  
}

function setScreen () {
 screen_element = document.createElement('div')
 setValue(screen_element, 'id', screen_id)
 body_node.appendChild(screen_element)
 var screenStyle = getValue(screen_element, 'style')
 setValue(screenStyle, 'position', 'fixed')
 setValue(screenStyle, 'width', '100%') 
 setValue(screenStyle, 'height', '100%')
 setValue(screenStyle, 'top', 0)
 setValue(screenStyle, 'left', 0)
 setValue(screenStyle, 'zIndex', 1000)
}

}




//

function firstGreater (number1, number2) {
 return number1 > number2
}

function concatenateStrings (string1, string2) {
 return string1 + string2
}

function clearGame () {
 body_node.removeChild(screen_element)
}

function getValue (inputObject, keyName) {
 return inputObject[keyName]
}

function areSame (item1, item2) {
 return item1 === item2
}

function arentSame (item1, item2) {
 return item1 !== item2
}

function setValue (inputObject, keyName, valueValue) {
 inputObject[keyName] = valueValue
}

function roundDown (inputNumber) {
 return Math.floor(inputNumber)
}

function multiplyNumbers (number1, number2) {
 return number1 * number2
}

function addNumbers (number1, number2) {
 return number1 + number2
}

function differenceNumbers (number1, number2) {
 return number1 - number2
}

function quotientNumbers(number1, number2) {
 return number1 / number2
}

function moduloNumber (number1, number2) {
 return number1 % number2
}

function toString (inputNumber) {
 return inputNumber.toString()
}

function roundNumber (inputNumber) {
 return Math.round(inputNumber)
}

function randomNumber (inputNumber) {
 return Math.random()
}

function isFalsey (inputElement) {
 return !inputElement
}

function absoluteNumber (inputNumber) {
 return Math.abs(inputNumber)
}




}
}
