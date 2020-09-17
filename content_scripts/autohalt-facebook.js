// Facebook does not seem to provide a toggle for autoplay behavior, but the
// Up Next card has a Cancel button that we can click when it appears.

function findUpNextCancelButton() {
    // Facebook minifies their CSS so it's difficult to determine a selector
    // that will be robust to future changes. Our approach is to query for the
    // CSS class that appears to correspond to our widget of interest, and then
    // click on the third button within the widget in document order.
    const upNextWidget = document.body.querySelector('._8dio');
    if (upNextWidget) {
        const buttons = upNextWidget.querySelectorAll('[role="button"]');
        if (buttons.length == 3) {
            return buttons[2];
        }
    }
}

function disableAutoplay() {
    const upNextCancelButton = findUpNextCancelButton();
    if (!upNextCancelButton) {
        // console.debug("Up Next Cancel button not found");
        return false;
    }

    console.info("Clicking Cancel button");
    upNextCancelButton.click();
    return true;
}

setupAutoHalt('facebook', disableAutoplay);
