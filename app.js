  
//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'Ma': 'ma',
    'Sencha': 'app'
}); 
//</debug>  


/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/ 
    
Ext.application({
    name: 'Sencha', 
  
	// Global constants
	AWAITING_UPLOAD: 1,
    AWAITING_MODERATION_STATUS: 2,
    FILE_UPLOAD_FAILED_STATUS: -1,
    
    // Ma! web service API details
    API: 'put URL of web service API here (Ma! web service only)', // URL of API
    API_URL: 'put URL of API specific to this particular language app here (Ma! web service only)', // URL of API specific to this particular language app
    API_URL_DICT: 'put URL of API specific to dictionary of this particular language app here (Ma! web service only)', // URL of API specific to dictionary of this particular language app
    SOURCE_LANGUAGE_URL: 'english/', // source language URL (Ma! web service only)
    TARGET_LANGUAGE_URL: 'put url of target language here/', // target language URL (Ma! web service only)
    SOURCE_LANGUAGE_ID: '1', // source language id (Ma! web service only)
    TARGET_LANGUAGE_ID: '2', // target language id (Ma! web service only)
            
	// Constants
    iOSfilestorePrefix: 'file://', // Prefix required for window.resolvelocalfilesystemURL to work on iOS on audio captured with media plugin
	dictionaryWordsFolderName: 'words/', // sub-folder where dictionary words are stroed
	imagesFolderName: 'images/', // sub-folder where images are stored
	moreTabURL: 'http://www.iwaidja.org/', // URL to open when more tab tapped
	firstLanguageName: 'English', // used in add/edit entry form, typically this is the source language
	secondLanguageName: 'Iwaidja', //  used in add/edit entry form, typically this is the target language
	firstLanguageAbbreviation: 'EN', // used on toggle buttons, typically this is the source language
	secondLanguageAbbreviation: 'IW', // used on toggle buttons, typically this is the target language
                
    // Global variables
    persistentFileStoreVar : "",
    temporaryFileStoreVar : "",
    mediaPtr : null,
    username: null,

    controllers: ['Ma.controller.DictionaryNavigationController', 'Ma.controller.DictionaryListController', 'Ma.controller.PhotoSourceSelectController', 'Ma.controller.DictionaryFormController', 'Ma.controller.RegistrationFormController', 'Ma.controller.DictionarySyncController', 'Ma.controller.DictionaryDetailController', 'Ma.controller.TabBarController', 'Ma.controller.InformationListController'],
    views: ['Ma.view.VideoView', 'Ma.view.PhotoSourceSelectView', 'Ma.view.RegistrationFormView', 'Ma.view.DictionarySyncConfirmationView', 'Ma.view.DictionaryContainerList', 'Ma.view.DictionaryFormView', 'Ma.view.DictionaryListView', 'Ma.view.DictionaryNavigationView', 'Ma.view.DictionaryTargetDetailView', 'Ma.view.TabView', 'Ma.view.SoundRecorder', 'Ma.view.MetadataFormView', 'Ma.view.SpeakerFormView', 'Ma.view.DictionaryDetailPageView', 'Ma.view.ImageView', 'Ma.view.InformationNavigationView', 'Ma.view.InformationListView', 'Ma.view.HowToUseAppInfoView', 'Ma.view.AboutThisAppInfoView', 'Ma.view.LanguageFootprintInfoView', 'Ma.view.SoundsOfIwaidjaInfoView' ],
    stores: ['Ma.store.SystemStates', 'Ma.store.DictionarySources', 'Ma.store.DictionaryTargets', 'Ma.store.Collectors', 'Ma.store.DictionarySourcesFiltered'], 
    models: ['Ma.model.DictionarySourceFiltered', 'Ma.model.DictionarySource', 'Ma.model.DictionaryTarget', 'Ma.model.SystemState', 'Ma.model.Collector'],
  
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    }, 

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

	
    launch: function() {
    	Ext.Viewport.add(
        	[
        		{
            		xtype: 'tabview'
        		},
        		{
        			xtype: 'dictionarysyncconfirmationview' // actionsheet for syncing (hidden by default)
        		},
        		{
        			xtype: 'photosourceselectview' // actionsheet for taking/selecting photo (hiddent by default)
        		}
        	]
        );
        
        // Set global file stores (for iOS only)
        this.setPersistentFileStoreVar();
        this.setTemporaryFileStoreVar();
       
        
        // Set username as device id until registration step completed (used to assign unique filenames later)
        // Note: iOS quirk means UUID may not be unique!
        Sencha.app.setUsername(device.uuid)
              
		// hide splash screen (need to make sure autohide splash is set to false in info.plist)
		navigator.splashscreen.hide();	
    },


    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
	
	
	// Getters for language names
	getFirstLanguageName: function() {
        return this.firstLanguageName;
    },
	
	getSecondLanguageName: function() {
        return this.secondLanguageName;
    },
	
	// Getters for language abbreviations
	getFirstLanguageAbbreviation: function() {
        return this.firstLanguageAbbreviation;
    },
	
	getSecondLanguageAbbreviation: function() {
        return this.secondLanguageAbbreviation;
    },
	
	// Getter for moreTabURL
	getMoreTabURL: function() {
        return this.moreTabURL;
    },
	


    // Getter for dictionaryWordsFolder
    //
    getIOSfilestorePrefix: function() {
        return this.iOSfilestorePrefix;
    },
                
                
	// Getter for dictionaryWordsFolder 
	//
	getDictionaryWordsFolderName: function() {
		return this.dictionaryWordsFolderName;
	},
	
	// Getter for imagesFolder 
	//
	getImagesFolderName: function() {
		return this.imagesFolderName;
	},


	// Define global username getters and setters
	//
	setUsername: function(arg) {
		this.username = arg;
	},
    
	getUsername: function(arg) {
		return this.username;
	},
    
	
    // Definte Persistent Filestore getters and setters (for some reason they aren't created automatically)
    //
    setPersistentFileStoreVar: function(arg) {
        this.persistentFileStoreVar = arg;
    },


    getPersistentFileStoreVar: function() {
        return this.persistentFileStoreVar;
    },

    // Set persistent file store and store it in persistentFileStoreVal
    // Used for iOS only
    //
    setPersistentFileStoreVar: function() {
    	var me = this;
    
        if ( !this.persistentFileStoreVar ) {
            window.requestFileSystem(
                LocalFileSystem.PERSISTENT, 
                0, 
                function(fsp) {
                	me.persistentFileStoreVar = fsp.root.toInternalURL();
                },
                function(evt) {
                    console.log(evt.target.error.code);
                    var msg = 'An error occurred accessing persistent file store: ' + evt.target.error.code;
                    navigator.notification.alert(msg, null, 'Capture error');
                }
            );
        }
    }, 
   	 
		 
    getTemporaryFileStoreVar: function() {
        return this.temporaryFileStoreVar;
    },
           
                
    // Get temporary file store and store it in persistentFileStoreVal
    // Used for iOS only
    //
    setTemporaryFileStoreVar: function() {
    	var me = this;
    
        if ( !this.temporaryFileStoreVar ) {
            window.requestFileSystem(
                LocalFileSystem.TEMPORARY, 
                0, 
                function(fst) {
                    //Sencha.app.setTemporaryFileStoreVar(fst.root.fullPath);
                    me.temporaryFileStoreVar = fst.root;
                },
                function(evt) {
                    console.log(evt.target.error.code);
                    var msg = 'An error occurred accessing temporary file store: ' + evt.target.error.code;
                    navigator.notification.alert(msg, null, 'Capture error');
                }
            );
        }
    },
    
    
    // Utility function to get persistent storage folder. On Android currently this is the dataDirectory and on iOS the Documents folder
    //
    getPersistenStorgeRootFolder: function() {
    	if ( device.platform == "Android" ) {
			return cordova.file.dataDirectory;
		} 
        // else iOS
        else {
        	return Sencha.app.getPersistentFileStoreVar();
        }
    },
    
    // Utility function to return assets folder
    //
    getAssetsFolder: function() {
    	return Sencha.app.getPersistenStorgeRootFolder() + "assets/";
    },
    
    
    // Utility function to return words folder
    //
    getWordsFolder: function() {
    	return Sencha.app.getAssetsFolder() + Sencha.app.getDictionaryWordsFolderName();
    },
	
	// Utility function to return images folder
    //
    getImagesFolder: function() {
    	return Sencha.app.getAssetsFolder() + Sencha.app.getImagesFolderName();
    },
    
    
    // Utility method for playing audio asset file and cleanup afterwards using Cordova media plugin
    // Audio is played is several places throughout the app. This convenience method is used to play audio asset files 
    // and cleanup afterwards. 
    // Necessary to retain a reference to the media object and delete it the next time audio needs to be played - contrary
    // to cordova example provided in docs, if the media object is released straight after playing the audio file, the audio 
    // file never gets to finish playing
    // 
    // Parameters:
    // audioFile - the full path to the audio file to play
    //
    playAudioAndRelease: function(audioURL) {
    	if ( audioURL ) {
			// Release the previous media object if there is one
			if (Sencha.app.mediaPtr) {
				Sencha.app.mediaPtr.release();
			}
			
			var my_media = new Media(
				audioURL,
				null, // success callback
				// error callback
				function(err) {
					console.log("playAudio():Audio Error code: " + err.code + " message: "+ err.message);
				}
			);
           
			my_media.play();
			Sencha.app.mediaPtr=my_media;
		}
    },
    
	
	// Plays an audio file located in an assets subdirectory 
	// On Android devices, the assets folder needs to be copied at startup to the files device path (accessed via the Cordova dataDirectory)
	// On iOS devices, the assets folder needs to be copied at startup to the Documents device path. Unfortunately, due to a Cordova bug audio files
	// cannot be played from the dataDirectory using the Cordova Media plugin. Instead, on iOS the assets folder needs to be copied to the Documents device path
	// and accessed using the old window.requestFileSystem and then toInternalURL() on the returned entry to get a full path that the Cordova Media plugin
	// can use.
	//
	// Paramaeters:
	// audioFile - the audio asset to play including asset subdirectory eg. eg. word/janirra.m4a
	//
    playAudioAssetAndRelease: function(audioFile) {
		if ( device.platform == "Android" ) {
			Sencha.app.playAudioAndRelease( Sencha.app.getAssetsFolder() + audioFile );
		} 
        // else iOS
        else {
        	Sencha.app.playAudioAndRelease( Sencha.app.getPersistentFileStoreVar() + "assets/" + audioFile );
        } 
    }

});
