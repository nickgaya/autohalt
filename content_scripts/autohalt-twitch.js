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

setupAutoHalt('twitch', disableAutoplay);
