# AutoHalt

A web extension to turn off autoplaying of suggested content on YouTube,
Gfycat, and Twitch.

## Overview

Some websites with media content have an "autoplay next" feature to
automatically begin playing related content after user-selected content. Some
users may consider this an anti-feature designed to prolong engagement without
the user's consent. AutoHalt seeks to turn off such functionality by default,
putting control back in the user's hands.

AutoHalt works by scanning the website's user interface for an element such as
a checkbox or button that can be clicked to disable autoplay. The extension
only simulates user interactions and does not directly modify the page's
structure or content.

Functionality for each site can be enabled or disabled individually in the
extension preferences.

## Supported websites

AutoHalt currently supports the following websites. This list may be expanded
in future versions.

* **YouTube**: Turns the "Autoplay" switch to off. The user can manually
  re-enable autoplay by clicking the switch again. If viewing a playlist or
  queue, videos will play automatically until the end of the list.

* **Gfycat**: Turns the "Autoplay Related GIFs" switch to off. The user can
  manually re-enable autoplay by clicking the switch again. (Also works on
  RedGIFs, Gfycat's site for adult content.)

* **Twitch**: When viewing VODs, prevents the next video from autoplaying by
  clicking the "More Suggestions" button.

## Installation

* Firefox: https://addons.mozilla.org/addon/autohalt/
