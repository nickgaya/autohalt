function getSettingsMenu() {
    const menuElt = document.body.querySelector('.ytp-settings-menu');
    if (!menuElt) {
        return null;  // No menu element
    }
    // Check if the menu has at least one item
    if (menuElt.querySelector('.ytp-menuitem')) {
        return menuElt;  // Menu already initialized
    }
    const menuButton = document.body.querySelector('.ytp-settings-button');
    if (!menuButton) {
        return null;  // Couldn't find button for menu - unexpected
    }
    // Click the settings button to initialize the settings menu, then click
    // again to hide it.
    menuButton.click();
    menuButton.click();
    return menuElt;
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
    const settingsMenu = getSettingsMenu();
    if (settingsMenu) {
        // There's no obvious way to distinguish the autoplay switch from the
        // other menu items, so we iterate over each one and check the label
        // text against a set of words for "autoplay" in each language
        // supported by YouTube.
        for (elt of settingsMenu.querySelectorAll(
                 '.ytp-menuitem[role="menuitemcheckbox"]')) {
            const label = elt.querySelector('.ytp-menuitem-label').textContent;
            if (autoplayTranslations.has(label.toLowerCase())) {
                return [elt, elt.getAttribute('aria-checked') === 'true'];
            }
        }
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

const autoplayTranslations = new Set([
    "outospeel",  // Afrikaans
    "avto-oxutma",  // Azərbaycan
    "putar otomatis",  // Bahasa Indonesia
    "automain",  // Bahasa Malaysia
    "automatska reprodukcija",  // Bosanski
    "reproducció automàtica",  // Català
    "automatické přehrávání",  // Čeština
    "autoplay",  // Dansk
    "autoplay",  // Deutsch
    "automaatesitus",  // Eesti
    "autoplay",  // English (India)
    "autoplay",  // English (UK)
    "autoplay",  // English (US)
    "reproducción automática",  // Español (España)
    "reproducción automática",  // Español (Latinoamérica)
    "reproducción automática",  // Español (US)
    "erreproduzitu automatikoki",  // Euskara
    "i-autoplay",  // Filipino
    "lecture automatique",  // Français
    "lecture automatique",  // Français (Canada)
    "reprodución automática",  // Galego
    "automatska reprodukcija",  // Hrvatski
    "ukuzidlalela ngokwayo",  // IsiZulu
    "sjálfvirk spilun",  // Italiano
    "sjálfvirk spilun",  // Íslenska
    "cheza kiotomatiki",  // Kiswahili
    "automātiskā atskaņošana",  // Latviešu valoda
    "automatinis paleidimas",  // Lietuvių
    "automatikus lejátszás",  // Magyar
    "autoplay",  // Nederlands
    "automatisk avspilling",  // Norsk
    "avtoijro",  // Polski
    "reprodução automática",  // Polski
    "reprodução automática",  // Português
    "reprodução automática",  // Português (Brasil)
    "redare automată",  // Română
    "luajtje automatike",  // Slovenčina
    "samodejno predvajanje",  // Slovenčina
    "samodejno predvajanje",  // Slovenščina
    "autoplej",  // Srpski
    "automaattinen toisto",  // Suomi
    "automatisk uppspelning",  // Svenska
    "tự động phát",  // Tiếng Việt
    "otomatik oynat",  // Türkçe
    "аўтапрайграванне",  // Română
    "luajtje automatike",  // Български
    "авто ойнотуу",  // Slovenčina
    "samodejno predvajanje",  // Қазақ Тілі
    "автоматска репродукција",  // Srpski
    "automaattinen toisto",  // Монгол
    "автовоспроизведение",  // Svenska
    "tự động phát",  // Српски
    "автоматичне відтворення",  // Türkçe
    "αυτόματη αναπαραγωγή",  // Ελληνικά
    "ինքնացուցադրում",  // Հայերեն
    "הפעלה אוטומטית",  // עברית
    "آٹو پلے",  // اردو
    "تشغيل تلقائي",  // العربية
    "پخش خودکار",  // فارسی
    "अटोप्ले",  // नेपाली
    "ऑटोप्ले",  // मराठी
    "अपने-आप चलने की सुविधा",  // हिन्दी
    "স্বয়ংপ্লে’",  // অসমীয়া
    "স্বতঃপ্লে",  // বাংলা
    "ਸਵੈ-ਚਲਤ",  // ਪੰਜਾਬੀ
    "ઑટોપ્લે",  // ગુજરાતી
    "ଅଟୋପ୍ଲେ",  // ଓଡ଼ିଆ
    "தானியங்கி",  // தமிழ்
    "ఆటో ప్లే",  // తెలుగు
    "ಆಟೋಪ್ಲೇ",  // ಕನ್ನಡ
    "യാന്ത്രികപ്ലേ",  // മലയാളം
    "ස්වයං ධාවනය",  // සිංහල
    "เล่นอัตโนมัติ",  // ภาษาไทย
    "ຫຼິ້ນ​ອັດຕະ​ໂນ​ມັດ",  // ລາວ
    "အော်တိုဖွင့်ခြင်း",  // ဗမာ
    "ავტომატური დაკვრა",  // ქართული
    "ራስ-አጫውት",  // አማርኛ
    "លេង​ស្វ័យប្រវត្តិ",  // ខ្មែរ
    "自动播放",  // 中文 (简体)
    "自動播放",  // 中文 (繁體)
    "自動播放",  // 中文 (香港)
    "自動再生",  // 日本語
    "자동재생",  // 한국어
]);
