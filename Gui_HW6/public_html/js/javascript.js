//Michael Antrobus
//Michael_Antrobus@student.uml.edu
//Student in 91.601 GUI Programming 1
//11/316
//Main js file for HW6
function myFunction() {
    
    // Variables that grab all user input data
    var lower_bound_top = document.getElementById("myForm").elements[0].value;
    var upper_bound_top = document.getElementById("myForm").elements[1].value;
    var lower_bound_side = document.getElementById("myForm").elements[2].value;
    var upper_bound_side = document.getElementById("myForm").elements[3].value;
    
    //Checks to make sure the upper bound is not less than the lower bound for the first two values
    if(lower_bound_top > upper_bound_top){
        document.getElementById("table").innerHTML = "The lower bound for the top number is greater than the upper bound. Please either switch the numbers or enter new numbers.";
        return;
    }
    
    //Checks to make sure the upper bound is not less than the lower bound for the last two values
    if(lower_bound_side > upper_bound_side){
        document.getElementById("table").innerHTML = "The lower bound for the top number is greater than the upper bound. Please either switch the numbers or enter new numbers.";
        return;
    }
    
    //Create a table
    var myTable = ("<table border='1px'>");
    
    //creates row
    myTable += ("<tr style='height:30px;'>");
    
    //creates cell
    myTable += ("<td style='width:30px;background-color:gray'></td>");

    for(var i = lower_bound_top; i <= upper_bound_top; i++) {
        
        //creates the top row
        myTable +=("<td style='width:30px;background-color:gray'>" + i + "</td>");
    }
    for(var k = lower_bound_side; k <= upper_bound_side; k++) {
        
        //creates all subsequent rows
        myTable +=("<tr style='height:30px;'>");
        
        //creates the left hand side parameter value cell
        myTable +=("<td style='width:30px;background-color:gray'>" + k + "</td>");
        
        for(var i = lower_bound_top; i <= upper_bound_top; i++) {
            
            // creates the multiplication cell
            myTable +=("<td style='width:30px;background-color:white'>" + i*k + "</td>");
        }
        //Rows everything in the for loop together
        myTable +=("</tr>");
    }
    //write the finished table to div id="table"
    document.getElementById("table").innerHTML = myTable;
   
}

