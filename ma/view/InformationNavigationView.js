// Information Navigation View - navigation view to hold InformationListView
//

Ext.define('Ma.view.InformationNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'informationnavigationview',
    config: {
    	navigationBar: {
           ui: 'dark',
           docked: 'top',
           id: 'informationnavigationbar'
        },
        
        items: [        	
        	{
                xtype: 'informationlistview'
            }
        ]
    }
    
});
