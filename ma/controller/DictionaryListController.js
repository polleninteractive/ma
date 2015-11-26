// DICTIONARY LIST CONTROLLER
// Controller for the Dictionary List View. Populates DictionarySourcesFiltered Store used to populate the list view and handling all 
// interactions with it including playing audio, initiating display of detailed entry, searches (including language toggles) and
// initiating sync (which is a pull refresh on the list view)
//

Ext.define('Ma.controller.DictionaryListController', {
	extend: 'Ext.app.Controller',

	config: {
		// Flags used to check state of search filter buttons
		engDictionaryButtonOn: true,
		iwaDictionaryButtonOn: false,
           
		lastSearchString: '',
         
		refs: {
			tabPanel: 'tabview',
			main: 'dictionarynavigationview',
			dictionarySyncConfirmationView: 'dictionarysyncconfirmationview',
			dictionaryListView: 'dictionarylistview',
			dictionaryEntryButton: 'dictionarynavigationview button[id=dictionaryEntryButton]',			
			dictionarySearchField: 'searchfield[name=dictionarySearchField]',
			dictionaryDetailView: 'dictionarytargetdetailview',
			engDictionaryButton: 'button[id=engDictionaryButtonId1]',
			iwaDictionaryButton: 'button[id=iwaDictionaryButtonId1]',
			pullToRefresh: '[id=dictionaryPullToRefresh]'
		},
        
		control: {
			'main': {
				initialize: 'onInit'
			},
			'dictionaryListView': {
				disclose: 'showDetail',
				itemtap: 'playAudio'
			},
			'dictionarySearchField':{        
				keyup:'filterDictionarySearch',
				clearicontap:'clearDictionarySearchFilter'
			},
			'engDictionaryButton' :{
				tap: 'toggleEngDictionaryButton',
				show: 'showDictionaryAddButton'
			},
			'iwaDictionaryButton' :{
				tap: 'toggleIwaDictionaryButton'
			},
			'pullToRefresh':{
				pulled: 'startSynchronisation'
			}
        }
    },
	
	
	init: function (application) {
 		// listen for fired events
        application.on([
			{
            	event: 'refreshdictionarylist',
            	fn: this.filterDictionarySearch,
            	scope: this
        	}
		]);
    },
    
        
    onInit: function() {
        this.initFilterButtons();
    },

   
    // Start synchronisation
    //
    startSynchronisation: function() {
    	if ( this.getApplication().getController('Ma.controller.DictionarySyncController').isSynchronising() == true ) {
    		this.getPullToRefresh().setPullText('Synchronising...');
    	} else { 
    		this.getDictionarySyncConfirmationView().show();
    	}
    },
    
    
    //show detail view for specific dictionary source word
    //
    showDetail: function(list, record, target, index, theEvent) {
        theEvent.stopPropagation(); // need to stop event bubbling up, otherwise ontap event is fired too
           
        // Sencha bug allows the disclosure arrow to be clicked more than once, so check for this
        var innerItems = this.getMain().getInnerItems();
        if ( innerItems.length > 1 ) {
           return;
        }
        
        // Get associated DictionaryTarget record using dictionaryTargetId foreign key
        var dictionaryTargetId = record.get('dictionaryTargetId');
        
        // change dictionary entry button to edit button
        this.getDictionaryEntryButton().setIconCls(null); // turn off icon image used for + sign
        this.getDictionaryEntryButton().setText('EDIT');
        
        // show detail view
        this.getMain().push({
            xtype: 'dictionarytargetdetailview',
            dictionarySourceId: record.get('id'),
            listView: list,
            selectedItem: index
        });
    },
    
    
    // Play audio when list item is selected in list view
    //
    playAudio: function(theDataView, index, target, record) {
		Sencha.app.playAudioAssetAndRelease( record.get('audioURL') );
    },
   
    
    // Clear dictionary search - fired when clear button pressed
    // 
    clearDictionarySearchFilter: function() {
    	this.getDictionarySearchField().setValue('');
        this.filterDictionarySearch();
    }, 
    
        
    // Filter search results - fired when value has changed on dictionarySearchField
    // 
    filterDictionarySearch: function() {
        var searchString = this.getDictionarySearchField().getValue().toLowerCase();
        var doEnglishSearch = this.getEngDictionaryButtonOn();
        var doIwaidjaSearch = this.getIwaDictionaryButtonOn();
        var resultsArray=new Array();
        var db = window.sqlitePlugin.openDatabase({name: "0000000000000001.db"});
        var me = this;
        
        // if nothing entered, showing entries starting with 'a'
        if (searchString=='' || searchString==null) {
			searchString = ''; 
        } else {
        	// escape apostrophe 
			var apostropheRegExp = /'/g;
			searchString = searchString.replace(apostropheRegExp, "''")
			// remove leading and trailing spaces and tabs
			searchString = searchString.replace(/(^\s+|\s+$)/g,'');
        }
           
        // Define select statement
        var whereClause = '';
        if ( doEnglishSearch ) {
        	whereClause = "DICTIONARYSOURCE.sourceWord LIKE '%" + searchString + "%' ORDER BY DICTIONARYSOURCE.sourceWord COLLATE NOCASE ASC;";
        } 
        if ( doIwaidjaSearch ) {
        	whereClause = "DICTIONARYSOURCE.targetWord LIKE '%" + searchString + "%' ORDER BY DICTIONARYSOURCE.targetWord COLLATE NOCASE ASC;";
        }         

        db.transaction(
            function(tx) {
                tx.executeSql(
                    "SELECT DICTIONARYSOURCE.id, DICTIONARYSOURCE.sourceWord, DICTIONARYSOURCE.targetWord, DICTIONARYSOURCE.partOfSpeech, DICTIONARYSOURCE.disambiguation, DICTIONARYSOURCE.dictionaryTargetId, DICTIONARYSOURCE.isEditable, DICTIONARYSOURCE.status, DICTIONARYSOURCE.moderatorComments, DICTIONARYSOURCE.serverId, DICTIONARYSOURCE.inflection, DICTIONARYSOURCE.sourceWordURL, DICTIONARYTARGET.audioURL, DICTIONARYTARGET.imageURL, DICTIONARYTARGET.comments, DICTIONARYTARGET.commentsURL, DICTIONARYTARGET.commentsMediaType, DICTIONARYTARGET.collectorId, DICTIONARYTARGET.speakerId, DICTIONARYTARGET.savedDate, DICTIONARYTARGET.latitude, DICTIONARYTARGET.longitude, DICTIONARYTARGET.recordingDevice, DICTIONARYTARGET.detailedEntry FROM DICTIONARYSOURCE LEFT JOIN DICTIONARYTARGET ON DICTIONARYSOURCE.dictionaryTargetId=DICTIONARYTARGET.id WHERE " + whereClause + " LIMIT 40",
                    [], 
                    function (tx, results) {
                        var len = results.rows.length; // the number of rows returned by the select statement
                        for (var i=0; i<len; i++){
                        	resultsArray[i]=results.rows.item(i);
                        }
                        
                        me.getDictionaryListView().getScrollable().getScroller().scrollTo(0,0); // Sencha bug means if you scroll down then enter search string with shorter searchresults, list appears blank
                        
                        Ext.getStore('DictionarySourcesFiltered').setData(resultsArray); 
					}, 
                    function (tx, err) {
                        alert("Error querying dictionary database: "+err.message);    
                    }
                );
            },
            function(tx, err) {
                alert("Error opening database transaction. Error: " + err.message);
            }
        );
    },        
    
    
    // Initialise button states
    //
    initFilterButtons: function() {
        if ( this.getEngDictionaryButtonOn() ) {
           this.getIwaDictionaryButton().addCls('toggleButtonOff');
        } else {
           this.getEngDictionaryButton().addCls('toggleButtonOff');
        }
		
		this.filterDictionarySearch();
    },
           
           
    // Toggle Iwaidja search on
    //
    toggleIwaDictionaryButton: function() {
        if ( this.getEngDictionaryButtonOn() ) {
           // turn Eng button off
           this.setEngDictionaryButtonOn(false); 
           this.getEngDictionaryButton().addCls('toggleButtonOff'); // change class
           
           // turn Iwa button on
           this.setIwaDictionaryButtonOn(true);
           this.getIwaDictionaryButton().removeCls('toggleButtonOff'); // change class
        } 
        
        // Refilter list now
        this.filterDictionarySearch();
    },
    
    
    // Toggle English search on
    //
    toggleEngDictionaryButton: function() {
        if ( this.getIwaDictionaryButtonOn() ) {
           // turn Iwa button off
           this.setIwaDictionaryButtonOn(false); 
           this.getIwaDictionaryButton().addCls('toggleButtonOff'); // change class
           
           // turn Eng button on
           this.setEngDictionaryButtonOn(true);
           this.getEngDictionaryButton().removeCls('toggleButtonOff'); // change class
        } 
           
        // Refilter list now
        this.filterDictionarySearch();   
    }
   
});
