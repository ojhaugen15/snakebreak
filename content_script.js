chrome.runtime.onMessage.addListener(messageReceived)

function messageReceived (request, sender, sendResponse) {
if (request.message === "icon_clicked") {


screen_id = 'snakeojhaugen'
screen_element = document.getElementById(screen_id)
console.log(screen_element)
body_node = getValue(document, 'body')

if (screen_element) {
 clearGame()
}

if (areSame(screen_element, null)) {




grid_unit = 30
game_x = quotientNumbers(30, 2)
game_y = game_x
unit_width = roundDown(quotientNumbers(differenceNumbers(innerWidth, grid_unit), grid_unit))
unit_height = roundDown(quotientNumbers(differenceNumbers(innerHeight, grid_unit), grid_unit))
game_width = multiplyNumbers(unit_width, grid_unit)
game_height = multiplyNumbers(unit_height, grid_unit)

all_turns = []
nodes_information = []
current_direction = randomDirection()
next_direction = current_direction 
refresh_interval = 1000
refresh_decrement = 10

startGame()

function getX (previousX, currentDirection) {
 if (areSame(moduloNumber(currentDirection, 2), 0)) {
  return addNumbers(previousX, differenceNumbers(1, currentDirection))
 }
 return previousX
}

function getY (previousY, currentDirection) {
 if (areSame(moduloNumber(currentDirection, 2), 1)) {
  return addNumbers(previousY, differenceNumbers(currentDirection, 2))
 }
 return previousY
}

function randomDirection () {
 return roundNumber(multiplyNumbers(randomNumber(), 3))
}

function setBoundaries () {
 var boundaryBox = document.createElement('div')
 screen_element.appendChild(boundaryBox)
 var boundaryStyle = getValue(boundaryBox, 'style')
 setValue(boundaryStyle, 'position', 'fixed')
 setValue(boundaryStyle, 'top', concatenateStrings(toString(game_y), 'px'))
 setValue(boundaryStyle, 'left', concatenateStrings(toString(game_x), 'px'))
 setValue(boundaryStyle, 'width', concatenateStrings(toString(game_width), 'px'))
 setValue(boundaryStyle, 'height', concatenateStrings(toString(game_height), 'px'))
 setValue(boundaryStyle, 'border', '2px dashed black')
}

function createNode (startX, startY, isHead) {
 
 var snakeNode = document.createElement('div')
 screen_element.appendChild(snakeHead)
 var nodeStyle = getValue(snakeHead, 'style')
 setValue(nodeStyle, 'height', concatenateStrings(toString(grid_unit), 'px'))
 setValue(nodeStyle, 'width', concatenateStrings(toString(grid_unit), 'px'))
 if (areSame(isHead, true)) {
  setValue(nodeStyle, 'borderRadius', '50%')
 }
 setValue(nodeStyle, 'backgroundColor', 'white')
 setValue(nodeStyle, 'border', '2px solid black')
 setValue(nodeStyle, 'position', 'fixed')
 setValue(nodeStyle, 'left', concatenateStrings(startX, 'px'))
 setValue(nodeStyle, 'top', concatenateStrings(startY, 'px'))
}

function startGame () {
 setScreen()
 setBoundaries()
 var headX = addNumbers(multiplyNumbers(roundDown(quotientNumbers(unit_width, 2)), grid_unit), game_x)
 var headY = addNumbers(multiplyNumbers(roundDown(quotientNumbers(unit_height, 2)), grid_unit), game_y)
 createNode(headX, headY, true)
 moveHead()
}

function moveHead (headX, headY) {
 var validTurn = addNumbers(current_direction, next_direction)
 if (arentSame(moduloNumber(validTurn, 2), 0)) {
  current_direction = next_direction
  removeNodes()
  var newX = getX(headX, currentDirection)
  var newY = getY(headY, currentDirection) 
  setTimeout(function () {
   moveHead(newX, newY, true)
  }, refresh_interval)
  return
 }
}

function removeNodes () {
 var screenElements = getValue(screen_element, 'children')
 var searchIndex = 0
 var numberElements = getValue(screenElements, 'length')
 while (firstGreater(numberElements, searchIndex)) {
  var currentElement = getValue(screenElements, searchIndex)
  var elementID = getValue(currentElement, 'id')
  if (areSame(elementID, 'undefined')) {
   screen_element.removeChild(currentElement)  
  }
  searchIndex = addNumbers(searchIndex, 1)
 }  
}

function setScreen () {
 screen_element = document.createElement('div')
 setValue(screen_element, 'id', screen_id)
 body_node.appendChild(screen_element)
 var screenStyle = getValue(screen_element, 'style')
 setValue(screenStyle, 'position', 'fixed')
 setValue(screenStyle, 'width', '100%') 
 setValue(screenStyle, 'height', '100%')
 setValue(screenStyle, 'top', 0)
 setValue(screenStyle, 'left', 0)
 setValue(screenStyle, 'zIndex', 1000)
}

}




//

function firstGreater (number1, number2) {
 return number1 > number2
}

function concatenateStrings (string1, string2) {
 return string1 + string2
}

function clearGame () {
 body_node.removeChild(screen_element)
}

function getValue (inputObject, keyName) {
 return inputObject[keyName]
}

function areSame (item1, item2) {
 return item1 === item2
}

function setValue (inputObject, keyName, valueValue) {
 inputObject[keyName] = valueValue
}

function roundDown (inputNumber) {
 return Math.floor(inputNumber)
}

function multiplyNumbers (number1, number2) {
 return number1 * number2
}

function addNumbers (number1, number2) {
 return number1 + number2
}

function differenceNumbers (number1, number2) {
 return number1 - number2
}

function quotientNumbers(number1, number2) {
 return number1 / number2
}

function toString (inputNumber) {
 return inputNumber.toString()
}

function roundNumber (inputNumber) {
 return Math.round(inputNumber)
}

function randomNumber (inputNumber) {
 return Math.random()
}




}
}

