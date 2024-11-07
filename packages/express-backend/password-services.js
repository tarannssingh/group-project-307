
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

export default {signupValidators, signup, passwordStrength};