import { MongoClient, Db } from 'mongodb';
import { DATABASE_URI, DATABASE_NAME } from '../../constants';

const DB = (function (){
    const databaseName:string = DATABASE_NAME;
    const url: string = DATABASE_URI;
    let database:any = null;
    let client:any = null;

    return {
        load: () => {
            if (database) {
                return {
                    useAltDb: (databaseName: string) => {
                        return client.db(databaseName);
                    },
                    ...database,
                };
            }

            return {
                connect: async () => {
                    if (client) {
                        throw 'Connection has already been established';
                    }

                    try {
                        client = await MongoClient.connect(url, { useNewUrlParser: true });
                        if (process.env.NODE_ENV !== 'testing') {
                            console.log('[INFO] Connected to MongoDB Instance at %s', url);
                        }
                        database = client.db(databaseName);

                        return DB.load();
                    } catch (err) {
                        throw err.stack;
                    }
                },
                close: async () => {
                    client.close();
                    client = null;
                }
            };
        }
    }


})();

export default DB;
