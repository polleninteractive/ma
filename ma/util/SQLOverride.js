// Override Sencha SQL proxy to use sqlite database plugin

Ext.define('Ma.util.SQLOverride', {
    override: 'Ext.data.proxy.Sql',

	//Overridden method
    getDatabaseObject: function() {
    	
		return window.sqlitePlugin.openDatabase({name: "0000000000000001.db"});
    }

   
 });