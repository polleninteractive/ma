// Language Footprint Carousel View (in Information tab)
//

Ext.define('Sencha.view.LanguageFootprintInfoView', {
    extend: 'Ext.Carousel',
    xtype: 'languagefootprintinfoview',
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
                html : "<div class=infosection><div class=header><p>Reducing your language footprint</p></div><p>Of the world\'s approximately 7000 languages, around half are currently in danger of becoming extinct. Iwaidja is one of these. The languages of the world are disappearing at the rate of one every few weeks. This is mainly as a result of languages like English taking over.</p><p>Western Arnhem Land in Australia\'s Northern Territory, is one of the most linguistically diverse areas on the planet. It is also one of the areas of the world where languages are disappearing at an alarming rate. Some of Iwaidja’s sister languages have already disappeared forever. Marrku, the original language of Croker Island, is no longer spoken, though there remains one person who can partially understand it. Garig, formerly one of the major languages of nearby Cobourg Peninsula, is also gone, along with the closely related Ilgar, originally spoken by people whose country was situated among the islands in the vicinity of Croker. Wurruku, the language from the western end of Cobourg Peninsula, disappeared before any record of it could be made. Amurdak, the language of the Mt Borradaille area south of Cobourg Peninsula, is now down to the last couple of speakers.</p></div>"
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><p>Because these languages have never been written down, with their passing we effectively lose the results and expression of unique localised knowledge accumulated over millennia. The situation is therefore dire, but Iwaidja is hanging on against the odds and the simple contribution you can make is to learn a few basics. It will be hugely appreciated by Iwaidja speakers, and will have a greater effect than you probably imagine on helping to maintain this interesting language beyond the current generation.</p><div class=languagemap><img src=\'images/LanguageMap.gif\' /></div></div>"
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><p>The speakers of the many languages of Western Arnhem Land have intermarried, traded, worked and shared ceremonies together for many generations, and have therefore been typically multilingual, speaking up to five languages of the region. Many adults living on Croker Island, for example, understand and speak Iwaidja, Mawng and Kunwinjku, three completely distinct languages, as well as English.</p><p>Mawng is a language whose slightly larger speaker base now lives mostly on neighbouring South Goulburn Island. While Mawng is related to Iwaidja, the two are very different languages in many respects. You could perhaps compare them to Italian and Spanish, although they’re probably a little further apart than that. The two languages have a similar sound system, and many related words. If you know Italian, it will make learning Spanish easier, but an Italian can’t automatically understand and speak good Spanish. It has to be painstakingly learnt. It’s the same with Iwaidja and Mawng. Kunwinjku is much further removed from Iwaidja. The sound system is quite different, as is the grammar, and there are relatively few clearly related words. An Iwaidja speaker knowing Kunwinjku might be compared to an English speaker knowing Russian perhaps, although English and Russian are quite possibly more closely related than Iwaidja and Kunwinjku.</p></div>"
            }
        ]
    }
    
});