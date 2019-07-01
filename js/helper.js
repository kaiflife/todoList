// check input from user.  .val() take value input
alert($('#text-input').val());


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


