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

getSiteSettings('youtube')
.then((settings) => {
    if (! settings?.disabled) {
        // YouTube remembers the user's autoplay selection across the browser
        // session, so we can stop listening for mutation events once we find
        // the autoplay button and click it once if needed.
        monitorDom(disableAutoplay, {disconnectOnSuccess: true});
    }
})
.catch((error) => {
    console.error(error);
});
