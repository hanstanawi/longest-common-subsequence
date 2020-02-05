let lcs = []; //declaring lcs result array

function lcs_length(x,y){
    let rows = x.length; //asssigning the first string length into a variable
    let cols = y.length; //assigning the second string length into a variable

    let c = []; //declaring the array to store the length of the lcs
    let b = []; //declaring the array to track the lcs character

    c = makeArray(rows+1, cols+1); //make this array as a 2D array with the length of each strings as its rows and columns
    b = makeArray(rows+1, cols+1); //make this array as a 2D array with the length of each strings as its rows and columns

    //Declaring first element of each row array to 0
    for(let i = 0; i < rows+1; i++){
        c[i][0] = 0;
    }
    //Declaring the first element of each column to 0
    for(let j = 0; j < cols+1; j++){
        c[0][j] = 0;
    }
    //Declaring the first element of each row to NaN
    for(let i = 0; i < rows+1; i++){
        b[i][0] = NaN;
    }
    //Declaring the first element of each column to NaN
    for(let j = 0; j < cols+1; j++){
        b[0][j] = NaN;
    }
    
    //looping on each element in the table of c and b to count the lcs and track the lcs value
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            if (x.charAt(i) === y.charAt(j)){ // checking if the character in the first string and the second string are the same
                c[i+1][j+1] = c[i][j] + 1; // taking the value of the previous column and row and increment it by 1, then take it as the value of the next item
                b[i+1][j+1] = "ok"; //track this character as the lcs, which points to its upper left diagonal
            }
            else if(c[i+1][j] >= c[i][j+1]){ // checking if the value in upper diagonal cell is bigger than or equal to the value in its lower diagonal value
                c[i+1][j+1] = c[i+1][j]; //taking its value as the value of the next item
                b[i+1][j+1] = "left"; //mark this cell which points to its left cell
            }
            else{ 
                c[i+1][j+1] = c[i][j+1]; //taking its value as the value of the next item
                b[i+1][j+1] = "up"; //mark this cell which points to its upper cell
            }
        }
    }

    printResult(b, string1, rows, cols); //calling the printResult function to print out the lcs result array
    document.querySelector("#lcs").textContent = lcs; //display the result of the lcs
    document.querySelector("#length").textContent = c[rows][cols]; //display the lcs length
    console.log("LCS Length: " + c[rows][cols]); //printing the lcs length on the console
    console.log("LCS: " + lcs); //printing the lcs on the console

    return c[rows][cols];//returning the lcs length value
}

//Function to print the LCS result
function printResult(b, x, i, j){
    if (i === 0 || j === 0) //if the length of one of the strings is 0
        return        //return nothing to stop the recursive calls (end of function)
    if(b[i][j] === "ok"){ //checking if the mark in the b array is "up"
        printResult(b, x, i-1, j-1); //recursive call to execute its own function to check the upper left diagonal cell
        lcs.push(x.charAt(i-1)) //insert the lcs into the lcs array as the result
    }
    else if(b[i][j] === "up") //checking if the mark in the b array is "up"
        printResult(b, x, i-1, j); //recursive call to execute its own function to check the previous column
    else                   //checking if the mark in the b array is "left"
        printResult(b, x, i, j-1); //recursive call to execute its own function to check the previous row
}

//Function to generate 2D array
function makeArray(rows, cols){
    let arr = new Array(rows);
    for(let i=0; i<arr.length; i++){
        arr[i] = new Array(cols)
    }
    return arr;
}