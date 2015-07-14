define([], function() {
    var db;

    function executeSQL(sqlString, data, successCallback, eb) {
        if(data) {
            var dataArr = [];
            for(i in data) {
                dataArr.push(data[i]);
            }
            if(dataArr.length == 0)
            return;
         db.transaction(function(tx) {
             tx.executeSql(sqlString, dataArr, function(tx1, res) {
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
    
    function insertInto(table, data, sb, eb) {
        if(data) {
            var dataArr = [];
            var sqlStr = "INSERT INTO " + table + " VALUES(";
            for(i in data) {
                sqlStr += "?,";
                dataArr.push(data[i]);
            }
            sqlStr = sqlStr.substr(0, sqlStr.length - 1);
            sqlStr += ")";
            
            db.transaction(function(tx) {
             tx.executeSql(sqlString, dataArr, function(tx1, res) {
                 sb(res);
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
               tx.executeSql('CREATE TABLE IF NOT EXISTS defect (id text primary key, building_id text primary key, category_id text, sub_category text, zone_id text, floor_id text, expectedDate text, arr_image text, createdDate text, createTime text)'); 
            });
        }
        
        installModels();
        
        if(sb)
            sb();
    }
    return {
        start: start,
        executeSQL: executeSQL,
        insertInto: insertInto
    };
});