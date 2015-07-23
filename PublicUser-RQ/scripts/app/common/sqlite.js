define([], function() {
    var db;

    function executeSQL(sqlString, successCallback, eb) {
            db.transaction(function(tx) {
             tx.executeSql(sqlString, function(tx1, res) {
                 if(successCallback)
                 successCallback(res);
                 }, eb);
             }, eb);
        }
    
    function insertInto(table, data, sb, eb) {
        if(data) {
            var dataArr = [];
            var strFields = "(";
            var strVl = "(";
            for(i in data) {
                strFields += i + ",";
                strVl += "?,";
                dataArr.push(data[i]);
            }
            
            strFields = strFields.substr(0, strFields.length - 1) + ")";
            strVl = strVl.substr(0, strVl.length - 1) + ")";
            
            var sqlStr = "INSERT INTO " + table + strFields + " VALUES" + strVl;
            
            alert(sqlStr);
            alert(JSON.stringify(dataArr));
            
            db.transaction(function(tx) {
             tx.executeSql(sqlStr, dataArr, function(tx1, res) {
                 sb(res);
                 }, function(e){alert(e)});
             }, function(e){alert(e)});
        }
    }
    
    function selectAll(table, sb, eb) {
        db.transaction(function(tx) {
            var sqlStr = "SELECT * FROM " + table;
            tx.executeSql(sqlStr, [], function(tx, res) {
                sb(res);
            }, function(e){alert(e)});
        }, function(e){alert(e)});
    }
    
    function selectCondition(table, condition, sb, eb) {
        db.transaction(function(tx) {
          var sqlStr = "SELECT * FROM " + table + " WHERE " + condition;
            tx.executeSql(sqlStr, [], function(tx, res) {
                sb(res);
            }, eb);
        }, eb);
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
               //tx.executeSql('DROP TABLE IF EXISTS defect');
               tx.executeSql('CREATE TABLE IF NOT EXISTS Building (id text primary key, company_id text, name text, address text)'); 
               tx.executeSql('CREATE TABLE IF NOT EXISTS Category (id text primary key, building_id text, name text, description text)'); 
               tx.executeSql('CREATE TABLE IF NOT EXISTS SubCategory (id text primary key, Category_id text, name text, description text)'); 
               tx.executeSql('CREATE TABLE IF NOT EXISTS Zone (id text primary key, building_id text, name text, description text)'); 
               tx.executeSql('CREATE TABLE IF NOT EXISTS Floor (id text primary key, building_id text, name text, description text)'); 
               tx.executeSql('CREATE TABLE IF NOT EXISTS defect (id text primary key, building_id text, building_name text, category_id text, category_name text, subcategory_id text, subcategory_name text, zone_id text, zone_name text, floor_id text, floor_name text, expectedDate text, arr_imageDefect text, arr_imageResolve text, color text, status INTEGER, createdDate text, createdTime text)'); 
            }, eb);
        }
        
        installModels();
        
        if(sb)
            sb();
    }
    return {
        start: start,
        executeSQL: executeSQL,
        insertInto: insertInto,
        selectAll: selectAll,
        selectCondition: selectCondition
    };
});