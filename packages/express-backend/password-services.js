import crypto from "crypto"
import dotenv from "dotenv"
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
//     const encrypted = await encrypt("hi, my name is Taran")
//     console.log(encrypted);
//     const decrypted = await decrypt(encrypted)
//     console.log(decrypted);
// })()
  


function passwordStrength(pw) {
    const criteria = {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        speChar: false,
    };

    if(pw.length >= 10) {
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
    if(/[$@!%*?&]/.test(pw)) {
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

export default {decrypt, encrypt, passwordStrength};