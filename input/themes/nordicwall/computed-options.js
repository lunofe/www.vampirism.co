module.exports = function (themeConfig) {
    // ------------------------------------
    // Font Section 
    // ------------------------------------

    const fontParams = {
        'albertsans': { hasItalic: true },
        'adventpro': { hasItalic: true },
        'aleo': { hasItalic: true },
        'andadapro': { hasItalic: true },
        'antonio': { hasItalic: false },
        'archivonarrow': { hasItalic: true },
        'asap': { hasItalic: true },
        'assistant': { hasItalic: false },
        'besley': { hasItalic: true },
        'bitter': { hasItalic: true },
        'bitcount': { hasItalic: false },
        'bodonimoda': { hasItalic: true },
        'brygada1918': { hasItalic: true },
        'cabin': { hasItalic: true },
        'cairo': { hasItalic: false },
        'cinzel': { hasItalic: false },
        'comfortaa': { hasItalic: false },
        'comme': { hasItalic: false },
        'dancingscript': { hasItalic: false },
        'danfo': { hasItalic: false },
        'dmsans': { hasItalic: true },
        'domine': { hasItalic: false },
        'dosis': { hasItalic: false },
        'doto': { hasItalic: false },
        'dynapuff': { hasItalic: false },
        'exo': { hasItalic: true },
        'familjengrotesk': { hasItalic: true },
        'faustina': { hasItalic: true },
        'figtree': { hasItalic: true },
        'finlandica': { hasItalic: true },
        'frankruhllibre': { hasItalic: false },
        'fredoka': { hasItalic: false },
        'funneldisplay': { hasItalic: false },
        'gantari': { hasItalic: true },
        'geistmono': { hasItalic: false },
        'glory': { hasItalic: true },
        'gluten': { hasItalic: false },
        'googlesanscode': { hasItalic: true },
        'grenzegotisch': { hasItalic: false },
        'handjet': { hasItalic: false },
        'heebo': { hasItalic: false },
        'hostgrotesk': { hasItalic: true },
        'imbue': { hasItalic: false },
        'inclusivesans': { hasItalic: true },
        'instrumentsans': { hasItalic: true },
        'jetbrainsmono': { hasItalic: true },
        'jura': { hasItalic: false },
        'kalnia': { hasItalic: false },
        'karla': { hasItalic: true },
        'kreon': { hasItalic: false },
        'kumbhsans': { hasItalic: false },
        'labrada': { hasItalic: true },
        'leaguespartan': { hasItalic: false },
        'lemonada': { hasItalic: false },
        'lexend': { hasItalic: false },
        'lexenddeca': { hasItalic: false },
        'librefranklin': { hasItalic: true },
        'lora': { hasItalic: true },
        'manuale': { hasItalic: true },
        'manrope': { hasItalic: false },
        'mavenpro': { hasItalic: false },
        'merriweathersans': { hasItalic: true },
        'montserrat': { hasItalic: true },
        'mulish': { hasItalic: true },
        'nunito': { hasItalic: true },
        'orbitron': { hasItalic: false },
        'oswald': { hasItalic: false },
        'outfit': { hasItalic: false },
        'oxanium': { hasItalic: false },
        'parkinsans': { hasItalic: false },
        'petrona': { hasItalic: true },
        'playfairdisplay': { hasItalic: true },
        'playwriteusmodern': { hasItalic: false },
        'playwriteustrad': { hasItalic: false },
        'plusjakartasans': { hasItalic: true },
        'pontanosans': { hasItalic: false },
        'publicsans': { hasItalic: true },
        'quicksand': { hasItalic: false },
        'radiocanadabig': { hasItalic: true },
        'raleway': { hasItalic: true },
        'redhatdisplay': { hasItalic: true },
        'redhatmono': { hasItalic: true },
        'redhattext': { hasItalic: true },
        'redrose': { hasItalic: false },
        'rem': { hasItalic: true },
        'robotoflex': { hasItalic: false },
        'robotoslab': { hasItalic: false },
        'rokkitt': { hasItalic: true },
        'rubik': { hasItalic: true },
        'ruda': { hasItalic: false },
        'smoochsans': { hasItalic: false },
        'sourcecodepro': { hasItalic: true },
        'sora': { hasItalic: false },
        'spartan': { hasItalic: false },
        'sticknobills': { hasItalic: false },
        'susemono': { hasItalic: true },
        'system-ui': { hasItalic: false },
        'teachers': { hasItalic: true },
        'tektur': { hasItalic: false },
        'tourney': { hasItalic: true },
        'urbanist': { hasItalic: true },
        'varta': { hasItalic: false },
        'victormono': { hasItalic: true },
        'wixmadefortext': { hasItalic: true },
        'workbench': { hasItalic: false },
        'worksans': { hasItalic: true },
        'yanonekaffeesatz': { hasItalic: false },
        'zalandosans': { hasItalic: true },
        'zalandosansexpanded': { hasItalic: true },
        'yrsa': { hasItalic: true }
    };

    let fontBody = themeConfig.customConfig.find(option => option.name === 'fontBody').value;
    let fontHeadings = themeConfig.customConfig.find(option => option.name === 'fontHeadings').value;

    let disableFontBodyItalic = themeConfig.customConfig.find(option => option.name === 'disableFontBodyItalic').value;
    let disableFontHeadingsItalic = themeConfig.customConfig.find(option => option.name === 'disableFontHeadingsItalic').value;

    const fontBodyItalic = !disableFontBodyItalic && (fontParams[fontBody]?.hasItalic || false);
    const fontHeadingsItalic = !disableFontHeadingsItalic && (fontParams[fontHeadings]?.hasItalic || false);

    // ------------------------------------
    // Section Display Logic for two options
    // ------------------------------------

    const heroType = themeConfig.customConfig.find(option => option.name === 'heroType')?.value;
    const sectionInsights = themeConfig.customConfig.find(option => option.name === 'sectionInsights')?.value;
    
    const shouldDisplaySection = sectionInsights || heroType === 'slider';

    // ------------------------------------
    // Returning All Computed Options
    // ------------------------------------

    return [
        {
            name: 'fontBodyItalic',
            type: 'checkbox',
            value: fontBodyItalic
        },
        {
            name: 'fontHeadingsItalic',
            type: 'checkbox',
            value: fontHeadingsItalic
        },
        {
            name: 'showHeroSliderAndInsightsSection',
            value: shouldDisplaySection,
            type: 'boolean'
        }
    ];
};