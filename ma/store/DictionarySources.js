Ext.define('Ma.store.DictionarySources', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Ma.model.DictionarySource',
        autoLoad: true,
        autoSync: true,
        pageSize: -1
    }
    
    
});
