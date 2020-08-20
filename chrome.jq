del(.browser_specific_settings)
| (.icons |= {
    "16": "icons/autohalt-16.png",
    "48": "icons/autohalt-48.png",
    "128": "icons/autohalt-128.png"
})
| (.content_scripts[].js |= ["browser-polyfill.js"] + .)
