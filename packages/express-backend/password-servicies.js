import bcrypt from "bcrypt"

const saltRounds = 10;
const password = 'very_great_password'
const bad_password = 'very_bad_password'
const ex1 = "$2b$10$6W8FOgmppDxBsmAXYfGdJeVa7lbnEj/l2DDY4tOfXuyzkQNwryj7O"
const ex2 = "$2b$10$N8V8b./3rYHSMJpOL9MdmeoqulwB2JeztdYiU8pF59oB7O0ir7BOO"
const ex3 = "$2b$10$lqGB8oNU.2SV/j8CJGKqKOKUvFIfkB.BQlz8WxvIP.fRgtW87mJzS"

// bcrypt.genSalt(saltRounds, (error, salt) => {
//     bcrypt.hash(password, salt, (error, hash) => {
//         console.log(hash)
//     })
// })  

bcrypt.compare(password, ex1).then((result) => console.log(result));
bcrypt.compare(password, ex3).then((result) => console.log(result));


const hashPassword = async (password) => {
    return 
}

