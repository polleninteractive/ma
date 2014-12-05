Ext.define('Ma.store.SystemStates', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Ma.model.SystemState',
        autoLoad: true,
        autoSync: true
    }
    
}); 