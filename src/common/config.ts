export const config = {
    appSecret: process.env.APP_SECRET,
    nodeEnvironment: process.env.NODE_ENV,
    databaseURL: process.env.DATABASE_URL,
    bcryptHashRound: 10,

    joiOptions: {
        errors: {
            wrap: {
                label: ''
            }
        },
        abortEarly: true
    },
}
