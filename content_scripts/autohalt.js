const useSettings = true;

function setupAutoHalt(name, callback, options) {
    function monitorDom(callback, options) {
        const disconnectOnSuccess = !!options?.disconnectOnSuccess;

        let scheduled = false;

        function idleCallback() {
            let result = callback();
            if (result && disconnectOnSuccess) {
                observer.disconnect();
            }
            scheduled = false;
        }

        function scheduleIdleCallback() {
            if (!scheduled) {
                window.requestIdleCallback(idleCallback, {timeout: 1000});
                scheduled = true;
            }
        }

        const observer = new MutationObserver(scheduleIdleCallback);
        const observerConfig = {
            subtree: true,
            childList: true,
        };
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
};
