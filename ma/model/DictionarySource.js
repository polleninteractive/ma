
Ext.define('Ma.model.DictionarySource', {
    extend: 'Ext.data.Model',
    
    requires: [
        'Ma.util.SQLOverride'
    ], 
    
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
		
        proxy: {
			type: 'sql'
		}

        
    },
    writer: {
    	type: 'array'
    }

});
