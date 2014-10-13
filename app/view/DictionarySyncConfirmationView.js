// Dictionary sync confirmation view (actionsheet to confirm/cancel sync)
//

Ext.define('Sencha.view.DictionarySyncConfirmationView', {
    extend: 'Ext.ActionSheet',
    xtype: 'dictionarysyncconfirmationview',
    
    config: {
    	hidden: true,
        items: [
        	{
            	text: 'SYNC',
            	ui : 'confirm',
            	id : 'dictionarySyncConfirmButton' 
        	},
        	{
            	text: 'Update account settings',
            	id : 'dictionarySyncAccountSettingsButton',
            	hidden : true
        	},
        	{
            	text: 'Cancel',
            	ui : 'decline',
            	id : 'dictionarySyncCancelButton'
        	}
    	]
    }
        
});