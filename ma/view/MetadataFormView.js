// Metadata For View - form for entering metadata
//

Ext.define('Ma.view.MetadataFormView', {
    extend: 'Ext.Container',
    xtype: 'metadataformview',
           
    config: {
        title: 'Metadata',
        styleHtmlContent: true,
        scrollable: 'vertical',
        cls: 'formview',
        customLabelWidth: '50%'
    },   
	
    initialize: function () {
    	this.callParent(arguments);        
        
        // Form for entering meta data
        var fieldSet = {
	        xtype: 'fieldset',
	        id: 'metadataFieldset',
	        items: [
	            {
	                xtype: 'textfield',
	                name : 'date',
	                label: 'Date',
                    id: 'dateField',
                    disabled: true,
                    labelWidth: this.getCustomLabelWidth()
	            },
	            {
	                xtype: 'textfield',
	                name : 'latitude',
	                label: 'Latitude',
                    id: 'latitudeField',
                    disabled: true,
                    labelWidth: this.getCustomLabelWidth()
	            },
	            {
	                xtype: 'textfield',
	                name : 'longitude',
	                label: 'Longitude',
	                id: 'longitudeField',
	                disabled: true,
                    labelWidth: this.getCustomLabelWidth()
	            },
	            {
	                xtype: 'textfield',
	                name : 'recordingdevice',
	                label: 'Device',
	                id: 'recordingDeviceField',
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
                    id: 'speakerformtitle'
       			},
       			{
       				xtype: 'spacer'
       			},
       			{
       				xtype: 'button',
       				margin: '0 6px 0 0',
       				id: 'speakerButton'
       			}
       		]
       };
       
       this.add([fieldSet, speakerContainer]);
    }

});