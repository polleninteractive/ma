Ext.define('Ma.model.SystemState', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'lastTargetDownloadDate', type: 'int'},
            { name: 'lastSourceDownloadDate', type: 'int'}
        ],  
        /*         
        proxy: {
           type: 'sqlitestorage',
           dbConfig: {
           		tablename: 'SYSTEMSTATE',
           		//dbConn: Ext.DbConnection
           		dbConn: Ma.util.InitSQLite.getConnection()
           },
           reader: {type:'array'}
        }
        */
        
        proxy: {
			type: 'sql'
		}
    },
    writer: {
    	type: 'array'
    }
});