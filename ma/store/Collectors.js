Ext.define('Sencha.store.Collectors', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Sencha.model.Collector',
        autoLoad: true,
        autoSync: true,
        pageSize: -1
    }
    
    
});