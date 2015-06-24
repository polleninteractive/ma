Ext.define('Ma.store.Speakers', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Ma.model.Speaker',
        autoLoad: true,
        autoSync: true,
        pageSize: -1
    }
    
});