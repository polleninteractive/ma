// Video Detail View
//

Ext.define('Ma.view.VideoView', {
    extend: 'Ext.Container',
    xtype: 'videoview',
	requires: [
        'Ext.Video'
    ],
    config: {
        layout:{
            type:'vbox',
            align:'center'
        },
        fullscreen: true,  
        items: [
            {
            	xtype: 'video',
            	itemId: 'videoPlayer',
            	autoResume: true,
                autoPause: false,
            	centered: true
        	}
        ]
    }
        
});