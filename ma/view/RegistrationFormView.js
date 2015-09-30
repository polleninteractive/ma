// Registration Form View - used to register new user with web service
//

Ext.define('Ma.view.RegistrationFormView', {
    extend: 'Ext.Container',
    xtype: 'registrationformview',
           
    config: {
        title: 'Registration',
        styleHtmlContent: true,
        scrollable: 'vertical',
        cls: 'formview',
        id: 'registrationformview',
        customLabelWidth: '40%'
    },   
	
    initialize: function () {
    	this.callParent(arguments);        
        
        // Form for entering registration info.
        var fieldSet = {
	        xtype: 'fieldset',
	        id: 'registrationFormFieldSet',
	        items: [
	        	{
	                xtype: 'textfield',
	                name : 'name',
	                label: '*Name',
                    id: 'nameField',
                    value: '',
                    autoCapitalize: true,
                    border: '0 0 1 0',
                    labelWidth: this.getCustomLabelWidth()
	            },
	            {
	                xtype: 'textfield',
	                name : 'username',
	                label: '*User name',
                    id: 'userNameField',
                    value: '',
                    autoCapitalize: false,
                    labelWidth: this.getCustomLabelWidth()
	            },
	            {
	                xtype: 'passwordfield',
	                name : 'password',
	                label: '*Password',
                    id: 'passwordField',
                    value: '',
                    autoCapitalize: false,
                    labelWidth: this.getCustomLabelWidth()
	            },
	            {
                    xtype: 'emailfield',
	                name : 'email',
	                label: 'Email',
                    id: 'emailField',
                    value: '',
                    labelWidth: this.getCustomLabelWidth()
	            },
                // Birthdate date picker
                {
                    xtype: 'datepickerfield',
                    label: 'Birthdate',
                    name: 'birthdate',
                    id: 'birthdateField',
					labelWidth: this.getCustomLabelWidth(),
                    picker: {
                        yearFrom: 1900
                    }
                },
                // Gender radio buttons
                {
                    xtype: 'radiofield',
                    name : 'registrantGender',
                    value: 'male',
                    label: 'Male',
                    cls: 'malecollector',
                    labelWidth: this.getCustomLabelWidth(),
                    checked: true
                },
                    {
                    xtype: 'radiofield',
                    name : 'registrantGender',
                    value: 'female',
                    label: 'Female',
                    labelWidth: this.getCustomLabelWidth()
                }
	        ]
		};
		
        this.add([fieldSet]);
    }

});