$(document).ready(function () {
    //retrive last saved theme
    if (typeof (Storage) !== "undefined") {
        var colorArgs;
        if (colorArgs = localStorage.getItem("lastTheme"))
            changeTheme(colorArgs);
    } else {
        console.log("localstorage not available for getting last theme");
    }

    //intilize material components
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.modal').modal();
    $('input#input_text, textarea#textarea').characterCounter();
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
    $('.datepicker').datepicker();
    $('select').formSelect();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });
    ////////////////////////////////////////////////

    var elem = document.querySelector('.collapsible.expandable');
    if (elem != null) {
        var instance = M.Collapsible.init(elem, {
            accordion: false
        });
        instance.open();
    }
});

//close collapsable body (Dr.'s requirement)
function btnClose() {
    //scroll animation while closing
    $(".btnClose").removeAttr("style");
    $([document.documentElement, document.body]).animate({
        scrollTop: $("li.btnClose.active").offset().top
    }, 500);

    //show collapsable for a moment before closing
    setTimeout(() => {
        $(".btnClose").removeClass("active");
    }, 1000);
}

function changeTheme(colorArgs) {
    //runtime mobile statusbar change
    document.getElementsByTagName("meta")[0].setAttribute("content", colorArgs);

    //change primary theme (CSS variable)
    $('body').css('--primary', colorArgs);

    //save primary theme for next time
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("lastTheme", colorArgs);
    } else {
        console.log("localstorage not available for theme saving");
    }

    //for changing backround gradient
    var color = colorArgs.replace('#', 'g');
    $("#root").attr('class', color);
}

function changeThemeClose(args) {
    $('.sidenav').sidenav('close');
    changeTheme(args);
}