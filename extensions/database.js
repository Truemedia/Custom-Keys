// javascript database
try {
    if (!window.openDatabase) {
        alert('not supported');
    } else {
        var shortName = 'storedinformation';
        var version = '1.0';
        var displayName = 'Custom keys data';
        var maxSize = 65536; // in bytes
        var db = openDatabase(shortName, version, displayName, maxSize);
 
        // You should have a database instance in db.
    }
} catch(e) {
    // Error handling code goes here.
    if (e == 2) {
        // Version number mismatch.
        alert("Invalid database version.");
    } else {
        alert("Unknown error "+e+".");
    }
    return;
}
alert("Database is: "+db);
// insert data
function nullDataHandler(transaction, results) { }
 
function createTables(db)
{
    db.transaction(
        function (transaction) {
 
            /* The first query causes the transaction to (intentionally) fail if the table exists. */
            transaction.executeSql('CREATE TABLE keyboards(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT "Untitled", icon TEXT NOT NULL DEFAULT "/images/appicon.png");', [], nullDataHandler, errorHandler);
            /* These insertions will be skipped if the table already exists. */
            transaction.executeSql('insert into keyboards (name, icon) VALUES ("Itunes", "/itunes.png");', [], nullDataHandler, errorHandler);
            transaction.executeSql('insert into keyboards (name, icon) VALUES ("QuickTime", "/quicktime.png");', [], nullDataHandler, errorHandler);
            transaction.executeSql('insert into keyboards (name, icon) VALUES ("Safari", "/safari.png");', [], nullDataHandler, errorHandler);
        }
    );
}
createTables(db);
function errorHandler(transaction, error)
{
    // error.message is a human-readable string.
    // error.code is a numeric error code
    alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
 
    // Handle errors here
    var we_think_this_error_is_fatal = true;
    if (we_think_this_error_is_fatal) return true;
    return false;
}
 
function dataHandler(transaction, results)
{
    // Handle the results
    var string = "icon list contains the following keyboards:\n\n";
    for (var i=0; i<results.rows.length; i++) {
        // Each row is a standard JavaScript array indexed by
        // column names.
        var row = results.rows.item(i);
        string = string + row['name'] + " (ID "+row['id']+")\n";
    }
    alert(string);
}
 
db.transaction(
    function (transaction) {
        transaction.executeSql("SELECT * from keyboards",
            [], // array of values for the ? placeholders
            dataHandler, errorHandler);
    }
);