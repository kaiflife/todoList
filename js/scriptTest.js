

// Add button append li and <a>. <a> mean close list
$(document).ready(function () {
  $(document).on('click','.button-add',function () {
    if(inputCheck()){
      $('#list').append("<li>" + $('#text-input[name=task]').val() + ' <a href=\'#\' '
        + 'class=\'close\' aria-hidden=\'true\'>&times;</a></li>');
    }});
  $('body').on('click', '#list a', function() {
    $(this).closest('li')
      .remove();
  });


  // Another way to check for class in element
  // if($(this).hasClass('two'))
  $("li").click(function(){

    if ($(this).hasClass('checked')) {
      $(this).removeClass('checked');
    } else {
      $(this).addClass('checked');
    }
  });


  if($(document).on('click', 'li :not([class=checked])')){
    alert('click on checked li');
  }
  else {
    alert("doesnt work");
  }



});

const inputCheck = function() {
  if ($('#text-input').val().replace(/^\s*/, '')
    .replace(/\s*$/, '') !== '') {
    return true;
  } else {
    return false;
  }
}


//  Append li to ul with with ENTER button
$(document).keypress(event => {
  const keycode = event.keyCode ? event.keyCode : event.which;

  // Enter pressed
  if (keycode === 13) {

    // if input not epmty
    if(inputCheck()) {
      $('#list').append("<li>" + $("#text-input[name=task]").val() + ' <a href=\'#\' ' +
        "class='close' aria-hidden='true'>&times;</a></li>");
    }
  }
});
