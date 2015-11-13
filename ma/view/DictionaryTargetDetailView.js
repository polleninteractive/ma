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

Ext.define('Ma.view.DictionaryTargetDetailView', {
    extend: 'Ext.Carousel',
    xtype: 'dictionarytargetdetailview',
    requires: [
        'Ma.view.DictionaryDetailPageView',
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
    }
        
});