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

const clickedElement = function {
    $( "*", document.body ).click(function( event ) {
        // event.stopPropagation();
        var domElement = $( this ).get( 0 );
        $( "p:first" ).text( "Clicked on - " + domElement.nodeName );
    });
}
