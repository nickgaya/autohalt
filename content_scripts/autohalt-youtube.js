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

browser.storage.local.get('youtube')
.then((settings) => {
    return !settings.youtube?.disabled;
}, (error) => {
    console.warn("Failed to get settings:", error);
    return true;
})
.then((enabled) => {
    if (enabled) {
        // YouTube remembers the user's autoplay selection across the browser
        // session, so we can stop listening for mutation events once the
        // autoplay button is detected and toggled once.
        monitorDom(disableAutoplay, {disconnectOnSuccess: true});
    }
});
