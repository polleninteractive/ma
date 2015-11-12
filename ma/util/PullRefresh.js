// Sencha 2.2.0 removed the refershFn config so to get around this, we created the PullRefersh plugin
// which overrides the onLatestFetched method to fire our 'pulled' event


Ext.define('Ma.util.PullRefresh', {
    extend: 'Ext.plugin.PullRefresh',
	
	requires: [
        'Ext.plugin.PullRefresh'
    ], 

	fetchLatest: function() {
		this.fireEvent('pulled');
		
		this.setState("loaded");
        //this.fireEvent('latestfetched', this, toInsert);
        if (this.getAutoSnapBack()) {
            this.snapBack();
        }
	}

	
});