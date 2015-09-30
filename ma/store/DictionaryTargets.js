Ext.define('Ma.store.DictionaryTargets', {
    extend: 'Ext.data.Store',
     
    config: {
        model: 'Ma.model.DictionaryTarget',
        autoLoad: true,
        autoSync: true,
        pageSize: -1
    }
    
});