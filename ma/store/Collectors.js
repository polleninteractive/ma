Ext.define('Ma.store.Collectors', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Ma.model.Collector',
        autoLoad: true,
        autoSync: true,
        pageSize: -1
    }
    
    
});