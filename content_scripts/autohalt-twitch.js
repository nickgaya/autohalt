// Twitch does not provide a user toggle for autoplay functionality. See:
// https://twitch.uservoice.com/forums/923368/suggestions/18396028
//
// As a workaround we watch for the autoplay card to appear in the DOM and,
// when it does, click "More Suggestions" to disable the countdown.

function findAutoplayMoreSuggestionsButton() {
    return document.querySelector('.autoplay-vod__content-container button');
}

function disableAutoplay() {
    const result = {found: false, clicked: false};

    const moreSuggestionsButton = findAutoplayMoreSuggestionsButton();
    if (!moreSuggestionsButton) {
        return result;
    }
    result.found = true;

    console.info("Clicking More Suggestions button");
    moreSuggestionsButton.click();
    result.clicked = true;

    return result;
}

setupAutoHalt('twitch', disableAutoplay);
