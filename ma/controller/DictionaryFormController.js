// DICTIONARY FORM CONTROLLER
// Controller to handle adding and editing dictionary entries
//

Ext.define('Ma.controller.DictionaryFormController', {
    extend: 'Ext.app.Controller',

    config: {
    	// constants
    	AWAITINGUPLOADSTATUS: 1, // Status code for a new Dictionary entry or suggested change that has not yet been uploaded
    	
    	// properties
    	lastButtonPressedId: null, // used after callback so we know deduce parameter gets assigned recorded audio
    	// used to store URLs to audio files just recorded and saved in temporary store
		sourceWordURLinTFS: null, 
		targetWordURLinTFS: null,
		commentsURLinTFS: null,
		imageURLinTFS: null,
        sourceWordURL: '',
        audioURL: '',
        commentsURL: '',
        commentsMediaType: null, // 0 = audio (default), 1 = video
        imageURL: '',
        currentDate: "",
        currentLatitude: "",
        currentLongitude: "",
        recordingDevice: "",
        //speaker form
        speakerName: "",
        speakerDOB: 0,
        speakerGender: "",
        speakerComment: "",
		//id's
		sourceId: "",
        targetId: "",
        collectorId: "",
        speakerId: "",
		
        
        refs: {
        	main: 'dictionarynavigationview', 
        	dictionaryListView: 'dictionarylistview',
        	dictionaryEntryButton: 'dictionarynavigationview button[id=dictionaryEntryButton]',
			dictionaryDetailView: 'dictionarytargetdetailview',
			
			sourceWordRecordButtonRef: 'dictionarynavigationview #sourceWordRecordButton',
			sourceWordStopButtonRef: 'dictionarynavigationview #sourceWordStopButton',
			sourceWordPlayButtonRef: 'dictionarynavigationview #sourceWordPlayButton',
			targetWordRecordButtonRef: 'dictionarynavigationview #targetWordRecordButton',
			targetWordStopButtonRef: 'dictionarynavigationview #targetWordStopButton',
			targetWordPlayButtonRef: 'dictionarynavigationview #targetWordPlayButton',
			commentsRecordButtonRef: 'dictionarynavigationview #dictionaryCommentsRecordButton',
			commentsStopButtonRef: 'dictionarynavigationview #dictionaryCommentsStopButton',
			commentsPlayButtonRef: 'dictionarynavigationview #dictionaryCommentsPlayButton',
			commentsVideoToggleRef: 'dictionarynavigationview #dictionaryCommentsVideoToggle',
			 
			dictionarySourceWordForm: 'dictionarynavigationview #dictionarySourceFormFieldSet', 
			dictionaryTargetWordForm: 'dictionarynavigationview #dictionaryTargetFormFieldSet',
			dictionaryCommentsForm: 'dictionarynavigationview #dictionaryCommentsFormFieldSet',
			addImageButtonRef: 'dictionarynavigationview #addImageButton',
			
			photoSourceSelectView: 'photosourceselectview',
			dictionaryDeleteButton: 'dictionarynavigationview #deletebutton',
			dictionaryDeleteContainer: 'dictionarynavigationview container #deletecontainer', 
			dictionaryMetadataContainer: 'dictionarynavigationview dictionarynavigationview container[cls=metadatacontainer]',
			dictionaryMetadataButton: 'dictionarynavigationview #dicMetadataButton',
			
			/* metadata form */
			//dicMetadaForm: 'dictionarynavigationview fieldset[id="metadataFieldset"]',
			dicMetadaForm: 'dictionarynavigationview #metadataFieldset',
			metaDataFormSpeakerButtonRef: 'dictionarynavigationview #speakerButton',
			
			//speaker
			speakerFieldSet: 'dictionarynavigationview #speakerFieldset',
			speakerNameField: 'dictionarynavigationview #speakerNameField',
			speakerGenderField: 'dictionarynavigationview radiofield[name="speakerGender"]',
			speakerCommentField: 'dictionarynavigationview #speakerCommentField',
			speakerDOBField: 'dictionarynavigationview #speakerDOBField',
           
			videoPlayerRef: 'dictionarynavigationview #videoPlayer'
        },
        control: {
			'sourceWordRecordButtonRef':{
				tap:'recordMedia'
			},
			'sourceWordStopButtonRef':{
				tap:'stopMedia'
			},
			'sourceWordPlayButtonRef':{
				tap:'prepareMedia'
			},
			'targetWordRecordButtonRef':{
				tap:'recordMedia'
			},
			'targetWordStopButtonRef':{
				tap:'stopMedia'
			},
			'targetWordPlayButtonRef':{
				tap:'prepareMedia'
			},
			'commentsPlayButtonRef':{
				tap:'prepareMedia'
			},
			'commentsRecordButtonRef':{
				tap:'recordMedia'
			},
			'commentsStopButtonRef':{
				tap:'stopMedia'
			},
			'addImageButtonRef':{
				tap:'onAddImageTap'
			},
			'dictionaryMetadataButton':{
				tap:'showMetadataForm'
			},
			'metaDataFormSpeakerButtonRef':{
				tap:'showSpeakerForm'
			},
			'dictionaryDeleteButton':{
				tap:'deleteDictionaryEntry'
			}
        }
    },


	init: function (application) {
 		// listen for fired events (from DictionaryFormController)
        application.on([
			{
            	event: 'showdictionaryentryform',
            	fn: this.showForm,
            	scope: this
        	},
			{
            	event: 'editdictionaryentryform',
            	fn: this.editForm,
            	scope: this
        	},
			{
            	event: 'remembernewdictionarymetadataformdetails',
            	fn: this.rememberNewMetaData,
            	scope: this
        	},
			{
            	event: 'remembernewdictionaryspeakerformdetails',
            	fn: this.rememberNewSpeakerDetails,
            	scope: this
        	},
			{
            	event: 'savenewdictionaryentry',
            	fn: this.saveDictEntryForm,
            	scope: this
        	},
			{
            	event: 'updateexistingdictionaryentry',
            	fn: this.updateForm,
            	scope: this
        	},
			{
            	event: 'addDictionaryImage',
            	fn: this.addImage,
            	scope: this
        	}
		]);
    },


	// Create video view and play video
	//
	showVideo: function(videoURL) {
		console.log('showing video... ' + videoURL);
		
		this.getMain().push({
			xtype: 'videoview'
		});	
            
		this.getVideoPlayerRef().setUrl(videoURL);
            
		// if iOS enable controls (controls don't work in Android)
		if ( device.platform == "iOS" ) { 
			this.getVideoPlayerRef().setEnableControls(true);
		}
	},
	
	
	//	Stop temporary media (audio or video) just recorded
	//
	stopMedia: function(button, mediaURL) {
		Sencha.app.stopAudioAndRelease();
	},
	
	
	//	Play temporary media (audio or video) just recorded
	//
	playMedia: function(button, mediaURL) {
		// if Comments play button pressed, and current comment is a video
        if ( button.getId() == "dictionaryCommentsPlayButton" && this.getCommentsMediaType() == 1 ) {
    		this.showVideo(mediaURL);
        } else {
        	Sencha.app.playAudioAndRelease(mediaURL);
        }
	},


	// Play media (audio or video) already saved to assets folder 
	//
	playMediaAsset: function(button, mediaURL) {
	
		// if Comments play button pressed, and current comment is a video
        if ( button.getId() == "dictionaryCommentsPlayButton" && this.getCommentsMediaType() == 1 ) {
    		this.showVideo(mediaURL);
        } else {
        	Sencha.app.playAudioAssetAndRelease(mediaURL);
        }
	},


	// Media Play (from form)
	// If we have a respective audio file URL in the temporary file system
	// then play that, else use respective URL in store
    //
    prepareMedia: function(button) {
		console.log('preparing...');
    	// get audioURL depending on play button pressed
    	var audioURLinTFS = null;
    	var audioURLinDb = null;
    	
    	// get URL of media to play
    	switch ( button.getItemId() ) {
    		case "sourceWordPlayButton":
    			audioURLinTFS = this.getSourceWordURLinTFS(); // Plan A: get URL in temporary fiel system
    			audioURLinDb = this.getSourceWordURL();  // Plan B: get URL in database
    			break;
    		case "targetWordPlayButton":
    			audioURLinTFS = this.getTargetWordURLinTFS();
    			audioURLinDb = this.getAudioURL();
    			break;
    		case "dictionaryCommentsPlayButton":
    			audioURLinTFS = this.getCommentsURLinTFS();
    			audioURLinDb = this.getCommentsURL();
    			break;
    	}
    	console.log('button.getItemId() = ' + button.getItemId());
		console.log('audioURLinTFS = ' + audioURLinTFS);
		
        var audioURL = null;
        // If there's a (new) audio file in TFS then play it, otherwise try to play from db
        if ( audioURLinTFS ) {
        	this.playMedia(button, audioURLinTFS);
        } else {
           if ( audioURLinDb ) {
        		this.playMediaAsset(button, audioURLinDb);
			}
        }
    },


    // Utility function, assigns recorded audio to parameter based on last pressed button id
	// MDM 16.05.2013
	assignMedia: function(filename) {
		// assign media depending on last button pressed
		switch( this.getLastButtonPressedId() ) {
			case "sourceWordRecordButton":
				this.setSourceWordURLinTFS( filename );
				break;
			case "targetWordRecordButton":
				this.setTargetWordURLinTFS( filename );
				break;   
			case "dictionaryCommentsRecordButton":
				this.setCommentsURLinTFS( filename );
				break;
		}
	},


    // AudioEncode error callback
    //
    failedAudioEncode: function(statusCode) {
        console.log("failed successfulAudioEncode because:" + statusCode);
    },
    

    // Media capture
    // Records audio or video to temporary file system. 
    // For iOS which records in wav format, removes .m4a file if it exists then calls
    // audio encode to convert to m4a
    //
    recordMedia: function(button) {
    	// remember which button pressed (used in callback to assign audio to respective parameter)
    	this.setLastButtonPressedId( button.getItemId() );
    	var me = this; // remember me
    
    	// filesystem error callback
        function errorCB(error) {
           console.log('An error occurred during media capture');
		   console.log('An error occurred during media capture: ' + error.code);
           var msg = 'An error occurred during media capture: ' + error.code;
           navigator.notification.alert(msg, null, 'Capture error');
        }
    
    	// capture success callback
    	function successCB(mediaFiles) { 
    		// remember whether audio or video was captured
    		me.setCommentsMediaType( me.getCommentsVideoToggleRef().getValue() );
    	 
            if ( device.platform == "Android" ) {
           		me.assignMedia( mediaFiles[0].fullPath.replace('file:/', 'file:///' ) );
           		
			// else iOS
        	} else { 
        		if ( me.getCommentsMediaType() == 1 ) {
        			console.log('Video recorded. No need to rename, encode etc.');
                    me.assignMedia( mediaFiles[0].fullPath );
                    console.log('media filename = ' + mediaFiles[0].fullPath);
        			return;
        		}
     
     			// rename with unique filename (date and time)
               	window.requestFileSystem(
                   	LocalFileSystem.TEMPORARY, 
                   	0, 
                   	// Request file system success callback
                   	function(fileSystem){
                        fileSystem.root.getFile(
							mediaFiles[0].name,
                           	{ create: false, exclusive: false }, 
                           	// FileSystem Success callback (found file) 
                            function success(entry) {
								// get parent directory of file we want to rename (we have to use Phonegap moveTo fn.)
                                entry.getParent(
									function success(parent) {
										// Create unique filename to avoid problems with multiple files 
										var d = new Date();
										var newFilename = d.getTime()+'.wav';
										// Rename file (using Phonegap moveTo fn.)
										entry.moveTo( 
											parent, 
											newFilename,
											function success(renamedEntry) {
												var pathToRenamedFile = mediaFiles[0].fullPath.replace(mediaFiles[0].name, newFilename);
												window.encodeAudio(
                                                    pathToRenamedFile,
                                                    function (filename) {
                                                    	me.assignMedia( filename );
                                                    },
                                                    me.failedAudioEncode
                                                );
											},
											errorCB
										);
									},
									errorCB
								);
							},
							errorCB
						);      
					}, 
					errorCB
				);
			}                              
		} // end of successCB
    
	
		// if recording a comment, need to check toggle to see if it's a video comment
		console.log('button.getItemId() = ' + button.getItemId() );
		if ( button.getItemId() == "dictionaryCommentsRecordButton" ) {
			console.log('2 = ' + this.getCommentsVideoToggleRef().getValue() );
			if ( this.getCommentsVideoToggleRef().getValue() == 1 ) {
				console.log('3');
				// launch devices video recording application
				console.log('launching video recorder...');
				
				// Launch device audio recording application
        		navigator.device.capture.captureVideo( 
            		successCB,
            		errorCB,
            		{limit: 1} 
        		);
				
				return;
			}
		}

        // Launch device audio recording application
        navigator.device.capture.captureAudio(
            successCB,
            errorCB,
            {limit: 1} 
        );
    },
    
    
    // Initialise values and show ADD dictionary entry form
    //
   	showForm : function(){
        //this.setAudioURLinTFS(null);
        this.setSourceWordURLinTFS(null); 		
        this.setTargetWordURLinTFS(null);
		this.setCommentsURLinTFS(null);
		this.setCommentsMediaType(null);
        this.setImageURLinTFS(null);
        
        this.setSourceWordURL(null); // make sure audio URLs are null so we dont try to play them
        this.setAudioURL(null); 
        this.setCommentsURL(null);
        this.setTargetId("");
           
        //metadata form - getcurrent date, time
    	var d = new Date();
        this.setCurrentDate( d.getTime() );
               
        // Set location 
        var thisPtr = this;
        navigator.geolocation.getCurrentPosition(
            // Success callback
            function(position) {
				console.log('success get coords');
				console.log('position.coords.latitude = ' + position.coords.latitude);
                thisPtr.setCurrentLatitude( position.coords.latitude );
                thisPtr.setCurrentLongitude( position.coords.longitude ); 
            }, 
            // Error callback
            function(error) {
            	console.log('in GPS fail');
                console.log('code: ' + error.code);
                thisPtr.setCurrentLatitude('');
                thisPtr.setCurrentLongitude('');
            }
        ); 
         
        this.setRecordingDevice( device.model );
        
        //speaker form
        this.setSpeakerName("");
        this.setSpeakerDOB(0);
        this.setSpeakerGender("");
        this.setSpeakerComment("");
       
    	this.getMain().push({
    		xtype: 'dictionaryformview'			                    
        });
        
        this.getDictionaryDeleteContainer().hide();
   	},
   	           
          
    // Display dictionary edit entry form and pre-populate
    //
   	editForm: function(){
		this.setSourceWordURLinTFS(null); 		
		this.setTargetWordURLinTFS(null);
		this.setCommentsURLinTFS(null);
		this.setImageURLinTFS(null);
       
        var curRecord = this.getDictionaryDetailView().getListView().getStore().getAt( this.getDictionaryDetailView().getCurrentListItem() );
           
        // get Id's
        var dictionaryTargetId = curRecord.get('dictionaryTargetId');
        var dictionarySourceId = curRecord.get('id');
           
        // Get speaker
   		if ( curRecord.get('speakerId') != null ) {
   			var speakerStore = Ext.getStore("Speakers").getById( curRecord.get('speakerId') );
		}
		
        // create form
   		this.getMain().push({
   			xtype: 'dictionaryformview',
            title: 'Edit Entry'
   		});
           
		// populate it
        this.getDictionarySourceWordForm().getComponent('sourceWordField').setValue( curRecord.get('sourceWord') );
        this.getDictionaryTargetWordForm().getComponent('targetWordField').setValue( curRecord.get('targetWord') );
   		this.getDictionaryCommentsForm().getComponent('dictionaryCommentsField').setValue( curRecord.get('comments') );
		
        // store id's for convenience later (when saving)
        this.setSourceId(dictionarySourceId);
        this.setTargetId(dictionaryTargetId);
        this.setCollectorId( curRecord.get('collectorId') );
        this.setSpeakerId( curRecord.get('speakerId') );
        
   		// set source word audio URL (so we can play the audio)
        var sourceWordURL = curRecord.get('sourceWordURL');
        if ( sourceWordURL ) {
           this.setSourceWordURL( sourceWordURL );
        } else {
           this.setSourceWordURL(null);
        }
   		
        // set (target/translation) audio URL (so we can play the audio)
        var audioURL = curRecord.get('audioURL');
        if ( audioURL ) {
 			console.log('in if...');
           this.setAudioURL( audioURL );
        } else {
           this.setAudioURL(null);
        }
        
        
        // set comments audio URL (so we can play the audio)
        var commentsURL = curRecord.get('commentsURL');
        if ( commentsURL ) {
           this.setCommentsURL( commentsURL );
        } else {
           this.setCommentsURL(null);
        }
        // set media type
        this.setCommentsMediaType( curRecord.get('commentsMediaType') );
        
        // set image URL and show it on button
        var imageURL = curRecord.get('imageURL');
        if ( imageURL ) {
        	this.setImageURL( imageURL );
        	var fullImagePath = Sencha.app.getAssetsFolder() + imageURL;
 
			// show it
			this.getAddImageButtonRef().setHtml('<div class="addPhotoButtonHolder" style="background:url(' + fullImagePath + '); background-size:cover; background-repeat:no-repeat; background-position:center;">&nbsp;</div>');
        } else {
        	this.setImageURL(null);
        } 
         
		console.log('setting METADATA');
		// METADATA form
		// Set current date and time
    	var d = new Date();
        this.setCurrentDate( d.getTime() );
        // Set location 
        var thisPtr = this;
        navigator.geolocation.getCurrentPosition(
            // Success callback
            function(position) {
				console.log('success get coords');
				console.log('position.coords.latitude = ' + position.coords.latitude);
                thisPtr.setCurrentLatitude( position.coords.latitude );
                thisPtr.setCurrentLongitude( position.coords.longitude ); 
            }, 
            // Error callback
            function(error) {
            	console.log('in GPS fail');
                console.log('code: ' + error.code);
                thisPtr.setCurrentLatitude('');
                thisPtr.setCurrentLongitude('');
            }
        ); 
        // set Device
        this.setRecordingDevice( device.model );
           		
   	    // SPEAKER form
		if (speakerStore != null) {
        	this.setSpeakerName( speakerStore.get('name') );
        	this.setSpeakerDOB( speakerStore.get('birthDate') );
        	this.setSpeakerGender( speakerStore.get('gender') );
        	this.setSpeakerComment( speakerStore.get('comments') );
		}
   		
   		// if this is not an editable record, then disable all fields except comments
   		if ( curRecord.get('isEditable')==0 || curRecord.get('isEditable')==null ) {
   			this.getDictionarySourceWordForm().getComponent('sourceWordField').disable();
        	this.getDictionaryTargetWordForm().getComponent('targetWordField').disable();
			this.getSourceWordRecordButtonRef().disable(); 
			this.getTargetWordRecordButtonRef().disable();
			this.getDictionaryDeleteButton().hide();
   		} else {
			this.getDictionaryDeleteButton().show();
		}
   	},
   	
   	
   	// Checks for target and source word, if none provided these are autofilled and 
   	// a confirmation alert displayed
   	//
   	validateForm: function() {
		console.log('this.getDictionarySourceWordForm() = ' + this.getDictionarySourceWordForm() );
		var newSourceWord = this.getDictionarySourceWordForm().getComponent('sourceWordField').getValue();
		var newTargetWord = this.getDictionaryTargetWordForm().getComponent('targetWordField').getValue();
        newSourceWord = newSourceWord.replace(/^\s+|\s+$/g,""); // remove leading spaces
		newTargetWord = newTargetWord.replace(/^\s+|\s+$/g,"");
		var me = this;
		
		// if no sourceWord or targetWord entered
		if ( !newSourceWord || newSourceWord=='' || !newTargetWord || newTargetWord=='') {
			var d = new Date(); 
			var mins = (d.getMinutes()<10?'0':'') + d.getMinutes(); // mins < 10 does not include preceding 0
			var autoCompleteWord = ' An untitled entry ' + d.toDateString() + ' at ' + d.getHours() + ':' + mins;
			
			// Autofill fields
			if ( !newSourceWord || newSourceWord=='' ) {
				this.getDictionarySourceWordForm().getComponent('sourceWordField').setValue(autoCompleteWord);
			}
			if ( !newTargetWord || newTargetWord=='' ) {
				this.getDictionaryTargetWordForm().getComponent('targetWordField').setValue(autoCompleteWord);
			}
			
			navigator.notification.alert(
				'Dictionary word and/or translation has been autofilled as' + autoCompleteWord,
				 null, 
				 'Autocomplete'
			);
		}
   	},
   	
   	
   	// Save new dictionary entry to database
   	// 
   	saveDictEntryForm : function(){
   		var currentObj = this;
		
        function errorCB(e) {
			var msg = 'An error occurred saving the dictionary entry: ' + e.message;
			console.log(msg);
			navigator.notification.alert(msg, null, 'Save dictionary entry error');
        }
        
        this.validateForm();
        
        var sourceWord = this.getDictionarySourceWordForm().getComponent('sourceWordField').getValue();
        var targetWord = this.getDictionaryTargetWordForm().getComponent('targetWordField').getValue();
        var comments = this.getDictionaryCommentsForm().getComponent('dictionaryCommentsField').getValue();   
          
        var db = window.sqlitePlugin.openDatabase({name: "0000000000000001.db"});
        
        db.transaction(
            function(tx){
            	// Store speaker details
        		tx.executeSql( 
    				'INSERT INTO SPEAKER (id, name, birthDate, gender, comments) VALUES (?, ?, ?, ?, ?)',
    				[null, currentObj.getSpeakerName(), currentObj.getSpeakerDOB(), currentObj.getSpeakerGender(), currentObj.getSpeakerComment()],
    				function(tx,results){
    					// Store speaker id
                        currentObj.setSpeakerId(results.insertId);
                        var dictionarySpeakerId = currentObj.getSpeakerId();
                        var dictionaryCollectorId = 1; // Collector id is always 1
                     
						// Create unique source word audioURL
						var newSourceWordURL = '';
						if ( currentObj.getSourceWordURLinTFS() ) {
							var d1 = new Date(); // create new unique url
							newSourceWordURL = Sencha.app.getDictionaryWordsFolderName() + Sencha.app.getUsername() + d1.getTime() + 'src' + '.' + currentObj.getSourceWordURLinTFS().split('.').pop(); // the last bit gets the file extension
						}
                                      
                        // Create unique audioURL (for target/translation)
                        var newAudioURL = '';
                       	if ( currentObj.getTargetWordURLinTFS() ) {
							var d = new Date(); // create new unique url
							newAudioURL = Sencha.app.getDictionaryWordsFolderName() + Sencha.app.getUsername() + d.getTime() + 'tgt' + '.' + currentObj.getTargetWordURLinTFS().split('.').pop(); // the last bit gets the file extension
						}
                                
						// Create unique comments audioURL
						var newCommentsURL = '';
						if ( currentObj.getCommentsURLinTFS() ) {
							var d3 = new Date(); // create new unique url
							newCommentsURL = Sencha.app.getDictionaryWordsFolderName() + Sencha.app.getUsername() + d3.getTime() + 'cmt' + '.' + currentObj.getCommentsURLinTFS().split('.').pop(); // the last bit gets the file extension
						}
                                     
						//Save imageURL 
						var newImageURL = null;
						if ( currentObj.getImageURLinTFS() ) {
							var d4 = new Date();
							newImageURL = Sencha.app.getImagesFolderName() + Sencha.app.getUsername() + d4.getTime() + 'img' + '.jpg';
						}
                          
                        dictionaryTargetQuery = 'INSERT INTO DICTIONARYTARGET (id, speakerId, collectorId, targetWord, audioURL, imageURL, comments, commentsURL, commentsMediaType, savedDate, latitude, longitude, recordingDevice) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
						dictionaryTargetParams = [null, dictionarySpeakerId, dictionaryCollectorId, targetWord, newAudioURL, newImageURL, comments, newCommentsURL, currentObj.getCommentsMediaType(), currentObj.getCurrentDate(), currentObj.getCurrentLatitude(), currentObj.getCurrentLongitude(), currentObj.getRecordingDevice() ];
						tx.executeSql(
							dictionaryTargetQuery,
							dictionaryTargetParams,
							function(tx, results) {
								currentObj.setTargetId(results.insertId); // Get id of inserted dict. target record
								var dictionaryTargetId = currentObj.getTargetId();
    					        
								var queryDictionarySource = 'INSERT INTO DICTIONARYSOURCE (id, dictionaryTargetId, sourceWord, sourceWordURL, targetWord, isEditable, status) VALUES (?,?,?,?,?,?,?)';
								tx.executeSql(
									queryDictionarySource,
									[null, dictionaryTargetId, sourceWord, newSourceWordURL, targetWord, 1, currentObj.getAWAITINGUPLOADSTATUS()],
									function (tx, results) {
										// if source audio was recorded, save it
										if ( newSourceWordURL ) {
											var newSourceFilename = newSourceWordURL.replace(/^.*[\\\/]/, '');
                                            var destDir = Sencha.app.getWordsFolder();       
											currentObj.moveFileToPersistentStorage(currentObj.getFullURL(currentObj.getSourceWordURLinTFS()), destDir, newSourceFilename, currentObj);
										}
									
										// if target audio was recorded, save it
										if ( newAudioURL ) {
											var newAudioFilename = newAudioURL.replace(/^.*[\\\/]/, '');
											var destDir = Sencha.app.getWordsFolder();
											currentObj.moveFileToPersistentStorage(currentObj.getFullURL(currentObj.getTargetWordURLinTFS()), destDir, newAudioFilename, currentObj);
										}
                                        
                                        // if comments audio was recorded, save it
										if ( newCommentsURL ) {
											var newCommentsFilename = newCommentsURL.replace(/^.*[\\\/]/, '');
                                            var destDir = Sencha.app.getWordsFolder();      
											currentObj.moveFileToPersistentStorage(currentObj.getFullURL(currentObj.getCommentsURLinTFS()), destDir, newCommentsFilename, currentObj);
										}
                                              
										// if a photo was taken, save it
										if ( newImageURL ) {
											var newImageFilename = newImageURL.replace(/^.*[\\\/]/, '');
											var destDir = Sencha.app.getImagesFolder();
											currentObj.moveFileToPersistentStorage(currentObj.getImageURLinTFS(), destDir, newImageFilename, currentObj);
										}
										
										// reload stores
										Ext.getStore("DictionarySources").load();
       									//Ext.getStore("DictionarySourcesFiltered").load();
       									Ext.getStore("DictionaryTargets").load();
										Ext.getStore("Speakers").load();
										Sencha.app.fireEvent('refreshdictionarylist');
									},
									errorCB          
								);
							},
							errorCB
						);
                    },
                    errorCB    
    			);
        	},        
			errorCB
		);
   	},
 
           
    // Returns the full file URL required by window.resolvelocalfilesystemURL. For some reason, the URl returned by
    // audio capture on iOS fails unless 'file://' is prepended to the URL
    //
    getFullURL : function(fileURL) {
        if ( device.platform == "Android" ) {
           return fileURL;
        } else {
           return Sencha.app.getIOSfilestorePrefix() + fileURL;
        }
           
    },
           
   	
   	// Update form - updates an existing dictionary entry with details in form 
   	//
   	updateForm : function(){
   		var currentObj = this;
		
        function errorCB(e) {
			var msg = 'An error occurred upadating the dictionary entry: ' + e.message;
			console.log(msg);
			navigator.notification.alert(msg, null, 'Save dictionary entry error');
        }
        
        this.validateForm();
        
        var sourceWord = this.getDictionarySourceWordForm().getComponent('sourceWordField').getValue();
        var targetWord = this.getDictionaryTargetWordForm().getComponent('targetWordField').getValue();
        var comments = this.getDictionaryCommentsForm().getComponent('dictionaryCommentsField').getValue(); 
		  
        var db = window.sqlitePlugin.openDatabase({name: "0000000000000001.db"});
        db.transaction(
            function(tx){
        		tx.executeSql( 
    				'UPDATE SPEAKER SET name=?, birthDate=?, gender=?, comments=? WHERE id=?;',
    				[currentObj.getSpeakerName(), currentObj.getSpeakerDOB(), currentObj.getSpeakerGender(), currentObj.getSpeakerComment(), currentObj.getSpeakerId() ],
    				function(tx,results){
    					// Store speaker id
                        var dictionarySpeakerId = currentObj.getSpeakerId();
                        var dictionaryCollectorId = 1; // Collector id is always 1
                     
						// Create unique source word URL
						var sourceWordURL = '';
						if ( currentObj.getSourceWordURLinTFS() ) {
							var d1 = new Date(); // create new unique url
							sourceWordURL = Sencha.app.getDictionaryWordsFolderName() + Sencha.app.getUsername() + d1.getTime() + 'src' + '.' + currentObj.getSourceWordURLinTFS().split('.').pop(); // the last bit gets the file extension
						} else {
							sourceWordURL = currentObj.getSourceWordURL();
						}
                                      
                        // Create unique audioURL (for target/translation)
                        var audioURL = '';
                       	if ( currentObj.getTargetWordURLinTFS() ) {
							var d = new Date(); // create new unique url
							audioURL = Sencha.app.getDictionaryWordsFolderName() + Sencha.app.getUsername() + d.getTime() + 'tgt' + '.' + currentObj.getTargetWordURLinTFS().split('.').pop(); // the last bit gets the file extension
						} else {
							audioURL = currentObj.getAudioURL();
						}
                                
						// Create unique comments URL
						var commentsURL = '';
						if ( currentObj.getCommentsURLinTFS() ) {
							var d3 = new Date(); // create new unique url
							commentsURL = Sencha.app.getDictionaryWordsFolderName() + Sencha.app.getUsername() + d3.getTime() + 'cmt' + '.' + currentObj.getCommentsURLinTFS().split('.').pop(); // the last bit gets the file extension
						} else {
							commentsURL = currentObj.getCommentsURL();
						}
                                     
						//Save imageURL 
						var imageURL = '';
						if ( currentObj.getImageURLinTFS() ) {
							var d4 = new Date();
							imageURL = Sencha.app.getImagesFolderName() + Sencha.app.getUsername() + d4.getTime() + 'img' + '.jpg';
						} else {
							imageURL = currentObj.getImageURL();
						}
                        
                        dictionaryTargetQuery = 'UPDATE DICTIONARYTARGET SET speakerId=?, collectorId=?, targetWord=?, audioURL=?, imageURL=?, comments=?, commentsURL=?, commentsMediaType=?, savedDate=?, latitude=?, longitude=?, recordingDevice=? WHERE id=?';
						dictionaryTargetParams = [dictionarySpeakerId, dictionaryCollectorId, targetWord, audioURL, imageURL, comments, commentsURL, currentObj.getCommentsMediaType(), currentObj.getCurrentDate(), currentObj.getCurrentLatitude(), currentObj.getCurrentLongitude(), currentObj.getRecordingDevice(), currentObj.getTargetId() ];
						tx.executeSql(
							dictionaryTargetQuery,
							dictionaryTargetParams,
							function(tx, results) {
								var dictionaryTargetId = currentObj.getTargetId();
								var queryDictionarySource = 'UPDATE DICTIONARYSOURCE SET dictionaryTargetId=?, sourceWord=?, sourceWordURL=?, targetWord=?, status=? WHERE id=?'; 
								var dictionarySourceParams = [dictionaryTargetId, sourceWord, sourceWordURL, targetWord, currentObj.getAWAITINGUPLOADSTATUS(), currentObj.getSourceId() ];
								tx.executeSql(
									queryDictionarySource,
									dictionarySourceParams,
									function (tx, results) {
										// if source audio was recorded, save it
										if ( currentObj.getSourceWordURLinTFS() ) {
											var newSourceFilename = sourceWordURL.replace(/^.*[\\\/]/, '');
                                            var destDir = Sencha.app.getWordsFolder();   
											currentObj.moveFileToPersistentStorage( currentObj.getFullURL(currentObj.getSourceWordURLinTFS()), destDir, newSourceFilename, currentObj);
										}
									
										// if target audio was recorded, save it
										if ( currentObj.getTargetWordURLinTFS() ) {
											console.log('saving target word...');
											var newAudioFilename = audioURL.replace(/^.*[\\\/]/, '');
                                            var destDir = Sencha.app.getWordsFolder();  
											currentObj.moveFileToPersistentStorage(currentObj.getFullURL(currentObj.getTargetWordURLinTFS()), destDir, newAudioFilename, currentObj);
										}
                                        
                                        // if comments audio was recorded, save it
										if ( currentObj.getCommentsURLinTFS() ) {
											var newCommentsFilename = commentsURL.replace(/^.*[\\\/]/, '');
                                            var destDir = Sencha.app.getWordsFolder();   
											currentObj.moveFileToPersistentStorage(currentObj.getFullURL(currentObj.getCommentsURLinTFS()), destDir, newCommentsFilename, currentObj);
										}
                                               
										// if a photo was taken, save it
										if ( currentObj.getImageURLinTFS() ) {
											var newImageFilename = imageURL.replace(/^.*[\\\/]/, '');
											var destDir = Sencha.app.getImagesFolder();
											currentObj.moveFileToPersistentStorage(currentObj.getImageURLinTFS(), destDir, newImageFilename, currentObj);
										}
										
										// reload stores
										Ext.getStore("DictionarySources").load();
       									//Ext.getStore("DictionarySourcesFiltered").load();
       									Ext.getStore("DictionaryTargets").load();
										Ext.getStore("Speakers").load();
										// refresh ditionary search results to show these changes
										Sencha.app.fireEvent('refreshdictionarylist');
									},
									errorCB          
								);
							},
							errorCB
						);
                    },
                    errorCB    
    			);
        	},        
			errorCB
		);
   	},
   	
   	
   	
   	// Remember speaker values for saving later - called from other controllers when back/OK button pressed
    //
   	rememberNewSpeakerDetails: function() {
		this.setSpeakerName(this.getSpeakerNameField().getComponent('speakerNameField').getValue());
		this.setSpeakerDOB( this.getSpeakerDOBField().getFormattedValue('U') );
		this.setSpeakerGender( this.getSpeakerGenderField().getGroupValue() );
		this.setSpeakerComment( this.getSpeakerCommentField().getComponent('speakerCommentField').getValue() );    
   	},
   	 
   	
   	// Remember meta data values for saving later - called from other controllers when back/OK button pressed
    //
   	rememberNewMetaData: function() {
		this.setCurrentDate( this.getDicMetadaForm().getComponent('dateField').getValue() );
		this.setCurrentLatitude( this.getDicMetadaForm().getComponent('latitudeField').getValue() );
		this.setCurrentLongitude( this.getDicMetadaForm().getComponent('longitudeField').getValue() );
		this.setRecordingDevice( this.getDicMetadaForm().getComponent('recordingDeviceField').getValue() );            	    	
	},
   	
   	
   	// Display meta data form
    //
    showMetadataForm: function(){
		console.log('in showMetadataForm...');
		
        // Sencha bug allows the disclosure arrow to be clicked more than once, so check for this
        var innerItems = this.getMain().getInnerItems();
        var secondViewInStack = innerItems[1].xtype;
        // if dictionaryformview is second item in stack, then we must be adding a new entry
        if ( secondViewInStack == "dictionaryformview" ) {
           if ( innerItems.length > 2 ) {
			   console.log('second view, butgging out');
                return;
           }
        }
        // else must be editing the entry instead
        else {
           if ( innerItems.length > 3 ) {
			   console.log('third view, butgging out');
                return;
           }
        }
           
   		this.getDictionaryEntryButton().setText('OK');
   		
    	this.getMain().push({
    		xtype: 'metadataformview'			                    
    	});
  
  		console.log('setting meta data values');
    	var d = new Date();
        this.getDicMetadaForm().getComponent('dateField').setValue( d.toDateString() );
    	this.getDicMetadaForm().getComponent('latitudeField').setValue( this.getCurrentLatitude() );
    	this.getDicMetadaForm().getComponent('longitudeField').setValue( this.getCurrentLongitude() );
    	this.getDicMetadaForm().getComponent('recordingDeviceField').setValue( this.getRecordingDevice() );
    },
    
    
     
    showSpeakerForm: function() {
		console.log('Hi');
        // Sencha bug allows the disclosure arrow to be clicked more than once, so check for this
        var innerItems = this.getMain().getInnerItems();
        var secondViewInStack = innerItems[1].xtype;
        // if dictionaryformview is second item in stack, then we must be adding a new entry
        if ( secondViewInStack == "dictionaryformview" ) {
           if ( innerItems.length > 3 ) {
                return;
           }
        }
        // else must be editing the entry instead
        else {
           if ( innerItems.length > 4 ) {
                return;
           }
        }
           
    	this.getMain().push({
    		xtype: 'speakerformview'			                    
    	});
    	
    	var d = new Date( this.getSpeakerDOB()*1000 );
    	this.getSpeakerDOBField().setValue( d );	
        this.getSpeakerNameField().getComponent('speakerNameField').setValue(this.getSpeakerName());
        this.getSpeakerGenderField().setGroupValue(this.getSpeakerGender());
        this.getSpeakerCommentField().getComponent('speakerCommentField').setValue(this.getSpeakerComment());
     
    },
           
           
    // Move file from temporary storage to persistent storage. Uses PhoneGap File API
    // Parameters:
    // srcPath - path to the file we want to move that is located on the temporary file system
    // destDir - sub directory on permanent file system (optional)
    // destFilename - new name of file (optional - otherwise uses current filename)
    // thisObj - (optional) this class ie. 'this'. However we pass it as paramater for invocation from a callback
    //
    moveFileToPersistentStorage: function(srcFile, destDir, destFilename, thisObj) {
        var me;

        // if current obj not passed in, then just use this
        if ( thisObj ) {
           me = thisObj;
        } else {
           me = this;
        }

        // Leave and do nothing if file hasn't just been created (located in temporary filestore)
        if ( !srcFile ) {
           return;
        }

        // file copy error callback
        function onFileSystemFail(error) {
           console.log('moveFileToPersistentStorage file system fail code ' + error.code);
           var msg = 'An error occurred during file copy: ' + error.code;
           navigator.notification.alert(msg, null, 'File copy error in moveFileToPersistentStorage()');
        }

        window.resolveLocalFileSystemURL(
         	srcFile,
         	function(fileEntry) {
            	window.resolveLocalFileSystemURL(
            		destDir,
                    function(fspDestDir) {
						srcFile = srcFile.replace(/^.*[\\\/]/, '');
						fileEntry.moveTo(
							fspDestDir,
							destFilename ? destFilename : srcFile,
							function () {
								console.log('success');
							},
							onFileSystemFail
						);
					}
                );
            }, 
            onFileSystemFail
        );
    },
           
           
    // Displays actionsheet to either take photo or choose photo from gallery
    // 
    onAddImageTap: function() {
		Sencha.app.fireEvent('showPhotoSourceSelectView', 'addDictionaryImage');
	},
    

    // Add image - stores reference to image taken/chosen
    // Params:
    // source - choose or take photo ie. either navigator.camera.PictureSourceType.CAMERA or navigator.camera.PictureSourceType.PHOTOLIBRARY
	//
	addImage: function(source) {   
		this.getPhotoSourceSelectView().hide(); // hide image source selector action sheet
		me = this; 
		  
		// show image as icon on button
		function showImageOnButton(uri) {
           //me.getAddImageButtonRef().setHtml('<div class="addPhotoButtonHolder"><img src="' + uri + '" class="addPhotoButtonImage"/></div>');
		   me.getAddImageButtonRef().setHtml('<div class="addPhotoButtonHolder" style="background:url(' + uri + '); background-size:cover; background-repeat:no-repeat; background-position:center;">&nbsp;</div>');
		}
		
		// copy photo from gallery to tfs (for iOS)
		function copyPhoto(fileEntry) {
			window.resolveLocalFileSystemURL(
				Sencha.app.getImagesFolder(),
				function(fspDestDir) {
					fileEntry.copyTo(
						fspDestDir,
						null,
						setImageURL,
						function (err) {
							console.log('fail');
							console.log('error code: ' + err.code);
						}
					);
				}
            );
		}
		
        function setImageURL(entry) {
			me.setImageURLinTFS( Sencha.app.getImagesFolder() + entry.name ); // remember filename of this file
    		showImageOnButton(Sencha.app.getImagesFolder() + entry.name);
		}
		
		function fail(error) {
			console.log('failed copy file');
			navigator.notification.alert('Unable to resolve or copy image to app file store', null, 'Capture error');
		}
		
        navigator.camera.getPicture(
            // success callback
            function (imageURI) { // Success
            	// If existing image chosen
            	if ( source == navigator.camera.PictureSourceType.PHOTOLIBRARY) {
            		if ( device.platform == "Android" ) {
                        // On Android, file has to be copied from outside app bundle to temporary file system
                        window.resolveLocalFileSystemURL(imageURI, copyPhoto, fail);
                    } else {
                        // in iOS, Phonegap's navigator.camera.getPicture stores photos elsewhere in file://localhost/... so these need to be resolved
						//window.resolveLocalFileSystemURL(imageURI, setImageURL, fail);
                                    window.resolveLocalFileSystemURL(imageURI, copyPhoto, fail);
                    }
            	
            	// if new photo taken
            	} else {
                    me.setImageURLinTFS( imageURI ); // remember filename of this file
                    showImageOnButton( imageURI );
            	}
            },
            function (message) { // fail
    			console.log('navigator.camera.getPicture failed. Error = ' + message);
			},
            { 
            	quality: 50, 
            	destinationType: Camera.DestinationType.FILE_URI,
            	sourceType: source 
            }
        );
    },
    
    
    // Delete file from permanent file system. Uses PhoneGap File API
    // Parameters:
    // fileName - Name of file to delete
    //
    deleteFileFromPersistentStorage: function(fileName) {
    	// Exit if filename is empty, null etc.
    	if (fileName == '' || fileName == null) { return; }
    
   		// file copy error callback
        function onFileSystemFail(err) {
           console.log('deleteFileFromPersistentStorage file system fail: ' + fileName);
           console.log('error code = ' + err.code);
        }
         
        window.resolveLocalFileSystemURL(
			Sencha.app.getAssetsFolder() + fileName,
			function (fileEntryToDelete) {
				fileEntryToDelete.remove(
					function() {
						console.log('file deleted...');
					},
					onFileSystemFail  
				);    
 			},
			onFileSystemFail		
		); 
    },
           
           
    // Delete dictionary entry
    //
    deleteDictionaryEntry : function(){
        var currentObj = this;
        
        function errorCB(e) {
			var msg = 'An error occurred delete the dictionary entry: ' + e.message;
			console.log(msg);
			navigator.notification.alert(msg, null, 'Save dictionary entry error');
        }
           
        // Confirm delete
        navigator.notification.confirm(
            'Really delete this dictionary entry?',  // message
            function (indexOfButtonPressed) { 
                // Get out of here if cancel button tapped
                if (indexOfButtonPressed==1) {
                    return;
                }
           
				var db = window.sqlitePlugin.openDatabase({name: "0000000000000001.db"});
				db.transaction(
					function(tx){
						console.log('deleting speaker id ' + currentObj.getSpeakerId() );
						tx.executeSql( 
							'DELETE FROM SPEAKER WHERE id=?;',
    						[currentObj.getSpeakerId()],
							function(tx,results){
    							console.log('speaker deleted');
    							console.log('deleting dictioinary source id ' + currentObj.getSourceId() );
    							tx.executeSql(
    								'DELETE FROM DICTIONARYSOURCE WHERE id=?;',
    								[currentObj.getSourceId()],
    								function(tx, results) {
    									console.log('succesful dictionary source delete');
    									tx.executeSql(
    										'SELECT * FROM DICTIONARYSOURCE WHERE dictionaryTargetid=?;',
    										[currentObj.getTargetId()],
    										function(tx, results) {
    											if ( results.rows.length == 0 ) {
    												console.log('no other source records using target record. delete it');
    												
    												tx.executeSql(
    													'DELETE FROM DICTIONARYTARGET WHERE id=?;',
    													[currentObj.getTargetId()],
    													function(tx, results){
    														console.log('dictionary target record deleted. delete audio files now...');
    														
    														console.log('delet target audio file');
    														// Delete (taget/translation) audio file
    														if ( currentObj.getAudioURL() ) {
    															currentObj.deleteFileFromPersistentStorage( currentObj.getAudioURL() );
    														}
    														// Delete source word audio
    														if ( currentObj.getSourceWordURL() ) {
    															currentObj.deleteFileFromPersistentStorage( currentObj.getSourceWordURL() );
    														}
    														// Delete comments audio/video
    														if ( currentObj.getCommentsURL() ) {
    															currentObj.deleteFileFromPersistentStorage( currentObj.getCommentsURL() );
    														}
    														// Delete image
    														if ( currentObj.getImageURL() ) {
    															currentObj.deleteFileFromPersistentStorage( currentObj.getImageURL() );
    														}
    														
    														// turn on icon image
															currentObj.getDictionaryEntryButton().setText('');
															currentObj.getDictionaryEntryButton().setIconCls('plusSignIcon');
           
															currentObj.getMain().pop(2);
                
															//currentObj.getApplication().getController('Ma.controller.DictionaryListController').filterDictionarySearch();
															Sencha.app.fireEvent('refreshdictionarylist');
    													},
    													errorCB
    												);
    												
    											} else {
    												console.log('Other source records usiing this target record. dont delete it');
    											}
    										},
    										errorCB
    									);
    								},
    								errorCB
    							);
    						}
    					);
    				},
    				errorCB
    			);
            },
            'Delete Entry', // title
            ['Cancel', 'OK'] // buttonLabels
        );
   	}  
    
});
