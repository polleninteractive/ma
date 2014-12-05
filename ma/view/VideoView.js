// Video Detail View
//

Ext.define('Ma.view.VideoView', {
    extend: 'Ext.Container',
    xtype: 'videoview',
    config: {
    	// parameters (passed in)
        videoURL: null,
    
        layout:{
            type:'vbox',
            align:'center'
        },
        fullscreen: true,  
        items: [
            {
            	xtype: 'video',
            	id: 'videoPlayer',
            	autoResume: true,
                autoPause: false,
            	centered: true
        	}
        ]
    }
        
});