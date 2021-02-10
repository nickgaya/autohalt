function findAutoplaySwitch() {
    return document.body.querySelector(
        '.controls__setting-panel .controls__setting-autoplay');
}

function isAutoplayEnabled(autoplaySwitch) {
    // It appears that the aria-checked attribute is "false" on initial page
    // load regardless of the actual state of the switch. So in addition to
    // checking the attribute value we check for a CSS class within the
    // element's subtree to determine the true state of the toggle.
    return (autoplaySwitch.getAttribute('aria-checked') !== 'false'
            || !!autoplaySwitch.querySelector(
                '.controls__setting-switch__open'));
}

function disableAutoplay() {
    const result = {found: false, clicked: false};

    const autoplaySwitch = findAutoplaySwitch();
    if (!autoplaySwitch) {
        return result;
    }
    result.found = true;

    if (isAutoplayEnabled(autoplaySwitch)) {
        console.info("Clicking autoplay switch");
        autoplaySwitch.click();
        result.clicked = true;
        result.disabled = !isAutoplayEnabled(autoplaySwitch);
    } else {
        result.disabled = true;
    }

    return result;
}

setupAutoHalt('hulu', disableAutoplay, {disconnectOnDisabled: true});
