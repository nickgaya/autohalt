# AutoHalt

A web extension to turn off autoplaying of suggested content on YouTube,
Facebook, Hulu, and other sites.

## Overview

Take back control of your media viewing experience! Prevent sites from
automatically playing suggested content after the content that you have
selected.

AutoHalt works by scanning the website's user interface for an element such as
a checkbox or button that can be clicked to disable autoplay. The extension
only simulates user interactions and does not directly modify the page's
content.

## Supported websites

AutoHalt currently supports the following websites.

* **YouTube**: Turns the "Autoplay" switch to off. The user can manually
  re-enable autoplay by clicking the switch again. If viewing a playlist or
  queue, videos will play automatically until the end of the list.

* **Facebook**: Clicks the "Cancel" button on the "Up Next" prompt at the end
  of a video.

* **Hulu**: Turns the "Autoplay" switch to off in the video player settings.
  The user can manually re-enable autoplay by clicking the switch again.

* **Twitch**: When viewing VODs, prevents the next video from autoplaying by
  clicking the "More Suggestions" button.

* **Gfycat**: Turns the "Autoplay Related GIFs" switch to off. The user can
  manually re-enable autoplay by clicking the switch again.

Functionality for each site can be enabled or disabled individually in the
extension preferences.

## Installation

* [Firefox AMO](https://addons.mozilla.org/addon/autohalt/)
* [Chrome Web Store](https://chrome.google.com/webstore/detail/autohalt/poeongpiodnpekilfkddijomoiinbcco)

Unsigned (.zip) and signed (.xpi, .crx) files for each version can also be directly downloaded from the GitHub [release page](https://github.com/nickgaya/autohalt/releases).
