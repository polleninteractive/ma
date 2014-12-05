// Dictionary Navigation View - Navigation view for DictionaryContainerList
//

Ext.define('Ma.view.DictionaryNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'dictionarynavigationview',

    config: {
    	navigationBar: {
           ui: 'dark',
           docked: 'top',
           id: 'dictionarynavigationbar',
           items: [
                {xtype : 'button',
                text : '',
                minHeight: '32px',
                align : 'right',
                id: 'dictionaryEntryButton',
                cls: 'dictionaryEntryButton',
                pressedCls: 'toolbarButtonPressed',
                iconCls: 'plusSignIcon'
                }
            ]
        },
        
        items: [        	
        	{xtype: 'dictionarycontainerlist'}
        ]
    }
    
});
