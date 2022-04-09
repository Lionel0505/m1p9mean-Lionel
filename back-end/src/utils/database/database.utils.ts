import mongoose from "mongoose";


async function connectWithMongoose(databaseUri: string): Promise<boolean> {

    try {

        console.log('-------------------- DB CONNECTION - ATTEMPT --------------------');

        await mongoose.connect(databaseUri);

        console.log('-------------------- DB CONNECTION - SUCCEED --------------------');

        return true;

    } catch (error) {

        console.log(`-------------------- DB CONNECTION - FAILED --------------------\n${error}\n-------------------- DB CONNECTION - FAILED --------------------`);

        return false;

    }

}

export { connectWithMongoose };