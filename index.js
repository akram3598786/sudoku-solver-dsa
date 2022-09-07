let arr = [
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
];

function getData() {

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let id = String(r) + String(c);

            if(isNaN(document.getElementById(id).value)){
                alert("Enter Valid Input");
                window.location.reload();
                return false;
            }

            let count = 0;
            if (document.getElementById(id).value == "") {
                arr[r][c] = ".";
            } else {
                arr[r][c] = document.getElementById(id).value;
                count++;
            }
        }
    }

    document.getElementById("solveBtn").style.display = "none";

    console.log(arr);

    if(isValidBoad(arr)){
        solveSudoku(arr);
    }else{
        alert("Sudoku Is Not Valid");
        clearData();
    }


    showData();
}

var solveSudoku = function (board) {
    solver(board);
};

const solver = board => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === ".") {
                let char = "1";
                while (+char <= 9) {
                    if (isValidSudoku(i, j, board, char)) {
                        board[i][j] = char;
                        if (solver(board)) {
                            return true;
                        } else {
                            board[i][j] = ".";
                        }
                    }
                    char = (+char + 1).toString();
                }
                return false;
            }
        }
    }
    return true;
};

const isValidSudoku = (row, col, board, char) => {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == char) {
            return false;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (board[i][col] == char) {
            return false;
        }
    }

    const x = ~~(row / 3) * 3;
    const y = ~~(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[x + i][y + j] == char) {
                return false;
            }
        }
    }

    return true;
};

function showData(){
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let id = String(r) + String(c);

            
                document.getElementById(id).value = arr[r][c];
            
        }
    }

    document.getElementById("input").style.backgroundColor = "green";
    let clrBtn = document.createElement("button");
    clrBtn.innerText = "Clear"

    clrBtn.style.backgroundColor = "red"

    document.getElementById("buttons").append(clrBtn);

    clrBtn.addEventListener("click",function(){
        clearData();
    })
}

function clearData(){
     window.location.reload();
}


let isValidBoad = function(board) {
    for (let i = 0; i < 9; i++) {
      let row = new Set(),
          col = new Set(),
          box = new Set();
  
      for (let j = 0; j < 9; j++) {
        let _row = board[i][j];
        let _col = board[j][i];
        let _box = board[3*Math.floor(i/3)+Math.floor(j/3)][3*(i%3)+(j%3)]
        
        if (_row != '.') {
          if (row.has(_row)) return false;
          row.add(_row);
        }
        if (_col != '.') {
          if (col.has(_col)) return false;
          col.add(_col);
        }
        
        if (_box != '.') {
          if (box.has(_box)) return false;
          box.add(_box);
        } 
      }
    }
    return true
  };
