Ext.define('Sencha.model.Collector', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' },
            { name: 'birthDate', type: 'string' },
            { name: 'gender', type: 'string' },
            { name: 'comments', type: 'string' },
            { name: 'username', type: 'string' },
            { name: 'password', type: 'string' },
            { name: 'email', type: 'string' }
        ],
        /*
        proxy: {
           type: 'sqlitestorage',
           dbConfig: {
           		tablename: 'COLLECTOR',
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