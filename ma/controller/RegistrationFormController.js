// REGISTRATION FORM CONTROLLER
// Handles first user registration with web service

Ext.define('Ma.controller.RegistrationFormController', {
    extend: 'Ext.app.Controller',

    config: {
         
        refs: {
			main: 'registrationformview',
			dictionaryNav: 'dictionarynavigationview',
			registrationForm: 'fieldset[id="registrationFormFieldSet"]',
        	dictionaryEntryButton: 'dictionarynavigationview button[id=dictionaryEntryButton]',
			registrantGenderField: 'dictionarynavigationview radiofield[name="registrantGender"]'
        }
    },

	// Submit user registration - called first time user tries to sync with web service
	// Attempts to register user (requries name, username and password). Registration details are then stored in the COLLECTOR table
	// If registration fails, attempts to login using username and password
	//
	submitRegistration: function() {
    	// display loading spinner and mask
  		this.getMain().setMasked({xtype:'loadmask',message:'Registering...'});
    
    	var me = this;
    	
    	// validate form
		var newName = this.getRegistrationForm().getComponent('nameField').getValue();
		var newUsername = this.getRegistrationForm().getComponent('userNameField').getValue(); 
		var newPassword = this.getRegistrationForm().getComponent('passwordField').getValue(); 
		var newEmail = this.getRegistrationForm().getComponent('emailField').getValue();
		var newBirthdate = this.getRegistrationForm().getComponent('birthdateField').getFormattedValue();
		var newGender = this.getRegistrantGenderField().getGroupValue();
		
		// cleanup strings
		newName = newName.replace(/^\s+|\s+$/g,""); // remove leading spaces
		newUsername = newUsername.replace(/^\s+|\s+$/g,"");
		
		// Attempt login if only username and password entered
		if ( newUsername && newPassword && (!newName || newName=='') && (!newEmail || newEmail=='') ) {
			navigator.notification.alert(
				'Insufficient information to register new user. Attempting login instead', 
				function() {
					me.getDictionaryEntryButton().hide();
					me.getMain().setMasked(false);
					me.getDictionaryNav().pop(); // remove registration form
					//me.getApplication().getController('Ma.controller.DictionarySyncController').userLogin();
					
					var collectorRecord = Ext.getStore("Collectors").getById(1);
					collectorRecord.set('username', newUsername);
    				collectorRecord.set('password', newPassword);
					
					Sencha.app.fireEvent('userloginevent');
				}, 
				'Logging in' 
			);
	
			return;
		}
		
		
		// Validate
		if ( !newName || newName=='' || !newUsername || newUsername=='' || !newPassword || newPassword=='') {
			navigator.notification.alert('As a minimum you must enter your name, username and password', null, 'More information required' );
			this.getMain().setMasked(false);
			return;
		}
		
		// Setup XMLHttpRequest (handles response)
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4) {
				if (xmlhttp.status==200) { 
					var response = JSON.parse(xmlhttp.responseText);
				
					if ( response.header.ResponseCode==0 ) {
	    				// Save login details
    					var collectorRecord = Ext.getStore("Collectors").getById(1);
    					if ( collectorRecord != undefined ) {
    						collectorRecord.set('name', newName);
    						collectorRecord.set('username', newUsername);
    						collectorRecord.set('password', newPassword);
    						collectorRecord.set('email', newEmail);
    						collectorRecord.set('birthDate', newBirthdate);
    						collectorRecord.set('gender', newGender);
    						Ext.getStore("Collectors").sync();
    				
    						navigator.notification.alert(
    							'Synchronisation will start automatically...', 
    							function() {
    								// Remove registration form and set buttons label, visiblity etc.
    								me.getDictionaryEntryButton().hide();
    								me.getMain().setMasked(false);
    								me.getDictionaryNav().pop(); // remove registration form
    								
    								// Login
									Sencha.app.fireEvent('userloginevent');
    							}, 
    							'Registration complete' 
    						);
    					} else {
                            me.getMain().setMasked(false);
    						navigator.notification.alert('Unable to save registration details', null, 'Registration error' );
    					} 
    				} else {
    					console.log('responsecode error');
    					me.getMain().setMasked(false);
    					navigator.notification.alert(response.header.Message, null, 'Registration error');
    				}
    			} else {
    				console.log('RegistrationFormController.submitRegistration(): Failed registration');
    				me.getMain().setMasked(false);
    				navigator.notification.alert('Error registering new account. Please try again later.', null, 'Registration error' );
    			}
    		} 
  		}  
  		
  		// Submit registration form (registration requires name, username and password; email, birthdate and gender optional)
		console.log('POSTING to ' + Sencha.app.API_URL+'register_user' );
		console.log("UserName=" + newUsername + "&Password=" + newPassword + "&FirstName=" + newName + "&Email=" + newEmail + "&BirthDate=" + newBirthdate + "&Gender=" + newGender);
		
  		xmlhttp.open("POST", Sencha.app.API_URL+'register_user', true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("UserName=" + newUsername + "&Password=" + newPassword + "&FirstName=" + newName + "&Email=" + newEmail + "&BirthDate=" + newBirthdate + "&Gender=" + newGender);
	}

});
