


// This is helpful JS file
// This file contain a lot of various functions

// check input from user.  .val() take value input
alert($('#text-input').val());

// append to ul new li
let appendLi = function () {
    $('#list')
      .append(`<li>${$('#text-input[name=task]')
          .val()} <a href='#' ` // `class='close' ' for <li>
        + `class='close' aria-hidden='true'>&times;</a></li>`);
    return true;
}

// check input from user
// $('indexInput').val() -> .val() func get input value
const inputCheck = function() {
    if ($('#text-input').val().replace(/^\s*/, '')
      .replace(/\s*$/, '') !== '') {
        return true;
    } else {
        return false;
    }
}

// Mouse clicked element
const clickedElement = function {
    $( "*", document.body ).click(function( event ) {
        // event.stopPropagation();
        var domElement = $( this ).get( 0 );
        $( "p:first" ).text( "Clicked on - " + domElement.nodeName );
    });
}


// work with each element
let eachElement = function () {
    $('ul li').each(function(i)
    {
        if($(this).hasClass('checked')) {}
            else {
               return false;
        }
    });
}

// add or remove class to element
let checkAll = function (check) {
    if(check){
        $('ul li').each(function(i) {
            $(this).addClass('checked');
        });
    }
    else {
        $('ul li').each(function(i) {
            $(this).removeClass('checked');
        });
    }
    return true;
}

// find index by name
const index = Data.findIndex(item => item.name === 'John');

// addClass('checked');
let addClass = function(className) {
    $('li').click(function() {
        if ($(this).hasClass(className)) {
            $(this).removeClass(className);
        } else {
            $(this).addClass(className);
        }
    });
}
