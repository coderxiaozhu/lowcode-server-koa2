const redisClient = require("../db/redis")

/**
 * redis set
 * timeout 过期时间，单位 s ，默认 1h
 */
function cacheSet(key, val, timeout = 60 * 60) {
    let formatVal;
    if (typeof val === 'object') {
        formatVal = JSON.stringify(val)
    } else {
        formatVal = val
    }
    redisClient.set(key, formatVal)
    redisClient.expire(key, timeout)
}

/**
 * redis get
 * key key
 */
function cacheGet(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                console.log(JSON.parse(val))
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}   

module.exports = {
    cacheSet,
    cacheGet
}
