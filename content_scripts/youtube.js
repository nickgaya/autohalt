const autoplaySelector = '[aria-label=Autoplay][aria-pressed]';

function disableAutoplay() {
    var autoplayButton = document.querySelector(autoplaySelector);
    if (autoplayButton) {
        var pressed = autoplayButton.getAttribute('aria-pressed');
        console.log("Autoplay button pressed: ", pressed);
        if (pressed === 'true') {
            autoplayButton.click();
            console.log("Autoplay button clicked, now pressed: ",
                        autoplayButton.getAttribute('aria-pressed'));
        }
        return true;
    } else {
        // console.log("Autoplay button not found");
        return false;
    }
}

if (!disableAutoplay()) {
    var scheduled = false;

    const idleCallback = function() {
        if (disableAutoplay()) {
            observer.disconnect();
        }
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
        attributes: true,
        attributeFilter: ['aria-label', 'aria-pressed'],
    };
    observer.observe(document.body, observerConfig);
}
