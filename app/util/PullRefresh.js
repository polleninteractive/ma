// Sencha 2.2.0 removed the refershFn config so to get around this, we created the PullRefersh plugin
// which overrides the onLatestFetched method to fire our 'pulled' event


Ext.define('Sencha.util.PullRefresh', {
    extend: 'Ext.plugin.PullRefresh',
	
	requires: [
        'Ext.plugin.PullRefresh'
    ], 


    onLatestFetched: function(operation) {
        this.callParent(arguments);
        
		this.fireEvent('pulled');
    }
});