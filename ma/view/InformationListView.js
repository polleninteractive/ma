// Information List View - displays list of information sections to choose from
//

Ext.define('Ma.view.InformationListView', {
    extend: 'Ext.List',
    xtype: 'informationlistview',
           
    config: {
        cls: 'infolistview',
        title: 'Information',
        itemTpl: '<div class=clear><div class=infolisticon><img src="{iconimage}" /></div><div class=infolisttitle>{title}</div></div>',
        data: [
            { title: 'How to Use This App', iconimage: 'images/HowToUseThisApp.png'  },
            { title: 'Reducing Your Language Footprint', iconimage: 'images/ReducingYourLanguageFootprint.png' },
            { title: 'The Sounds of Iwaidja', iconimage: 'images/TheSoundsOfIwaidja.png' },
            { title: 'About This App', iconimage: 'images/HowToUseThisApp.png' }
        ]
    }
});
