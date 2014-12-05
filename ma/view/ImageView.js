// Image View - used to display dictionary image full size
//

Ext.define('Ma.view.ImageView', {
    extend: 'Ext.Container',
    xtype: 'imageview',
    config: {
        layout:{
            type:'vbox',
            align:'center'
        },
        fullscreen: true,
        scrollable: {
           direction: 'vertical',
           directionLock: true
        },
           
        items: [
            {
                flex: 1
            },
            {
                id: 'imageContainer',
                html: ''
            },
            {
                flex: 1
            }
        ]
    }
        
});