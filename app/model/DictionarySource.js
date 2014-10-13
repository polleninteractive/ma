
Ext.define('Sencha.model.DictionarySource', {
    extend: 'Ext.data.Model',
    
    config: {
    	 
        fields: [
                 { name: 'id', type: 'int', fieldOption: 'PRIMARY KEY' },
                 { name: 'dictionaryTargetId', type: 'int'},
                 { name: 'sourceWord', type: 'string' },
                 { name: 'partOfSpeech', type: 'string' },
                 { name: 'inflection', type: 'string' },
                 { name: 'disambiguation', type: 'string' },
                 { name: 'targetWord', type: 'string' },
                 { name: 'isEditable', type: 'int' },
                 { name: 'sourceWordURL', type: 'string' },
                 { name: 'status', type: 'int' },
                 { name: 'moderatorComments', type: 'string' },
                 { name: 'serverId', type: 'int' }
        ],
        
        /*
        proxy: {
           type: 'sqlitestorage',
           dbConfig: {
           		tablename: 'DICTIONARYSOURCE',
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
