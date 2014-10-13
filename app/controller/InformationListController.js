// Information List Controller
// Controller to display appropriate information section based on selection made in information list view

Ext.define('Sencha.controller.InformationListController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
			main: 'informationnavigationview',
			informationListView: 'informationlistview',
			infoContainer: 'container[title=Information]'
        },
        
        control: {
            'informationListView' :{
                itemtap: 'onItemTap'
            }
        }
    },
           
    // Handle information list item taps
    //
    onItemTap : function(list, index) {
    
        // Sencha bug allows the row to be tapped more than once, so check for this
        var innerItems = this.getMain().getInnerItems();
        if ( innerItems.length > 1 ) {
           return;
        } 
           
        // Uses passed in list index to display the related information view
        switch(index) {
           case 0:
                this.getMain().push({xtype: 'howtouseappinfoview'});
                break;
           case 1:
                this.getMain().push({xtype: 'languagefootprintinfoview'});
                break;
           case 2:
                this.getMain().push({xtype: 'soundsofiwaidjainfoview'});
                break;
           case 3:
                this.getMain().push({xtype: 'aboutthisappinfoview'});
                break;
        }
    }
   
});
