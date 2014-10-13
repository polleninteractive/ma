// DICTIONARY NAVIGATION CONTROLLER
// This controller handles the back button and dictionary entry button in the navigation bar. 
// For performance reasons, a single dictionary entry button has been implemented in the
// navigation bar. 
//

Ext.define('Sencha.controller.DictionaryNavigationController', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			main: 'dictionarynavigationview',
			dictionaryEntryButton: 'dictionarynavigationview button[id=dictionaryEntryButton]',			
			dictionaryDetailView: 'dictionarytargetdetailview'
		},
        
		control: {
			'dictionaryEntryButton':{        
				tap:'onDictionaryEntryButtonTap'
			},
			'dictionarynavigationview':{
				back:'onBackButton'
			}
        }
    },
        

    // Context sensitive button to handle navigation bar button taps ie. add a new
    // dictionary entry ('+') if no entry is selected in the current list view, edit an existing
    // entry ('EDIT') if a dictionary entry is selected in the list view or if the dictionary
    // entry displayed in the detailed dictionary entry is editable. When adding/editing a
    // dictionary entry, a dictionary entries meta data, a dictionary entries speaker details or 
    // when registering (after initating a sync for the first time), this button changes to 
    // ('DONE') to save or register.
    //
    onDictionaryEntryButtonTap: function() {
    	// Get current view
        var innerItems = this.getMain().getInnerItems();
        var currentItemIndex = this.getMain().getInnerItems().indexOf( this.getMain().getActiveItem() );
        var currentItem = innerItems[currentItemIndex].xtype;
        
        this.getDictionaryEntryButton().disable();
        
        // Decide what to do depending on current context
        switch(currentItem) {
        
            // if this is the dictionary list view then add entry
            case "dictionarycontainerlist":
                this.getDictionaryEntryButton().setText('DONE');
                this.getDictionaryEntryButton().setIconCls(null); // turn off icon image used for + sign
                this.getApplication().getController('DictionaryFormController').showForm();
                break;
                
            // if this is the dictionary detail view then edit entry
            case "dictionarytargetdetailview":
                this.getDictionaryEntryButton().setText('DONE');
           		this.getApplication().getController('DictionaryFormController').editForm();
                break;
                
            // if this is the metadata form then remember metadata details
            case "metadataformview":
            	this.getApplication().getController('DictionaryFormController').rememberNewMetaData();
            	this.getDictionaryEntryButton().setText('DONE');
            	this.getMain().pop();
            	break;
            
            // if this is the speaker form view, remember speaker details
            case "speakerformview":
            	this.getApplication().getController('DictionaryFormController').rememberNewSpeakerDetails();
                this.getDictionaryEntryButton().setText('OK');
            	this.getMain().pop();
            	break;
            
            // if dictionary form view then could be either an add or edit
            case "dictionaryformview":
                var previousItem = innerItems[currentItemIndex-1].xtype;
                
                // if an ADD dictionary entry
                if (previousItem == "dictionarycontainerlist") {
                    // call fn to save new entry
                    this.getApplication().getController('DictionaryFormController').saveDictEntryForm();
           			
                    // Change dictionary entry button back to add
           			this.getDictionaryEntryButton().setText('');
                    this.getDictionaryEntryButton().setIconCls('plusSignIcon'); // turn on icon image         
           			this.getMain().pop();
           			
           		// else an EDIT dictionary entry
                } else { 
                    this.getApplication().getController('DictionaryFormController').updateForm(); // call fn to save existing entry
                    
                    // Change dictionary entry button back to add and exit
                    this.getDictionaryEntryButton().setText('');
                    this.getDictionaryEntryButton().setIconCls('plusSignIcon'); // turn on icon image    
           			this.getMain().pop(2); // pop 2 to return us to list, otherwise page in carousel is out of date
                }
                break;
                
            // if registering
			case "registrationformview":
				this.getApplication().getController('RegistrationFormController').submitRegistration();
				break;
				
			// if viewing comments video
			case "videoview":
            	this.getMain().pop();
            	break;
        }
        
        // enable dictinary entry button after timeout (stops double clicks etc)
        var me = this;
        var dictEntryButton = setTimeout(
        	function() {
    			me.getDictionaryEntryButton().enable();
    		}, 
    		500
    	);
    },
    
    
    // Context sensitive button to handle navigation bar back button presses 
    //
    onBackButton: function(){
    	// Get new view ie. after back button pressed
        var innerItems = this.getMain().getInnerItems();
        var currentItemIndex = this.getMain().getInnerItems().indexOf( this.getMain().getActiveItem() );
        var currentItem = innerItems[currentItemIndex].xtype;
		
		// Decide what to do based on current context
        switch(currentItem) {
         
            // if the the list view
            case "dictionarycontainerlist":
            	this.getDictionaryEntryButton().show();
                this.getDictionaryEntryButton().setText('');
                this.getDictionaryEntryButton().setIconCls('plusSignIcon'); // turn on icon image
                break;
                
            // if the detail view
            case "dictionarytargetdetailview":
                // show button if card is editable (we do this here in case returned from image close up which hides button)
                var curRecord = this.getDictionaryDetailView().getListView().getStore().getAt( this.getDictionaryDetailView().getCurrentListItem() );
        		if ( curRecord.get('isEditable')=='1' ) {
        			this.getDictionaryEntryButton().show(); 
        		}
                
                // if not Android (we don't use animation's in Android for performance reasons) then return to slide transitions
                if ( device.platform != "Android" ) {
        			this.getMain().getLayout().setAnimation('slide');
        		}
                
                this.getDictionaryEntryButton().setText('EDIT');
                break;
                
            // If dictionary form view
            case "dictionaryformview":
            	this.getDictionaryEntryButton().setText('DONE');
                break;
        }
    }    
     
});
