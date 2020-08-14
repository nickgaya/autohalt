function findAutoplayButton() {
    return document.querySelector(
        'ytd-compact-autoplay-renderer paper-toggle-button');
}

function disableAutoplay() {
    var autoplayButton = findAutoplayButton();
    if (!autoplayButton) {
        // console.debug("Autoplay button not found");
        return false;
    }
    // console.debug("Found autoplay button:", autoplayButton);

    if (autoplayButton.getAttribute('aria-pressed') === 'true') {
        console.info("Clicking autoplay button");
        autoplayButton.click();
    }
    return true;
}

// Watch for DOM changes until the autoplay element appears, then disable it.
// YouTube is relatively user-friendly in that it respects the user's autoplay
// setting across the browser session, so we can stop listening for mutation
// events once the button is detected and toggled.

var scheduled = false;

function idleCallback() {
    if (disableAutoplay()) {
        // console.debug("Disconnecting MutationObserver");
        observer.disconnect();
    }
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
