const ENV = process.env.NODE_ENV || ""
module.exports = {
    ENV,
    isProd: ENV === 'production',
    isPrdDev: ENV === 'prd_env',
    isDev: ENV === 'dnv',
    isTest: ENV.indexOf('test') === 0,
    isTestLocal: ENV === 'test_local',
    isTestRemote: ENV === 'test_remove'
}