
let items = [];


let idList = [];

let pageNumber = 1;
let pageItems = 5;
let activeFilter = $('.showAll');

const render = function() {
  //clear ul
  $('#list').empty();

  //clear pagination
  $('.pagination').empty();

  let pageCount = Math.ceil((items.length - blockedItems())/pageItems);

  pageNumber>pageCount && pageCount > 0 ? pageNumber=pageCount : true;

  makeToDo();

  pagination(pageCount);
};

const pagination = function(pageCount) {
  for (i = 0; i < pageCount; i++) {
    $('.pagination').append(`<button id='#pageNumber' class="page-number" value="${i+1}">${i+1}</button>`);
  }
};

const visiblePages = function () {
  let pages = [];
  let counter = 0;
  let i = (pageNumber-1) * pageItems;
  for(i; i < items.length; i++){
    if(counter === pageItems){
      return pages;
    }
    if(!items[i].blocked){
      counter +=1;
      pages.push(i);
    }
  }
  return pages;
};

const makeToDo = function() {
  let pages = visiblePages();
  for(i = 0 ; i < pages.length; i++){
    {appendLi(items[pages[i]].name,items[pages[i]].id,items[pages[i]].checked,items[pages[i]].editing)};
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
    .on('click', '#list .close', function() {
      let id = Number($(this).parent().attr('id'));

      let index = findIndex(idList,id);

      idList.splice(index,1); // remove id
      items.splice(index,1);// remove 1 element in array

      render();
    });
};

const blockedItems = function () {
  let blockedCount = 0;
  if(items.length > 0){
    for(i = 0; i < items.length; i++) {
      if(items[i].blocked) {blockedCount+=1;}
    }
  }
  return blockedCount;
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
    blocked: false
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
          addItemProperty($ ('#text-input[name=task]').val());
          $('#checkAll').prop('checked',false);
          render();
        }
      }
  });
};

const deleteChecked = function() {
  $(document)
    .on('click', '#deleteId', () => {
      if (items.length > 0) {
        let i = 0;
        if(!uncheckedItems())
        {
          items = [];
          idList = [];
          pageNumber = 1;
          render();
          return 0;
        }
        for (i = 0; i < items.length; i++) {
            let checked = items[i].checked;
            if (checked === 'checked') {
              idList.splice(i, 1); // remove id
              items.splice(i, 1);// remove 1 element in array
              i -=1;
              render();
            }
        }
      }
    });
};

// Check all items, or uncheck all items
const checkAllItems = function () {
  $(document)
    .on('click', '#checkAll', () => {
      if(items.length > 0) {

        if (uncheckedItems()) {
          checkAll(true);
        } else {
          checkAll(false);
        }
        render();
      }
    });
};

// append to ul new li
const appendLi = function (name,id,checked) {
  $('#list')
    .append($(`<li id=${id} contenteditable=true class="${checked +  ' item'}">${name}   <a href='#' `
      + `class='close' aria-hidden='true'>&times;</a>
<a href='#' class='editItem' aria-hidden='true'>&#128736;</a>
</li>`));
  return true;
};
//

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
          $('#checkAll').prop('checked',false);
          render();
        }
    });
};

const editItem = function() {
  $('body')
    .on('click', '#list .editItem', function() {
      let id = Number($(this).parent().attr('id'));

      let index = findIndex(idList,id);



    });
};

const changeFilter = function(newFilter) {

  activeFilter.removeClass('active-filter');

  activeFilter = newFilter;
  activeFilter.addClass('active-filter');


};

const filterAll = function() {
  $('body')
    .on('click', '.show-all', function() {

      if (items.length > 0) {

        for (i = 0; i < items.length; i++) {
          let blocked = items[i].blocked;
          if (blocked) {
            items[i].blocked = false;
            $(`#${items[i].id}`).removeClass('blocked');
          }
        }
      }

      changeFilter($('.showAll'));
      render();
    });
};

const filterUnchecked = function() {
  $('body')
    .on('click', '.show-unchecked', function() {

      if (items.length > 0) {
        for (i = 0; i < items.length; i++) {
          let checked = items[i].checked;
          if (checked === 'checked') {
            items[i].blocked = true;

            $(`#${items[i].id}`).addClass('blocked');

          } else {
            items[i].blocked = false;
            $(`#${items[i].id}`).removeClass('blocked');
          }
        }
      }
      changeFilter($('.showUnchecked'));
      render();

    });
};

const filterChecked = function() {
  $('body')
    .on('click', '.show-checked', function() {
      if (items.length > 0) {
        for (i = 0; i < items.length; i++) {
          let checked = items[i].checked;
          if (!checked) {
            items[i].blocked = true;
            $(`#${items[i].id}`).addClass('blocked');



          } else {
            items[i].blocked = false;
            $(`#${items[i].id}`).removeClass('blocked');

          }
        }
      }
      changeFilter($('.showChecked'));
      render();

    });
};


const uncheckedItems = function() {
  let unchecked = false;

  for(let i = 0; i < items.length; i++){
    if(items[i].checked !== 'checked') unchecked = true;
  }

  return unchecked; // true if have unchecked, false if everybody is checked
};

// add check/uncheck elements
const checkAll = function (check) {
  if(check){
      for(let i = 0; i < items.length; i++) {
        items[i].checked = 'checked';
      }
  }
  else {
    for(let i = 0; i < items.length; i++) {
      items[i].checked = '';
    }
  }
  return true;
};



const inputCheck = function() {
  if ($('#text-input').val()
    .replace(/^\s*/, '')
    .replace(/\s*$/, '') !== '') {
    return true;
  }

  return false;
};


filterAll();
filterChecked();
filterUnchecked();

editItem();
deleteChecked();
checkItem();
checkAllItems();
removeItem();
addItem();
choosePage();


