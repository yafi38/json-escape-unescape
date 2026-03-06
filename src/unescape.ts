export function unescape(text: string): string {
    try {
        const cleanText = text.replace(/^"|"$/g, '');

        return JSON.parse(`"${cleanText}"`);
    } catch (e) {
        return forgivingUnescape(text);
    }
}

function forgivingUnescape(text: string): string {
    const escapeMap: { [key: string]: string } = {
        '"': '"',
        '\\': '\\',
        '/': '/',
        'b': '\b',
        'f': '\f',
        'n': '\n',
        'r': '\r',
        't': '\t'
    };

    const regex = /\\(?:u([0-9a-fA-F]{4})|(["\\/bfnrt]))/g;

    return text.replace(regex, (match, hexCode, standardChar) => {
        if (hexCode) {
            return String.fromCharCode(parseInt(hexCode, 16));
        } else if (standardChar) {
            return escapeMap[standardChar];
        }
        return match;
    });
}
