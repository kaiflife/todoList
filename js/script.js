"use strict";

let items = [], idList = [],

  randId = 0.00000000000000000001 ,
  pageNumber = 1,
  pageItems = 5, // Items on one page
  activeFilter = $('.showAll'), // (showAll,ShowChecked,ShowUnchecked)
  focusItem,
  unchecked,
  pageNumberValue;

const pAll = $('.showAll p'),
  pChecked = $('.showChecked p'),
  pUnchecked = $('.showUnchecked p'),
  ulList = $('#list'),
  paginationButton = $('.pagination'),
  textInput = $('#text-input'),
  filterShowAll = $('.showAll'),
  filterShowUnchecked = $('.showUnchecked'),
  filterShowChecked = $('.showChecked'),
  checkAllCheckbox = $('#checkAll');

const render = function() {

  unchecked = uncheckedItems();

  if(unchecked === false){
    unchecked = 0;
  }

  if(pageItems <= 0) pageNumber=1;

  //clear ul
  ulList.empty();

  //clear input
  textInput.val('');

  //clear pagination
  paginationButton.empty();

  let pageCount = Math.ceil(blockedItems() / pageItems);

  if(pageNumber > pageCount && pageCount > 0) {
    pageNumber = pageCount;
  }
  if(items.length > 0){
    makeToDo();
    pagination(pageCount);
    currentPage();

  }

  itemsCounter();

  const checked = items.length - unchecked === items.length && items.length !== 0;
  if(checked){
    checkAllCheckbox.prop('checked',true);
  } else {
    checkAllCheckbox.prop('checked',false);
  }

};
const currentPage = function () {
  pageNumberValue = $(`.page-number[value~=${pageNumber}]`);
  pageNumberValue.css("background-color", "yellow");
};

const pagination = function(pageCount) {
  let buttonAppend = '';
  for (let i = 0; i < pageCount; i++) {
    buttonAppend += `<button id=\'#pageNumber\' class="page-number" value="${i+1}">${i+1}</button>`;
  }
  paginationButton.html(buttonAppend);
};

// Counter of items (All,checked,unchecked)
const itemsCounter = function() {
  pAll.empty();
  let count = items.length;
  pAll.append(`Show All: ${count}`);
  count = items.length - unchecked;
  pChecked.empty();
  pChecked.append(`Show Checked: ${count}`);
  count = unchecked;
  pUnchecked.empty();
  pUnchecked.append(`Show Unchecked: ${count}`);
};

const filterValues = () => {

  let pages = [];
  if(activeFilter.hasClass('showAll')) {
    pages = items.map( (item,i) => i);
  }
  else if(activeFilter.hasClass('showChecked')) {
    items.forEach((item, i) => {
      if (item.checked) {
        pages.push(i);
      }
    });
  }
  else if(activeFilter.hasClass('showUnchecked')) {
      items.forEach((item, i) => {
        if (!item.checked) {

          pages.push(i);
        }
      });
    }
  return pages;
};


const visibleItems = function () {
    let pages = filterValues(); // index of items checked/unchecked [0,3,5] etc
    let renderItems = [];
    let counter = 0;
    let i = (pageNumber-1)*pageItems;
    for(i;i < items.length;i++){
      if(counter === pageItems){
        return renderItems;
      }
      if(pages.indexOf(i) !== -1){
        renderItems.push(items[i]);
        counter +=1;
      }
    }
    return renderItems;
};

const makeToDo = function() {
  let pages = visibleItems();
  let ulListAppend = ``;
  let name;
  let id;
  let checked;
  let editing;
  for(let i = 0 ; i < pages.length; i++){
    name = pages[i].name;
    id = pages[i].id;
    pages[i].checked ? checked = 'checked' : checked='';
    editing = pages[i].editing;
    ulListAppend += `<li id=${id}  class="${checked + ' item'}">
    <input type="checkbox" id="checkItem" class="check-item"  ${checked+'='}><p contenteditable=${editing}
     class="editing">${name}</p>   <a href='#'
      + class='close' aria-hidden='true'>&times;</a>
</li>`;
  }
  ulList.html(ulListAppend);
};

