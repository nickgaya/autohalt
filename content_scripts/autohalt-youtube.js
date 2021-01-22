function findAutoplayElementInSettingsMenu() {
    const menuElt = document.body.querySelector('.ytp-settings-menu');
    if (!menuElt) {
        return null;  // No menu element
    }
    // Check if the menu needs to be initialized
    if (!menuElt.querySelector('.ytp-menuitem')) {
        // Click the settings button to initialize the settings menu, then
        // click again to hide the menu.
        const menuButton = document.body.querySelector('.ytp-settings-button');
        if (!menuButton) {
            return null;  // Couldn't find button for menu, unexpected
        }
        menuButton.click();
        menuButton.click();
    }
    // There's no obvious way to distinguish the autoplay switch from the other
    // menu items via CSS selectors, so we iterate over each one and check the
    // label.
    for (elt of menuElt.querySelectorAll(
             '.ytp-menuitem[role="menuitemcheckbox"]')) {
        const label = elt.querySelector('.ytp-menuitem-label')?.textContent;
        if (label && autoplayTranslations.has(label.toLowerCase())) {
            return elt;
        }
    }
    return null;
}

function findAutoplayButton() {
    let elt;
    // Switch in player bottom controls
    elt = document.body.querySelector('ytp-autonav-toggle-button');
    if (elt) {
        return [elt, elt.getAttribute('aria-checked') === 'true'];
    }
    // "Up Next" card at top of suggested videos
    elt = document.body.querySelector(
        'ytd-compact-autoplay-renderer paper-toggle-button');
    if (elt) {
        return [elt, elt.getAttribute('aria-pressed') === 'true'];
    }
    // Toggle in player settings menu.
    elt = findAutoplayElementInSettingsMenu();
    if (elt) {
        return [elt, elt.getAttribute('aria-checked') === 'true'];
    }
    // YouTube Music - switch in queue controls
    elt = document.body.querySelector('paper-toggle-button#automix');
    if (elt) {
        return [elt, elt.getAttribute('aria-pressed') === 'true'];
    }
}

function disableAutoplay() {
    const result = {found: false, clicked: false};

    const [element, enabled] = findAutoplayButton() || [];
    if (!element) {
        return result;
    }
    result.found = true;

    if (enabled) {
        console.info("Clicking autoplay switch");
        element.click();
        result.clicked = true;
    }

    return result;
}

// YouTube remembers the user's autoplay selection as they navigate around, so
// we can stop listening for mutation events as soon as we find up next toggle
// (and turn it off if needed). This allows the user to manually turn it back
// on if desired.
setupAutoHalt('youtube', disableAutoplay, {disconnectOnFound: true});

