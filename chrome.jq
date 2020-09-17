# JQ script to modify the manifest for Chrome compatibility

# Chrome doesn't support the browser_specific_settings key
del(.browser_specific_settings)

# Chrome natively supports enabling/disabling extensions on a per-site basis,
# so we don't need the settings ui or storage permission.
| del(.options_ui)
| del(.permissions[] | select(. == "storage"))

# Chrome doesn't support svg icons, so use PNGs at the recommended sizes
| (.icons |= {
    "16": "icons/autohalt-16.png",
    "48": "icons/autohalt-48.png",
    "128": "icons/autohalt-128.png"
})
