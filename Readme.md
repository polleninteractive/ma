# Ma!



The Ma! Dictionary App framework availabe under the MIT license.


####Dependencies
* Cordova 3.5.0-0.2.7
* Sencha Touch 2.4.0
* A web service for sharing dictionary entries - you can use ours (see www.ma-project.net) or create your own. 

####Plugins
* org.apache.cordova.device
* org.apache.cordova.dialogs
* org.apache.cordova.file
* org.apache.cordova.file-transfer
* org.apache.cordova.inappbrowser
* org.apache.cordova.media
* org.apache.cordova.media-capture
* org.apache.cordova.splashscreen
* org.apache.cordova.vibration
* com.brodysoft.sqlitePlugin


####Add-ons
* AudioEncode (iOS app records audio as uncompressed .wav file. This class by Lyle Pratt and updated by Keenan Wyrobek converts audio at a file path to M4A format)
* Pull Refresh
* The Ma! Dictionary app expects a database in



####For Further development
* Currently the app uses Cordova's media capture. Unfortunately for some Android users, if the default Android audio player is either not available or has been replaced by the device manufacturer with their own, then audio recording will fail. The solution to this problem is to create the app's own media recorder using org.apache.cordova.media. This will require the development of the UI plus necessary functionality to record, stop, play etc.