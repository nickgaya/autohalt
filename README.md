# AutoHalt

A Firefox web extension to turn off autoplaying of suggested videos.

Some websites with media content have an "autoplay next" feature to
automatically begin playing related or suggested content after the end of user-
selected content. Some users may consider this an anti-feature designed to
prolong engagement without the user's consent. This extension seeks to turn off
such functionality by default, putting control back in the user's hands.

This extension adopts a strategy of disabling autoplay features through
simulated interactions with the website's user interface, without modifying the
structure of the DOM. For example, if a website provides a toggle switch to
turn autoplay on and off, the extension will automatically "click" on the
switch to turn it off by default. Where possible, the extension allows the user
to manually re-enable autoplay if desired.

## Supported websites

This list may be extended in future versions.

* **YouTube**: Turns the "Autoplay" switch to off. The user can manually
  re-enable autoplay by clicking the switch again. If viewing a playlist or
  queue, videos will play automatically until the end of the list.

* **Gfycat**: Turns the "Autoplay Related GIFs" switch to off. The user can
  manually re-enable autoplay by clicking the switch again.

* **Twitch**: When viewing VODs, prevents the next video from autoplaying.
