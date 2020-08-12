var contentScriptUrls = []
for (item of browser.runtime.getManifest()['content_scripts']) {
    contentScriptUrls = contentScriptUrls.concat(item['matches'])
}

browser.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        if (changeInfo.url) {
            browser.tabs.sendMessage(tabId, {
                message: 'urlChanged',
            });
        }
    }, {
        urls: contentScriptUrls,
    }
);
