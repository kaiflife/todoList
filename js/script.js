
let items = [];


let idList = [];

let pageNumber = 1;
let pageItems = 5;
let activeFilter = $('.showAll');
let focusItem;

const render = function() {
  //clear ul
  $('#list').empty();

  //clear input
  $('#text-input').val('');

  //clear pagination
  $('.pagination').empty();

  // check active filter and filter items
  checkFilter();


  let pageCount = Math.ceil((items.length - blockedItems())/pageItems);

  pageNumber>pageCount && pageCount > 0 ? pageNumber=pageCount : true;


  makeToDo();

  pagination(pageCount);
  itemsCounter();


};

const log = function(item) {
  console.log(item);
};

const pagination = function(pageCount) {
  for (i = 0; i < pageCount; i++) {
    $('.pagination').append(`<button id='#pageNumber' class="page-number" value="${i+1}">${i+1}</button>`);
  }
};

const itemsCounter = function() {
  $('.showAll p').empty();
  $('.showAll p').append(`Show All: ${items.length}`);

  let unchecked;
  uncheckedItems() === false ?  unchecked = 0 : unchecked = uncheckedItems();

    $('.showChecked p').empty();
  $('.showChecked p').append(`Show Checked: ${items.length - unchecked}`);

  $('.showUnchecked p').empty();
  $('.showUnchecked p').append(`Show Unchecked: ${unchecked}`);


};

const checkFilter = function() {
  if(activeFilter.hasClass('showAll')){
    filterAll();
  }
  else if (activeFilter.hasClass('showChecked')){
    filterChecked();
  }
  else if (activeFilter.hasClass('showUnchecked')){
    filterUnchecked();
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

const unfocus = function() {
  $(document).focusout(function() {
    if(focusItem !==undefined){
      focusItem.attributes.getNamedItem('contenteditable').
        value = false;

    }
  });
};

const clickTwice = function () {
  let touchtime = 0;
  $(document)
    .on('click', '.editing', (e) => {
    if (((new Date().getTime()) - touchtime) < 300) {
      editItem(e)
    }
    touchtime = new Date().getTime();
  });
};


const editItem = function(e) {

  let target = e.target;
    if (target.className === 'editing') {
      target.attributes.getNamedItem('contenteditable').value = true;
      $(target).focus();
      focusItem = document.activeElement;
  }
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
    blocked: false,
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
const appendLi = function (name,id,checked,editing) {
  $('#list')
    .append($(`<li id=${id}  class="${checked +  ' item'}"><p contenteditable=${editing} class="editing">${name}</p>   <a href='#' `
      + `class='close' aria-hidden='true'>&times;</a>
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



const changeFilter = function(newFilter) {

  activeFilter.removeClass('active-filter');

  activeFilter = newFilter;
  activeFilter.addClass('active-filter');


};

const chooseFilter = function () {
  // filter All
  $('body').on('click', '.show-all', function() {
    filterAll();
    render();

  });
  // filter Unchecked
  $('body').on('click', '.show-unchecked', function() {
    filterUnchecked();

    render();

  });
  // filter Checked
  $('body').on('click', '.show-checked', function() {
    filterChecked();

    render();

  });
};

const filterAll = function() {
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
};

const filterUnchecked = function() {
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

};

const filterChecked = function() {
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
};


const uncheckedItems = function() {
  let unchecked = false;

  for(let i = 0; i < items.length; i++){
    if(items[i].checked !== 'checked') unchecked += 1;
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

render();
chooseFilter();

unfocus();
clickTwice();
deleteChecked();
checkItem();
checkAllItems();
removeItem();
addItem();
choosePage();


