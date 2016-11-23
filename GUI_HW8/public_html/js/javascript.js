//Michael Antrobus
//Michael_Antrobus@student.uml.edu
//Student in 91.601 GUI Programming 1
//11/22/16
//Main js file for HW

//global variables
var tableTabCount = 0;
var tableNum = 0;
var k = 1;

function myFunction() {
    
    // Variables that grab all user input
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
    
    $("#tabs").tabs();

    //First slider option
    var firstOptions = {
        min: 1,
        max: 100,
        slide: function (e, ui) {
            $("#first").val(ui.value);
        },
        change: function () {
            $("#myForm").valid();
        }
    };

    //Second slider option
    var secondOptions = {
        min: 1,
        max: 100,
        slide: function (e, ui) {
            $("#second").val(ui.value);
        },
        change: function () {
            $("#myForm").valid();
        }
    };

    //Third slider option
    var thirdOptions= {
        min: 1,
        max: 100,
        slide: function (e, ui) {
            $("#third").val(ui.value);
        },
        change: function () {
            $("#myForm").valid();
        }
    };

    //Fourth slider option
    var fourthOptions = {
        min: 1,
        max: 100,
        slide: function (e, ui) {
            $("#fourth").val(ui.value);
        },
        change: function () {
            $("#myForm").valid();
        }

    };

    //dynamically updates the slider
    $( "#first" ).change(function() {
        $("#myForm").valid();
        $( "#first_Slider" ).slider( "value", $(this).val() );
    });
    
    //dynamically updates the slider
    $( "#second" ).change(function() {
        $( "#second_Slider" ).slider( "value", $(this).val() );
    });

    //dynamically updates the slider
    $( "#third" ).change(function() {
        $("#myForm").valid();
        $( "#third_Slider" ).slider( "value", $(this).val() );
    });

    //dynamically updates the slider
    $( "#fourth" ).change(function() {
        $("#myForm").valid();
        $( "#fourth_Slider" ).slider( "value", $(this).val() );
    });

    //creates the sliders with the given options
    $("#first_Slider").slider(firstOptions);
    $("#second_Slider").slider(secondOptions);
    $("#third_Slider").slider(thirdOptions);
    $("#fourth_Slider").slider(fourthOptions);

    //call the validation rules
    $("#myForm").validate(validator);


});

//This is the form validator
//Makes sure numbers are in order
var validator = {
    rules: {
        onkeyup: true,
        onclick: false,
        onfocusout: false,
        //first number rules
        first: {
            required: true,
            digits: true,
            math: {lower: 0, upper: 1}
        },
        //second number rules
        second: {
            required: true,
            digits: true
        },
        //third number rules
        third: {
            required: true,
            digits: true,
            math: {lower: 2, upper: 3}
        },
        //fourth number rules
        fourth: {
            required: true,
            digits: true
        }
    },
    //Messages that the user is sent when validation fails, taken from the examples site
    messages : {
        first: {
            digits: function () {
                tableValidator.highlightError("first");
                return "<br>Please enter only digits for the minimum column value.";
            }
        },
        second: {
            digits: function () {
                tableValidator.highlightError("second");
                return "<br>Please enter only digits for the maximum column value.";
            }
        },
        third: {
            digits: function () {
                tableValidator.highlightError("third");
                return "<br>Please enter only digits for the Minimum Row Value.";
            }
        },
        fourth: {
            digits: function () {
                tableValidator.highlightError("fourth");
                return "<br>Please enter only digits for the Maximum Row Value.";
            }
        }
    },
    //generates the table
    submitHandler: function(form) {
        myFunction();
    },
    success: function() {
        myFunction();
    }
};

//Creates the table and puts it in the new tab
function save_table() {
    var tabs = $("#tabs").tabs();
    var first = $("#first").val();
    var second = $("#second").val();
    var third = $("#third").val();
    var fourth = $("#fourth").val();
    var tableData = document.getElementById("table").innerHTML;
    var ul = tabs.find( "ul" );
    var tabNum = returnNewTableNum();
    //creates the tab header
    var tabName = tabNum + ". " + first.toString() + " - " + second.toString() + ", " + third
    + " - " + fourth;

    //creates the divs
    $( "<li id='tab" + tabNum + "'><a href='#" + tabNum + "'>" + tabName + "</a></li>" ).appendTo( ul );
    $( "<div id='" + tabNum + "'>" + tableData + "</div>" ).appendTo( tabs );
    tableTabCount += 1;
    tabs.tabs( "refresh" );
}

function returnNewTableNum() {
    tableNum = tableNum + 1;
    return tableNum;
}
//deletes one tab
function delete_tabs() {   
    var tabID;
    tabID = "#tab" + k;
    $(tabID).hide();
    k = k + 1;
   
}
//deletes all tabs
function delete_all(){
    var i;
    var tabID;
    
    for(i = 0; i <= tableTabCount;i++){
        tabID = "#tab" + i;
        $(tabID).hide();
    }
    
    
}