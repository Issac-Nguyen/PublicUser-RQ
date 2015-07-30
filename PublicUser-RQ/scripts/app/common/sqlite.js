define(['underscore', 'async', './Utils'], function(_, async, Utils) {
    var db;

    function executeSQL(sqlString, successCallback, eb) {
            db.transaction(function(tx) {
             tx.executeSql(sqlString, function(tx1, res) {
                 if(successCallback)
                 successCallback(res);
                 }, eb);
             }, eb);
        }
    
    function insertInto(table, data, sb) {
        if(data) {
            var dataArr = [];
            var sqlStr = "";
            if(_.isArray(data)) {
                for(d in data) {
                    var item = data[d];
                    var strFields = "(";
            		var strVl = "(";
                    for(i in item) {
                        strFields += i + ",";
                        strVl += "?,";
                        dataArr.push(item[i]);
                    }
            
            strFields = strFields.substr(0, strFields.length - 1) + ")";
            strVl = strVl.substr(0, strVl.length - 1) + ")";
            
            sqlStr += "INSERT INTO " + table + strFields + " VALUES" + strVl + ";";
                }
            } else if(_.isObject(data)) {
                var strFields = "(";
            		var strVl = "(";
                    for(i in data) {
                        strFields += i + ",";
                        strVl += "?,";
                        dataArr.push(data[i]);
                    }
            
            strFields = strFields.substr(0, strFields.length - 1) + ")";
            strVl = strVl.substr(0, strVl.length - 1) + ")";
            
            sqlStr = "INSERT INTO " + table + strFields + " VALUES" + strVl;
            }
            
            
            
            alert(sqlStr);
            alert(JSON.stringify(dataArr));
            
            db.transaction(function(tx) {
             tx.executeSql(sqlStr, dataArr, function(tx, res) {
                 if(sb)
                     sb(res);
                 }, Utils.handleErr);
             },  Utils.handleErr);
        }
    }
    
    function initData(data, cb) {
        Utils.setLocalStorage('latestGetData', Utils.timestampString);
        _.mapObject(data, function(vl, key){
            switch(key){
                case 'building':
                    //_.map(vl, function(o){
                    //    var building = {};
                    //    building.id = o.id;
                    //    building.Name = o.Name;
                    //    building.Company_id = o.CompanyID;
                    //    building.Address = o.Address;
                    //    insertInto('Buidling', building);
                    //});
                    var arrObj = [];
                    for(i in vl){
                        var o = vl[i];
                        var building = {};
                        building.id = o.id;
                        building.Name = o.Name;
                        building.Company_id = o.CompanyID;
                        building.Address = o.Address;
                        arrObj.push(building);
                    }
                    insertInto('Buidling', arrObj[0]});
                break;
                case 'category':
                    _.map(vl, function(o){
                        var category = {};
                        category.id = o.id;
                        category.Name = o.Name;
                        category.Company_id = o.CompanyID;
                        category.Building_id = o.BuildingID;
                        category.Description = o.Description;
                        //insertInto('Category', category);
                    });
                    break;
                case 'department':
                    _.map(vl, function(o){
                        var department = {};
                        department.id = o.id;
                        department.Name = o.Name;
                        department.Building_id = o.BuildingID;
                        department.Description = o.Description;
                        //insertInto('Department', department);
                    });
                    break;
                case 'floor':
                    _.map(vl, function(o){
                        var floor = {};
                        floor.id = o.id;
                        floor.Name = o.Name;
                        floor.Building_id = o.BuildingID;
                        floor.Description = o.Description;
                        //insertInto('Floor', floor);
                    });
                    break;
                case 'zone':
                    _.map(vl, function(o){
                        var zone = {};
                        zone.id = o.id;
                        zone.Name = o.Name;
                        zone.Building_id = o.BuildingID;
                        zone.Description = o.Description;
                        //insertInto('Zone', zone);
                    });
                    break;
                case 'subcategory':
                    _.map(vl, function(o){
                        var subcategory = {};
                        subcategory.id = o.id;
                        subcategory.Name = o.Name;
                        subcategory.Category_id = o.CategoryID;
                        subcategory.Description = o.Description;
                        //insertInto('SubCategory', subcategory);
                    });
                    break;
                case 'subdepartment':
                    _.map(vl, function(o){
                        var subdepartment = {};
                        subdepartment.id = o.id;
                        subdepartment.Name = o.Name;
                        subdepartment.Department_id = o.DepartmentID;
                        subdepartment.Description = o.Description;
                        //insertInto('SubDepartment', subdepartment);
                    });
                    break;
                case 'subzone':
                    _.map(vl, function(o){
                        var subzone = {};
                        subzone.id = o.id;
                        subzone.Name = o.Name;
                        subzone.Zone_id = o.ZoneID;
                        subzone.Description = o.Description;
                        //insertInto('SubZone', subzone);
                    });
                    break;
            }
        });
        if(cb)
            cb();
    }
    
    function selectAll(table, sb, eb) {
        db.transaction(function(tx) {
            var sqlStr = "SELECT * FROM " + table;
            tx.executeSql(sqlStr, [], function(tx, res) {
                sb(res);
            }, eb);
        }, eb);
    }
    
    function selectCondition(table, condition, sb, eb) {
        db.transaction(function(tx) {
          var sqlStr = "SELECT * FROM " + table + " WHERE " + condition;
            tx.executeSql(sqlStr, [], function(tx, res) {
                sb(res);
            }, eb);
        }, eb);
    }
    
    function deleteDefect(condition, successCallback) {
        var strSQL = "DELETE defect";
        if(condition)
            strSQL = strSQL + " " + condition;
        executeSQL(strSQL, successCallback, Utils.handleErr);
    }
    
    function getAllDefectData(successCallback) {
       selectAll('defect', successCallback, Utils.handleErr);
    }

    function start(sb, eb) {
        try {
            db = window.sqlitePlugin.openDatabase({name: "publicuser.db", location: 2});
        } catch (e) {
           alert(JSON.stringify(e));
        }
        if (!db) {
            alert('fail');
            return;
        }

        function installModels() {
            db.transaction(function(tx) {
               //tx.executeSql('DROP TABLE IF EXISTS defect');
                //tx.executeSql('DROP TABLE IF EXISTS Building');
                //tx.executeSql('DROP TABLE IF EXISTS Category');
                //tx.executeSql('DROP TABLE IF EXISTS SubCategory');
                //tx.executeSql('DROP TABLE IF EXISTS SubDepartment');
                //tx.executeSql('DROP TABLE IF EXISTS Zone');
                //tx.executeSql('DROP TABLE IF EXISTS SubZone');
                //tx.executeSql('DROP TABLE IF EXISTS Floor');
               tx.executeSql('CREATE TABLE IF NOT EXISTS Building (id text primary key, Company_id text, Name text, Address text)'); 
               //tx.executeSql('CREATE TABLE IF NOT EXISTS Category (id text primary key, Building_id text, Company_id text, Name text, Description text)'); 
               //tx.executeSql('CREATE TABLE IF NOT EXISTS SubCategory (id text primary key, Category_id text, Name text, Description text)'); 
               //tx.executeSql('CREATE TABLE IF NOT EXISTS Department (id text primary key, Building_id text, Name text, Description text)'); 
               //tx.executeSql('CREATE TABLE IF NOT EXISTS SubDepartment (id text primary key, Department_id text, Name text, Description text)'); 
               //tx.executeSql('CREATE TABLE IF NOT EXISTS Zone (id text primary key, Building_id text, Name text, Description text)'); 
               //tx.executeSql('CREATE TABLE IF NOT EXISTS SubZone (id text primary key, Zone_id text, Name text, Description text)');
               //tx.executeSql('CREATE TABLE IF NOT EXISTS Floor (id text primary key, Building_id text, Name text, Description text)'); 
               //tx.executeSql('CREATE TABLE IF NOT EXISTS defect (id text primary key, Building_id text, building_Name text, category_id text, category_Name text, subcategory_id text, subcategory_Name text, department_id text, department_Name text, zone_id text, zone_Name text, subzone_id text, subzone_name text, floor_id text, floor_Name text, expectedDate text, arr_imageDefect text, arr_imageResolve text, color text, status INTEGER, createdDate text, createdTime text)'); 
            }, eb);
        }
        
        installModels();
        
        if(sb)
            sb();
    }
    
    function countTb(table, condition, sb, eb) {
        var strSQL = "select count(_id) from " + table;
        if(condition)
            strSQL += strSQL + " WHERE " + condition;
        executeSQL(strSQL, [], sb, eb);
    }
    
    function checkExitApp(cb) {
        async({}, function(err, results) {
           cb(err, results); 
        });
    }
    
    return {
        start: start,
        executeSQL: executeSQL,
        insertInto: insertInto,
        selectAll: selectAll,
        selectCondition: selectCondition,
        initData: initData
    };
});