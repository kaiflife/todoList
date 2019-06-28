

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

<<<<<<< HEAD

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

=======
  if($(document).on('click', 'li :not(.checked)')){
    alert('click on checked li');
  }

  /*
   *This work code!!
   * This code append class to unchecked item of list
   * if we click on them
   * Delete class to checked list
   *
   * $(document).on('click','li :not(.checked)',function () {
   *     $('li').addClass("checked");
   * });
   */
>>>>>>> c49568670ccaf412e3d464d3d8d804ebb5d573f8


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
<<<<<<< HEAD
  if (keycode === 13) {

    // if input not epmty
    if(inputCheck()) {
      $('#list').append("<li>" + $("#text-input[name=task]").val() + ' <a href=\'#\' ' +
        "class='close' aria-hidden='true'>&times;</a></li>");
    }
  }
});
=======
  // eslint-disable-next-line no-magic-numbers
  if (keycode === 13) {

    // if input not epmty
    if(inputCheck())
    {
      $('#list').append("<li>" + $("#text-input[name=task]").val() + ' <a href=\'#\' ' +
        "class='close' aria-hidden='true'>&times;</a></li>");
    }

    // checkInput non function
    // if ($('#text-input[name=task]').val().replace(/^\s*/, '')
    //   .replace(/\s*$/, '') !== '') {
    //
    //   // Append li
    //   $('#list').append("<li>" + $("#text-input[name=task]").val() + ' <a href=\'#\' ' +
    //     "class='close' aria-hidden='true'>&times;</a></li>");
    // }
  }

  // Input not empty
});


// Add a "checked" symbol when clicking on a list item

/*
 * Var list = document.querySelector('ul');
 * List.addEventListener('click', function(ev) {
 *     If (ev.target.tagName === 'LI') {
 *         Ev.target.classList.toggle('checked');
 *     }
 * }, false);
 */


/*
 * 1 array Completed :checked (no : checked display:none, :checked display:initial)
 * 2 array Active no :checked (np :checked display: initial, :checked display:none)
 * 3 array General li: display: initial;
 */
>>>>>>> c49568670ccaf412e3d464d3d8d804ebb5d573f8
