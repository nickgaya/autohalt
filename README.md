# AutoHalt

A web extension to turn off autoplaying of suggested videos.

Some websites with media content have an "autoplay next" feature to
automatically begin playing related content after the end of the content the
user has selected. Some users may consider this an anti-feature designed to
prolong engagement without the user's consent. AutoHalt seeks to turn off
such functionality by default, putting control back in the user's hands.

AutoHalt works by scanning the website's user interface for an element such as
a checkbox or button that can be clicked to disable autoplay. The extension
does not modify the page's structure or content.

## Supported websites

AutoHalt only works on the websites listed below. This list may be extended in
future versions.

* **YouTube**: Turns the "Autoplay" switch to off. The user can manually
  re-enable autoplay by clicking the switch again. If viewing a playlist or
  queue, videos will play automatically until the end of the list.

* **Gfycat**: Turns the "Autoplay Related GIFs" switch to off. The user can
  manually re-enable autoplay by clicking the switch again. (Also works on
  redgifs.com, Gfycat's site for adult content.)

* **Twitch**: When viewing VODs, prevents the next video from autoplaying.
