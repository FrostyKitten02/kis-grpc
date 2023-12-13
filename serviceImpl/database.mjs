import {JSONPreset} from "lowdb/node";

const defaultData = { products: [], stores: [] }
const db = await JSONPreset('db.json', defaultData)

export default db;