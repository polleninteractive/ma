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
        itemTpl: '<div class="dictlistfirstline"><span class="dictListSourceWord">{sourceWord}</span><span class="dictListByline"> <span class="dictListPartOfSpeech">{partOfSpeech}</span> {disambiguation}</span></div><tpl if="audioURL !== \'\' && audioURL !== null"><div class="audioIcon"><img src="images/speaker.png"/></div></tpl><div class="dictListTargetWord">{targetWord}</div>',
        store: 'DictionarySourcesFiltered',
        onItemDisclosure: true,
        itemHeight: 80,
        variableHeights: true,
        infinite: true,
        scrollToTopOnRefresh: true
    }
    
});


