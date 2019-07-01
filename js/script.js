

// Add button append li and <a>. <a> mean close list
$(document).ready(() => {
  $(document)
    .on('click', '.button-add', () => {
      if (inputCheck()) {
        $('#list')
          .append(`<li class="">${$('#text-input[name=task]')
              .val()} <a href='#' ` // `class='close' ' for <li>
            + `class='close' aria-hidden='true'>&times;</a></li>`);
      }
    });
  $('body')
    .on('click', '#list a', function() {
      $(this)
        .closest('li')
        .remove();
    });

  $(document)
    .on('click', '.button-checkAll', () => {
      if (checkItems()) {
        checkAll(true);
      } else {
        checkAll(false);
      }
    });
});


// find unchecked li
let checkItems = function () {
  let unchecked;
  $('ul li').each(function(i)
  {
    if($(this).hasClass('checked')) {unchecked = false;}
    else {
      unchecked = true;
      return true; // no class='checked'
    }
  });

  return unchecked; // every class='checked'
}

// check elements
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




// Need find clicked element!!!
$('li').click(function() {
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
  } else {
    $(this).addClass('checked');
  }
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
  if (keycode === 13) {

    // If input not empty
    if (inputCheck()) {
      $('#list').append(`<li>${$('#text-input[name=task]').val()} <a href='#' `
        + `class='close' aria-hidden='true'>&times;</a></li>`);
    }
  }
});
