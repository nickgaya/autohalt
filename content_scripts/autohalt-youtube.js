function findAutoplayButton() {
    return document.querySelector(
        'ytd-compact-autoplay-renderer paper-toggle-button');
}

function disableAutoplay() {
    const autoplayButton = findAutoplayButton();
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

// YouTube remembers the user's autoplay selection as they navigate around, so
// we can stop listening for mutation events as soon as the up next toggle
// appears.
setupAutoHalt('youtube', disableAutoplay, {disconnectOnSuccess: true});
