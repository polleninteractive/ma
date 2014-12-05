Ext.define('Ma.controller.DictionarySyncController', {
	extend: 'Ext.app.Controller',

	config: {
	
		// properties
		isUploadFinished: true, // flag to indicate upload complete
		isDownloadFinished: true, // flag to indicate download complete
	
		refs: {  
        	dictionaryNav: 'dictionarynavigationview',
        	dictionaryListView: 'dictionarylistview',
        	syncConfirmation: 'dictionarysyncconfirmationview',
            dictionarySyncConfirmButton: 'button[id=dictionarySyncConfirmButton]',
            dictionarySyncCancelButton: 'button[id=dictionarySyncCancelButton]',
            dictionaryEntryButton: 'dictionarynavigationview button[id=dictionaryEntryButton]',
            pullToRefresh: '[id=dictionaryPullToRefresh]'
        }, 
        
        control: {
        	'dictionarySyncConfirmButton':{        
                tap:'userRegistration'
            },
            'dictionarySyncCancelButton':{        
                tap:'cancelDictionarySync'
            }
        }
    },


	// Returns true if synchronisation in progress
	//
	isSynchronising: function() {
		if ( this.getIsUploadFinished() && this.getIsDownloadFinished() ) {
			return false;
		} else {
			return true;
		}
	},


	// Login user
    //       
    userLogin: function() {
    	var me = this;
    	
    	function loginError() {
    		console.log('DictionarySyncController.userLogin(): Failed login');
    		navigator.notification.alert('Please check your internet connection or try again later.', null, 'Unable to login');
    		me.getDictionaryNav().setMasked(false);
    	}
    	
    	this.getDictionaryNav().setMasked({xtype:'loadmask', message:'Logging in...'});
    	  
    	// Get username and password
    	var collectorRecord = Ext.getStore("Collectors").getById(1);
    	var username = collectorRecord.get('username');
    	var password = collectorRecord.get('password');
    
    	// Setup login XMLHttpRequest
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4) {
				if (xmlhttp.status==200) {
        			var response = JSON.parse(xmlhttp.responseText);
        			if ( response.header.ResponseCode==0 ) {
        				/* Insert code to do sync here */
        				
        				// Reset pull to refresh messages
        				me.getPullToRefresh().setPullRefreshText( me.getDictionaryListView().getNotBusySynchronisingMessage() );
    					me.getPullToRefresh().setReleaseRefreshText( me.getDictionaryListView().getNotBusySynchronisingMessage() );
        				
        				navigator.notification.alert('Please add code to sync or contact ma-project to use Ma! web service.', null, 'No sync');
    					me.getDictionaryNav().setMasked(false);
        			} else {
        				loginError();
        			}
    			} else {
    				loginError();
    			}
    		}
  		}
  		
  		// change pull to refresh message
    	var synchMessage = this.getDictionaryListView().getBusySynchronisingMessage();
    	this.getPullToRefresh().setPullText(synchMessage);
    	this.getPullToRefresh().setReleaseText( synchMessage );
  		
  		// Login
		xmlhttp.open("POST", Sencha.app.API_URL+'login', true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("UserName=" + username + "&Password=" + password);
    },

    
    // Register user if user hasn't registered yet
    //       
    userRegistration: function() {
    	
    	// hide sync button and confirmation dialog
		this.getSyncConfirmation().hide();
    	
    	// if  account has not been created yet (ie. username is null), show registration dialog. The app stores account info in the collector 
    	// table in record with id=1
   		var accountCreated = false;
   		var collectorRecord = Ext.getStore("Collectors").getById(1);
   		if (collectorRecord) {
   			if (collectorRecord.get('username')!=null ) {
   				accountCreated = true;
   			}
   		}
   		
   		if ( accountCreated == false) {
   			this.getDictionaryNav().push({
    			xtype: 'registrationformview'			                    
        	});
        	
        	// change dictionary entry button to 'DONE'
        	this.getDictionaryEntryButton().setText('DONE');
			this.getDictionaryEntryButton().setIconCls(null);      
		} else {
			console.log('account already created, so login...');
			this.userLogin();
		} 	
	},

    
    // Cancel (hide action sheet)
    //       
    cancelDictionarySync: function() {
    	console.log('hide sync view');
    	this.getSyncConfirmation().hide();
    }
    
});
