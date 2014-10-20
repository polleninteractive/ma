// PHOTO SOURCE SELECT CONTROLLER
// Handles actionsheet (hidden in main viewport - see app.js) that appears for taking/choosing a phot

Ext.define('Sencha.controller.PhotoSourceSelectController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
        	photoSourceSelect: 'photosourceselectview',
            takePhotoButton: 'button[id=takePhotoButton]',
            choosePhotoButton: 'button[id=choosePhotoButton]',
            photoSelectCancelButton: 'button[id=photoSelectCancelButton]'
        },
        
        control: {
        	'takePhotoButton':{        
                tap:'takePhoto'
            },
            'choosePhotoButton':{        
                tap:'choosePhoto'
            },
            'photoSelectCancelButton':{        
                tap:'cancelPhotoSourceSelect'
            }
        }
    },
    
    
	// Take photo with camera
	//
	takePhoto: function() {
		this.getApplication().getController('DictionaryFormController').addImage(navigator.camera.PictureSourceType.CAMERA);
	},
	
	
	// Choose photo from album
	//
	choosePhoto: function() {
		this.getApplication().getController('DictionaryFormController').addImage(navigator.camera.PictureSourceType.PHOTOLIBRARY);
	},    
	
    
    // Cancel (hide action sheet)
    //       
    cancelPhotoSourceSelect: function() {
    	this.getPhotoSourceSelect().hide();
    }
    
});
