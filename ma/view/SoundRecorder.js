Ext.define('Ma.view.SoundRecorder', {
    extend: 'Ext.Button',
    xtype: 'soundrecorder',
    cls: 'audioRecordButtonCls',
    	
    initialize: function () {
    	this.callParent(arguments);        
        

           console.log("soundrecorder button");
    }

});