
let items = [];
let pageNumber = 1;
let pageItems = 5;

let render = function() {
  alert('qwe');
  let pageCount = 1; // Math.ceil(items.length / pageItems);
  for (i = 0; i < pageCount; i++) {
    $('.pagination').append(i+1,`<button class="page-number">i+1</button>`);
  }

  checkButton();
  removeButton();
  addButton();
}


// if click on cross , remove element from toDo List
let removeButton = function () {
  $('body')
    .on('click', '#list a', function() {
      let index = Data.findIndex(item => item.name === $(this)
        .val());
      items.splice(index, 1);// remove 1 element in array
    });
}

// Add items in toDo List
let addButton = function() {

  // append item when click button-add
  $(document)
    .on('click', '.button-add', () => {
      if (inputCheck()) {
        items.push($('#text-input[name=task]')
          .val());
      }
    });

  //  Append item with ENTER button
  $(document).keypress(event => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    // Enter pressed
    if (keycode === 13) {

      // If input not empty
      if (inputCheck()) {
        items.push($('#text-input[name=task]').val());
      }
    }
  });
}

let checkButton = function () {
  $(document)
    .on('click', '.button-checkAll', () => {
      if (checkItems()) {
        checkAll(true);
      } else {
        checkAll(false);
      }
    });
}


// append to ul new li
let appendLi = function () {
  $('#list')
    .append(`<li>${$('#text-input[name=task]')
        .val()} <a href='#' ` // `class='close' ' for <li>
      + `class='close' aria-hidden='true'>&times;</a></li>`);
  return true;
}


// find unchecked li
let checkItems = function () {
  let unchecked;
  $('ul li').each(function(i)
  {
    if($(this).hasClass('checked') && unchecked !=true) {

      unchecked = false;
    }
    else {
      unchecked = true;

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



const inputCheck = function() {
  if ($('#text-input').val()
    .replace(/^\s*/, '')
    .replace(/\s*$/, '') !== '') {
    return true;
  }

  return false;
};




// $(document).ready(() => {
//   Object.observe(items,function() {
//     render();
//   });
// });


$(document).ready(() => {
  $(document).change(items,function() {
    render();
  });
});


