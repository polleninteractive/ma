// DICTIONARY SOURCE FILTERED MODEL
// This model is used by the DictionarySourcesFiltered store which in turn is used to populate the DictionaryListView
// The database is queried directly with a join between DICTIONARYSOURCE and DICTIONARYTARGET to get all required information not
// just for the list view, but for the form view (if the entry is edited) so that the database doesn't have to be queried again later

Ext.define('Ma.model.DictionarySourceFiltered', {
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
			{ name: 'status', type: 'int' },
			{ name: 'moderatorComments', type: 'string' },
			{ name: 'serverId', type: 'int' },
			{ name: 'audioURL', type: 'string' }, //  target word audio
			{ name: 'imageURL', type: 'string' }, //  image URL
			{ name: 'comments', type: 'string' },
			{ name: 'commentsURL', type: 'string' },
			{ name: 'commentsMediaType', type: 'int' },
			{ name: 'collectorId', type: 'int'},
			{ name: 'speakerId', type: 'int'},
			{ name: 'savedDate', type: 'int'},
			{ name: 'latitude', type: 'string'},
			{ name: 'longitude', type: 'string'},
			{ name: 'recordingDevice', type: 'string'},
			{ name: 'detailedEntry', type: 'string'},
			{ name: 'sourceWordURL', type: 'string' }
        ]
    }
    
});
