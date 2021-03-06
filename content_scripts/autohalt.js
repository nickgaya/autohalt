const useSettings = true;
const idleCallbackTimeout = 1000;
const postCallbackDelay = 250;
const postClickDelay = 500;

function setupAutoHalt(name, callback, options) {
    function monitorDom(callback, options) {
        // For sites that preserve the user's autoplay selection during the
        // browsing session, we can stop watching the DOM once we confirm
        // autoplay is switched off. This allows the user to manually turn it
        // back on if desired.
        const disconnectOnDisabled = !!options?.disconnectOnDisabled;

        // Sometimes we need to re-check the DOM after clicking to confirm the
        // click had the desired effect. However we don't want to get into an
        // infinite clicking loop, so the option should specify a maximum
        // number of consecutive times to reschedule.
        const rescheduleAfterClick = options?.rescheduleAfterClick || 0;

        let scheduled = false;
        let delayed = false;
        let rescheduled = 0;

        function idleCallback() {
            let result;
            try {
                result = callback();
            } catch (error) {
                console.warn("Error in callback", error);
                result = {};
            }
            scheduled = false;

            if (disconnectOnDisabled && result.disabled) {
                console.info("Disconnecting MutationObserver");
                observer.disconnect();
                return;
            }

            if (result.clicked && rescheduled < rescheduleAfterClick) {
                scheduled = true;
                rescheduled += 1;
            } else {
                rescheduled = 0;
            }
            delayed = true;
            setTimeout(timeoutCallback,
                       result.clicked ? postClickDelay : postCallbackDelay);
        }

        function timeoutCallback() {
            delayed = false;
            if (scheduled) {
                window.requestIdleCallback(
                    idleCallback, {timeout: idleCallbackTimeout});
            }
        }

        function scheduleIdleCallback() {
            if (!scheduled) {
                scheduled = true;
                if (!delayed) {
                    window.requestIdleCallback(
                        idleCallback, {timeout: idleCallbackTimeout});
                }
            }
        }

        const observer = new MutationObserver(scheduleIdleCallback);
        const observerConfig = {
            subtree: true,
            childList: true,
        };
        console.info("Starting MutationObserver");
        observer.observe(document.body, observerConfig);

        scheduleIdleCallback();
    }

    if (useSettings) {
        browser.storage.local.get(name).then(settings => {
            return settings[name];
        }, error => {
            console.warn("Failed to get settings", name, ":", error);
            return {};
        }).then(siteSettings => {
            if (!siteSettings?.disabled) {
                monitorDom(callback, options);
            }
        });
    } else {
        monitorDom(callback, options);
    }
}
