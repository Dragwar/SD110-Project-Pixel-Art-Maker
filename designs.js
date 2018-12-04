/*

In this project, we are given a starter template. Using this template write the script to do the following:

1.  Upon form submission, build the grid based on the size that the user defined in the inputs of the form.

2.  The form provides the number of rows (via the grid height) and columns (via the grid width).

3.  The grid is a <table>.

4.  Upon clicking on a single grid square, color that square's background color to the selected hex color.

*/

/*
  To-Do:
-BUG = one click held then released into another cell would give unintended results ("like coloring the entire table") ****NOW FIXED (line-36)
-EXTRA = Set the default color/white to the cell by double clicking the cell ****ADDED (line-42)
-EXTRA = Try to make most of the let's into const's ****DONE
*/

let colorValue;//"colorValue" gets assigned after the color was picked(line-31)
let heightValue;//"heightValue" gets assigned after the submit gets clicked(line-39)
let widthValue;//"widthValue" gets assigned after the submit gets clicked(line-39)

document.addEventListener("DOMContentLoaded", (event) => {
    console.log(event);
    console.log("The DOM is ready");
    
    const pixCan = document.querySelector('#pixelCanvas');//Returns the "#pixelCanvas" table tag(line-34)
    const formSubmitBtn = document.querySelector("#sizePicker").lastElementChild;//Selects the submit button(line-56)
    const inputColor = document.querySelector("#colorPicker");//Selects the color input tag(line-30)

    inputColor.addEventListener("input", (e) => {//After user picks color then code below starts
        colorValue = document.querySelector("#colorPicker").value;//Prints the user selected color value
    });

    pixCan.addEventListener("click", (e) => {//Bug **NOW FIXED**: it would almost fill up the entire table
        if (e.target.classList.contains("color")) {//Only allows user to color the elements within the canvas and only if the target has the class "color", in other words only the "td tags"/"table cells"
            e.target.style.backgroundColor = colorValue;//Selects the td tag within the pixel canvas
        }
    });
                    /*EXTRA*/
    pixCan.addEventListener("dblclick", (e) => {//When td gets dbl clicked it will to white/default color
        if (e.target.classList.contains("color")) {//Checks for the class color
            e.target.style.backgroundColor = "white";//Changes the cell back to default color
        }
    });

// When the height and width values are submitted by the user, the "makeGrid()" will get invoked
    const makeGrid = (height, width) => {
        pixCan.innerHTML = "";//Resets the Table/Pixel Canvas
        for (let h = 1; h <= heightValue; h++) {//Modifies the height via "heightValue"
            const createTR = document.createElement("TR");//Creates <tr></tr>
            pixCan.appendChild(createTR);//Adds a row to the canvas

            for (let w = 1; w <= widthValue; w++) {
                const createTD = document.createElement("TD");//Creates <td></td>
                createTD.classList.add("color");//Adds the class "color" to all td tags (to each cell)
                createTR.appendChild(createTD);//Adds a cell to the row
            }
        }   
    }

    formSubmitBtn.addEventListener("click", (e) => {
        e.preventDefault()//Prevents the page refreshing when clicked

        heightValue = parseInt(document.querySelector("#inputHeight").value);//Gets and makes the submited height value into a number data type then returns the value
        widthValue = parseInt(document.querySelector("#inputWidth").value);//Gets and makes the submited width value into a number data type then returns the value
        console.log("Height = ",heightValue, " Width = ", widthValue);//Prints the height and width values in console
        makeGrid(heightValue, widthValue);//Makes the grid with the numbered values
    });

});