const speakeasy = require("speakeasy");
const totp_gen_code = "JRJF24KUNFFXWL3VJ5EDCKKIMJJCMYLJ"
const token = speakeasy.totp({
  secret: totp_gen_code,
  encoding: 'base32'
})

var verified = speakeasy.totp.verify({ secret: totp_gen_code,
    encoding: 'base32',
    token: token });
    
console.log(verified);
