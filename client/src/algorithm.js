function idToShortURL(n) {
    const map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let shorturl = "";

    while (n) {
        shorturl += map[n % 62];
        n = Math.floor(n / 62);
    }

    while(shorturl.length<7){
        shorturl+=map[Math.floor(Math.random()*map.length-1)];
    }
    return shorturl.split('').reverse().join('');
}

function shortURLtoID(shortURL) {
    let id = 0;

    for (let i = 0; i < shortURL.length; i++) {
        if ('a' <= shortURL[i] && shortURL[i] <= 'z') {
            id = id * 62 + shortURL.charCodeAt(i) - 'a'.charCodeAt(0);
        } else if ('A' <= shortURL[i] && shortURL[i] <= 'Z') {
            id = id * 62 + shortURL.charCodeAt(i) - 'A'.charCodeAt(0) + 26;
        } else if ('0' <= shortURL[i] && shortURL[i] <= '9') {
            id = id * 62 + shortURL.charCodeAt(i) - '0'.charCodeAt(0) + 52;
        }
    }

    return id;
}

console.log(idToShortURL(14128888))
