Ext.define('Sencha.store.DictionarySources', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Sencha.model.DictionarySource',
        //sorters: 'sourceWord',
        //sorters: 'id',
        /*
        grouper : function(record) {
            //return record.get('sourceWord')[0];
           return record.get('sourceWord').substr(0, 1);
           
        },
        */
        //autoLoad: true,
        //autoSync: true,
        pageSize: -1
    }
    
    
});
