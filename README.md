# AutoHalt

A web extension to turn off autoplaying of suggested content on YouTube,
Facebook, Twitch, and Gfycat.

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

* **Twitch**: When viewing VODs, prevents the next video from autoplaying by
  clicking the "More Suggestions" button.

* **Gfycat**: Turns the "Autoplay Related GIFs" switch to off. The user can
  manually re-enable autoplay by clicking the switch again.

Functionality for each site can be enabled or disabled individually in the
extension preferences.

## Installation

* [Firefox AMO](https://addons.mozilla.org/addon/autohalt/)
* [Chrome Web Store](https://chrome.google.com/webstore/detail/autohalt/poeongpiodnpekilfkddijomoiinbcco)
