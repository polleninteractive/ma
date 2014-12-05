// DICTIONARY SOURCES FILTERED STORE
// This store is populated with a direct database query and used by the DictionaryListView

Ext.define('Ma.store.DictionarySourcesFiltered', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Ma.model.DictionarySourceFiltered',
        pageSize: 25 // for performance reasons, restrict list to 25 entries
    }
});

