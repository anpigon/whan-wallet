import { SQLite } from 'expo';

const name = 'WHAN_WALLET';
const version = 1;
const description;
const size;

const db = SQLite.openDatabase(name, version, description, size);

