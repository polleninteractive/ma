Ext.define('Ma.model.Collector', {
    extend: 'Ext.data.Model',
    
	requires: [
        'Ma.util.SQLOverride'
    ],
	
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
       
        proxy: {
			type: 'sql'
		}
        
    },
    writer: {
    	type: 'array'
    }
           

});