Ext.define('Sencha.store.DictionaryTargets', {
    extend: 'Ext.data.Store',
     
    config: {
        model: 'Sencha.model.DictionaryTarget',
        //sorters: 'id',
        /*
        grouper : function(record) {
            return record.get('targetWord')[0];
        },
        */
        //autoLoad: true,
        //autoSync: true,
        pageSize: -1
    }
    
});