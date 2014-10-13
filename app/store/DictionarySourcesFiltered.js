// DICTIONARY SOURCES FILTERED STORE
// This store is populated with a direct database query and used by the DictionaryListView

Ext.define('Sencha.store.DictionarySourcesFiltered', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Sencha.model.DictionarySourceFiltered',
        pageSize: 25 // for performance reasons, restrict list to 25 entries
    }
});

