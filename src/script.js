let string1; //variable for the first string
let string2; //variable for the second string

//function start when the window loads
window.onload = function() {
    let fileInput = document.getElementById('fileInput'); //variable to store the input file
    let fileDisplayArea = document.getElementById('fileDisplayArea'); //variable to print out the input content

    //function starts when user have selected the text file
    fileInput.addEventListener('change', function(e) {
        let file = fileInput.files[0];
        let textType = /text.*/; //value to check the compability of the text format

        //check the compability
        if (file.type.match(textType)) {
            let reader = new FileReader();

            //function when file has been loaded
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result; 
                let arr = reader.result.split('\n'); //split the string in the document as an array by splitting the lines
                string1 = arr[1]; //assigning the second item in the array as the first string
                string2 = arr[3]; //assigning the fourth item in the array as the second string
                let timeBegin = performance.now(); //start time execution
                lcs_length(string1, string2); //execute the lcs function 
                let timeEnd = performance.now(); //end the time execution
                console.log("LCS time: " + (timeEnd - timeBegin) + " ms"); //count the time taken and print it out on the console
                document.querySelector("#time").textContent = timeEnd - timeBegin; //displaying the time taken
            }

            reader.readAsText(file);	
        } else {
            fileDisplayArea.innerText = "File not supported!"; //warn the user if the file is not compatible
        }
    });
}