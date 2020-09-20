var userEnabled = null;
function checkboxListener(event) {
    userEnabled = event.target.checked;
}

function findAutoplayCheckbox() {
    return document.querySelector('.upnext-control input[type=checkbox]');
}

function disableAutoplay() {
    const result = {found: false, clicked: false};

    const autoplayCheckbox = findAutoplayCheckbox();
    if (!autoplayCheckbox) {
        return result;
    }
    result.found = true;

    if (autoplayCheckbox.checked && !userEnabled) {
        console.info("Clicking autoplay checkbox");
        autoplayCheckbox.click();
        result.clicked = true;
    }

    // Listen and remember if the user manually enables autoplay
    autoplayCheckbox.addEventListener('change', checkboxListener);

    return result;
}

// Depending on browser settings Gfycat does not always preserve the state of
// the autoplay toggle as the user navigates around the site, so keep watching
// the DOM indefinitely.
setupAutoHalt('gfycat', disableAutoplay);
