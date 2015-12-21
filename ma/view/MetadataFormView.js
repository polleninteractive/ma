// Metadata For View - form for entering metadata
//

Ext.define('Ma.view.MetadataFormView', {
    extend: 'Ext.Container',
    xtype: 'metadataformview',
	requires: [
    	'Ext.Label',
    	'Ext.form.FieldSet'
    ],
           
    config: {
        title: 'Metadata',
        styleHtmlContent: true,
        scrollable: 'vertical',
        cls: 'formview',
        customLabelWidth: '40%'
    },   
	
    initialize: function () {
    	this.callParent(arguments);        
        
        // Form for entering meta data
        var fieldSet = {
	        xtype: 'fieldset',
			cls: 'metadataFieldset',
	        itemId: 'metadataFieldset',
	        items: [
	            {
	                xtype: 'textfield',
	                name : 'date',
	                label: 'Date',
                    itemId: 'dateField',
                    disabled: true,
                    labelWidth: this.getCustomLabelWidth()
	            },
	            {
	                xtype: 'textfield',
	                name : 'latitude',
	                label: 'Latitude',
                    itemId: 'latitudeField',
                    disabled: true,
                    labelWidth: this.getCustomLabelWidth()
	            },
	            {
	                xtype: 'textfield',
	                name : 'longitude',
	                label: 'Longitude',
	                itemId: 'longitudeField',
	                disabled: true,
                    labelWidth: this.getCustomLabelWidth()
	            },
	            {
	                xtype: 'textfield',
	                name : 'recordingdevice',
	                label: 'Device',
	                itemId: 'recordingDeviceField',
	                disabled: true,
                    labelWidth: this.getCustomLabelWidth()
	            }
			]
		};
           
		var speakerContainer = {
       		xtype: 'container',
       		layout: 'hbox',
       		cls: 'speakercontainer',
       		items:[
       			{
       				xtype: 'label',
       				html: 'Speaker',
                    margin: '0 0 0 7px',
                    itemId: 'speakerformtitle'
       			},
       			{
       				xtype: 'spacer'
       			},
       			{
       				xtype: 'button',
       				margin: '0 6px 0 0',
       				itemId: 'speakerButton',
					cls: 'speakerButton'
       			}
       		]
       };
       
       this.add([fieldSet, speakerContainer]);
    }

});