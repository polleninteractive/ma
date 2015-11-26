// Dictionary Form View - view used add/edit dictionary entries

Ext.define('Ma.view.DictionaryFormView', {
    extend: 'Ext.Container',
    xtype: 'dictionaryformview',
    requires: [
    	'Ext.Label',
    	'Ext.form.FieldSet',
    	'Ext.field.Toggle'
    ], 
     
    config: {
        title: 'New Entry',
        styleHtmlContent: true,
        scrollable: 'vertical',
        cls: 'formview',
        itemId: 'dictformview',
        customLabelWidth: '40%'
    },   
	
    initialize: function () {
    	this.callParent(arguments);        
        
        // Form for entering source word text
        var sourceFormFieldSet = {
	        xtype: 'fieldset',
	        itemId: 'dictionarySourceFormFieldSet',
	        items: [
	            {
	                xtype: 'textfield',
	                name : 'sourceword',
	                placeHolder: Sencha.app.getFirstLanguageName(),
                    itemId: 'sourceWordField',
                    value: '',
                    autoCapitalize: false
	            }
        	]
		};
        
        // Source word recorder
        var sourceSoundRecorder = {
           xtype: 'container',
           layout: 'vbox',
           cls: 'soundrecordercontainer',
           items:[
				{
					xtype: 'container',
					margin: '0px 10px 7px 10px',
					layout: {
						type: 'hbox',
						pack: 'center'
					},
                  
					items:[
						{
							xtype: 'soundrecorder',
							cls: 'audioRecordButtonCls',
							itemId: 'sourceWordRecordButton',
							flex: 1
						},
						{
							xtype: 'soundrecorder',
							cls: 'audioStopButtonCls',
							itemId: 'sourceWordStopButton',
							flex: 1
						},
						{
							xtype: 'soundrecorder',
							cls: 'audioPlayButtonCls',
							itemId: 'sourceWordPlayButton',
							flex: 1
						}
					]
				}
			]
		};
        
        // target word/translation text
		var targetFormFieldSet = {
	        xtype: 'fieldset', 
	        itemId: 'dictionaryTargetFormFieldSet',
	        items: [
				{
	                xtype: 'textfield',
	                name : 'targetword',
	                placeHolder: Sencha.app.getSecondLanguageName(),
	                itemId: 'targetWordField',
                    value: '',
                    autoCapitalize: false
				}
	        ]
		};
        
        // Record target/translation
        var soundRecorder = {
           xtype: 'container',
           layout: 'vbox',
           cls: 'soundrecordercontainer',
           items:[
				{
					xtype: 'container',
					itemId: 'audiobuttonscontainer',
					margin: '0px 10px 7px 10px',
					layout: {
						type: 'hbox',
						pack: 'center'
					},
                  
					items:[
						{
							xtype: 'soundrecorder',
							cls: 'audioRecordButtonCls',
							itemId: 'targetWordRecordButton',
							flex: 1
						},
						{
							xtype: 'soundrecorder',
							cls: 'audioStopButtonCls',
							itemId: 'targetWordStopButton',
							flex: 1
						},
						{
							xtype: 'soundrecorder',
							cls: 'audioPlayButtonCls',
							itemId: 'targetWordPlayButton',
							flex: 1
						}
					]
				}
			]
		};
        
        // Form for entering comments text
        var commentsFormFieldSet = {
	        xtype: 'fieldset',
	        itemId: 'dictionaryCommentsFormFieldSet',
	        items: [
	            {
	                xtype: 'textfield',
	                name : 'sourceword',
                    itemId: 'dictionaryCommentsField',
					placeHolder: 'Comments',
                    value: '',
                    autoCapitalize: false
	            }
        	]
		};
        
		// Comments recorder
		var commentsSoundRecorder = {
			xtype: 'container',
			layout: 'vbox',
			cls: 'soundrecordercontainer',
			items:[
			/*
				{
					cls: 'recordnewentrytitle',
					html: 'Record comment',
					margin: '6px 0 0 7px'
				},
			*/
				{
					xtype: 'container',
					margin: '0px 10px 7px 10px',
					layout: {
						type: 'hbox',
						pack: 'center'
					},
                  
					items:[
						{
							xtype: 'soundrecorder',
							cls: 'audioRecordButtonCls',
							itemId: 'dictionaryCommentsRecordButton',
							flex: 1
						},
						{
							xtype: 'soundrecorder',
							cls: 'audioStopButtonCls',
							itemId: 'dictionaryCommentsStopButton',
							flex: 1
						},
						{
							xtype: 'soundrecorder',
							cls: 'audioPlayButtonCls',
							itemId: 'dictionaryCommentsPlayButton',
							flex: 1
						}
					]
				},
				{
               		xtype: 'togglefield',
    				label: 'Use video',
    				itemId: 'dictionaryCommentsVideoToggle',
    				labelWidth: this.getCustomLabelWidth()
					//margin: '6px 0 0 7px'
				}
			]
		};
      
	
		var metadataContainer = {
       		xtype: 'container',
       		layout: 'hbox',
            cls: 'metadatacontainer',
            margin: '0 0 0 0',
           
       		items:[
       			{
       				xtype: 'label',
       				html: 'Metadata',
                    margin: '0 0 0 7px',
                    itemId: 'metadataformtitle'
       			},
       			{
       				xtype: 'spacer'
       			},
       			{
       				xtype: 'button',
       				itemId: 'dicMetadataButton',
                    margin: '0 6px 0 0'
       			}
       		]
       };
       	
       	
		var imageCapture = {
			xtype: 'container',
			layout: 'hbox',
			itemId: 'imagecapturecontainer',
			items:[
				{
					xtype: 'button',
					ui: 'round',
					cls: 'addImageButtonCls',
					itemId: 'addImageButton',
					html: 'Add<br />photo',
					/*text: 'Add photo',*/
					margin: '7',
					width: '60px',
					height: '60px'
				}
			]
		};
            
		var deleteContainer = {
			xtype: 'container',
			layout: 'hbox',
			cls: 'deletecontainer',
			itemId: 'deletecontainer',
			items:[
				{
					itemId: 'deletebutton',
					xtype: 'button',
					text: 'Delete Entry',
					ui: 'decline',
					margin: '7',
					flex: 1,
					height: '40px'
				}
			]
		}; 
           
		//this.add([targetFormFieldSet, soundRecorder, sourceFormFieldSet, sourceSoundRecorder, commentsFormFieldSet, commentsSoundRecorder, imageCapture, metadataContainer, deleteContainer]);
		this.add([targetFormFieldSet, soundRecorder, sourceFormFieldSet, sourceSoundRecorder, commentsFormFieldSet, commentsSoundRecorder, imageCapture, deleteContainer]);
	}

});