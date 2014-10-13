Ext.define('Sencha.model.Speaker', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' },
            { name: 'birthDate', type: 'int' },
            { name: 'gender', type: 'string' },
            { name: 'comments', type: 'string' }
        ],
        /*
        proxy: {
           type: 'sqlitestorage',
           dbConfig: {
           		tablename: 'SPEAKER',
           		//dbConn: Ext.DbConnection
           		dbConn: Sencha.util.InitSQLite.getConnection()
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


