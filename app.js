const grid = document.querySelector('.grid')
const startBtn = document.getElementById('start')
const scoreNum = document.getElementById('score')
let squaresArray = []
let currentSnake = [2, 1, 0]
let direction = 1

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

function move(){
    const tail = currentSnake.pop()
    squaresArray[tail].classList.remove("snake")
    
    currentSnake.unshift(currentSnake[0] + direction)
    squaresArray[currentSnake[0]].classList.add('snake')
}

move()

let timerId = setInterval(move, 1000)

function control(e){
    if(e.keyCode === 39){
        console.log('right')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up')
        direction = -10
    } else if (e.keyCode === 37) {
        console.log('left')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down')
        direction = +10
    }
}

document.addEventListener('keyup', control)