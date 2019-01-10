const DatabaseManager = {
    init: function (pluginName: string, database: any) {
        this.db = database.useAltDb(`shel-${pluginName}`);
        return this;
    },
    collection: function(collectionName: string) {
        this.col = collectionName;
        return this;
    },
    save: async function (dataId: string, dataToSave: any) {
        return this.db
            .collection(this.col)
            .updateOne({_id: dataId}, { $set: dataToSave }, { upsert: true });
    },
    fetchById: async function(dataId: string) {
        return this.db
            .collection(this.col)
            .findOne({ _id: dataId });
    },
    fetchByMongoFilter: async function(filter: any) {
        return this.db
            .collection(this.col)
            .findOne(filter);
    },
};

export default DatabaseManager;