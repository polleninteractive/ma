// About This App Carousel View
//

Ext.define('Ma.view.AboutThisAppInfoView', {
    extend: 'Ext.Carousel',
    xtype: 'aboutthisappinfoview',
    config: {
        title: 'Information',
        fullscreen: true,
        defaults: {
            styleHtmlContent: true
        },
        cls: 'infocarousel',
           
        items: [
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><div class=header><p>About This App</p></div><p><i>The Ma! Iwaidja series is dedicated to the memory of Joy Williams Malwagag (1946-2012)</i></p><p>The Ma! Iwaidja series is an initiative of the Minjilang Endangered Languages Publication Project (also known as Iwaidja Inyman), based on Croker Island, Northern Territory, Australia. The project is funded by the Indigenous Languages Support Program of the Australian Government\'s Office of the Arts.</p><p>Based on an original concept by Bruce Birch, the app is the result of a collaboration between the Croker Island-based Iwaidja Inyman team, developers Pollen Interactive, and designers David Lancashire Design.</p></div>"
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><p>The Dictionary is based on content created by Bruce Birch and Nick Evans of the Australian National University in collaboration with Iwaidja-speakers on Croker Island, chief among whom was Joy Williams Malwagag who passed away two months before the release of this app. Significant input to various sections of the Dictionary came from Khaki Marrala, David Minyimak, Rae Giribug, Charlie Mangulda, Archie Brown, Tim Mamitba, Ilijili Lamilami, Sabine Hoeng, Helen Larson, Scott Whiting, Linda Barwick and Kim Akerman. One of the starting points for the Dictionary was the wordlist prepared by Noreen Pym who worked as a linguist on Iwaidja in the 1970s. Significant content for the dictionary was co-funded through the Documentation of Endangered Languages (DoBeS) program of the Volkswagen Foundation, Germany.</p><p>The 'Phrases' and 'Wordmaker' sections were created and compiled by Bruce Birch and Joy Williams Malwagag.</p><p>Voices heard on the app are those of Isabel Lamilami, Maggie Maburnbi, Kurtlee Narluwerrd, Jeremiah Nabalum, Axsoul Damala, and Aden Cooper.</p><p>Thanks go to Tamsin Wagner for assistance with preparation of the data upload document, and Sabine Hoeng, Di Lancashire, Nick Thieberger, and Robert Mailhammer for valuable discussion and feedback at various stages of the development.</p></div>"
            }
        ]
    }
    
});