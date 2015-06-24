// Tab View - main tab views of app including dictioanary, info section and button link to website
//

Ext.define('Ma.view.TabView', {
    extend: 'Ext.TabPanel',
    xtype: 'tabview',
    requires: [
        'Ma.view.DictionaryNavigationView'
    ],
      
    initialize: function () {
        this.callParent(arguments);
        
        var logoButton = {
            xtype: "button",
            cls: 'logoButton',
			id: 'logoButton',
            icon: 'images/websiteTabButton.png',
            text: 'Ma!'
        };
        
        this.getTabBar().add(logoButton);
    },
    
    config: {
        // Properites 
        tabJump: null, // used to flag that a tab has been jumped to
           
		fullscreen: true,
        tabBarPosition: 'bottom',
        defaults: {
            styleHtmlContent: true
        },
        tabBar: {
           height: '60px',
            layout: {
                pack: 'start'
            }
        },
        items: [
           {
               title: 'Dictionary',
               iconCls: 'dictionarytab',
               xtype: 'dictionarynavigationview'
           },
           {
                title: 'Information',
                iconCls: 'informationtab',
                cls: 'infocontainer',
                xtype: 'informationnavigationview'
           }
        ]
	}
    
});
