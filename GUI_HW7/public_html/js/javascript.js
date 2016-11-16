//Michael Antrobus
//Michael_Antrobus@student.uml.edu
//Student in 91.601 GUI Programming 1
//11/15/16
//Main js file for HW7

function myFunction() {
    
    // Variables that grab all user input data
    var lower_bound_top = document.getElementById("myForm").elements[0].value;
    var upper_bound_top = document.getElementById("myForm").elements[1].value;
    var lower_bound_side = document.getElementById("myForm").elements[2].value;
    var upper_bound_side = document.getElementById("myForm").elements[3].value;
   
    //Create a table
    var myTable = ("<table border='1px'>");
    
    //creates row
    myTable += ("<tr style='height:30px;'>");
    
    //creates cell
    myTable += ("<td style='width:30px;background-color:white'></td>");

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


//table validator
var tableValidator = {  

    //Gives a highlight to the box that needs a value
    highlightError: function (strVarToTest) {
        $('#' + strVarToTest).css({"border": "2px solid yellow"});
        $('#' + strVarToTest).focus();
    },

    unhighlightError: function (strVarToTest) {
        $('#' + strVarToTest).css({"border": ""});
    }
};

// validator function that checks whether the 1st element is less than the 2nd element
// and whether the 3rd element is less than the 4th

jQuery.validator.addMethod("math", function(value, element, params) {
    return document.getElementById("myForm").elements[params.lower].value <= document.getElementById("myForm").elements[params.upper].value;
}, jQuery.validator.format("Please make sure the lower bound is less than the upper bound"));


$(document).ready(function() {
    $.validator.setDefaults({
        submitHandler: function() {
            alert("submitted!");
        }
    });
//Rules
    $("#myForm").validate({
        rules: {
            onkeyup: false,
            onclick: false,
            onfocusout: false,
            first: {
                //What us required and the type thats required
                required: true,
                digits: true,
                //make sure first is less than 2nd
                math: {lower: 0, upper: 1}
            },
            second: {
                required: true,
                digits: true
            },
            third: {
                required: true,
                digits: true,
                //make sure third is less than 4
                math: {lower: 2, upper: 3}
            },
            fourth: {
                required: true,
                digits: true
            }
        },
        //Messages 
        messages : {
            first: {
                //Gives the message that directly correlates to the rules for first
                required: function () {
                    tableValidator.highlightError("first");
                    return "The lower bound for the top row is needed.<br>";
                },
                digits: function () {
                    tableValidator.highlightError("first");
                    return "<br>Please enter only digits for the lower bound top row.";
                }
            },
            second: {
                //Gives the message that directly correlates to the rules for second
                required: function () {
                    tableValidator.highlightError("second");
                    return "The upper bound for the top row is needed.<br>";
                },
                digits: function () {
                    tableValidator.highlightError("second");
                    return "<br>Please enter only digits for the upper bound top row.";
                }
            },
            third: {
                //Gives the message that directly correlates to the rules for third
                required: function () {
                    tableValidator.highlightError("third");
                    return "The lower bound for the side column is needed.<br>";
                },
                digits: function () {
                    tableValidator.highlightError("third");
                    return "<br>Please enter only digits for the lower bound side column.";
                }
            },
            fourth: {
                //Gives the message that directly correlates to the rules for fourth
                required: function () {
                    tableValidator.highlightError("fourth");
                    return "The upper bound for the side column is needed.<br>";
                },
                digits: function () {
                    tableValidator.highlightError("fourth");
                    return "<br>Please enter only digits for the upper bound side column.";
                }
            }
        },
        //generates the table after the form has been submitted and accepted
        submitHandler: function(form) {
            myFunction()
        }
    })
});