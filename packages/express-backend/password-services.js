import crypto from "crypto"
import dotenv from "dotenv"
import generatePassword from "omgopass";
dotenv.config()

async function decrypt (encryptedText) {
    const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(process.env.ENCRYPTION_KEY),
        "AES-GCM",
        false,
        ["decrypt"]
    )
    const encryptedArray = Uint8Array.from(atob(encryptedText), (char) => char.charCodeAt(0))
    const iv = encryptedArray.slice(0, 12)
    const data = encryptedArray.slice(12);
    const decryptedBuffer = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        data
    );

    return new TextDecoder().decode(decryptedBuffer)
}

async function encrypt (plainText) {
    // generate key in appropraite formate
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(process.env.ENCRYPTION_KEY),
        "AES-GCM",
        false,
        ["encrypt"]
    );
    // create initialization vector
    const iv = crypto.randomBytes(12)
    // make plain text to binary
    const encodedText = new TextEncoder().encode(plainText);
    // encrypt the binary data
    const encryptedBuffer = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encodedText
    )

    // combine iv with encrypted data
    const encryptedArray = new Uint8Array(iv.length + encryptedBuffer.byteLength)
    encryptedArray.set(iv, 0)
    encryptedArray.set(new Uint8Array(encryptedBuffer), iv.length)

    return btoa(String.fromCharCode(...encryptedArray))


}

// test
// (async () => {
//     const encrypted = await encrypt("hi, my name is Taran");
//     console.log(encrypted);
//     const decrypted = await decrypt(encrypted)
//     console.log(decrypted);
// })()


const substitutionTable = {
    a: ["@", "4", "a"],
    b: ["8", "B", "b"],
    c: ["(", "c", "C"],
    d: ["D", "d"],
    e: ["3", "E", "e"],
    f: ["F", "f"],
    g: ["9", "G", "g"],
    h: ["#", "h", "H"],
    i: ["!", "1", "i"],
    j: ["j", "J"],
    k: ["K", "k"],
    l: ["1", "l"],
    m: ["M", "m"],
    n: ["N", "n"],
    o: ["0", "o"],
    p: ["P", "p"],
    q: ["Q", "q"],
    r: ["R", "r"],
    s: ["$", "5", "s"],
    t: ["7", "t", "T"],
    u: ["U", "u"],
    v: ["V", "v"],
    w: ["W", "w"],
    x: ["X", "x"],
    y: ["Y", "y"],
    z: ["2", "z"]
}

const substituteWord = (word) => {
    let stronger = ""
    word.toLowerCase().split("").forEach((letter) => {
        const subs = substitutionTable[letter]
        stronger += subs[Math.floor(Math.random() * subs.length)]
    })
    console.log(stronger)
}

// (() => {
//     substituteWord("myBestPassword")
// })()

  
const passwordGenCheck = () => {
    var randLength = 1;
    var randPW = ""
    while(passwordStrength(randPW) !== "Very Strong") {
        randLength = Math.floor(Math.random() * 14) + 14;
        randPW = passwordGenerator(randLength);
    }
    
    const splice = generatePassword({
        syllablesCount: 5,
        minSyllableLength: 1,
        maxSyllableLength: 3,
        hasNumbers: true,
        titlecased: true,
        separators: "-_",
        vowels: "аеиоуэюя",
        consonants: "бвгджзклмнпрстчш"
      });
    
    for(let i = 0; i < splice.length; i++) {
        const ins = Math.floor(Math.random() * randPW.length);
        randPW = randPW.substring(0, ins) + splice[i] + randPW.substring(ins, randPW.length);
    }
    return randPW
}

const passwordGenerator = (pwLength) => {
    var ret = "";
    const numChar = "0123456789";
    const uppChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowChar = "abcdefghijklmnopqrstuvwxyz";
    const speChar = "!@#$%^&*";
    const allChar = numChar + uppChar + lowChar + speChar;
    for(var i = 0, n = allChar.length; i < pwLength; ++i) {
        ret += allChar.charAt(Math.floor(Math.random() * n));
    }
    return ret
}

const passwordStrength = (pw) => {
    const criteria = {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        speChar: false,
    };

    if(pw.length >= 14) {
        criteria.length = true;
    }
    if(/[A-Z]/.test(pw)) {
        criteria.uppercase = true;
    }
    if(/[a-z]/.test(pw)) {
        criteria.lowercase = true;
    }
    if(/\d/.test(pw)) {
        criteria.number = true;
    }
    if(/[!@#$%^&*]/.test(pw)) {
        criteria.speChar = true;
    }
    const met = Object.values(criteria).filter(Boolean).length;
    switch(met) {
        case 1:
            return "Weak";
        case 2:
            return "Middling";
        case 3:
            return "Moderate"
        case 4:
            return "Strong"
        case 5:
            return "Very Strong"
        default:
            return "Invalid"
    }
}

// test
// (async () => {
//     const weak = await passwordStrength("ooo");
//     console.log(weak);
//     const password = await passwordStrength("89y82dh2d0#@$1Es");
//     console.log(password);
//     const generator = await passwordGenerator(10);
//     console.log(generator);
//     const autoGenerator = await passwordGenCheck();
//     console.log(autoGenerator);
//     const autoCheck = await passwordStrength(autoGenerator);
//     console.log(autoCheck);
// })()

export default {decrypt, encrypt, substituteWord, passwordGenCheck, passwordGenerator, passwordStrength};