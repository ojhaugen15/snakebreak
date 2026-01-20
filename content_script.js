chrome.runtime.onMessage.addListener(messageReceived)

function messageReceived (request, sender, sendResponse) {
if (request.message === "icon_clicked") {



screen_id = 'snakeojhaugen'
screen_element = document.getElementById(screen_id)
body_node = getValue(document, 'body')

if (screen_element) {
 var ghostMode = localStorage.getItem('snakeghostojhaugen')
 if (ghostMode) {
  goGhost()
  localStorage.setItem('snakeghostojhaugen', '')
 }
 if (isFalsey(ghostMode)) {
  clearGame()
 }
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
current_turn = 1
nodes_information = []
current_direction = randomDirection()
next_direction = current_direction 
refresh_interval = 1000
refresh_decrement = 10
food_x = null
food_y = null
element_color = ''
border_color = ''
hit_first = false
head_timeout = null

localStorage.setItem('snakeghostojhaugen', 'true')

startGame()

setTimeout(function () {
 body_node.addEventListener('keyup', changeDirection)
}, multiplyNumbers(refresh_interval, .9))

function situationalColor () {
 var canvasElement = document.createElement('canvas')
 screen_element.appendChild(canvasElement)
 var canvasContext = canvasElement.getContext('2d')
 var searchIndex = 0
 var sampleNumber = 10
 var sumColors = 0
 while (firstGreater(sampleNumber, searchIndex)) {
  var randomX = roundNumber(randomNumber() * innerWidth)
  var randomY = roundNumber(randomNumber() * innerHeight)
  var colorData = getValue(canvasContext.getImageData(randomX, randomY, 1, 1), 'data')
  var pixelRed = getValue(colorData, 0)
  var pixelGreen = getValue(colorData, 1)
  var pixelBlue = getValue(colorData, 2)
  var pixelBrightness = roundNumber(quotientNumbers(addNumbers(addNumbers(pixelRed, pixelBlue), pixelGreen), 3))
  sumColors = addNumbers(sumColors, pixelBrightness)
  searchIndex = addNumbers(searchIndex, 1)
 }
 var finalAverage = roundNumber(quotientNumbers(sumColors, sampleNumber))
 if (arentSame(finalAverage, 0)) {
  console.log('getImageData functioning...')
 }
 element_color = 'white'
 border_color = 'black'
 return
 if (firstGreater(finalAverage, 128)) {
  element_color = 'white'
  border_color = 'black'
  return
 }
 element_color = 'black'
 border_color = 'white'
}

function changeDirection (eventInfo) {
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
 if (areSame(keyPressed, 83)) {
  next_direction = 2
  return
 }
 if (areSame(keyPressed, 70)) {
  next_direction = 0
  return
 }
 if (areSame(keyPressed, 69)) {
  next_direction = 1
  return
 }
 if (areSame(keyPressed, 68)) {
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
 setValue(boundaryStyle, 'border', concatenateStrings('2px dashed ', border_color))
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
  setValue(nodeStyle, 'height', concatenateStrings(toString(addNumbers(grid_unit, 0.5)), 'px'))
  setValue(nodeStyle, 'width', concatenateStrings(toString(addNumbers(grid_unit, 0.5)), 'px'))
 }
 setValue(nodeStyle, 'backgroundColor', element_color)
 setValue(nodeStyle, 'border', concatenateStrings('2px solid ', border_color))
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
 situationalColor()
 setBoundaries()
 var headX = addNumbers(multiplyNumbers(roundDown(quotientNumbers(unit_width, 2)), grid_unit), game_x)
 var headY = addNumbers(multiplyNumbers(roundDown(quotientNumbers(unit_height, 2)), grid_unit), game_y)
 createNode(headX, headY, true)
 setFood(headX, headY)
 setTimeout(function () {
  moveHead(headX, headY)
 }, refresh_interval)
}

function setFood (headX, headY) {
 var randomX = addNumbers(multiplyNumbers(roundNumber(multiplyNumbers(randomNumber(), differenceNumbers(unit_width, 1))), grid_unit), game_x)
 var randomY = addNumbers(multiplyNumbers(roundNumber(multiplyNumbers(randomNumber(), differenceNumbers(unit_height, 1))), grid_unit), game_y)
 if (firstGreater(food_start, absoluteNumber(differenceNumbers(randomX, headX)))){
  setFood(headX, headY)
  return
 }
 if (firstGreater(food_start, absoluteNumber(differenceNumbers(randomY, headY)))) {
  setFood(headX, headY)
  return
 }
 if (onSnake(randomX, randomY)) {
  setFood(headX, headY)
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
 var lastBase = multiplyNumbers(differenceNumbers(numberNodes, 1), 4)
 var lastX = getValue(nodes_information, lastBase)
 var lastY = getValue(nodes_information, addNumbers(lastBase, 1))
 var lastDirection = getValue(nodes_information, addNumbers(lastBase, 2))
 var lastTurn = getValue(nodes_information, addNumbers(lastBase, 3))
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
  console.log('searchIndex: ', searchIndex)
  console.log('nodes_information: ', nodes_information)
  console.log('all_turns: ', all_turns)
  var currentTurn = getValue(nodes_information, searchIndex)
  var noTurn = true
  var turnBase = multiplyNumbers(3, differenceNumbers(currentTurn, 1))
  var currentX = getValue(nodes_information, differenceNumbers(searchIndex, 3))
  var currentY = getValue(nodes_information, differenceNumbers(searchIndex, 2))
  if (isFalsey(currentTurn)) {
   var turnX = getValue(all_turns, turnBase)
   if (areSame(currentX, turnX)) {
    var turnY = getValue(all_turns, addNumbers(turnBase, 1))
    if (areSame(currentY, turnY)) {
     noTurn = false
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
  }
  if (noTurn) {
   var currentDirection = getValue(nodes_information, differenceNumbers(searchIndex, 1))
   var newX = getX(currentX, currentDirection)
   var newY = getY(currentY, currentDirection)
   setValue(nodes_information, differenceNumbers(searchIndex, 3), newX)
   setValue(nodes_information, differenceNumbers(searchIndex, 2), newY)
   createNode(newX, newY)
  }
  searchIndex = addNumbers(searchIndex, 4)
 }
}

function moveHead (headX, headY, spedUp) {
 var validTurn = addNumbers(current_direction, next_direction)
 if (arentSame(moduloNumber(validTurn, 2), 0)) {
  current_direction = next_direction
  //if (hit_first) {
   current_turn = addNumbers(current_turn, 1)
   all_turns.push(headX)
   all_turns.push(headY)
   all_turns.push(next_direction)
//  }
 }
 var newX = getX(headX, current_direction)
 var newY = getY(headY, current_direction)
 if (checkDied(newX, newY)) {
  removeNodes()
  createNode(newX, newY, true)
  moveBody()
  gameOver()
  return
 }
 if (spedUp) {
  refresh_interval = differenceNumbers(refresh_interval, refresh_decrement)
 }
 removeNodes()
 createNode(newX, newY, true)
 moveBody()
 if (hitFood(newX, newY)) {
  hit_first = true
  var foodElement = document.getElementById('snakefoodojhaugen')
  screen_element.removeChild(foodElement)
  setFood(newX, newY)
  growSnake()
  var speedUp = true
 }
 if (onSnake(newX, newY, true)) {
  gameOver()
  return
 }
 head_timeout = setTimeout(function () {
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
 var finalScore = document.createElement('div')
 screen_element.appendChild(finalScore)
 var scoreNumber = differenceNumbers(quotientNumbers(getValue(nodes_information, 'length'), 4), 1)
 var text1 = concatenateStrings('Your final ', game_width)
 var text2 = concatenateStrings(' by ', game_height)
 var text3 = concatenateStrings(' pixel game score is: ', scoreNumber)
 finalScore.textContent = concatenateStrings(concatenateStrings(text1, text2), text3)
 var scoreStyle = getValue(finalScore, 'style')
 setValue(scoreStyle, 'fontFamily', 'Courier')
 setValue(scoreStyle, 'fontSize', concatenateStrings(grid_unit, 'px'))
 setValue(scoreStyle, 'position', 'fixed')
 setValue(scoreStyle, 'left', concatenateStrings(grid_unit, 'px'))
 setValue(scoreStyle, 'top', concatenateStrings(grid_unit, 'px'))
 setValue(scoreStyle, 'color', element_color)
 var shadow1 = concatenateStrings('-1px 0 ', border_color)
 var shadow2 = concatenateStrings(', 0 1px ', border_color)
 var shadow3 = concatenateStrings(', 1px 0 ', border_color)
 var shadow4 = concatenateStrings(', 0 -1px ', border_color)
 setValue(scoreStyle, 'textShadow', concatenateStrings(concatenateStrings(shadow1, shadow2), concatenateStrings(shadow3, shadow4)))
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

function onSnake (thingX, thingY, isHead) {
 var searchIndex = 0
 var search2 = 1
 if (isHead) {
  searchIndex = 4
  search2 = 5
 }
 var searchEnd = getValue(nodes_information, 'length') 
 while (firstGreater(searchEnd, searchIndex)) {
  var snakeX = getValue(nodes_information, searchIndex)
  if (areSame(snakeX, thingX)) {
   var snakeY = getValue(nodes_information, search2)
   if (areSame(snakeY, thingY)) {
    return true
   }
  }
  searchIndex = addNumbers(searchIndex, 4)
  search2 = addNumbers(search2, 4) 
 }  
}

}




function clearGame () {
 body_node.removeChild(screen_element)
 clearTimeout(head_timeout)
}

function goGhost () {
 setValue(getValue(screen_element, 'style'), 'opacity', '5%')
}

//
function firstGreater (number1, number2) {
 return number1 > number2
}

function concatenateStrings (string1, string2) {
 return string1 + string2
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
