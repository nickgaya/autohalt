const keys = ['youtube', 'gfycat', 'twitch'];

function checkboxChanged(event) {
    browser.storage.local.set({
        [event.target.id]: {disabled: !event.target.checked},
    });
}

for (const key of keys) {
    document.getElementById(key).addEventListener('change', checkboxChanged);
}

function restoreSettings() {
    browser.storage.local.get(keys).then((settings) => {
        console.log(settings);
        for (const key of keys) {
            document.getElementById(key).checked = ! settings[key]?.disabled;
        }
    }, (error) => {
        console.warn("Failed to get settings:", error);
    });
}

document.addEventListener("DOMContentLoaded", restoreSettings);
