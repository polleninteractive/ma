// DICTIONARY DETAIL CONTROLLER
// Creates an infinite carousel for displaying detailed dictioanry entries
// As well as traversing to next/previous card, the carousel also handles 
// image tap if the detailed dictionary entry includes an image
//

Ext.define('Ma.controller.DictionaryDetailController', {
    extend: 'Ext.app.Controller',
  
    config: { 
        refs: {
            main: 'dictionarynavigationview',
            dictionaryDetailView: 'dictionarytargetdetailview',
            dictionaryEntryButton: 'button[id=dictionaryEntryButton]',
            dictionaryImageThumb: 'image[id=dictionaryImageButton]',
            imageContainer: 'container[id=imageContainer]'
        },
         
        control: {
            'dictionaryDetailView' :{
           		initialize: 'onShowDictionaryDetailView',
                activeitemchange: 'onActiveItemChange'
            },
            
           'dictionaryImageThumb' : {
                tap: 'onDictionaryImageButtonTap'
            }
        }
    },

               
    // Create infinite carousel of dictionary detail views
    //
    onShowDictionaryDetailView : function(carousel) {
        var activeItemIndex = null;
        var carouselSize = carousel.getCarouselSize();
        var carouselBufferSize = carousel.getCarouselBufferSize();      
        var listIndex = carousel.getSelectedItem() - carouselBufferSize; // minus two because we have two either side
            
        var activeItemIndex = Math.floor(carouselSize/2); // defaults to the middle 
    
        // if near start of list and carousel window goes beyond bounds, then start at 0
        if (listIndex<0) {
           listIndex = 0;
        }
           
        // Populate carousel with up to 5 items
        for (i=0; i<carouselSize; i++) {
           var record = carousel.getListView().getStore().getAt(listIndex);
           
           // if this record exists ie. within bounds of the list view
           if (record) {
                // if this is the item clicked on, remember it
                if (listIndex == carousel.getSelectedItem() ) {
                    activeItemIndex = i;
                }
            
                // Add card to carousel including HTML content
           		var newContainer = Ext.create('Ma.view.DictionaryDetailPageView', {sourceRecord: record, navigationView: this.getMain() });

                this.getDictionaryDetailView().add(newContainer);
           
                listIndex++;
           }
           // else no more records left in list
           else {
                break;
           }
        }
           
        // Store the currently active item - used for comparison later
        this.getDictionaryDetailView().setActiveItemTemp(activeItemIndex);
        // Set the active item ie. which card to show (Note: this trigger onActiveItemChange, see below)
        this.getDictionaryDetailView().setActiveItem(activeItemIndex);
        // Set the list pointer - used to keep track of which item in the list is displayed in carousel
        this.getDictionaryDetailView().setCurrentListItem( this.getDictionaryDetailView().getSelectedItem() );
    },
    
   
	// Handle swipe gesture to left/right
	//        
    onActiveItemChange: function(carousel, newItem, oldItem) {
        // activeItemchange event is over zealous. Captures not just card changes but also setActiveItem
        // and even when leaving the carousel returning to list view. So need to detect these cases 
        var innerItems = this.getMain().getInnerItems();
        var currentItem = innerItems[innerItems.length-1].xtype; 
        if (currentItem == "dictionarycontainerlist") {
            return;
        }
           
        // Do nothing if this has been triggered by setting active item during initialization or this is the first item added (which also triggers this event)
        if ( carousel.getActiveItemTemp()==carousel.getActiveIndex() || carousel.getInnerItems().length==1 ) {
           return;
        }
           
        // Current item in carousel
        var currentCarouselItem = carousel.getActiveIndex(); 
        var lastCarouselItem = carousel.getInnerItems().length-1; // last item in carousel
           
        // if moving to the right
        if ( currentCarouselItem > carousel.getActiveItemTemp() ) {
           // if the buffer to the right is now less than the carousel buffer size
           if (  ( currentCarouselItem+carousel.getCarouselBufferSize() ) > lastCarouselItem  ) {
				// Get next record out of carousel bounds
                var record = carousel.getListView().getStore().getAt( carousel.getCurrentListItem()+carousel.getCarouselBufferSize()+1 );
        
                // If there is a record ie. we haven't reached the end of the list
                if (record) {
                    var newContainer = Ext.create('Ma.view.DictionaryDetailPageView', {sourceRecord: record});
                    carousel.add(newContainer);
           
                    // if there is at least the buffer size to the left
                    if ( currentCarouselItem > (carousel.getCarouselBufferSize()-1) ) {
                        // remove first item in window
                        carousel.getAt(0).remove();
                    }
                }
           }
           
           // set current list pointer to the next item in the list
           carousel.setCurrentListItem( carousel.getCurrentListItem()+1 );
        }
        // else moving to the left
        else {
           // if the buffer to the left is now less than the carousel buffer size 
           if (  ( currentCarouselItem-carousel.getCarouselBufferSize() ) < 0  ) {
                // get next record (to left) out of carousel bounds
                var record = carousel.getListView().getStore().getAt( carousel.getCurrentListItem()-(carousel.getCarouselBufferSize()+1) );
           
                // if there is a record
                if (record) {
                    // add new item to start of carousel
                    var newContainer = Ext.create('Ma.view.DictionaryDetailPageView', {sourceRecord: record});
                    this.getDictionaryDetailView().insert(0, newContainer);
                    carousel.setActiveItem( carousel.getActiveIndex()-1 );
    
                    // we've added an item to the start of the array, so we need to reset our variables
                    currentCarouselItem = carousel.getActiveIndex(); 
                    lastCarouselItem = carousel.getInnerItems().length-1;
                    // if there is at least the required buffer size to the right
                    if ( (lastCarouselItem-currentCarouselItem)>(carousel.getCarouselBufferSize()-1)  ) {
                        // remove item from end
                        carousel.getAt(lastCarouselItem).remove();
                    }
                }
           }
           
           // set current list pointer to the next item in the list
           carousel.setCurrentListItem( carousel.getCurrentListItem()-1 );
        }
           
        // store current active item for comparison next time
        carousel.setActiveItemTemp( carousel.getActiveIndex() );
    },    
           
           
    // Show full screen view of image in new container
    //
    onDictionaryImageButtonTap : function() {
        this.getDictionaryEntryButton().hide(); // hide edit button - we don't want to edit from image
        
        if ( device.platform != "Android" ) {
           this.getMain().getLayout().setAnimation('flip'); // set animation
        }
          
        var curRecord = this.getDictionaryDetailView().getListView().getStore().getAt( this.getDictionaryDetailView().getCurrentListItem() );
        if ( device.platform == "Android" ) {
        	imageDetailURL = Sencha.app.getAssetsFolder() + curRecord.get('imageURL');
    	}  
       	// else iOS
       	else {
       		imageDetailURL = Sencha.app.getPersistentFileStoreVar() + '/assets/' + curRecord.get('imageURL');
       	}
        
        var newImageView = Ext.create('Ma.view.ImageView');
        this.getMain().add(newImageView);
        this.getImageContainer().setHtml('<div class=dictImage><img src="' + imageDetailURL + '" /></div>');
    }
           
});
