# AutoHalt

[![Firefox: Get the add-on](images/ff_badge.png)](https://addons.mozilla.org/addon/autohalt/)
[![Available in the Chrome Web Store](images/cws_badge.png)](https://chrome.google.com/webstore/detail/autohalt/poeongpiodnpekilfkddijomoiinbcco)

A web extension to turn off autoplaying of suggested content on YouTube,
Facebook, Hulu, and other sites.

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

  The extension also turns off the Autoplay switch on YouTube Music when
  available. However in some cases, such as playing an individual song, the
  site does not give the user an option to disable autoplay functionality.

* **Facebook**: Clicks the "Cancel" button on the "Up Next" prompt at the end
  of a video.

* **Hulu**: Turns the "Autoplay" switch to off in the video player settings.
  The user can manually re-enable autoplay by clicking the switch again.

* **Twitch**: When viewing VODs, prevents the next video from autoplaying by
  clicking the "More Suggestions" button.

* **Vimeo**: Turns the "Autoplay next video" toggle to off. The user can
  manually re-enable autoplay by clicking the toggle again.

* **Gfycat**: Turns the "Autoplay Related GIFs" switch to off. The user can
  manually re-enable autoplay by clicking the switch again.

Functionality for each site can be enabled or disabled individually in the
extension preferences.

## Maintenance

AutoHalt uses "hand-crafted" selectors to interact with the sites listed above.
Over time, this functionality may cease to work as websites change and update
their interface design. If you notice that AutoHalt is not working on a
supported website, please file a GitHub bug report with the URL where the issue
was observed and any other relevant details.
