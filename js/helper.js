


// This is helpful JS file
// This file contain a lot of various functions

// check input from user.  .val() take value input
alert($('#text-input').val());

// append to ul new li
let appendLi = function () {
    $('#list')
      .append(`<li>${$('#text-input[name=task]')
          .val()} <a href='#' ` // `class='close' ' for <li>
        + `class='close' aria-hidden='true'>&times;</a></li>`);
    return true;
}

// check input from user
// $('indexInput').val() -> .val() func get input value
const inputCheck = function() {
    if ($('#text-input').val().replace(/^\s*/, '')
      .replace(/\s*$/, '') !== '') {
        return true;
    } else {
        return false;
    }
}


// work with each element
let eachElement = function () {
    $('ul li').each(function(i)
    {
        if($(this).hasClass('checked')) {}
            else {
               return false;
        }
    });
}

// add or remove class to element
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

// find index by name
const index = Data.findIndex(item => item.name === 'John');

// addClass('checked');
let addClass = function(className) {
    $('li').click(function() {
        if ($(this).hasClass(className)) {
            $(this).removeClass(className);
        } else {
            $(this).addClass(className);
        }
    });
};



const findIndex = function(arr,name) {
    for(i=0;i<arr.length;i++) {
        if(arr[i]===name){
            return i;
        }
    }
};


let clickedElement = function () {
    $('body').click(function(e) {

        let target = $(e.target),
          article;
        console.log(target[0].id); // print clicked element
    });
};
