var userEnabled = null;
function checkboxListener(event) {
    userEnabled = event.target.checked;
    // console.log("Autoplay checkbox changed: ", userEnabled);
}

function disableAutoplay() {
    var upNextDiv = document.getElementsByClassName('upnext-control')[0];
    if (!upNextDiv) {
        console.log("Up Next div not found");
        return false;
    }

    var autoplayCheckbox = upNextDiv.querySelector(
        '.switch input[type=checkbox]');
    if (!autoplayCheckbox) {
        // console.log("Autoplay checkbox not found");
        return false;
    }

    var checked = autoplayCheckbox.checked;
    console.log("Autoplay checkbox checked: ", checked);
    if (checked && !userEnabled) {
        autoplayCheckbox.click();
        console.log("Autoplay checkbox checked after click: ",
                    autoplayCheckbox.checked);
    }

    // Listen and remember if the user manually enables autoplay in this tab
    autoplayCheckbox.addEventListener('change', checkboxListener);

    return true;
}

disableAutoplay();

// Gfycat re-enables autoplay if the user navigates away from the video player
// view and later returns. We use a background script to listen for url changes
// and re-disable autoplay if the user hasn't manually enabled it.
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'urlChanged') {
        disableAutoplay();
    }
});
