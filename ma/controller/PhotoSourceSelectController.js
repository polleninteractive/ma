// PHOTO SOURCE SELECT CONTROLLER
// Handles actionsheet (hidden in main viewport - see app.js) that appears for taking/choosing a phot

Ext.define('Ma.controller.PhotoSourceSelectController', {
    extend: 'Ext.app.Controller',

    config: {
		// properties
		addImageEventToFire: null,
		
		
        refs: {
			main: 'yytabview',
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
	
	init: function (application) {
 		// listen for fired events (from DictionaryFormController)
        
		application.on([
			{
            	event: 'showPhotoSourceSelectView',
            	fn: this.showSelector,
            	scope: this
        	}
		]);
    },
    
	
    // Show photoSourceSelectView and 
	//
	showSelector: function(addImageEvent) {
		this.getPhotoSourceSelect().show();	
		this.setAddImageEventToFire(addImageEvent);
	},
	
	// Take photo with camera
	//
	takePhoto: function() {
		//this.getApplication().getController('Ma.controller.DictionaryFormController').addImage(navigator.camera.PictureSourceType.CAMERA);
		console.log('activeitem = ' + this.getMain().getActiveItem() );
		
		Sencha.app.fireEvent(this.getAddImageEventToFire(), Camera.PictureSourceType.CAMERA);
	},
	
	
	// Choose photo from album
	//
	choosePhoto: function() {
		//this.getApplication().getController('Ma.controller.DictionaryFormController').addImage(navigator.camera.PictureSourceType.PHOTOLIBRARY);
		Sencha.app.fireEvent(this.getAddImageEventToFire(), Camera.PictureSourceType.PHOTOLIBRARY);
	},    
	
    
    // Cancel (hide action sheet)
    //       
    cancelPhotoSourceSelect: function() {
		this.setAddImageEventToFire(null)
    	this.getPhotoSourceSelect().hide();
    }
    
});
