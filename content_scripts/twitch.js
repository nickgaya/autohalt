// Twitch has the worst autoplay feature I've seen so far. There is no way for
// the user to switch off the feature. See:
// https://twitch.uservoice.com/forums/923368/suggestions/18396028
//
// As a workaround we watch for the autoplay card to appear in the DOM and,
// when it does, click "More Suggestions" to disable the countdown.

function disableAutoplay() {
    var autoplayDiv = document.getElementsByClassName(
        'autoplay-vod__content-container')[0];
    if (!autoplayDiv) {
        // console.log("Autoplay div not found");
        return false;
    }

    // XXX: This is pretty fragile, is there a more robust way?
    var moreSuggestionsButton = autoplayDiv.getElementsByTagName('button')[0];
    if (!moreSuggestionsButton) {
        // console.log("More Suggestions button not found");
        return false;
    }

    console.log("Clicking More Suggestions button");
    moreSuggestionsButton.click();
    return true;
}

// TODO: Throttle callback rate?

var scheduled = false;

const idleCallback = function() {
    disableAutoplay();
    scheduled = false;
};

const observerCallback = function(mutationsList, observer) {
    if (!scheduled) {
        window.requestIdleCallback(idleCallback, {timeout: 1000});
        scheduled = true;
    }
};

const observer = new MutationObserver(observerCallback);

const observerConfig = {
    subtree: true,
    childList: true,
};
observer.observe(document.body, observerConfig);
