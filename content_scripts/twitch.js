// Twitch does not provide a user toggle for autoplay functionality. See:
// https://twitch.uservoice.com/forums/923368/suggestions/18396028
//
// As a workaround we watch for the autoplay card to appear in the DOM and,
// when it does, click "More Suggestions" to disable the countdown.

function findAutoplayMoreSuggestionsButton() {
    return document.querySelector('.autoplay-vod__content-container button');
}

function disableAutoplay() {
    const moreSuggestionsButton = findAutoplayMoreSuggestionsButton();
    if (!moreSuggestionsButton) {
        // console.debug("Autoplay More Suggestions button not found");
        return false;
    }

    console.info("Clicking More Suggestions button");
    moreSuggestionsButton.click();
    return true;
}

// When the DOM changes, try to find the autoplay card and delete it if
// applicable.
//
// We could make this more efficient by only watching for changes to a parent
// element rather than the entire page. Not sure if this is worthwhile.
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

browser.storage.local.get('twitch')
.then((settings) => {
    return !settings.twitch?.disabled;
}, (error) => {
    console.warn("Failed to get settings:", error);
    return true;
})
.then((enabled) => {
    if (enabled) {
        monitorDom();
    }
});
