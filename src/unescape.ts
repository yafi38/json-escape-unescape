export function unescape(text: string): string {
    try {
        const cleanText = stripWrappingQuotes(text);

        return JSON.parse(`"${cleanText}"`);
    } catch (e) {
        return forgivingUnescape(text);
    }
}

function stripWrappingQuotes(text: string): string {
    if (text.length >= 2 && text.startsWith('"') && text.endsWith('"')) {
        return text.slice(1, -1);
    }

    return text;
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