const choosePage = function() {
  $(document).on ("click", `.page-number`, function () {
    pageNumber = $(this).val();
    render();
  });
};

// if click on cross , remove element from toDo List
const removeItem = function () {
  $('body')
    .on('click', '#list .close', function() {
      let id = Number($(this).parent().attr('id'));
      let index = idList.indexOf(id);
      idList.splice(index,1); // remove id
      items.splice(index,1);// remove 1 element in array
      render();
    });
};

// items that was blocked
const blockedItems = function () {
  if(items.length > 0){
    if(activeFilter.hasClass('showAll')) {
      return items.length;
    } else if(activeFilter.hasClass('showChecked')){
      return items.length - uncheckedItems();
    }
    else if(activeFilter.hasClass('showUnchecked')){
      return uncheckedItems();
    }
  }
};

// Id generation
const idGener = function() {
  randId += 0.00000000000000000001;
  idList.unshift(randId);
  return randId;
};

// check for unfocus in <body>
const unfocus = function() {
  $('body').on('focusout','.editing',function() {
    if(focusItem !==undefined){

      let id = Number(focusItem.parent().attr('id'));
      let index = idList.indexOf(id);
      let text = focusItem.text();
      if(inputCheck(text)){
        items[index].name = focusItem.text();
      }
      focusItem.attr('contenteditable', 'false');
      render();
    }
  });
};

//dbl click dosnt work
const clickTwice = function () {
  $('body').on('click', '.editing', function () {
    $(this).attr('contenteditable', 'true');
    $(this).focus();
    focusItem = $(this);
  });
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

const createItem = function(text) {
  if (inputCheck(text)) {
    addItemProperty(text);
    checkAllCheckbox.prop('checked',false);
    render();
  }
};

// Add items to array
const addItem = function() {

  // append item when click button-add
  $(document)
    .on('click', '.button-add', () => {
      let text = textInput.val();
      createItem(text);
    });

  //  Append item with ENTER button
  $(document).keypress(event => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    // Enter pressed
    if (keycode === 13) {
      let text = textInput.val();

      // If input not empty
      createItem(text);
    }
  });
};

const deleteChecked = function() {
  $(document)
    .on('click', '#deleteId', () => {
      if(!uncheckedItems())
      {
        items = []; idList = [];
        pageNumber = 1;
        render();
        return 0;
      }

      let arr = [];idList = [];
      items.forEach((item,i) => {if(!item.checked){
        arr.push(item);
        idList.push(item.id);
      }});
      items = arr;
      render();
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

//check one item
let checkItem = function () {
  $('body')
    .on('click','.check-item', function() {
      let id = Number($(this).parent().attr('id'));
      let index = idList.indexOf(id);

      if (items[index].checked) {
        items[index].checked = false;
      } else {
        items[index].checked = true;
      }
      render();
    });
};

const changeFilter = function(newFilter) {
  if(activeFilter !== undefined){
    activeFilter.removeClass('active-filter');
    activeFilter = newFilter;
    activeFilter.addClass('active-filter');
  }
};

const chooseFilter = function () {

  // filter All
  $('body').on('click', '.filter', function() {
    if($(this).attr('id') === 'show-all'){
      changeFilter(filterShowAll);

    } else if ($(this).attr('id') === 'show-checked') {
      changeFilter(filterShowChecked);

    } else if ($(this).attr('id') === 'show-unchecked'){
      changeFilter(filterShowUnchecked);
    }
    render();
  });
};
const uncheckedItems = function() {
  let unchecked = false;

  items.forEach(item => {if(!item.checked)unchecked+=1;});

  return unchecked; // true if have unchecked, false if everybody is checked
};

// add check/uncheck elements
const checkAll = function (check) {
  check ? items.forEach(item => item.checked = true)
    : items.forEach(item => item.checked = false)
};

const inputCheck = function(text) {
  if (text    .replace(/^\s*/, '').replace(/\s*$/, '') !== '') {
    return true;
  }
  return false;
};

chooseFilter();
unfocus();
clickTwice();
deleteChecked();
checkItem();
checkAllItems();
removeItem();
addItem();
choosePage();
render();