// Set of translations of the term "autoplay" for YouTube-supported languages
const autoplayTranslations = new Set([
    "outospeel",  // Afrikaans
    "avto-oxutma",  // Azerbaijani
    "putar otomatis",  // Indonesian
    "automain",  // Malay
    "automatska reprodukcija",  // Bosnian
    "reproducci\u00f3 autom\u00e0tica",  // Catalan
    "automatick\u00e9 p\u0159ehr\u00e1v\u00e1n\u00ed",  // Czech
    "autoplay",  // Danish
    "autoplay",  // German
    "automaatesitus",  // Estonian
    "autoplay",  // English (India)
    "autoplay",  // English (United Kingdom)
    "autoplay",  // English
    "reproducci\u00f3n autom\u00e1tica",  // Spanish (Spain)
    "reproducci\u00f3n autom\u00e1tica",  // Spanish (Latin America)
    "reproducci\u00f3n autom\u00e1tica",  // Spanish (United States)
    "erreprodukzio automatikoa",  // Basque
    "autoplay",  // Filipino
    "lecture automatique",  // French
    "lecture automatique",  // French (Canada)
    "reproduci\u00f3n autom\u00e1tica",  // Galician
    "automatska reprodukcija",  // Croatian
    "ukuzidlalela ngokwayo",  // Zulu
    "sj\u00e1lfvirk spilun",  // Icelandic
    "riproduzione automatica",  // Italian
    "cheza kiotomatiki",  // Swahili
    "autom\u0101tisk\u0101 atska\u0146o\u0161ana",  // Latvian
    "automatinis paleidimas",  // Lithuanian
    "automatikus lej\u00e1tsz\u00e1s",  // Hungarian
    "autoplay",  // Dutch
    "automatisk avspilling",  // Norwegian
    "avtoijro",  // Uzbek
    "autoodtwarzanie",  // Polish
    "reprodu\u00e7\u00e3o autom\u00e1tica",  // Portuguese (Portugal)
    "reprodu\u00e7\u00e3o autom\u00e1tica",  // Portuguese (Brazil)
    "redare automat\u0103",  // Romanian
    "luaj automatikisht",  // Albanian
    "automatick\u00e9 prehr\u00e1vanie",  // Slovak
    "samodejno predvajanje",  // Slovenian
    "autoplej",  // Serbian (Latin)
    "automaattinen toisto",  // Finnish
    "automatisk uppspelning",  // Swedish
    "t\u1ef1 \u0111\u1ed9ng ph\u00e1t",  // Vietnamese
    "otomatik oynat",  // Turkish
    "\u0430\u045e\u0442\u0430\u043f\u0440\u0430\u0439\u0433\u0440\u0430\u0432\u0430\u043d\u043d\u0435",  // Belarusian
    "\u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u043d\u043e \u043f\u0443\u0441\u043a\u0430\u043d\u0435",  // Bulgarian
    "\u0430\u0432\u0442\u043e\u043e\u0439\u043d\u043e\u0442\u0443\u0443",  // Kyrgyz
    "\u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0442\u044b \u043e\u0439\u043d\u0430\u0442\u0443",  // Kazakh
    "\u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0441\u043a\u0430 \u0440\u0435\u043f\u0440\u043e\u0434\u0443\u043a\u0446\u0438\u0458\u0430",  // Macedonian
    "\u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0430\u0430\u0440 \u0442\u043e\u0433\u043b\u0443\u0443\u043b\u0430\u0445",  // Mongolian
    "\u0430\u0432\u0442\u043e\u0432\u043e\u0441\u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u0438\u0435",  // Russian
    "\u0430\u0443\u0442\u043e\u043f\u043b\u0435\u0458",  // Serbian
    "\u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u043d\u0435 \u0432\u0456\u0434\u0442\u0432\u043e\u0440\u0435\u043d\u043d\u044f",  // Ukrainian
    "\u03b1\u03c5\u03c4\u03cc\u03bc\u03b1\u03c4\u03b7 \u03b1\u03bd\u03b1\u03c0\u03b1\u03c1\u03b1\u03b3\u03c9\u03b3\u03ae",  // Greek
    "\u056b\u0576\u0584\u0576\u0561\u0581\u0578\u0582\u0581\u0561\u0564\u0580\u0578\u0582\u0574",  // Armenian
    "\u05d4\u05e4\u05e2\u05dc\u05d4 \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea",  // Hebrew
    "\u0622\u0679\u0648 \u067e\u0644\u06d2",  // Urdu
    "\u062a\u0634\u063a\u064a\u0644 \u062a\u0644\u0642\u0627\u0626\u064a",  // Arabic
    "\u067e\u062e\u0634 \u062e\u0648\u062f\u06a9\u0627\u0631",  // Persian
    "\u0938\u094d\u0935\u0924\u0903 \u092a\u094d\u0932\u0947",  // Nepali
    "\u0911\u091f\u094b\u092a\u094d\u0932\u0947",  // Marathi
    "\u0905\u092a\u0928\u0947-\u0906\u092a \u091a\u0932\u0928\u0947 \u0915\u0940 \u0938\u0941\u0935\u093f\u0927\u093e",  // Hindi
    "\u09b8\u09cd\u09ac\u09df\u0982\u09aa\u09cd\u09b2\u09c7\u2019",  // Assamese
    "\u09b8\u09cd\u09ac\u09a4\u0983\u09ac\u09be\u099c\u09be\u09a8\u09cb",  // Bangla
    "\u0a38\u0a35\u0a48-\u0a1a\u0a32\u0a24",  // Punjabi
    "\u0a91\u0a9f\u0acb\u0aaa\u0acd\u0ab2\u0ac7",  // Gujarati
    "\u0b05\u0b1f\u0b4b\u0b2a\u0b4d\u0b32\u0b47",  // Odia
    "\u0ba4\u0bbe\u0ba9\u0bbf\u0baf\u0b99\u0bcd\u0b95\u0bbf",  // Tamil
    "\u0c06\u0c1f\u0c4b \u0c2a\u0c4d\u0c32\u0c47",  // Telugu
    "\u0cb8\u0ccd\u0cb5\u0caf\u0c82\u0caa\u0ccd\u0cb2\u0cc6\u0cd5",  // Kannada
    "\u0d2f\u0d3e\u0d28\u0d4d\u0d24\u0d4d\u0d30\u0d3f\u0d15\u0d2a\u0d4d\u0d32\u0d47",  // Malayalam
    "\u0dc3\u0dca\u0dc0\u0dba\u0d82 \u0dc0\u0dcf\u0daf\u0db1\u0dba",  // Sinhala
    "\u0e40\u0e25\u0e48\u0e19\u0e2d\u0e31\u0e15\u0e42\u0e19\u0e21\u0e31\u0e15\u0e34",  // Thai
    "\u0eab\u0ebc\u0eb4\u0ec9\u0e99\u0ead\u0eb1\u0e94\u0e95\u0eb0\u0ec2\u0e99\u0ea1\u0eb1\u0e94",  // Lao
    "\u1021\u1031\u102c\u103a\u1010\u102d\u102f\u1016\u103d\u1004\u103a\u1037\u101b\u1014\u103a",  // Myanmar (Burmese)
    "\u10d0\u10d5\u10e2\u10dd\u10db\u10d0\u10e2\u10e3\u10e0\u10d8 \u10d3\u10d0\u10d9\u10d5\u10e0\u10d0",  // Georgian
    "\u122b\u1235-\u12a0\u132b\u12cd\u1275",  // Amharic
    "\u179b\u17c1\u1784\u200b\u179f\u17d2\u179c\u17d0\u1799\u1794\u17d2\u179a\u179c\u178f\u17d2\u178f\u17b7",  // Khmer
    "\u81ea\u52a8\u64ad\u653e",  // Chinese
    "\u81ea\u52d5\u64ad\u653e",  // Chinese (Taiwan)
    "\u81ea\u52d5\u64ad\u653e",  // Chinese (Hong Kong)
    "\u81ea\u52d5\u518d\u751f",  // Japanese
    "\uc790\ub3d9\uc7ac\uc0dd",  // Korean
]);
