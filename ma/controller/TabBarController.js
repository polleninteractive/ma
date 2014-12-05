// TAB BAR CONTROLLER
// Handles logo button tap (to open web page in browser) and turns off animations for Android because too slow

Ext.define('Sencha.controller.TabBarController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'tabview',
            logoButton: 'button[cls=logoButton]'
        },
        
        control: {
            'logoButton' :{
           		tap: 'onLogoButtonTap'
            }
        }
    },


	// For Android, turn off animations - it's too slow
	//
	launch: function(){
        if ( device.platform == "Android" ) {
        	this.getMain().getLayout().setAnimation(false);
		}
    },       
           
           
    // Handle tap event on logo button located on TabPanel tab bar
    //
    onLogoButtonTap : function() {
        var ref = window.open(encodeURI('http://www.iwaidja.org/'), '_system', 'location=yes');
        
    }
           
});
