// DICTIONARY DETAIL PAGE VIEW CONTROLLER
// populates card in carousel using passed in Card instance
//

Ext.define('Ma.controller.DictionaryDetailPageViewController', {
    extend: 'Ext.app.Controller',
  
    config: { 
        refs: {
            dictionaryDetailPageView: 'dictionarydetailpageview'
        },
         
        control: {
            'dictionaryDetailPageView' :{
           		initialize: 'populateView'
            }
        }
    },

               
    // Display detailed dictionary entry
    //
    populateView: function(me, eOpts) {
    	if ( !me || me==null || me==undefined ) { // if this not defined, then leave (initialize event gets fired on pop sometimes
    		console.log('this not defined...');
    		return;
    	}
    	 
		// Get details to display
		var inflection = me.getSourceRecord().get('inflection') ? me.getSourceRecord().get('inflection') : '';
		var detailedEntry = ( me.getSourceRecord().get('detailedEntry')!=null && me.getSourceRecord().get('detailedEntry')!=undefined ) ? me.getSourceRecord().get('detailedEntry') : '';
		var targetWord = ( me.getSourceRecord().get('targetWord')!=null && me.getSourceRecord().get('targetWord')!=undefined ) ? me.getSourceRecord().get('targetWord') : '';
		console.log('targetWord = ' + me.getSourceRecord().get('targetWord') );
		var moderatorComments = ( me.getSourceRecord().get('moderatorComments') != null) ? ('Moderator says: '+me.getSourceRecord().get('moderatorComments') ) : '';
		var status = me.getSourceRecord().get('status');
		var statusReport = (status==null || status==undefined) ? '' : Sencha.app.getDictionaryStatus()[status];
		console.log('statusReport = ' + statusReport);
		console.log('dialect = ' + me.getSourceRecord().get('dialect') );
		var targetWordDialectStyling = ( me.getSourceRecord().get('dialect')==2 ) ? '"dictDetailTargetWord dialect"' : 'dictDetailTargetWord';
		 
    	// Display Header text
		me.getAt(1).getAt(1).setHtml('<div class=dictDetailHeadline><div class=' + targetWordDialectStyling + '>' + targetWord + '</div><div class=inflection>' + inflection + '</div></div>');
					 
		// Display main dictionary entry text				
		me.setAudioURL( me.getSourceRecord().get('audioURL') ); // Store audioURL for later
		me.getAt(2).setHtml('<div class=dictionaryDetail><div class=dictDetailViewDetailEntry>' + detailedEntry + '</div><div class=contributionStatus>' + statusReport + '</div><div class=moderatorComments>' + moderatorComments + '</div></div>');
									
		// Hide speaker icon if no audio
		if ( !me.getSourceRecord().get('audioURL') ) {
			me.getAt(1).getAt(0).setHidden(true);
		}
		
		// display image
		if ( me.getSourceRecord().get('imageURL') ) {
			if ( device.platform == "Android" ) {
				imageThumbURL = Sencha.app.getAssetsFolder() + me.getSourceRecord().get('imageURL');
			} 
			// else iOS
			else {
				//imageThumbURL = Sencha.app.getPersistentFileStoreVar() + '/assets/' + dictTargetResults.rows.item(0).imageURL;
				imageThumbURL = Sencha.app.getAssetsFolder() + me.getSourceRecord().get('imageURL');
			} 

			me.getAt(0).setHidden(false);
			me.getAt(0).setHtml('<div><img src="' + imageThumbURL + '" /></div>');
		} else {
			me.getAt(0).setHidden(true); // hide image
		}					
    }
           
});
