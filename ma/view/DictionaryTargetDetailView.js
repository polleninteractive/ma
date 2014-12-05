// Dictionary Target Detail View
// Displays the dictionary detail view in a carousel.
// By swiping right/left, the carousel displays the next/previous dictionary detail view in the list view.
// The carousel is a maximum of 5 cards long ie. the current card and two cards to the left and right
// On a swipe to the next page, a new card is added to the end of the carousel and the first one is
// removed. On a a swipe to the previous page, a new card is added to the start of the carousel and the
// last one is removed. 
//
// Configuration:
// listView - must be passed in. This is the list that we use to populate the carousel
// selectedItem - the item that was first selected in the list
//

Ext.define('Sencha.view.DictionaryTargetDetailView', {
    extend: 'Ext.Carousel',
    xtype: 'dictionarytargetdetailview',
    requires: [
        'Sencha.view.DictionaryDetailPageView',
        'Ext.Img'
    ],
    config: {
        title: 'Dictionary',
        fullscreen: true,
        defaults: {
            styleHtmlContent: true
        },
        indicator: false,
        scrollable: {
           direction: 'vertical',
           directionLock: true
        },
           
        // parameters (passed in)
        listView: null,
        selectedItem: null,
           
        // constants
        carouselSize: 5, // size of the carousel ie. number of cards
        carouselBufferSize: 2, // number of cards to left/right of middle ie. carouselBufferSize/2
           
        // class vars/properties
        activeItemTemp: 2, // Set to same as activeItem. Used to figure out if swiped left or right
        currentListItem: 2, // keeps track of which list item is currently displayed in detail view
        imageURL: null // store image URL for use later eg. for panel showing detail
    },
    
           
    // Returns Dictionary Detail View HTML
    // Paramaters:
    // dictionarySourceId - id in DictionarySources
    //
    getDetailViewHTML: function(dictionarySourceId) {
        var record = Ext.getStore("DictionarySources").getById(dictionarySourceId);
        // Get associated DictionaryTarget record using dictionaryTargetId foreign key
        var associatedRecord = Ext.getStore("DictionaryTargets").getById( record.get('dictionaryTargetId') );
           
        // get values, otherwise use null string '' (need to explicitly set this otherways displays 'null')
        var inflection = record.get('inflection')? record.get('inflection') : '';
        var detailedEntry = associatedRecord.get('detailedEntry') ? associatedRecord.get('detailedEntry') : '';
         
        if ( associatedRecord.get('imageURL') ) {
           return '<div class=dictionaryDetail><div class=dictImageThumb><div><img src="' + Sencha.app.getPersistentFileStoreVar() + '/assets/' + associatedRecord.get('imageURL') + '" height="56" /></div></div><div class=dictDetailHeadline><div class=dictDetailTargetWord>' + record.get('targetWord') + '</div><div class=inflection>' + inflection + '</div></div><div class=clear></div><div class=dictDetailViewDetailEntry>' + detailedEntry + '</div></div>';
        }
        // no image for this entry
        else {
           return '<div class=dictionaryDetail><div class=dictDetailHeadline><div class=dictDetailTargetWord>' + record.get('targetWord') + '</div><div class=inflection>' + inflection + '</div></div><div class=clear></div><div class=dictDetailViewDetailEntry>' + detailedEntry + '</div></div>';
        }
    },
    
               
    // On swipe to next/previous card, add card to end/start of carousel and remove card from start/end
    //
    onActiveItemChange: function(carousel, newItem, oldItem) {
        // Current item in carousel
        var currentCarouselItem = this.getInnerItems().indexOf( this.getActiveItem() ); 
        var lastCarouselItem = this.getInnerItems().length-1; // last item in carousel
        
        // if moving to the right
        if ( currentCarouselItem > this.getActiveItemTemp() ) {
           // if the buffer to the right is now less than the carousel buffer size
           if (  ( currentCarouselItem+this.getCarouselBufferSize() ) > lastCarouselItem  ) {
                // Get next record out of carousel bounds
                var record = this.getListView().getStore().getAt( this.getCurrentListItem()+this.getCarouselBufferSize()+1 );
           
                // If there is a record ie. we haven't reached the end of the list
                if (record) {
					var newContainer = Ext.create('Sencha.view.DictionaryDetailPageView', {sourceRecord: record});
					this.add(newContainer);
	            
                    // if there is at least the buffer size to the left
                    if ( currentCarouselItem > (this.getCarouselBufferSize()-1) ) {
                        // remove first item in window
                        this.removeInnerAt(0);
                    }
                }
           }
           
           // set current list pointer to the next item in the list
           this.setCurrentListItem( this.getCurrentListItem()+1 );
        }
        // else moving to the left
        else {
           // if the buffer to the left is now less than the carousel buffer size 
           if (  ( currentCarouselItem-this.getCarouselBufferSize() ) < 0  ) {
                // get next record (to left) out of carousel bounds
                var record = this.getListView().getStore().getAt( this.getCurrentListItem()-(this.getCarouselBufferSize()+1) );
           
                // if there is a record
                if (record) {
                    // add new item to start of carousel
                    var newContainer = Ext.create('Sencha.view.DictionaryDetailPageView', {sourceRecord: record});
                    this.insert(0, newContainer);
                
                    // we've added an item to the start of the array, so we need to reset our variables
                    currentCarouselItem = this.getInnerItems().indexOf( this.getActiveItem() );
                    lastCarouselItem = this.getInnerItems().length-1;
                    // if there is at least the required buffer size to the right
                    if ( (lastCarouselItem-currentCarouselItem)>(this.getCarouselBufferSize()-1)  ) {
                        // remove item from end
                        this.removeInnerAt( lastCarouselItem );
                    }
                }
           }
           // set current list pointer to the next item in the list
           this.setCurrentListItem( this.getCurrentListItem()-1 );
        }  
        // store current active item for comparison next time
        this.setActiveItemTemp(  this.getInnerItems().indexOf( this.getActiveItem() ) );
    }
        
});