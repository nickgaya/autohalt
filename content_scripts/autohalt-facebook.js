// Facebook does not seem to provide a toggle for autoplay behavior, but the
// Up Next card has a Cancel button that we can click when it appears.

function findUpNextCancelButton() {
    // Facebook minifies their CSS so it's difficult to determine what selector
    // to use.
    //
    // In our tests we have identified two variants of the Up Next widget in
    // different contexts. It remains to be seen whether the selectors we use
    // will continue to work for future versions of the site.

    // Variant 1: Div with class _8dio and three descendents with ARIA role
    // "button". The third button in document order is the cancel button.
    const upNextWidget = document.body.querySelector('._8dio');
    if (upNextWidget) {
        const buttons = upNextWidget.querySelectorAll('[role="button"]');
        if (buttons.length == 3) {
            return buttons[2];
        }
    }

    // Variant 2: Div with class _64gd using anchor elements as buttons. The
    // cancel button is the child of an element with class _64gk.
    //
    // After the cancel button is clicked the ._1yks class is added to the
    // top-level div to trigger a fade-out animation, so we can ignore the
    // element if it has this class.
    const upNextCancelButton = document.body.querySelector(
        '._64gd:not(._1yks) ._64gk > a');
    if (upNextCancelButton) {
        return upNextCancelButton;
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
