function findAutoplayButton() {
    let elt = document.body.querySelector('ytp-autonav-toggle-button');
    if (elt) {
        return [elt, elt.getAttribute('aria-checked') === 'true'];
    }
    elt = document.body.querySelector(
        'ytd-compact-autoplay-renderer paper-toggle-button');
    if (elt) {
        return [elt, elt.getAttribute('aria-pressed') === 'true'];
    }
}

function disableAutoplay() {
    const result = {found: false, clicked: false};

    const [element, enabled] = findAutoplayButton() || [];
    if (!element) {
        return result;
    }
    result.found = true;

    if (enabled) {
        console.info("Clicking autoplay button");
        element.click();
        result.clicked = true;
    }

    return result;
}

// YouTube remembers the user's autoplay selection as they navigate around, so
// we can stop listening for mutation events as soon as we find up next toggle
// (and turn it off if needed). This allows the user to manually turn it back
// on if desired.
setupAutoHalt('youtube', disableAutoplay, {disconnectOnFound: true});
