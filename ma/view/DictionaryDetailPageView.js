// Dictionary Detail Page View - a card in the Carousel used to display a dictionary detail entry
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
		
        items: [
			{
				xtype: 'image'
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
    }
    
});