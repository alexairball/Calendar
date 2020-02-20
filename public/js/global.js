$(() => {
    movePopup(); // to remove and add in popup creation method

    $(window).resize(() => {
        if ($("#popup-container").is(":visible"))
            movePopup();
    });
});

function movePopup() {
    
}