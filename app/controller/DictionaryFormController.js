// DICTIONARY FORM CONTROLLER
// Controller to handle adding and editing dictionary entries
//

Ext.define('Sencha.controller.DictionaryFormController', {
    extend: 'Ext.app.Controller',

    config: {
    	// constants
    	AWAITINGUPLOADSTATUS: 1, // Status code for a new Dictionary entry or suggested change that has not yet been uploaded
    	
    	// properties
    	lastButtonPressedId: null, // used after callback so we know deduce parameter gets assigned recorded audio
    	//audioURLinTFS: null, // used to temporarily store URL until assigned to dedicated temp field
    	 
		sourceWordURLinTFS: null, // used to store URL to audio file just recorded and saved in temporary store
		targetWordURLinTFS: null,
		commentsURLinTFS: null,
		
		
		mediaPtr: null, // *** delete this?
        //audioURLinTFS: null, // used to store URL to audio file just recorded ans saved in temporary store
        imageURLinTFS: null,
		
		// *** delete many of these?
		// Dictionary Target & Source property
        //sourceWordfield : "",
        //partOfSpeechField : "",
        //inflectionField : "",
        //disambiguationField : "",
        //targetWordField : "",
        //detailedEntryField : "",
        sourceWordURL: '',
        audioURL: '',
        commentsURL: '',
        commentsMediaType: null, // 0 = audio (default), 1 = video
        imageURL: '',
        //noteField : "",
        //metadata form
        currentDate: "",
        //currentTime: "",
        currentLatitude: "",
        currentLongitude: "",
        recordingDevice: "",
        //speaker form
        speakerName: "",
        speakerDOB: 0,
        speakerGender: "",
        speakerComment: "",
        /* Delete depending on we want to handle collector info for edits
        collector form
        collectorName: "",
        collectorDOB: "",
        collectorGender: "",
        collectorComment: "",
		*/
		
		//id collection 
		sourceId: "",
        targetId: "",
        collectorId: "",
        speakerId: "",
		
        
        refs: {
        	main: 'dictionarynavigationview', // *** change to 'nav'
        	dictionaryListView: 'dictionarylistview',
        	dictionaryEntryButton: 'dictionarynavigationview button[id=dictionaryEntryButton]',
			dictionaryDetailView: 'dictionarytargetdetailview',
			
			sourceWordRecordButtonRef: 'button[id=sourceWordRecordButton]',
			sourceWordPlayButtonRef: 'button[id=sourceWordPlayButton]',
			targetWordRecordButtonRef: 'button[id=targetWordRecordButton]',
			targetWordPlayButtonRef: 'button[id=targetWordPlayButton]',
			commentsRecordButtonRef: 'button[id=dictionaryCommentsRecordButton]',
			commentsPlayButtonRef: 'button[id=dictionaryCommentsPlayButton]',
			commentsVideoToggleRef: 'togglefield[id=dictionaryCommentsVideoToggle]',
			 
			dictionarySourceWordForm: 'fieldset[id="dictionarySourceFormFieldSet"]', 
			dictionaryTargetWordForm: 'fieldset[id="dictionaryTargetFormFieldSet"]',
			//audioRecordButtonRef: 'button[id=targetWordRecordButton]',
			//audioPlayButtonRef: 'button[id=targetWordPlayButton]',
			dictionaryCommentsForm: 'fieldset[id="dictionaryCommentsFormFieldSet"]',
			//addImageButtonRef: 'dictionarynavigationview button[cls=addImageButtonCls]',
			addImageButtonRef: 'button[id=addImageButton]',
			//addImageButtonRef: 'dictionarynavigationview image[id="addImageButton"]',
			
			
			photoSourceSelectView: 'photosourceselectview',
			dicMetadaForm: 'dictionarynavigationview fieldset[id="metadataFieldset"]',
			//deleteContainer: 'dictionarynavigationview container[cls=deletecontainer]', // *** do we need this?
			dictionaryDeleteButton: 'button[id=deletebutton]',
			dictionaryMetadataContainer: 'dictionarynavigationview container[cls=metadatacontainer]',
			dictionaryMetadataButton: 'button[id=dicMetadataButton]',
			
			//speaker
			speakerFieldSet: 'fieldset[id="speakerFieldset"]',
			//speakerNameField: 'dictionarynavigationview fieldset[id="speakerNameFieldset"]',
			speakerNameField: 'dictionarynavigationview textfield[id="speakerNameField"]',
			speakerGenderField: 'dictionarynavigationview radiofield[name="speakerGender"]',
			//speakerCommentField: 'dictionarynavigationview fieldset[id="speakerCommentFieldset"]',
			speakerCommentField: 'dictionarynavigationview textfield[id="speakerCommentField"]',
			speakerDOBField: 'dictionarynavigationview datepickerfield[id="speakerDOBField"]',
           
			//collector *** delete these
			collectorNameField: 'fieldset[id="collectorNameFieldset"]',
			collectorGenderField: 'radiofield[name="collectorGender"]',
			collectorCommentField: 'fieldset[id="collectorCommentFieldset"]',
			
			videoPlayerRef: 'video[id="videoPlayer"]'
        },
        control: {
			'sourceWordRecordButtonRef':{
				tap:'recordAudio'
			},
			'sourceWordPlayButtonRef':{
				tap:'prepareMedia'
			},
			'targetWordRecordButtonRef':{
				tap:'recordAudio'
			},
			'targetWordPlayButtonRef':{
				tap:'prepareMedia'
			},
			'commentsPlayButtonRef':{
				tap:'prepareMedia'
			},
			'commentsRecordButtonRef':{
				tap:'recordAudio'
			},
			'addImageButtonRef':{
				tap:'onAddImageTap'
			},
			'dictionaryMetadataButton':{
				tap:'showMetadataForm'
			},
			'dictionarynavigationview button[id=speakerButton]':{
				tap:'showSpeakerForm'
			},
			'dictionarynavigationview button[id="deletebutton"]':{
				tap:'deleteDictionaryEntry'
			}
        }
    },


	// Create video view and play video
	//
	showVideo: function(videoURL) {
		this.getMain().push({
			xtype: 'videoview'
		});	
            
		this.getVideoPlayerRef().setUrl(videoURL);
            
		// if iOS enable controls (controls don't work in Android)
		if ( device.platform == "iOS" ) { 
			this.getVideoPlayerRef().setEnableControls(true);
		}
	},
	

	//	Play temporary media (audio or video) just recorded
	//
	playMedia: function(button, mediaURL) {
		// if Comments play button pressed, and current comment is a video
        if ( button.getId() == "dictionaryCommentsPlayButton" && this.getCommentsMediaType() == 1 ) {
    		this.showVideo(mediaURL);
        } else {
        	console.log('playing ' + mediaURL);
        	
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
        	console.log('playing ' + mediaURL);
        	
        	Sencha.app.playAudioAssetAndRelease(mediaURL);
        }
	},


	// Media Play (from form)
	// If we have a respective audio file URL in the temporary file system
	// then play that, else use respective URL in store
    //
    prepareMedia: function(button) {
    	// get audioURL depending on play button pressed
    	var audioURLinTFS = null;
    	var audioURLinDb = null;
    	switch ( button.getId() ) {
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

        var audioURL = null;
        // If there's a (new) audio file in TFS then play it, otherwise try to play from db
        if ( audioURLinTFS ) {
        	/*
       		 if ( device.platform == "Android" ) {
     			audioURL = audioURLinTFS;   	
        	} 
        	// else iOS
        	else {
        		audioURL = Sencha.app.getTemporaryFileStoreVar().fullPath + "/" + audioURLinTFS;
        	}
        	*/
        	
        	this.playMedia(button, audioURLinTFS);
        	//Sencha.app.playAudioAndRelease(audioURLinTFS);
        } else {
           if ( audioURLinDb ) {
           		/*
                // Get URL for audio file (varies depending on platform)
        		if ( device.platform == "Android" ) {
        			audioURL = Sencha.app.getPersistentFileStoreVar().replace("file://", "") + "/" + Sencha.app.androidFilesPath + "assets/" + audioURLinDb;
        		} 
        		// else iOS
        		else {
        			audioURL = Sencha.app.getPersistentFileStoreVar() + "/assets/" + audioURLinDb;
        		}
        		*/
        		
        		this.playMediaAsset(button, audioURLinDb);
        		//Sencha.app.playAudioAssetAndRelease(audioURLinDb);
			}
        }
    },



    // Utility function, assigns recorded audio to parameter based on last pressed button id
	// MDM 16.05.2013
	assignAudio: function(filename) {
           console.log('in assignAudio...');
           console.log('filename = ' + filename);
         
        filename = filename.replace(/^.*[\\\/]/, ''); 
        console.log('filename after replace  = ' + filename);
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


	// Success callback from AudioEncode plugin
    // - just rememer the filename in the temporary file system
    audioEncodeSuccessCB: function(path) {
	console.log('successful encode!');
        this.assignAudio( path );   
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
    recordAudio: function(button) {
    	// remember which button pressed (used in callback to assign audio to respective parameter)
    	this.setLastButtonPressedId( button.getId() );
    	var me = this; // remember me
    
    	// filesystem error callback
        function errorCB(evt) {
           console.log(evt.target.error.code);
           var msg = 'An error occurred during media capture: ' + evt.target.error.code;
           navigator.notification.alert(msg, null, 'Capture error');
        }
    
    	// capture success callback
    	function successCB(mediaFiles) { 
    		// remember whether audio or video was captured
    		me.setCommentsMediaType( me.getCommentsVideoToggleRef().getValue() );
    	 	console.log('me.getCommentsMediaType() = ' + me.getCommentsMediaType() );
    	 
            if ( device.platform == "Android" ) {
           		//me.assignAudio( mediaFiles[0].name );
           		me.assignAudio( mediaFiles[0].fullPath );
           		console.log('media filename = ' + mediaFiles[0].fullPath);
        	} else { // else iOS
        		if ( me.getCommentsMediaType() == 1 ) {
        			console.log('Video recorded. No need to rename, encode etc.');
                    me.assignAudio( mediaFiles[0].fullPath );
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
							//mediaFiles[0].name,
                            mediaFiles[0].fullPath,
                           	{ create: false, exclusive: false }, 
                           	// FileSystem Success callback (found file) 
                            function success(entry) {
								// get parent directory of file we want to rename (we have to use Phonegap moveTo fn.)
                                console.log('found file');
                                entry.getParent(
									function success(parent) {
										// Create unique filename to avoid problems with multiple files 
										var d = new Date();
										var newFilename = d.getTime()+'.wav';
										console.log('1 newFilename = ' + newFilename);
										// Rename file (using Phonegap moveTo fn.)
										entry.moveTo( 
											parent, 
											newFilename,
											function success(renamedEntry) {
												var pathToRenamedFile = mediaFiles[0].fullPath.replace(mediaFiles[0].name, newFilename);
                                                						console.log('encoding audio...');
												/*
												window.plugins.AudioEncode.encodeAudio(pathToRenamedFile, "Sencha.app.getController('DictionaryFormController').audioEncodeSuccessCB", "Sencha.app.getController('DictionaryFormController').failedAudioEncode");
                                                */
                                                window.encodeAudio(
                                                    pathToRenamedFile,
                                                    function (filename) {
							
							filename = filename.replace(/^.*[\\\/]/, '');
console.log('in encodeAudio success callback. filename = ' + filename );
                                                        switch( me.getLastButtonPressedId() ) {
                                                            case "sourceWordRecordButton":
                                                                me.setSourceWordURLinTFS( filename );
                                                                break;
                                                            case "targetWordRecordButton":
                                                                me.setTargetWordURLinTFS( filename );
                                                                break;
                                                            case "dictionaryCommentsRecordButton":
                                                                me.setCommentsURLinTFS( filename );
                                                                break;
                                                        }
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
		if ( button.getId() == "dictionaryCommentsRecordButton" ) {
			if ( this.getCommentsVideoToggleRef().getValue() == 1 ) {
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
          
        // clear it
        //this.setSourceWordfield("");
        //this.setPartOfSpeechField("");
        //this.setInflectionField("");
        //this.setDisambiguationField("");
        //this.setTargetWordField("");
        //this.setDetailedEntryField("");
        //this.setNoteField("");
        
        this.setTargetId("");
           
        //metadata form
		//Getting the current date, time
    	var d = new Date();
        this.setCurrentDate( d.getTime() );
               
        // Set location 
        var thisPtr = this;
        console.log('get GPS coords');
        navigator.geolocation.getCurrentPosition(
            // Success callback
            function(position) {
            	console.log('in gps success');
            	console.log('setting lat and long. Lat = ' + position.coords.latitude);
                thisPtr.setCurrentLatitude( position.coords.latitude );
                thisPtr.setCurrentLongitude( position.coords.longitude ); 
            }, 
            // Error callback
            function(error) {
            	console.log('in GPS fail');
                console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                thisPtr.setCurrentLatitude('');
                thisPtr.setCurrentLongitude('');
            }
        );
         
        this.setRecordingDevice( device.model );
        //console.log('device.name = ' + device.name);
        //console.log('this.getRecordingDevice() = ' + this.getRecordingDevice() );
        
        //speaker form
        this.setSpeakerName("");
        this.setSpeakerDOB(0);
        this.setSpeakerGender("");
        this.setSpeakerComment("");
         
        //collector form
        /*
        this.setCollectorName("");
        this.setCollectorDOB("");
        this.setCollectorGender("");
        this.setCollectorComment("");
   		*/
   		
    	this.getMain().push({
    		xtype: 'dictionaryformview'			                    
        });
        
        this.getDictionaryDeleteButton().hide();
   	},
   	           
           
    // Display dictionary edit entry form and pre-populate
    //
   	editForm: function(){
        //this.setAudioURLinTFS(null);
       // this.setImageURLinTFS(null);
		this.setSourceWordURLinTFS(null); 		
		this.setTargetWordURLinTFS(null);
		this.setCommentsURLinTFS(null);
		this.setImageURLinTFS(null);
       
        var curRecord = this.getDictionaryDetailView().getListView().getStore().getAt( this.getDictionaryDetailView().getCurrentListItem() );
           
        // get Id's
        var dictionaryTargetId = curRecord.get('dictionaryTargetId');
        var dictionarySourceId = curRecord.get('id');
           
        // Get Dictionary relevant records
           console.log('dictionaryTargetId = ' + dictionaryTargetId);
           console.log('available records in DictionaryTargets = ' + Ext.getStore("DictionaryTargets").getCount() );
   		var dictionaryTargetStore = Ext.getStore("DictionaryTargets").getById(dictionaryTargetId);
        
        // Get collector
   		if ( curRecord.get('collectorId') != null ) {
   			var collectorStore = Ext.getStore("Collectors").getById( curRecord.get('collectorId') );
		}
   		
   		// Get speaker
   		if ( curRecord.get('speakerId') != null ) {
   			var speakerStore = Ext.getStore("Speakers").getById( curRecord.get('speakerId') );
		}
		

        // create form
   		this.getMain().push({
   			xtype: 'dictionaryformview',
            title: 'Edit Entry'
   		});
           
        console.log('retrieved comments = ' + curRecord.get('comments') );
        // populate it
        this.getDictionarySourceWordForm().getComponent('sourceWordField').setValue( curRecord.get('sourceWord') );
        this.getDictionaryTargetWordForm().getComponent('targetWordField').setValue( curRecord.get('targetWord') );
   		this.getDictionaryCommentsForm().getComponent('dictionaryCommentsField').setValue( curRecord.get('comments') );
   		//this.getDictionaryCommentsForm().getComponent('dictionaryCommentsField').setValue( dictionaryTargetStore.get('comments') );
   
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
        console.log('imageURL = ' + imageURL);
        if ( imageURL ) {
        	console.log('in if(imageURL)...');
			if ( device.platform == "Android" ) {
        			var fullImagePath = Sencha.app.getPersistentFileStoreVar().replace("file://", "") + "/" + Sencha.app.androidFilesPath + "assets/" + imageURL;
    			} // else iOS
        		else {
        			var fullImagePath = Sencha.app.getPersistentFileStoreVar() + '/assets/' + imageURL;
        	}
			
			console.log('fullImagePath = ' + fullImagePath);
			// show it
			this.getAddImageButtonRef().setHtml('<div class="addPhotoButtonHolder"><img src="' + fullImagePath + '" class="addPhotoButtonImage"/></div>');
        }     
         
   		// Set the metadata
   		this.setCurrentDate( curRecord.get('savedDate') );
   		this.setCurrentLatitude( curRecord.get('latitude') );
   		this.setCurrentLongitude( curRecord.get('longitude') );
   		this.setRecordingDevice( curRecord.get('recordingDevice') );
   		
   		
   		/* MDM don't change meta data for an edit
   		//Getting the current date and time
   		var d = new Date();
        this.setCurrentDate( d.getTime() );
        // Get location   
        var thisPtr = this;
        navigator.geolocation.getCurrentPosition(
            // Success callback
            function(position) {
                thisPtr.setCurrentLatitude( position.coords.latitude );
                thisPtr.setCurrentLongitude( position.coords.longitude ); 
            }, 
            // Error callback
            function(error) {
                console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                thisPtr.setCurrentLatitude('');
                thisPtr.setCurrentLongitude('');
            }
        );    
        this.setRecordingDevice( device.name );
   	    */ 
   	    
   	    //speaker form
   	    if ( speakerStore != null ) { 
   	    	this.setSpeakerName(speakerStore.get('name'));
   	    	this.setSpeakerDOB( speakerStore.get('birthDate') );
   	    	console.log('speaker bithdate = ' + speakerStore.get('birthDate') );
   	    	
   	    	this.setSpeakerGender(speakerStore.get('gender'));
   	    	this.setSpeakerComment(speakerStore.get('comments'));
   	    }  
   		
   		// if this is not an editable record, then disable all fields except comments
   		if ( curRecord.get('isEditable')==0 || curRecord.get('isEditable')==null ) {
   			this.getDictionarySourceWordForm().getComponent('sourceWordField').disable();
        	this.getDictionaryTargetWordForm().getComponent('targetWordField').disable();
			this.getSourceWordRecordButtonRef().disable(); 
			this.getTargetWordRecordButtonRef().disable();
			this.getDictionaryDeleteButton().hide();
   		} else {
			//this.getDeleteContainer().setHidden(false); 
			this.getDictionaryDeleteButton().show();
		}
   	},
   	
   	
   	// MDM 20.05.2013 Checks for target and source word, if none provided these are autofilled and 
   	// a confirmation alert displayed
   	//
   	validateForm: function() {
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
		console.log('in saveDictEntryForm...');
		
        function errorCB(tx, e) {
           var msg = 'An error occurred saving the dictionary entry: ' + e.message;
           console.log(msg);
           navigator.notification.alert(msg, null, 'Save dictionary entry error');
        }
        
        this.validateForm();
        
        var sourceWord = this.getDictionarySourceWordForm().getComponent('sourceWordField').getValue();
        var targetWord = this.getDictionaryTargetWordForm().getComponent('targetWordField').getValue();
        var comments = this.getDictionaryCommentsForm().getComponent('dictionaryCommentsField').getValue();   
        console.log('form comments = ' + comments);
        console.log('saving speaker date: ' + this.getSpeakerDOB() );
          
        var db = window.sqlitePlugin.openDatabase({name: "0000000000000001.db"});
        
        db.transaction(
            function(tx){
            	// Store speaker details
        		tx.executeSql( 
    				'INSERT INTO SPEAKER (id, name, birthDate, gender, comments) VALUES (?, ?, ?, ?, ?)',
    				[null, currentObj.getSpeakerName(), currentObj.getSpeakerDOB(), currentObj.getSpeakerGender(), currentObj.getSpeakerComment()],
    				function(tx,results){
    					console.log('succesful SPEAKER insert...');
    					console.log('SPEAKER results.insertId = ' + results.insertId);
    					// Store speaker id
                        currentObj.setSpeakerId(results.insertId);
                        var dictionarySpeakerId = currentObj.getSpeakerId();
                        // Collector id is always 1
                        var dictionaryCollectorId = 1;
                     
						// Create unique source word audioURL
						var newSourceWordURL = '';
						if ( currentObj.getSourceWordURLinTFS() ) {
							var d1 = new Date(); // create new unique url
							newSourceWordURL = 'words/' + Sencha.app.getUsername() + d1.getTime() + 'src' + '.' + currentObj.getSourceWordURLinTFS().split('.').pop(); // the last bit gets the file extension
						}
                                      
                        // Create unique audioURL (for target/translation)
                        var newAudioURL = '';
                       	if ( currentObj.getTargetWordURLinTFS() ) {
							var d = new Date(); // create new unique url
							newAudioURL = 'words/' + Sencha.app.getUsername() + d.getTime() + 'tgt' + '.' + currentObj.getTargetWordURLinTFS().split('.').pop(); // the last bit gets the file extension
						}
                                
						// Create unique comments audioURL
						var newCommentsURL = '';
						if ( currentObj.getCommentsURLinTFS() ) {
							var d3 = new Date(); // create new unique url
							newCommentsURL = 'words/' + Sencha.app.getUsername() + d3.getTime() + 'cmt' + '.' + currentObj.getCommentsURLinTFS().split('.').pop(); // the last bit gets the file extension
						}
                                     
						//Save imageURL 
						var newImageURL = '';
						if ( currentObj.getImageURLinTFS() ) {
							var d4 = new Date();
							newImageURL = 'images/' + Sencha.app.getUsername() + d4.getTime() + 'img' + '.jpg';
						}
                        console.log('newImageURL = ' + newImageURL);
                         
                        console.log('dictionarySpeakerId = ' + dictionarySpeakerId );  
                        dictionaryTargetQuery = 'INSERT INTO DICTIONARYTARGET (id, speakerId, collectorId, targetWord, audioURL, imageURL, comments, commentsURL, commentsMediaType, savedDate, latitude, longitude, recordingDevice) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
                        // *** insert escape chars
						dictionaryTargetParams = [null, dictionarySpeakerId, dictionaryCollectorId, targetWord, newAudioURL, newImageURL, "yoyo", newCommentsURL, currentObj.getCommentsMediaType(), currentObj.getCurrentDate(), currentObj.getCurrentLatitude(), currentObj.getCurrentLongitude(), currentObj.getRecordingDevice() ];
						tx.executeSql(
							dictionaryTargetQuery,
							dictionaryTargetParams,
							function(tx, results) {
								console.log('target results.rows.length = ' + results.rows.length);
								console.log('target results.insertId = ' + results.insertId);
								currentObj.setTargetId(results.insertId); // Get id of inserted dict. target record
								var dictionaryTargetId = currentObj.getTargetId();
    					        
								var queryDictionarySource = 'INSERT INTO DICTIONARYSOURCE (id, dictionaryTargetId, sourceWord, sourceWordURL, targetWord, isEditable, status) VALUES (?,?,?,?,?,?,?)';
								tx.executeSql(
									queryDictionarySource,
									[null, dictionaryTargetId, sourceWord, newSourceWordURL, targetWord, 1, currentObj.getAWAITINGUPLOADSTATUS()],
									function (tx, results) {
										console.log('succesful dictionarysource insert');
										console.log('source results.insertId = ' + results.insertId);
									
										// if source audio was recorded, save it
										if ( newSourceWordURL ) {
											var newSourceFilename = newSourceWordURL.replace(/^.*[\\\/]/, '');
                                                    
											if ( device.platform == "Android" ) {
												//var destDir = Sencha.app.androidFilesPath + "assets/words";
												var destDir = Sencha.app.getWordsFolder();
											} 
											// else iOS
											else {
												var destDir = 'assets/words';
											}
                                                    
											currentObj.moveFileToPersistentStorage(currentObj.getSourceWordURLinTFS(), destDir, newSourceFilename, currentObj);
										}
									
										// if target audio was recorded, save it
										if ( newAudioURL ) {
											var newAudioFilename = newAudioURL.replace(/^.*[\\\/]/, '');
                                                    
											if ( device.platform == "Android" ) {
												//var destDir = Sencha.app.androidFilesPath + "assets/words";
												//var destDir = Sencha.app.getWordsFolder();
												var destDir = "assets/words";
											} // else iOS
											else {
												var destDir = 'assets/words';
											} 
                                              console.log('destDir = ' + destDir );
                                              console.log('currentObj.getTargetWordURLinTFS() = ' + currentObj.getTargetWordURLinTFS() );
											currentObj.moveFileToPersistentStorage(currentObj.getTargetWordURLinTFS(), destDir, newAudioFilename, currentObj);
										}
                                        
                                        // if comments audio was recorded, save it
										if ( newCommentsURL ) {
											var newCommentsFilename = newCommentsURL.replace(/^.*[\\\/]/, '');
                                                    
											if ( device.platform == "Android" ) {
												var destDir = Sencha.app.androidFilesPath + "assets/words";
											} // else iOS
											else {
												var destDir = 'assets/words';
											}
                                                    
											currentObj.moveFileToPersistentStorage(currentObj.getCommentsURLinTFS(), destDir, newCommentsFilename, currentObj);
										}
                                         
                                        console.log('just before phot if...');       
										// if a photo was taken, save it
										if ( newImageURL ) {
											console.log('a photo was taken, saving it...');
											var newImageFilename = newImageURL.replace(/^.*[\\\/]/, '');
											if ( device.platform == "Android" ) {
												/*
												var destDir = Sencha.app.androidFilesPath + "assets/images";
												//var tempImageURL = "DCIM/Camera/" + currentObj.getImageURLinTFS();
												var tempImageURL = Sencha.app.androidFilesPath + '../cache/' + currentObj.getImageURLinTFS();
												console.log('about to move file. tempImageURL = ' + tempImageURL);
												*/
												var destDir = Sencha.app.androidFilesPath + "assets/images";
												
											} 
											// else iOS
											else {
												var destDir = 'assets/images';
												//var tempImageURL = currentObj.getImageURLinTFS();
											}
                                                    
											//currentObj.moveFileToPersistentStorage(tempImageURL, destDir, newImageFilename, currentObj);
                                              console.log('currentObj.getImageURLinTFS() = ' + currentObj.getImageURLinTFS() );
											currentObj.moveFileToPersistentStorage(currentObj.getImageURLinTFS(), destDir, newImageFilename, currentObj);
										}
										
										//currentObj.getDictionaryListView().getStore().load(); // filtered dictionary source list
										currentObj.getApplication().getController('DictionaryListController').filterDictionarySearch();
										
										/*
										Ext.getStore("DictionarySources").load(); // unfiltered full dictionary source list
										Ext.getStore("DictionaryTargets").load();
										//Ext.getStore("Collectors").load();
										Ext.getStore("Speakers").load();
										*/		
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
   	
   	
   	/*
   	// MDM 16.08.2012 
    // Update form by Eldwin - used to resave an existing dictionary entry to db
    // MDM Consider implementing with direct SQL calls
    //
   	updateForm : function(){
   		this.validateForm();
   		
   		var sourceWord = this.getDictionarySourceWordForm().getComponent('sourceWordField').getValue();
        var targetWord = this.getDictionaryTargetWordForm().getComponent('targetWordField').getValue();
        var comments = this.getDictionaryCommentsForm().getComponent('dictionaryCommentsField').getValue();   
        
		// Get records that need to be updated
   		var dictionaryTargetStore = Ext.getStore("DictionaryTargets").getById( this.getTargetId() );
   		var dictionarySourceStore = Ext.getStore("DictionarySources").getById( this.getSourceId() );
   		//var speakerStore = Ext.getStore("Speakers").getById( this.getSpeakerId() );
   		// var collectorStore = Ext.getStore("Collectors").getById(collectorId);
   		var speakerStore = Ext.getStore("Speakers").findRecord("id", this.getSpeakerId() ); 
   		 
   		console.log('this.getSourceId() = ' + this.getSourceId() );
   		console.log('dictionarySourceStore = ' + dictionarySourceStore);
   		 
   		// Update dictionary source table
   		dictionarySourceStore.set('sourceWord', sourceWord);
   		dictionarySourceStore.set('targetWord', targetWord);
   		dictionarySourceStore.set('status', this.getAWAITINGUPLOADSTATUS() );
		console.log('this.getAWAITINGUPLOADSTATUS() = ' + this.getAWAITINGUPLOADSTATUS() );
		// Update dictionary target table
        dictionaryTargetStore.set('targetWord', targetWord);
        dictionaryTargetStore.set('comments', comments);
   		dictionaryTargetStore.set('savedDate', this.getCurrentDate());
   		dictionaryTargetStore.set('latitude', this.getCurrentLatitude());
   		dictionaryTargetStore.set('longitude', this.getCurrentLongitude());
   		dictionaryTargetStore.set('recordingDevice', this.getRecordingDevice());
   		
   		// if new source word audio has been recorded
		if ( this.getSourceWordURLinTFS() ) {
			// create new audio url
			var d1 = new Date();
			var newAudioURL = 'words/' + Sencha.app.getUsername() + d1.getTime() + 'src' + '.' + this.getSourceWordURLinTFS().split('.').pop(); // the last bit gets the file extension;
			var oldAudioURL = dictionaryTargetStore.get('audioURL'); // remember for deleting later
           
			// Move new file to permanent file store           
			var newAudioFilename = newAudioURL.replace(/^.*[\\\/]/, '');
			if ( device.platform == "Android" ) {
				var audioDestDir = Sencha.app.androidFilesPath + "assets/words";
			} // else iOS
			else {
				var audioDestDir = 'assets/words';
			}
			this.moveFileToPersistentStorage( this.getSourceWordURLinTFS(), audioDestDir, newAudioFilename);
           
			// delete old file
			this.deleteFileFromPersistentStorage(oldAudioURL);
           
			// store new audio URL
			dictionarySourceStore.set('sourceWordURL', newAudioURL ); 
        }
   		
		// if new (target/translation) audio has been recorded
		if ( this.getTargetWordURLinTFS() ) {
			// create new audio url
			var d = new Date();
			var newAudioURL = 'words/' + Sencha.app.getUsername() + d.getTime() + 'tgt' + '.' + this.getTargetWordURLinTFS().split('.').pop(); // the last bit gets the file extension;
			var oldAudioURL = dictionaryTargetStore.get('audioURL'); // remember for deleting later
           
			// Move new file to permanent file store           
			var newAudioFilename = newAudioURL.replace(/^.*[\\\/]/, '');
			if ( device.platform == "Android" ) {
				var audioDestDir = Sencha.app.androidFilesPath + "assets/words";
			} // else iOS
			else {
				var audioDestDir = 'assets/words';
			}
			this.moveFileToPersistentStorage( this.getTargetWordURLinTFS(), audioDestDir, newAudioFilename);
           
			// delete old file
			this.deleteFileFromPersistentStorage(oldAudioURL);
           
			// store new audio URL
			dictionaryTargetStore.set('audioURL', newAudioURL ); 
        }
        
        // if new comments audio has been recorded
		if ( this.getCommentsURLinTFS() ) {
			// create new audio url
			var d3 = new Date();
			var newAudioURL = 'words/' + Sencha.app.getUsername() + d3.getTime() + 'cmt' + '.' + this.getCommentsURLinTFS().split('.').pop(); // the last bit gets the file extension;
			var oldAudioURL = dictionaryTargetStore.get('commentsURL'); // remember for deleting later
           
			// Move new file to permanent file store           
			var newAudioFilename = newAudioURL.replace(/^.*[\\\/]/, '');
			if ( device.platform == "Android" ) {
				var audioDestDir = Sencha.app.androidFilesPath + "assets/words";
			} // else iOS
			else {
				var audioDestDir = 'assets/words';
			}
			this.moveFileToPersistentStorage( this.getCommentsURLinTFS(), audioDestDir, newAudioFilename);
           
			// delete old file
			this.deleteFileFromPersistentStorage(oldAudioURL);
           
			// store new audio URL and commentsMediaType
			dictionaryTargetStore.set('commentsURL', newAudioURL );
			dictionaryTargetStore.set('commentsMediaType', this.getCommentsMediaType() );
        }
        
        // if new photo has been taken
        if ( this.getImageURLinTFS() ) {
           // create new url
           var d = new Date();
           var newImageURL = 'images/' + Sencha.app.getUsername() + d.getTime() + 'img' + '.jpg';
           var oldImageURL = dictionaryTargetStore.get('imageURL'); // remember for deleting later
           
           // Move new file to permanet file store and delete old one            
           var newImageFilename = newImageURL.replace(/^.*[\\\/]/, '');
           if ( device.platform == "Android" ) {
           		var imageDestDir = Sencha.app.androidFilesPath + "assets/images";
           		var imageSrcDir = "DCIM/Camera/" + this.getImageURLinTFS();
           }  
           // else iOS
           else {
				var imageDestDir = 'assets/images';
				var imageSrcDir = this.getImageURLinTFS();
			}
           this.moveFileToPersistentStorage( imageSrcDir, imageDestDir, newImageFilename);

           // delete old file
           this.deleteFileFromPersistentStorage(oldImageURL);
           
           // store new URL
           dictionaryTargetStore.set('imageURL', newImageURL ); 
        }
           
        if ( speakerStore != null ) {
   			speakerStore.set('name', this.getSpeakerName());
   			speakerStore.set('birthDate', this.getSpeakerDOB());
   	 		speakerStore.set('gender', this.getSpeakerGender());
   	 		speakerStore.set('comments', this.getSpeakerComment());
   	 	} else {
   	 		console.log('speakerStore = null, this.getSpeakerId()=' + this.getSpeakerId() );
   	 	}

		// how do we handle this? overwrite or leave??
   		//collectorStore.set('name', this.getCollectorName());
   		//collectorStore.set('birthDate', this.getCollectorDOB());
   		//collectorStore.set('gender', this.getCollectorGender());
   		//collectorStore.set('comments', this.getCollectorComment());
   		
   		
   		Ext.getStore("DictionarySources").sync();
   		Ext.getStore("DictionaryTargets").sync();
   		Ext.getStore("Speakers").sync();
   		//Ext.getStore("Collectors").sync();
   	},
   	*/
   	
   	
   	// Update form
   	// Updates an existing dictionary entry with details in form 
   	//
   	updateForm : function(){
   		var currentObj = this;
		console.log('in updateForm...');
		
        function errorCB(tx, e) {
           var msg = 'An error occurred upadating the dictionary entry: ' + e.message;
           console.log(msg);
           navigator.notification.alert(msg, null, 'Save dictionary entry error');
        }
        
        this.validateForm();
        
        var sourceWord = this.getDictionarySourceWordForm().getComponent('sourceWordField').getValue();
        var targetWord = this.getDictionaryTargetWordForm().getComponent('targetWordField').getValue();
        var comments = this.getDictionaryCommentsForm().getComponent('dictionaryCommentsField').getValue(); 
        console.log('comments = ' + comments);  
        console.log('saving speaker date: ' + this.getSpeakerDOB() );
          
        var db = window.sqlitePlugin.openDatabase({name: "0000000000000001.db"});
        db.transaction(
            function(tx){
            	// Store speaker details
            	//*********** Need to work on this - if no speaker, then need to insert (not update)
            	//*********** or could just leave? 
        		tx.executeSql( 
    				'UPDATE SPEAKER SET name=?, birthDate=?, gender=?, comments=? WHERE id=?;',
    				[currentObj.getSpeakerName(), currentObj.getSpeakerDOB(), currentObj.getSpeakerGender(), currentObj.getSpeakerComment(), currentObj.getSpeakerId() ],
    				function(tx,results){
    					console.log('succesful SPEAKER insert...');
    					
    					// Store speaker id
                        //currentObj.setSpeakerId(results.insertId);
                        var dictionarySpeakerId = currentObj.getSpeakerId();
                        // Collector id is always 1
                        var dictionaryCollectorId = 1;
                     
                     
						// Create unique source word audioURL
						var newSourceWordURL = '';
						if ( currentObj.getSourceWordURLinTFS() ) {
							var d1 = new Date(); // create new unique url
							newSourceWordURL = 'words/' + Sencha.app.getUsername() + d1.getTime() + 'src' + '.' + currentObj.getSourceWordURLinTFS().split('.').pop(); // the last bit gets the file extension
						}
                                      
                        // Create unique audioURL (for target/translation)
                        var newAudioURL = '';
                       	if ( currentObj.getTargetWordURLinTFS() ) {
							var d = new Date(); // create new unique url
							newAudioURL = 'words/' + Sencha.app.getUsername() + d.getTime() + 'tgt' + '.' + currentObj.getTargetWordURLinTFS().split('.').pop(); // the last bit gets the file extension
						}
                                
						// Create unique comments audioURL
						var newCommentsURL = '';
						if ( currentObj.getCommentsURLinTFS() ) {
							var d3 = new Date(); // create new unique url
							newCommentsURL = 'words/' + Sencha.app.getUsername() + d3.getTime() + 'cmt' + '.' + currentObj.getCommentsURLinTFS().split('.').pop(); // the last bit gets the file extension
						}
                                     
						//Save imageURL 
						var newImageURL = '';
						if ( currentObj.getImageURLinTFS() ) {
							var d4 = new Date();
							newImageURL = 'images/' + Sencha.app.getUsername() + d4.getTime() + 'img' + '.jpg';
						}
                        console.log('newImageURL = ' + newImageURL);
                         
                        console.log('dictionarySpeakerId = ' + dictionarySpeakerId );  
                        //dictionaryTargetQuery = 'INSERT INTO DICTIONARYTARGET (id, speakerId, collectorId, targetWord, audioURL, imageURL, comments, commentsURL, commentsMediaType, savedDate, latitude, longitude, recordingDevice) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
                        dictionaryTargetQuery = 'UPDATE DICTIONARYTARGET SET speakerId=?, collectorId=?, targetWord=?, audioURL=?, imageURL=?, comments=?, commentsURL=?, commentsMediaType=?, savedDate=?, latitude=?, longitude=?, recordingDevice=? WHERE id=?';
                        // *** insert escape chars
						//dictionaryTargetParams = [null, dictionarySpeakerId, dictionaryCollectorId, targetWord, newAudioURL, newImageURL, comments, newCommentsURL, currentObj.getCommentsMediaType(), currentObj.getCurrentDate(), currentObj.getCurrentLatitude(), currentObj.getCurrentLongitude(), currentObj.getRecordingDevice() ];
						dictionaryTargetParams = [dictionarySpeakerId, dictionaryCollectorId, targetWord, newAudioURL, newImageURL, comments, newCommentsURL, currentObj.getCommentsMediaType(), currentObj.getCurrentDate(), currentObj.getCurrentLatitude(), currentObj.getCurrentLongitude(), currentObj.getRecordingDevice(), currentObj.getTargetId() ];
						console.log('dictionaryTargetQuery = ' + dictionaryTargetQuery);
						console.log('dictionaryTargetParams[12] = ' + dictionaryTargetParams[12] );
						 
						tx.executeSql(
							dictionaryTargetQuery,
							dictionaryTargetParams,
							function(tx, results) {
								console.log('succesful dictionarytarget insert');
								//currentObj.setTargetId(results.insertId); /* Get id of inserted dict. target record */
								var dictionaryTargetId = currentObj.getTargetId();
    					        
								//var queryDictionarySource = 'INSERT INTO DICTIONARYSOURCE (id, dictionaryTargetId, sourceWord, sourceWordURL, targetWord, isEditable, status) VALUES (null, ' + dictionaryTargetId + ', "' + sourceWord + '", "' + newSourceWordURL + '", "' + targetWord + '", 1, "' + currentObj.getAWAITINGUPLOADSTATUS() + '")';
								var queryDictionarySource = 'UPDATE DICTIONARYSOURCE SET dictionaryTargetId=?, sourceWord=?, sourceWordURL=?, targetWord=?, isEditable=?, status=? WHERE id=?'; 
								var dictionarySourceParams = [dictionaryTargetId, sourceWord, newSourceWordURL, targetWord, 1, currentObj.getAWAITINGUPLOADSTATUS(), currentObj.getSourceId() ];
								
								tx.executeSql(
									queryDictionarySource,
									dictionarySourceParams,
									function (tx, results) {
										// if source audio was recorded, save it
										if ( newSourceWordURL ) {
											var newSourceFilename = newSourceWordURL.replace(/^.*[\\\/]/, '');
                                                    
											if ( device.platform == "Android" ) {
												var destDir = Sencha.app.androidFilesPath + "assets/words";
											} // else iOS
											else {
												var destDir = 'assets/words';
											}
                                                    
											currentObj.moveFileToPersistentStorage(currentObj.getSourceWordURLinTFS(), destDir, newSourceFilename, currentObj);
										}
									
										// if target audio was recorded, save it
										if ( newAudioURL ) {
											var newAudioFilename = newAudioURL.replace(/^.*[\\\/]/, '');
                                                    
											if ( device.platform == "Android" ) {
												var destDir = Sencha.app.androidFilesPath + "assets/words";
											} // else iOS
											else {
												var destDir = 'assets/words';
											} 
                                              
                                              console.log('currentObj.getTargetWordURLinTFS() = ' + currentObj.getTargetWordURLinTFS() );
											currentObj.moveFileToPersistentStorage(currentObj.getTargetWordURLinTFS(), destDir, newAudioFilename, currentObj);
										}
                                        
                                        // if comments audio was recorded, save it
										if ( newCommentsURL ) {
											var newCommentsFilename = newCommentsURL.replace(/^.*[\\\/]/, '');
                                                    
											if ( device.platform == "Android" ) {
												var destDir = Sencha.app.androidFilesPath + "assets/words";
											} // else iOS
											else {
												var destDir = 'assets/words';
											}
                                                    
											currentObj.moveFileToPersistentStorage(currentObj.getCommentsURLinTFS(), destDir, newCommentsFilename, currentObj);
										}
                                         
                                        console.log('just before phot if...');       
										// if a photo was taken, save it
										if ( newImageURL ) {
											console.log('a photo was taken, saving it...');
											var newImageFilename = newImageURL.replace(/^.*[\\\/]/, '');
											if ( device.platform == "Android" ) {
												/*
												var destDir = Sencha.app.androidFilesPath + "assets/images";
												//var tempImageURL = "DCIM/Camera/" + currentObj.getImageURLinTFS();
												var tempImageURL = Sencha.app.androidFilesPath + '../cache/' + currentObj.getImageURLinTFS();
												console.log('about to move file. tempImageURL = ' + tempImageURL);
												*/
												var destDir = Sencha.app.androidFilesPath + "assets/images";
												
											} 
											// else iOS
											else {
												var destDir = 'assets/images';
												//var tempImageURL = currentObj.getImageURLinTFS();
											}
                                                    
											//currentObj.moveFileToPersistentStorage(tempImageURL, destDir, newImageFilename, currentObj);
                                              console.log('currentObj.getImageURLinTFS() = ' + currentObj.getImageURLinTFS() );
											currentObj.moveFileToPersistentStorage(currentObj.getImageURLinTFS(), destDir, newImageFilename, currentObj);
										}
										
										currentObj.getApplication().getController('DictionaryListController').filterDictionarySearch();
										
										/*
										// Load stores to reflect database updates
										currentObj.getDictionaryListView().getStore().load(); // filtered dictionary source list
        								Ext.getStore("DictionarySources").load(); // unfiltered full dictionary source list
        								Ext.getStore("DictionaryTargets").load();
       									Ext.getStore("Speakers").load();
       									*/
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
   	
   	
   	
   	// Remember speaker values for saving later
    // MDM 20.05.2013 Called from other controllers when back/OK button pressed
    //
   	rememberNewSpeakerDetails: function() {
   		console.log('remembering SPEAKER....');
		this.setSpeakerName(this.getSpeakerNameField().getComponent('speakerNameField').getValue());
		//this.setSpeakerDOB(this.getSpeakerNameField().getComponent('speakerDOBField').getFormattedValue());
		//this.setSpeakerDOB( this.getSpeakerFieldSet().getComponent('speakerDOBField').getFormattedValue() );
		//this.setSpeakerDOB( this.getSpeakerDOBField().getValue() );
		this.setSpeakerDOB( this.getSpeakerDOBField().getFormattedValue('U') );
		//var d = new Date;
		//console.log('current time = ' + d.getTime() );
		//console.log('remembering speaker dob of: ' + this.getSpeakerDOB() );
		this.setSpeakerGender( this.getSpeakerGenderField().getGroupValue() );
		this.setSpeakerComment( this.getSpeakerCommentField().getComponent('speakerCommentField').getValue() );    
   	},
   	 
   	
   	// Remember meta data values for saving later
   	// MDM 20.05.2013 Called from other controllers when back/OK button pressed
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
        // Sencha bug allows the disclosure arrow to be clicked more than once, so check for this
        var innerItems = this.getMain().getInnerItems();
        var secondViewInStack = innerItems[1].xtype;
        // if dictionaryformview is second item in stack, then we must be adding a new entry
        if ( secondViewInStack == "dictionaryformview" ) {
           if ( innerItems.length > 2 ) {
                return;
           }
        }
        // else must be editing the entry instead
        else {
           if ( innerItems.length > 3 ) {
                return;
           }
        }
           
   		this.getDictionaryEntryButton().setText('OK');
   		
    	this.getMain().push({
    		xtype: 'metadataformview'			                    
    	});
  
        //var d = new Date();
        //d.setTime( this.getCurrentDate() );
    	//this.getDicMetadaForm().getComponent('dateField').setValue( d.toDateString() );
    	//var d = new Date( this.getCurrentDate() );
    	var d = new Date();
    	//this.getDicMetadaForm().getComponent('dateField').setValue( d );
        this.getDicMetadaForm().getComponent('dateField').setValue( d.toDateString() );
    	this.getDicMetadaForm().getComponent('latitudeField').setValue( this.getCurrentLatitude() );
    	this.getDicMetadaForm().getComponent('longitudeField').setValue( this.getCurrentLongitude() );
    	this.getDicMetadaForm().getComponent('recordingDeviceField').setValue( this.getRecordingDevice() );
    	
    	console.log('this.getRecordingDevice() = ' + this.getRecordingDevice() );
    },
    
    
    
    showSpeakerForm: function() {
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
    	
    	/*
    	var tempDate = "";
        if (this.getSpeakerDOB() != ""){
            //tempDate = this.getSpeakerDOB().split("/");
            //this.getSpeakerNameField().getComponent('speakerDOBField').setValue({day  : tempDate[0], month: tempDate[1], year : tempDate[2]});
        	var d = new Date();
        	this.getSpeakerNameField().getComponent('speakerDOBField').setValue( d );
     
        }
    	*/
    	
    	//var d = new Date();
    	console.log('date = ' + this.getSpeakerDOB() );
        //this.getSpeakerNameField().getComponent('speakerDOBField').setValue( d );
    	//this.getSpeakerDOBField().setValue( this.getSpeakerDOB() );
    	var d = new Date( this.getSpeakerDOB()*1000 );
    	console.log('d = ' + d);
    	this.getSpeakerDOBField().setValue( d );
    		
        this.getSpeakerNameField().getComponent('speakerNameField').setValue(this.getSpeakerName());
        this.getSpeakerGenderField().setGroupValue(this.getSpeakerGender());
        this.getSpeakerCommentField().getComponent('speakerCommentField').setValue(this.getSpeakerComment());
        
        // Disable speaker fields if the dictionary entry this speaker is associated with is not editable
        //var innerItems = this.getMain().getInnerItems();
        //var secondViewInStack = innerItems[1].xtype;
        
        // if this is an edit (ie. if dictionaryformview is second item in stack, then we must be adding a new entry)
        if ( this.getMain().getInnerItems()[1].xtype != "dictionaryformview" ) {
			var dictionarySourceRecord = Ext.getStore("DictionarySources").getById( this.getSourceId() );
			if ( dictionarySourceRecord.get('isEditable')==0 || dictionarySourceRecord.get('isEditable')==null ) {
        		console.log('in speaker, not editable.............');
				this.getSpeakerNameField().getComponent('speakerNameField').disable();
				this.getSpeakerNameField().getComponent('speakerDOBField').disable();
				this.getSpeakerGenderField().disable();
				this.getSpeakerCommentField().getComponent('speakerCommentField').disable();
        	}
        }
    },
           
           
    // Move file from temporary storage to persistent storage. Uses PhoneGap File API
    // MDM 17.04.2012
    // srcPath - path to the file we want to move that is located on the temporary file system
    // destDir - sub directory on permanent file system (optional)
    // destFilename - new name of file (optional - otherwise uses current filename)
    // thisObj - (optional) this class ie. 'this'. However we pass it as paramater for invocation from a callback
    //
    moveFileToPersistentStorage: function(srcPath, destDir, destFilename, thisObj) {
        var me;
        
        // if current obj not passed in, then just use this
        if ( thisObj ) {
           me = thisObj;
        } else {
           me = this;
        }
           
        // Leave and do nothing if file hasn't just been created (located in temporary filestore)
        if ( !srcPath ) {
           return;
        }
           
        // file copy error callback
        function onFileSystemFail(evt) {
           console.log('moveFileToPersistentStorage file system fail');
           console.log(evt.target.error.code);
           var msg = 'An error occurred during file copy: ' + evt.target.error.code;
           navigator.notification.alert(msg, null, 'Capture error');
        }
           
		if ( device.platform == "Android" ) {
			//var srcFilename = srcPath;
			console.log('srcPath = ' + srcPath);
			var srcFilename = srcPath.replace("file:/", "");
			// Phonegap bug means we have to use persistent file system
       		var lfs = LocalFileSystem.PERSISTENT;
       	}
       	// else iOS 
       	else {
           //var srcFilename = srcPath.replace(/^.*[\\\/]/, ''); // Connvert path to filename
           var srcFilename = srcPath;
           console.log('srcFilename = ' + srcFilename);
           var lfs = LocalFileSystem.TEMPORARY;
		}

        // Request persistent file system (to copy to)
        window.requestFileSystem(
            lfs, 
            0, 
            function(fst) {
            	me.fsCopy(fst.root, srcFilename, destDir, destFilename, me);
            }, 
            onFileSystemFail
        );
    },

           
    // Move file from temporary storage to persistent storage. Uses PhoneGap File API
    // fst - temporary file system
    // srcFilename - file we want to move located on the temporary file system
    // destDir - sub dir on PERMANENT file system (optional)
    // destFilename - new filename (optional)
    // thisObj - current superclass ie. 'this' (optional)
    // MDM 17.04.2012
    // 1. Request persistent file system (may need to get a directory here?)
    // 2. Get file from temporary file system using newly encoded filename (ie. ending in m4a)
    // 3. Move file entry from temporary file system to persistent file system
    // 4. Remove reference to audioURLinTFS variable
    // 
    fsCopy: function(fst, srcFilename, destDir, destFilename, thisObj) {
        var me;
        if ( thisObj ) {
           me = thisObj;
        } else {
           me = this;
        }
           
        console.log('destDir = ' + destDir);
        // file copy error callback
        function onFileSystemFail(evt) {
           console.log('fsCopy file system fail');
           console.log(evt.target.error.code);
           var msg = 'An error occurred during file copy: ' + evt.target.error.code;
           navigator.notification.alert(msg, null, 'File copy error');
        }
        
        console.log('file we want to copy = ' + srcFilename);
        // Get file we want to copy using Phonegap File API
        fst.getFile (
            srcFilename, 
            {create: false}, 
            // Success callback - get PERSISTENT file system to copy to using Phonegap File API
            function (fileEntry) {
            	console.log('file found...');
            	
            	console.log('destDir = ' + destDir);
            	
                window.requestFileSystem (
                    LocalFileSystem.PERSISTENT, 
                    0,
                    // Success callback - get/create sub directory if required else just move file
                    function (fsp) {
                        console.log('succesfuly persistent file system found');
                        if ( destDir ) {
                            console.log('1');
                            fsp.root.getDirectory(
                                destDir,
                                {create: true},
                                // Success callback -  move file entry to persistent store 
                                function(fspDestDir) {
                                    console.log('succesful get directory (destDir)');
                                    fileEntry.moveTo(
                                        fspDestDir,
                                        destFilename ? destFilename : srcFilename,
                                        function () {
                                                     console.log('success');
                                                     console.log('destFilename = ' + destFilename);
                                                     console.log('fspDestDir = ' + fspDestDir.fullPath );
                                        },
                                        onFileSystemFail
                                    );
                                },
                                onFileSystemFail
                            );
                        } else {
                        	// just move file entry to persistent store root directory
                        	if ( device.platform == "Android" ) {
        						fspDestDir = fspDestDir.replace("file://", "") + "/" + Sencha.app.androidFilesPath;
        					} 
                 
                            fileEntry.moveTo(
                                fsp.root,
                                destFilename ? destFilename : srcFilename,
                                null,
                                onFileSystemFail
                            );              
                        }
                    },
                    onFileSystemFail
                )
            }, 
            onFileSystemFail
        );
    },    
           
           
    // Displays actionsheet to either take photo or choose photo from gallery
    // 
    onAddImageTap: function() {
    	console.log('in onAddImageTap');
        //navigator.camera.getPicture( cameraSuccess, cameraError, { quality: 50, destinationType: Camera.DestinationType.DATA_URL} );
		this.getPhotoSourceSelectView().show();  
	},
    

    // Add image - stores reference to image taken/chosen
    // Params:
    //    source - choose or take photo ie. either navigator.camera.PictureSourceType.CAMERA or navigator.camera.PictureSourceType.PHOTOLIBRARY
	// MDM 20.05.2013
	//
	addImage: function(source) {   
		this.getPhotoSourceSelectView().hide(); // hide image source selector action sheet
		me = this; 
		  
		// show image as icon on button
		function showImageOnButton(uri) {
           me.getAddImageButtonRef().setHtml('<div class="addPhotoButtonHolder"><img src="' + uri + '" class="addPhotoButtonImage"/></div>');
		}
		
		// copy photo from gallery to tfs (for iOS)
		function copyPhoto(fileEntry) {
            console.log('in copyPhoto. fileEntry.path = ' + fileEntry.fullPath);
    		window.requestFileSystem(
    			LocalFileSystem.TEMPORARY, 
    			0, 
    			function(fileSys) {
                    console.log('succesfully requested LFS');
    				fileEntry.copyTo(
    					fileSys.root, 
    					null, 
    					setImageURL,
    					fail
    				);  
    			}, 
    			fail
    		); 
		}
		
        function setImageURL(entry) {
			console.log('SUCCESS - copied file from gallery to TFS');
			me.setImageURLinTFS( entry.fullPath ); // remember filename of this file
    		console.log(entry.fullPath)
    		showImageOnButton(entry.fullPath);
		}
		
		function fail(error) {
           console.log('copy failed');
           console.log(error.code);
           navigator.notification.alert('Unable to resolve or copy image to app file store', null, 'Capture error');
		}
		
        // Phonegap device impage capture
        //navigator.device.capture.captureImage(
        navigator.camera.getPicture(
            // success callback
            function (imageURI) { // Success
            	// If there is already a temporary image, delete it
            	// if ( getImageURLinTFS() ) { ...
                console.log('imageURI = ' + imageURI);
                                    
            	if ( source == navigator.camera.PictureSourceType.PHOTOLIBRARY) {
            		console.log('A photo selected from the photo lib');
            		
                    if ( device.platform == "Android" ) {
                        // On Android, file has to be copied from outside app bundle to temporary file system
                        window.resolveLocalFileSystemURI(imageURI.replace("file://", ""), copyPhoto, fail);
                    } else {
                        // in iOS, Phonegap's navigator.camera.getPicture stores photos elsewhere in file://localhost/... so these need to be resolved
                        window.resolveLocalFileSystemURI(imageURI, setImageURL, fail);
                    }
            		
            	} else {
                    console.log('photo taken with camera');
                    console.log('imageURI =' + imageURI);
                                    
                    if ( device.platform == "Android" ) {
                        //var srcFilename = imageURI.replace(/^.*[\\\/]/, ''); // just give us the filename
                        me.setImageURLinTFS( imageURI ); // remember filename of this file
                        showImageOnButton( imageURI );
                    } else {
                        // in iOS, Phonegap's navigator.camera.getPicture stores photos elsewhere in file://localhost/... so these need to be resolved
                        window.resolveLocalFileSystemURI(imageURI, setImageURL, fail);
                    }
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
            //{limit: 1}
        );
    },
    
    
    // Delete file from permanent file system. Uses PhoneGap File API
    // MDM 20.08.2012
    // fileName - Name of file to delete
    //
    deleteFileFromPersistentStorage: function(fileName) {
    	// Exit if filename is empty, null etc.
    	if (fileName == '' || fileName == null) { return; }
    
    	if ( device.platform == "Android" ) {
			fileName = Sencha.app.androidFilesPath + "assets/" + fileName;
		}
		// else iOS
		else {
			fileName = 'assets/' + fileName;   
		}     
                
        // file copy error callback
        function onFileSystemFail(evt) {
           console.log('deleteFileFromPersistentStorage file system fail: ' + fileName);
           console.log(evt.target.error.code);
        }
                
        window.requestFileSystem(
            LocalFileSystem.PERSISTENT, 
            0, 
            function(fsp) {
                fsp.root.getFile (
                    fileName, 
                    {create: false, exclusive: true}, 
                    function (fileEntryToDelete) {
                        fileEntryToDelete.remove(
                            null,
                            onFileSystemFail      
                        );
                    },
                    onFileSystemFail
                );
            },
            onFileSystemFail
        );
    },
           
           
    // Delete dictionary entry
    // MDM 16.08.2012 
    //
    deleteDictionaryEntry : function(){
        var currentObj = this;
           
        // Confirm delete
        navigator.notification.confirm(
            'Really delete this dictionary entry?',  // message
            function (indexOfButtonPressed) { 
                // Get out of here if cancel button tapped
                if (indexOfButtonPressed==1) {
                    return;
                }
           
                var dictionarySourceStore = Ext.getStore("DictionarySources");
                var dictionaryTargetStore = Ext.getStore("DictionaryTargets");
                var speakerStore = Ext.getStore("Speakers");
                //var collectorStore = Ext.getStore("Collectors");

				//var sourceModel = dictionarySourceStore.getById(currentObj.getDictionaryForm().getComponent('sourceIdField').getValue());
				var sourceModel = dictionarySourceStore.getById( currentObj.getSourceId() );
				// Remove dictionary source record
				var sourceAudioFilename = sourceModel.get('sourceWordURL');
				dictionarySourceStore.remove(sourceModel);
				dictionarySourceStore.sync();
				// if deleteDelete source word audio file if delete record
				if ( dictionarySourceStore.find("id", currentObj.getSourceId() ) == -1 && sourceAudioFilename ) {
					currentObj.deleteFileFromPersistentStorage(sourceAudioFilename);
				}
        
        		// Remove speaker record
				console.log('about to remove speaker record');
				if ( dictionaryTargetStore.find("speakerId", currentObj.getSpeakerId() ) == -1 ){
					var speakerModel = speakerStore.getById( currentObj.getSpeakerId() );
					speakerStore.remove(speakerModel);
					speakerStore.sync();
				}
        
                //var dicTargetId = currentObj.getDictionaryForm().getComponent('targetIdField').getValue();
                //var dictTargetId = currentObj.getTargetId();
                //if ( dictionarySourceStore.find("dictionaryTargetId", dicTargetId) == -1) {
                // Remove dictionary target record if no other source words use this target word 
                console.log('about to remove target record');
                if ( dictionarySourceStore.find("dictionaryTargetId", currentObj.getTargetId() ) == -1) {
                    var targetModel = dictionaryTargetStore.getById( currentObj.getTargetId() );
                    // Remember audio and image filenames in target record for deleting later
                    var audioFilename = targetModel.get('audioURL'); // target/translation audio
                    var commentsAudioFilename = targetModel.get('commentsURL'); // comments audio
                    var imageFilename = targetModel.get('imageURL'); // image
                    dictionaryTargetStore.remove(targetModel);
                    dictionaryTargetStore.sync();
	   		
                    console.log('delet target audio file');
                    // Delete (taget/translation) audio file
                    if ( audioFilename ) {
                        currentObj.deleteFileFromPersistentStorage(audioFilename);
                    }
                    console.log('delete comments media file');
                    // Delete comments audio file
                    if ( commentsAudioFilename ) {
                        currentObj.deleteFileFromPersistentStorage(commentsAudioFilename);
                    }
                    console.log('delete image file');
                    // Delete image file as well
                    if ( imageFilename ) {
                        currentObj.deleteFileFromPersistentStorage(imageFilename);
                    }
                } 
           
                Ext.getStore('DictionarySourcesFiltered').sync();
           
                // Refresh list to show new item
                //currentObj.filterDictionarySearch();
                console.log('calling FILTER');
                //currentObj.getApplication().getController('DictionaryListController').clearDictionarySearchFilter();
                
                // turn on icon image
                currentObj.getDictionaryEntryButton().setText('');
                currentObj.getDictionaryEntryButton().setIconCls('plusSignIcon'); 
           
                currentObj.getMain().pop(2);
                
                currentObj.getApplication().getController('DictionaryListController').filterDictionarySearch();
            },
            'Delete Entry',            // title
            'Cancel,OK'          // buttonLabels
        );
   	}  
    
});
