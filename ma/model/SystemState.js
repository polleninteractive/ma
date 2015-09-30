Ext.define('Ma.model.SystemState', {
    extend: 'Ext.data.Model',
    
	requires: [
        'Ma.util.SQLOverride'
    ],
	
    config: {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'lastTargetDownloadDate', type: 'int'},
            { name: 'lastSourceDownloadDate', type: 'int'}
        ],  
        
        proxy: {
			type: 'sql'
		}
    },
    writer: {
    	type: 'array'
    }
});