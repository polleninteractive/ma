Ext.define('Ma.model.DictionaryTarget', {
    extend: 'Ext.data.Model',
    
    requires: [
        'Ma.util.SQLOverride'
    ],
    
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'collectorId', type: 'int'}, // change order of these, not sure if it makes any diff.
            { name: 'speakerId', type: 'int'},
            { name: 'conjugationId', type: 'int'},// new
            { name: 'cfId', type: 'int'}, // new
            { name: 'targetWord', type: 'string' },
            { name: 'detailedEntry', type: 'string' },
            { name: 'audioURL', type: 'string' },
            { name: 'imageURL', type: 'string' },
            { name: 'comments', type: 'string'},
            { name: 'savedDate', type: 'int'}, // just kept savedDate, got rid of saved time
            { name: 'latitude', type: 'string'}, // changed geoLocation to two fiels - latitude and longitude
            { name: 'longitude', type: 'string'},
            { name: 'recordingDevice', type: 'string'},
            { name: 'commentsURL', type: 'string'},
            { name: 'commentsMediaType', type: 'int'},
            { name: 'serverId', type: 'int' },
			{ name: 'dialect', type: 'int'} // used if to distinguish between multiple languages/dialects in one app 
        ],
        
		proxy: {
			type: 'sql'
		}
    },
    writer: {
    	type: 'array'
    }
           

});

