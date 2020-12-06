// Postgres connection, query execution, query formatting
const pgp = require('pg-promise')();
// pg-native for native libpq C library bindings which we need for sync queries
const SyncClient = require('pg-native');

// PostgreSQL -> Javascript type parsing
pgp.pg.types.setTypeParser(1700, parseFloat) //Parsing the NUMERIC SQL type as a JS float 
pgp.pg.types.setTypeParser(1184, require('../parse.js').timestamptzParse) //Parsing the TIMESTAMPTZ SQL type as a JS Date

var tdgdbname = 'v4';
var tdgdbuser = 'postgres';

postgresConnections = [];


const postgresClient = {
    connections: async (type) => {
        return postgresConnections.filter(conn => conn.type == type).map(conn => conn.db)[0];
    },
    disconnect: (type) => {
        switch(type) {
            case 'setup':

                let index = postgresConnections.map(conn => conn.type).indexOf(type);
                postgresConnections.splice(index, 1)
                console.log('Setup database queries complete, disconnected from database');
                return
            case 'main':
            case 'construct':
        };
    },
    connect: type => {
        console.log(`New PostgreSQL Connection: ${type}`)
        switch(type) {
            case 'setup':
                let syncdb = new SyncClient;
                syncdb.connectSync(`host=localhost port=5432 dbname=${tdgdbname} connect_timeout=5 user=${tdgdbuser}`);
                postgresConnections.push({
                    db: syncdb,
                    type: type,
                    created: Date.now()
                });
            case 'main':
                // Default runtime database connection
                const defaultConnection = { //connection info
                    host: 'localhost',
                    port: 5432,
                    database: tdgdbname,
                    user: tdgdbuser,
                    password: null,
                    max: 30 // use up to 30 connections
                };
                let db = pgp(defaultConnection);
                postgresConnections.push({
                    db: db,
                    type: type,
                    created: Date.now()
                });
            case 'construct':
                // Schema construction CLI database connection
                const constructionConnection = { 
                    host: 'localhost',
                    port: 5432,
                    database: tdgdbname,
                    user: tdgdbuser,
                    password: null,
                    max: 1 // use only one connection
                };
                return pgp(constructionConnection);
        };
    },
    format: pgp.as.format
};

module.exports = postgresClient;