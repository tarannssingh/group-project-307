
const passwordGenCheck = () => {
    var randLength = 1;
    var randPW = ""
    while(passwordStrength(randPW) !== "Very Strong") {
        randLength = Math.floor(Math.random() * 14) + 14;
        randPW = passwordGenerator(randLength);
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

export default {passwordGenCheck, passwordGenerator, passwordStrength};