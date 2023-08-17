import { config } from "./config";

export const dbConnection = {
    datasources: {
        db: {
            url: `${config.databaseURL}_test`,
        },
    },
};
