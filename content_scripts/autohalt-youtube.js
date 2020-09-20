function findAutoplayButton() {
    return document.querySelector(
        'ytd-compact-autoplay-renderer paper-toggle-button');
}

function disableAutoplay() {
    const result = {found: false, clicked: false};

    const autoplayButton = findAutoplayButton();
    if (!autoplayButton) {
        return result;
    }
    result.found = true;

    if (autoplayButton.getAttribute('aria-pressed') === 'true') {
        console.info("Clicking autoplay button");
        autoplayButton.click();
        result.clicked = true;
    }

    return result;
}

// YouTube remembers the user's autoplay selection as they navigate around, so
// we can stop listening for mutation events as soon as we find up next toggle
// (and turn it off if needed). This allows the user to manually turn it back
// on if desired.
setupAutoHalt('youtube', disableAutoplay, {disconnectOnFound: true});
