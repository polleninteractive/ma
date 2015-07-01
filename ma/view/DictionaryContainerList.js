// Dictionary Container List - contains list view, search filter box and language toggle buttons
//

Ext.define("Ma.view.DictionaryContainerList", {
    extend: "Ext.Container",
    xtype: 'dictionarycontainerlist',

    config: {
        title: 'Dictionary',
        layout: {
           type: 'fit'
        }
    },

    initialize: function () {
        this.callParent(arguments);
        
        var searchField ={
        	xtype: 'searchfield',
        	name : 'dictionarySearchField',
            cls: 'dictionarySearchField',
            autoCapitalize: false
        };
        
    	var engButton = {
			xtype: "button",
			cls: 'engDictionaryButton',
			id: 'engDictionaryButtonId1',
			text : Sencha.app.getFirstLanguageAbbreviation(),
			ui: 'round'
    	};
    	
    	var iwaButton = {
    	    xtype: "button",
    	    cls: 'iwaDictionaryButton',
			id: 'iwaDictionaryButtonId1',
			text : Sencha.app.getSecondLanguageAbbreviation(),
			ui: 'round'
    	};
    	
    	var searchToolbar = {
    	    xtype: "toolbar",
    	    docked: "top",
    	    cls: "dictionaryToolBar",
    	    items: [
    	        searchField,
    	        engButton,
    	        iwaButton
    	    ]
    	};

        var dictionaryList = {
            xtype: "dictionarylistview"
        };

        this.add([searchToolbar, dictionaryList]);
    }
    
});