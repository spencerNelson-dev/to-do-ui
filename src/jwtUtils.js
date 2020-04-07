import jwt from 'jsonwebtoken'

export function verifyToken(token, key) {

    return new Promise((resolve, reject) => {

        jwt.verify(token, key, (error, payload) => {

            if (error !== null) {
                reject(error)
            } else {
                resolve(payload)
            }
        })

    })
    .catch(error => {
        console.log(error)
    })
}