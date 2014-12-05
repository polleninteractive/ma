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
                // header container - includes image thumb, target word and speaker button
                xtype: 'container',
                name: 'newContainerHeader',
                cls: 'dictionarydetailheader',
                layout:{
                   type:'vbox',
                   align:'left'
                },
                items: [
                    {
                        xtype: 'image',
                        width: '75px',
                        height: '65px',
                        id: 'dictionaryImageButton',
                        docked: 'left'
                    },
                    {
                        html: ''
                    },
                    {
                        xtype: 'image',
                        text: 'speaker button',
                        cls: 'dictionarySpeakerButton',
                        html: '<img src="images/speaker.png" />',
                        width: '33px',
                        height: '24px',
                        margin: '5 0 0 -1',
                        // Because there are multiple cards in the carousel, each using the same view we cannot distinguish between
                        // button taps so have to include listener on the view
                        listeners : {
                            tap : function() {
                            	Sencha.app.playAudioAssetAndRelease( this.getParent().getParent().getAudioURL() );
                            }
                        }
                    }
                ]
            },
            {
                // main body text of dictionary entry
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
    	 
    	// Display Header text
		var inflection = this.getSourceRecord().get('inflection') ? this.getSourceRecord().get('inflection') : '';
		this.getAt(0).getAt(1).setHtml('<div class=dictDetailHeadline><div class=dictDetailTargetWord>' + this.getSourceRecord().get('sourceWord') + '</div><div class=inflection>' + inflection + '</div></div>');
                     
		// Display main dictionary entry text
		var detailedEntry = ( this.getSourceRecord().get('detailedEntry')!=null && this.getSourceRecord().get('detailedEntry')!=undefined ) ? this.getSourceRecord().get('detailedEntry') : '';
		var moderatorComments = ( this.getSourceRecord().get('moderatorComments') != null) ? ('Moderator says: '+this.getSourceRecord().get('moderatorComments') ) : '';
		var status = this.getSourceRecord().get('status');
		var statusReport = (status==null || status==undefined) ? '' : this.getDictionaryStatus()[status];						
		this.setAudioURL( this.getSourceRecord().get('audioURL') ); // Store audioURL for later
		this.getAt(1).setHtml('<div class=dictionaryDetail><div class=dictDetailViewDetailEntry>' + detailedEntry + '</div><div class=contributionStatus>' + statusReport + '</div><div class=moderatorComments>' + moderatorComments + '</div></div>');
									
		// Hide speaker icon if no audio
		if ( !this.getSourceRecord().get('audioURL') ) {
			this.getAt(0).getAt(2).setHidden(true);
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

			this.getAt(0).getAt(0).setHidden(false);
			this.getAt(0).getAt(0).setHtml('<div class=dictImageThumb><div><img src="' + imageThumbURL + '" /></div></div>');
		} else {
			this.getAt(0).getAt(0).setHidden(true); // hide image
		}					
    }
      
});