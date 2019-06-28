
$(document).ready(function () {
    $(document).on('click','.button-add',function () {
        $('#list').append("<li>" + $("#text-input[name=task]").val() + " <a href='#' " +
          "class='close' aria-hidden='true'>&times;</a></li>");
    });
    $("body").on('click', '#list a', function () {
        $(this).closest("li").remove();
    });

    if($(document).on('click','li :not(.checked)')){
        alert('click on checked li');
    }

    //This work code!!
    // $(document).on('click','li :not(.checked)',function () {
    //     $('li').addClass("checked");
    // });


});



// Add a "checked" symbol when clicking on a list item

// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//     if (ev.target.tagName === 'LI') {
//         ev.target.classList.toggle('checked');
//     }
// }, false);


// 1 array Completed :checked (no : checked display:none, :checked display:initial)
// 2 array Active no :checked (np :checked display: initial, :checked display:none)
// 3 array General li: display: initial;
