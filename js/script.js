
let items = [];
let item = {
  id: Math.random(),
  checked:false,
  name: '',
  editing: false
};
let idList = [];

let pageNumber = 1;
let pageItems = 5;

const render = function() {
  //clear ul
  $('#list').empty()

  //clear pagination
  $('.pagination').empty()

  let pageCount = Math.ceil(items.length / pageItems);

  pageNumber>pageCount ? pageNumber=pageCount : true;

  makeToDo();

  pagination(pageCount);
};

const pagination = function(pageCount) {
  for (i = 0; i < pageCount; i++) {
    $('.pagination').append(`<button id='#pageNumber' class="page-number" value="${i+1}">${i+1}</button>`);
  }
};

const makeToDo = function() {

  if(items.length >= pageNumber*pageItems){
    let i = (pageNumber-1)*5;
    for (i; i < pageNumber*pageItems; i++) {
      appendLi(items[i].name,items[i].id,items[i].checked,items[i].editing);
    }
  }
  else {
    let i = (pageNumber-1)*pageItems;
    for(i; i < items.length; i++){
      appendLi(items[i].name,items[i].id,items[i].checked,items[i].editing);
    }
  }
};


// Change page
const choosePage = function() {
  $('body')
    .click(function(e) {

      let target = $(e.target);


      if(target[0].id === '#pageNumber'){
        pageNumber = target[0].value;
        render();
      }

  });
};

// if click on cross , remove element from toDo List
const removeItem = function () {
  $('body')
    .on('click', '#list a', function() {
      let id = Number($(this).parent().attr('id'));

      let index = findIndex(idList,id);

      idList.splice(index,1);
      items.splice(index,1);// remove 1 element in array

      $('#checkAll').prop('checked',false);
      render();
    });
};


// Id generation
const idGener = function() {
  let randId = Math.random();
  while (!(idList.findIndex(item => item.name === randId))) {
    randId = Math.random();
  }
  idList.unshift(randId);

  return randId;
};


//find ad index of item
const findIndex = function(arr,name) {
  for(i=0;i<arr.length;i++) {
    if(Number(arr[i])===name){
      return i;
    }
  }
};


// add properties to array
const addItemProperty = function(name,id=idGener()) {
  items.unshift({
    name: name,
    id: id,
    checked: false,
    editing: false
  });
};

// Add items to array
const addItem = function() {

  // append item when click button-add
  $(document)
    .on('click', '.button-add', () => {
      if (inputCheck()) {
        $('.button-add').blur();
        addItemProperty($('#text-input[name=task]').val());
        $('#checkAll').prop('checked',false);
        render();
      }
    });

  //  Append item with ENTER button
  $(document).keypress(event => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    // Enter pressed
    if (keycode === 13) {

      // If input not empty
      if (inputCheck()) {
        addItemProperty($('#text-input[name=task]').val());
        $('#checkAll').prop('checked',false);

        render();
      }
    }
  });
};


// Check all items, or uncheck all items
const checkAllItems = function () {
  $(document)
    .on('click', '#checkAll', () => {
      if (checkItems()) {
        checkAll(true);
      } else {
        checkAll(false);
      }
      render();

    });
};


// append to ul new li
const appendLi = function (name,id,checked,editing) {
  $('#list')
    .append($(`<li id=${id} class="${checked + ' ' + editing + ' item'}">${name} <a href='#' `
      + `class='close' aria-hidden='true'>&times;</a></li>`));
  return true;
};


//check one item
let checkItem = function () {
  $('body')
    .click(function(e) {

      let target = $(e.target);

      if(target[0].tagName === 'LI'){
        let id = Number(target[0].id);

        let index = findIndex(idList, id);

        if (items[index].checked === 'checked') {
          items[index].checked = '';
        } else {
          items[index].checked = 'checked';
        }
        render();
      }


    });
};


// find unchecked li
const checkItems = function () {
  let unchecked;
  $('ul li').each(function(i)
  {
    let id = Number($(this).attr('id'));

    let index = findIndex(idList, id);

    if(items[index].checked === 'checked' && unchecked !=true) {

      unchecked = false;
    }
    else {
      unchecked = true;
    }
  });

  return unchecked; // every class='checked'
};

// add check/uncheck elements
const checkAll = function (check) {
  if(check){
    $('ul li').each(function(i) {
      let id = Number($(this).attr('id'));
      let index = findIndex(idList, id);
      items[index].checked = 'checked';
    });
  }
  else {
    $('ul li').each(function(i) {
      let id = Number($(this).attr('id'));
      let index = findIndex(idList, id);
      items[index].checked = '';
    });
  }
  return true;
};




// addRemoveClass('checked');
const addRemoveClass = function(className) {
  $('li').click(function() {
    if ($(this).hasClass(className)) {
      $(this).removeClass(className);
    } else {
      $(this).addClass(className);
    }
  });
};



const inputCheck = function() {
  if ($('#text-input').val()
    .replace(/^\s*/, '')
    .replace(/\s*$/, '') !== '') {
    return true;
  }

  return false;
};

checkItem();
checkAllItems();
removeItem();
addItem();
choosePage();


