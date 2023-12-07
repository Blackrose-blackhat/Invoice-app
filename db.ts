  import "./src/components/init"
import PouchDB from 'pouchdb';
import PouchDBIdbAdapter from 'pouchdb-adapter-idb';

PouchDB.plugin(PouchDBIdbAdapter); // Use the IDB adapter

const db = new PouchDB('mydatabase');

export default db;