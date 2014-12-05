Ext.define('Sencha.store.SystemStates', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Sencha.model.SystemState',
        autoLoad: true,
        autoSync: true
    }
    
}); 