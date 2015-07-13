define([], function() {
    var db;

    function executeSQL(sqlString, data, successCallback, eb) {
        if(data) {
         db.transaction(function(tx) {
             tx.executeSql(sqlString, data, function(tx1, res) {
                 successCallback(res);
                 }, eb);
             }, eb);
        } else {
            db.transaction(function(tx) {
             tx.executeSql(sqlString, function(tx1, res) {
                 successCallback(res);
                 }, eb);
             }, eb);
        }
    }

    function start(sb, eb) {
        // Protect ourselves inside old browsers
        try {
            db = window.sqlitePlugin.openDatabase({name: "publicUser.db", location: 2});
        } catch (e) {
            eb(e);
        }
        if (!db) {
            alert('fail');
            return;
        }

        function installModels() {
            db.transaction(function(tx) {
               //tx.executeSql('DROP TABLE IF EXISTS Building');
               tx.executeSql('CREATE TABLE IF NOT EXISTS Building (id text primary key, company_id text primary key, name text, address text)'); 
               tx.executeSql('CREATE TABLE IF NOT EXISTS Category (id text primary key, building_id text primary key, name text, description text)'); 
               tx.executeSql('CREATE TABLE IF NOT EXISTS SubCategory (id text primary key, Category_id text primary key, name text, description text)'); 
               tx.executeSql('CREATE TABLE IF NOT EXISTS Zone (id text primary key, building_id text primary key, name text, description text)'); 
               tx.executeSql('CREATE TABLE IF NOT EXISTS Floor (id text primary key, building_id text primary key, name text, description text)'); 
            });
        }
        
        installModels();
        
        if(sb)
            sb();
    }
    return {
        start: start,
        executeSQL: executeSQL
    };
});