

// Add button append li and <a>. <a> mean close list
$(document).ready(() => {
  $(document).on('click', '.button-add', () => {
    if (inputCheck()) {
      $('#list').append(`<li>${$('#text-input[name=task]').val()} <a href='#' `
        + `class='close' aria-hidden='true'>&times;</a></li>`);
    }
  });
  $('body').on('click', '#list a', function() {
    $(this).closest('li')
      .remove();
  });
});

<<<<<<< HEAD

// When item clicked add class checked when ucnehcked
// when item unchecked and clicked remove from item class checked
$('li').click(function() {
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
  } else {
    $(this).addClass('checked');
  }
=======

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



>>>>>>> f1b8cd819391735e7a0b86bd490580d997e83910
});


const inputCheck = function() {
  if ($('#text-input').val()
    .replace(/^\s*/, '')
    .replace(/\s*$/, '') !== '') {
    return true;
  }

  return false;
};


//  Append li to ul with with ENTER button
$(document).keypress(event => {
  const keycode = event.keyCode ? event.keyCode : event.which;

  // Enter pressed
<<<<<<< HEAD
  if (keycode === 13) {

    // If input not epmty
    if (inputCheck()) {
      $('#list').append(`<li>${$('#text-input[name=task]').val()} <a href='#' `
        + `class='close' aria-hidden='true'>&times;</a></li>`);
    }
  }
});
=======

  if (keycode === 13) {

    // if input not epmty
    if(inputCheck()) {
      $('#list').append("<li>" + $("#text-input[name=task]").val() + ' <a href=\'#\' ' +
        "class='close' aria-hidden='true'>&times;</a></li>");
    }
  }
});

>>>>>>> f1b8cd819391735e7a0b86bd490580d997e83910
