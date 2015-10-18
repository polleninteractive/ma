// Dictionary List View - list view for displaying dictionary entries
//

Ext.define('Ma.view.DictionaryListView', {
    extend: 'Ext.List',
    xtype: 'dictionarylistview',
    
    requires: [
        'Ext.field.Search',
        'Ma.util.PullRefresh'
    ], 
     
    config: {
        id: 'dictionarylistview',
        busySynchronisingMessage: 'Synchronising...',
        notBusySynchronisingMessage: 'Pull to share and update (requires internet connection)',
        
        plugins: [
        	{
            	xclass: 'Ma.util.PullRefresh',
				pullText: 'Pull to share and update (requires internet connection)',
				releaseText: 'Pull to share and update (requires internet connection)',
				loadingText: 'Initialising synchronisation...',
				loadedText: 'Synchronisation finished',
				id: 'dictionaryPullToRefresh'
        	}
    	],
        
        indexBar: false,
        itemTpl: '<div class="audioIcon"><tpl if="audioURL !== \'\' && audioURL !== null"><img src="images/speaker.png"/></tpl></div><div class="dictListDefinition"><div class="dictListTargetWord">{targetWord}</div><div class="dictlistfirstline"><span class="dictListSourceWord">{sourceWord}</span> <span class="dictListPartOfSpeech">{partOfSpeech}</span> <span class="dictListByline">{disambiguation}</span></div></div>',
		store: 'DictionarySourcesFiltered',
        onItemDisclosure: true,
        itemHeight: 70,
        variableHeights: true,
        infinite: true,
        scrollToTopOnRefresh: true
    }
    
});


