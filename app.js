const grid = document.querySelector('.grid')
const startBtn = document.getElementById('start')
const scoreNum = document.getElementById('score')
let squaresArray = []
let currentSnake = [2, 1, 0]
let direction = 1
let width = 10
let appleIndex = 0
let intervalTime = 1000
let timerId = setInterval(move, 1000)
let score = 0

function createGrid(){
    for (let i =0; i < 100; i++) {
        const square = document.createElement('div')
        square.classList.add("square")
        grid.appendChild(square)
        squaresArray.push(square)
    }
    
}

createGrid()

currentSnake.forEach(index => squaresArray[index].classList.add("snake"))
//-------------------------------------------------------------------------------------
function generateApples(){
    do {
        appleIndex = Math.floor(Math.random() * 100)
    } while (squaresArray[appleIndex].classList.contains('snake'))
    squaresArray[appleIndex].classList.add('apple')
}

generateApples()


//-------------------------------------------------------------------------------------
function move(){

    //checks to see if snake hits wall
    if (
        (currentSnake[0] + width >= 100 && direction === 10) ||
        (currentSnake[0] % width === 9 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -10) ||
        squaresArray[currentSnake[0] + direction].classList.contains('snake')
    )
    return clearInterval(timerId)
    

    //makes snake look like it's moving
    const tail = currentSnake.pop()
    squaresArray[tail].classList.remove("snake")
    
    currentSnake.unshift(currentSnake[0] + direction)
    squaresArray[currentSnake[0]].classList.add('snake')

    //when snake eats apple


    if(currentSnake[0] == appleIndex) {
        console.log('yum')
        squaresArray[appleIndex].classList.remove('apple')
        squaresArray[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApples()
        score++
        scoreNum.innerHTML = score
        clearInterval(timerId)
        intervalTime = intervalTime * .9
        timerId = setInterval(move, intervalTime)
    }
}

move()


//-------------------------------------------------------------------------------------
function control(e){
    if(e.keyCode === 39){
        console.log('right')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up')
        direction = -width
    } else if (e.keyCode === 37) {
        console.log('left')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down')
        direction = +width
    }
}

document.addEventListener('keydown', control)