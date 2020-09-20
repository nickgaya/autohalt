const useSettings = true;
const idleCallbackTimeout = 1000;
const postClickDelay = 500;

function setupAutoHalt(name, callback, options) {
    function monitorDom(callback, options) {
        const disconnectOnFound = !!options?.disconnectOnFound;

        let scheduled = false;
        let delayed = false;

        function idleCallback() {
            const result = callback();
            if (disconnectOnFound && result.found) {
                console.info("Disconnecting MutationObserver");
                observer.disconnect();
            } else if (result.clicked) {
                delayed = true;
                setTimeout(timeoutCallback, postClickDelay);
            }
            scheduled = false;
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
