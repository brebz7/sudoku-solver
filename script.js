// Declarare variabile
var box = document.querySelectorAll('#grid tr td');
var input = document.getElementById('input');
var errorBox = document.querySelector('.error-box');
var input = document.getElementsByClassName('input');
var inputValue = 0;
var solve = document.getElementById('solve');

// Declarare matrice
var matrice = [];
for (let i = 0; i < 9; i++) {
    matrice[i] = [];
    for (let j = 0; j < 9; j++)
        matrice[i][j] = 0;
}

// Event Listener pentru butoanele de input
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("click", function() {
        inputValue = input[i].innerHTML;
        
        for (let i = 0; i < input.length; i++) {
            input[i].style.backgroundColor = "white";
            input[i].style.color = "green";
        }
        input[i].style.backgroundColor = "green";
        input[i].style.color = "white";
    })
}

// Event Listener pentru tabla. inputValue este inputul ales de utilizator, input introus pe tabla
for (let i = 0; i < box.length; i++) {   
    box[i].addEventListener("click", function () {
        if (inputValue === 0) {
            errorBox.style.display = 'flex';
            errorBox.innerHTML = '<p>Error! Select a value from the top boxes</p>';
            return;
        }
            box[i].firstChild.setAttribute("value", inputValue);
            box[i].firstChild.style.color = "green";
            addToMatrix(i, inputValue);
    });
}


// Pune in matrice valorile care se afla in box[i].textContent. (i/9 -> coord randului; i%9 -> coord coloanei)
function addToMatrix(i, inputValue) {
    let r = Math.trunc(i / 9);
    let c = i % 9;
    matrice[r][c] = Number(inputValue); 
    console.log (matrice);
}
solve.addEventListener("click", printSudoku);

function printSudoku() {
    if (solveSudoku()) {
        for (let row = 0; row < 9; row++)
            for (let col = 0; col < 9; col++)
                box[row * 9 + col].firstChild.setAttribute("value", matrice[row][col]);
    }
    else {
        errorBox.display = "flex";
        errorBox.innerHTML = "Nu exista sol";
    }

}
function solveSudoku() {
    let coord = [];
    let row = 0;
    let col = 0;
    if (!findZeroLocation())
         return true;
    else {
        coord = findZeroLocation();
        row = coord[0];
        col = coord[1];
    }
    for (var num = 1; num <= 9; num++) {
        if (isSafe(row, col, num)) {
            matrice[row][col] = num;
            if (solveSudoku()) 
                return true;
            matrice[row][col] = 0;
        }
    }
    return false;
}
function findZeroLocation(row, col) {
    var coord = [];
    for (row = 0; row < 9; row++)
        for (col = 0; col < 9; col++)
            if (matrice[row][col] == 0) {
                coord[0] = row;
                coord[1] = col;
                return coord;
            }
    return false;
}
function usedInRow(row, num) {
    for (let col = 0; col < 9; col++)
        if (matrice[row][col] == num)
            return true;
    return false;
}
function usedInCol(col, num) {
    for (let row = 0; row < 9; row++)
        if (matrice[row][col] == num)
            return true;
    return false;
}
function usedInBox(boxStartRow, boxStartCol, num) {
    for (let row = 0; row < 3; row++)
        for (let col = 0; col < 3; col++)
            if (matrice[row + boxStartRow][col + boxStartCol] == num)
                return true;
    return false;
}
function isSafe(row, col, num) {
    return !usedInBox(row - row % 3, col - col % 3, num) && !usedInCol(col, num) && !usedInRow(row, num);
}