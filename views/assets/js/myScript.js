$(document).ready(function () {
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown();
    $('.collapsible').collapsible();
    if (typeof (Storage) !== "undefined") {
        var colorArgs;
        if (colorArgs = localStorage.getItem("lastTheme"))
            changeTheme(colorArgs);
    } else {
        console.log("localstorage not available");
    }
});

function changeTheme(colorArgs) {
    $('.sidenav').sidenav('close');

    //runtime mobile statusbar change
    document.getElementsByTagName("meta")[0].setAttribute("content", colorArgs);

    var elems = document.getElementsByClassName("themePrimary");
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.background = colorArgs;
    }
    var icons = document.getElementsByClassName("iconPrimary");
    for (let i = 0; i < icons.length; i++) {
        icons[i].style.color = colorArgs;
    }
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("lastTheme", colorArgs);
        if (colorArgs === '#ee6e73')
            localStorage.removeItem('lastTheme');
    } else {
        console.log("localstorage not available");
    }
}