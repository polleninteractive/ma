// Actionsheet used to select photo from camera or store
//

Ext.define('Ma.view.PhotoSourceSelectView', {
    extend: 'Ext.ActionSheet',
    xtype: 'photosourceselectview',
    
    config: {
    	hidden: true,
        items: [
        	{
            	text: 'Take Photo',
            	id : 'takePhotoButton' 
        	},
        	{
            	text: 'Choose Photo',
            	id : 'choosePhotoButton' 
        	},
        	{
            	text: 'Cancel',
            	ui : 'decline',
            	id : 'photoSelectCancelButton'
        	}
    	]
    }
        
});