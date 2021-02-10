function findAutoplayToggle() {
    return document.querySelector(
        '#continuous_play_toggle');
}

function disableAutoplay() {
    const result = {found: false, clicked: false};

    const autoplayToggle = findAutoplayToggle();
    if (!autoplayToggle) {
        return result;
    }
    result.found = true;

    if (autoplayToggle.checked) {
        console.info("Clicking autoplay toggle");
        autoplayToggle.click();
        result.clicked = true;
        result.disabled = !autoplayToggle.checked;
    } else {
        result.disabled = true;
    }

    return result;
}

setupAutoHalt('vimeo', disableAutoplay, {disconnectOnDisabled: true});
