var bcrypt = require('bcryptjs')

async function encryptPassword ( password ){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

async function comparePassword ( password, accountPassword ){
    return await bcrypt.compare(password, accountPassword)
}

const password = {
    encrypt: encryptPassword,
    compare: comparePassword
}

module.exports = password 

