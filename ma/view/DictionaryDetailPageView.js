// Dictionary Detail Page View - displays a dictionary detail entry
//

Ext.define('Ma.view.DictionaryDetailPageView', {
    extend: 'Ext.Container',
    xtype: 'dictionarydetailpageview',
    config: {
        cls: 'dictionarydetailpage',
        scrollable: {
           direction: 'vertical',
           directionLock: true
        },   
         
        // Properties
        sourceRecord: null,
        audioURL: null,
        dictionaryStatus: [
        	"", 												// 0: no contribution made (isEditable=0)
			"Contribution not yet uploaded", 					// 1: contribution made but not uploaded yet (isEditable=1)
			"Contribution uploaded and awaiting moderation",	// 2: contribution uploaded, waiting to be moderated (isEditable=0)
			"Contribution approved",							// 3: contribution approved (isEditable=0)
			"Contribution approved with changes",				// 4: contribution approved with changes (isEditable=0)
			"", // left blank									// 5: blank 
			"Contribution deleted",								// 6: contribution request for delete approved (isEditable na.)
			"Contribution declined"								// 7: contribution declined this time (isEditable=1)
		],
		
        items: [
			{
				xtype: 'image'
				//id: 'dictionaryImageButton'
			},
			{
                // header container - includes speaker button and target word
                xtype: 'container',
                name: 'newContainerHeader',
                cls: 'dictionarydetailheader',
                layout:{
                   type:'hbox',
                   align:'left'
                },
                items: [
                    {
                        xtype: 'image',
                        text: 'speaker button',
                        cls: 'dictionarySpeakerButton',
                        html: '<img src="images/speaker.png" />',
                        width: '24px',
                        // Because there are multiple cards in the carousel, each using the same view we cannot distinguish between
                        // button taps so have to include listener on the view
                        listeners : {
                            tap : function() {
                            	Sencha.app.playAudioAssetAndRelease( this.getParent().getParent().getAudioURL() );
                            }
                        }
                    },
					// Used to display translation etc.
                    {
                        html: ''
                    }
                ]
            },
            {
                // main body text of dictionary entry ie. english translation
                html: ''
            }
        ]
    },
    
             
    // Display detailed dictionary entry
    //
    initialize: function() {
    	var me = this;
    	
    	if ( !me || me==null || me==undefined ) { // if this not defined, then leave (initialize event gets fired on pop sometimes
    		console.log('this not defined...');
    		return;
    	}
    	 
		// Get details to display
		var inflection = this.getSourceRecord().get('inflection') ? this.getSourceRecord().get('inflection') : '';
		var detailedEntry = ( this.getSourceRecord().get('detailedEntry')!=null && this.getSourceRecord().get('detailedEntry')!=undefined ) ? this.getSourceRecord().get('detailedEntry') : '';
		var targetWord = ( this.getSourceRecord().get('targetWord')!=null && this.getSourceRecord().get('targetWord')!=undefined ) ? this.getSourceRecord().get('targetWord') : '';
		console.log('targetWord = ' + this.getSourceRecord().get('targetWord') );
		console.log('macro targetWord = ' + targetWord );
		var moderatorComments = ( this.getSourceRecord().get('moderatorComments') != null) ? ('Moderator says: '+this.getSourceRecord().get('moderatorComments') ) : '';
		var status = this.getSourceRecord().get('status');
		var statusReport = (status==null || status==undefined) ? '' : this.getDictionaryStatus()[status];
		console.log('dialect = ' + this.getSourceRecord().get('dialect') );
		var targetWordDialectStyling = ( this.getSourceRecord().get('dialect')==2 ) ? '"dictDetailTargetWord dialect"' : 'dictDetailTargetWord';
		console.log('targetWordDialectStyling = ' + targetWordDialectStyling);
		 
    	// Display Header text
		this.getAt(1).getAt(1).setHtml('<div class=dictDetailHeadline><div class=' + targetWordDialectStyling + '>' + targetWord + '</div><div class=inflection>' + inflection + '</div></div>');
                     
		// Display main dictionary entry text				
		this.setAudioURL( this.getSourceRecord().get('audioURL') ); // Store audioURL for later
		this.getAt(2).setHtml('<div class=dictionaryDetail><div class=dictDetailViewDetailEntry>' + detailedEntry + '</div><div class=contributionStatus>' + statusReport + '</div><div class=moderatorComments>' + moderatorComments + '</div></div>');
									
		// Hide speaker icon if no audio
		if ( !this.getSourceRecord().get('audioURL') ) {
			this.getAt(1).getAt(0).setHidden(true);
		}
		
		// display image
		if ( this.getSourceRecord().get('imageURL') ) {
			if ( device.platform == "Android" ) {
				imageThumbURL = Sencha.app.getAssetsFolder() + this.getSourceRecord().get('imageURL');
			} 
			// else iOS
			else {
				//imageThumbURL = Sencha.app.getPersistentFileStoreVar() + '/assets/' + dictTargetResults.rows.item(0).imageURL;
				imageThumbURL = Sencha.app.getAssetsFolder() + this.getSourceRecord().get('imageURL');
			} 

			this.getAt(0).setHidden(false);
			this.getAt(0).setHtml('<div><img src="' + imageThumbURL + '" /></div>');
		} else {
			this.getAt(0).setHidden(true); // hide image
		}					
    }
      
});