Ext.define('Sencha.store.Speakers', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Sencha.model.Speaker',
        autoLoad: true,
        autoSync: true,
        pageSize: -1
    }
    
    
});