export const config = {
    appSecret: process.env.APP_SECRET,
    nodeEnvironment: process.env.NODE_ENV,
    databaseURL: process.env.DATABASE_URL,

    joiOptions: {
        errors: {
            wrap: {
                label: ''
            }
        },
        abortEarly: true
    },
}
