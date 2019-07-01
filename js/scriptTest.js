
let items = [];
let item = {
  id: Math.random(),
  checked:false,
  name: '',
  editing: false
}
let idList = [];

let pageNumber = 1;
let pageItems = 5;

const render = function() {
  alert('qwe');
  let pageCount = 1; // Math.ceil(items.length / pageItems);

  for (i = 0; i < pageCount; i++) {
    $('.pagination').append(`<button class="page-number">i+1</button>`);
  }
}

let proxy = new Proxy(items, render);// if array changed, start render function


// if click on cross , remove element from toDo List
const removeItem = function () {
  $('body')
    .on('click', '#list a', function() {
      let index = items.findIndex(item => item.name === $(this)
        .val());
      items.splice(index, 1);// remove 1 element in array
    });
  proxy;
}

const idGener = function() {
  let randId = Math.random();
  while (!(idList.findIndex(item => item.name === randId))) {
    randId = Math.random();
  }
  return randId;
}

const itemProperty = function(name) {
  items.push({
    name: name,
    id: randId,
    checked: false,
    editing: false
  });
}

// Add items to array
const addItem = function() {

  // append item when click button-add
  $(document)
    .on('click', '.button-add', () => {
      if (inputCheck()) {
        addItemProperty($('#text-input[name=task]').val())
      }
    });

  //  Append item with ENTER button
  $(document).keypress(event => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    // Enter pressed
    if (keycode === 13) {

      // If input not empty
      if (inputCheck()) {
        addItemProperty($('#text-input[name=task]').val())
      }
    }
  });
  proxy;

}

const checkAllItems = function () {
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
const appendLi = function () {
  $('#list')
    .append(`<li>${$('#text-input[name=task]')
        .val()} <a href='#' ` // `class='close' ' for <li>
      + `class='close' aria-hidden='true'>&times;</a></li>`);
  return true;
}


// find unchecked li
const checkItems = function () {
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
const checkAll = function (check) {
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




// addRemoveClass('checked');
const addRemoveClass = function(className) {
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

checkAllItems();
removeItem();
addItem();

