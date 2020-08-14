var userEnabled = null;
function checkboxListener(event) {
    userEnabled = event.target.checked;
    // console.debug("Autoplay checkbox changed:", userEnabled);
}

function findAutoplayCheckbox() {
    return document.querySelector('.upnext-control input[type=checkbox]');
}

function disableAutoplay() {
    const autoplayCheckbox = findAutoplayCheckbox();
    if (!autoplayCheckbox) {
        // console.debug("Autoplay checkbox not found");
        return false;
    }
    // console.debug("Found autoplay checkbox:", autoplayCheckbox);

    if (autoplayCheckbox.checked && !userEnabled) {
        console.info("Clicking autoplay checkbox");
        autoplayCheckbox.click();
    }

    // Listen and remember if the user manually enables autoplay
    autoplayCheckbox.addEventListener('change', checkboxListener);

    return true;
}

// Watch for DOM changes until the autoplay checkbox appears. Gfycat does not
// preserve the user's selection if they navigate away from the video player,
// so we keep watching the DOM even after disabling autoplay.
//
// We could potentially stop watching after finding the element and start again
// when the location changes, however this requires a background script to
// watch for tab events.
function monitorDom() {
    let scheduled = false;

    function idleCallback() {
        disableAutoplay();
        scheduled = false;
    }

    function scheduleIdleCallback() {
        if (!scheduled) {
            window.requestIdleCallback(idleCallback, {timeout: 1000});
            scheduled = true;
        }
    }

    const observer = new MutationObserver(scheduleIdleCallback);
    const observerConfig = {
        subtree: true,
        childList: true,
    };
    observer.observe(document.body, observerConfig);

    scheduleIdleCallback();
}

browser.storage.local.get('gfycat')
.then((settings) => {
    return !settings.gfycat?.disabled;
}, (error) => {
    console.warn("Failed to get settings:", error);
    return true;
})
.then((enabled) => {
    if (enabled) {
        monitorDom();
    }
});
