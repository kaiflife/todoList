
$(document).ready(function () {
  $(document).on('click','.button-add',function () {
    $('#list').append("<li>" + $('#text-input[name=task]').val() + ' <a href=\'#\' '
      + 'class=\'close\' aria-hidden=\'true\'>&times;</a></li>');
  });
  $('body').on('click', '#list a', function() {
    $(this).closest('li')
      .remove();
  });

  if($(document).on('click', 'li :not(.checked)')){
    alert('click on checked li');
  }

  /*
   *This work code!!
   * $(document).on('click','li :not(.checked)',function () {
   *     $('li').addClass("checked");
   * });
   */


});


//  Append li to ul
$(document).keypress(event => {
  const keycode = event.keyCode ? event.keyCode : event.which;

  // Enter pressed
  // eslint-disable-next-line no-magic-numbers
  if (keycode === 13) {
    alert($('#text-input').val());

    if ($('#text-input[name=task]').val().replace(/^\s*/, '')
      .replace(/\s*$/, '') !== '') {

      // Append li
      $('#list').append("<li>" + $("#text-input[name=task]").val() + ' <a href=\'#\' ' +
        "class='close' aria-hidden='true'>&times;</a></li>");
    }
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
