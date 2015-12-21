// Speaker Form View - used to enter speaker info
//

Ext.define('Ma.view.SpeakerFormView', {
    extend: 'Ext.Container',
    xtype: 'speakerformview',
	requires: [
    	'Ext.field.Radio',
    	'Ext.field.DatePicker'
    ],
         
    config: {
        title: 'Speaker',
        styleHtmlContent: true,
        scrollable: 'vertical',
        cls: 'formview',
        customLabelWidth: '40%'
    },   
	
    initialize: function () {
    	this.callParent(arguments);        
        
   		var fieldSet = {
   	        xtype: 'fieldset',
   	        itemId: 'speakerFieldset',
   	        items: [
   	            {
   	                xtype: 'textfield',
   	                name : 'speakerName',
   	                label: 'Name',
                    itemId: 'speakerNameField',
                    labelWidth: this.getCustomLabelWidth()
   	            },
   	            {
   	                xtype: 'datepickerfield',
   	                name : 'speakerDOB',
   	                label: 'Birthdate',
                    itemId: 'speakerDOBField',
                    labelWidth: this.getCustomLabelWidth(),
                    picker: {
                        yearFrom: 1900
                    }
   	            },
   	            {
   	   		 	    xtype: 'radiofield',
   	   		 	    name : 'speakerGender',
   	   		 	    label: 'Male',
   	   		 	    value: 'Male',
   	   		 	    checked: true,
                    cls: 'malecollector'
   	   		 	},
   	   		 	{
   	   		 	    xtype: 'radiofield',
   	   		 	    name : 'speakerGender',
   	   		 	    label: 'Female',
   	   		 	    value: 'Female'
   	   		 	},
   	   		 	{
   	   			    xtype: 'textfield',
   	   			    name : 'speakerComment',
   	   			    label: 'Comments',
   	   			    itemId: 'speakerCommentField',
                    labelWidth: this.getCustomLabelWidth()
   	   			}
   	        ]
		};
 
		this.add([fieldSet]); 
	}
   
});