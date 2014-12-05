// How to Use This App Carousel View
//

Ext.define('Ma.view.HowToUseAppInfoView', {
    extend: 'Ext.Carousel',
    xtype: 'howtouseappinfoview',
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
                html : "<div class=infosection><div class=header><p>How to use the Ma! Iwaidja Phone App</p></div><p>The app consists of a Dictionary and the Information section which is where you are now. Touching the sea turtle icon at bottom right will take you to the Iwaidja Inyman website where you can learn more about Iwaidja and the projects Iwaidja people have been collaborating on with linguists and other specialists.</p><div class=infotitle><p>The Dictionary</p></div><p>The dictionary is laid out like the Contacts section of your phone and works in much the same way. You can use the search window at the top of your screen to find words you are looking for. Don\'t expect an exhaustive list - as this is the first version of this app we have included a total of around 1500 entries. Touching the <b>ENG</b> and <b>IWA</b> buttons to the right of the search window allows you toggle between searching for English or Iwaidja words. The active button will display black, whereas the inactive button will display grey.</p><p>Once you have found the entry you\'re looking for, you can listen to the Iwaidja word simply by touching it.</p><p>Tapping the arrow on the far right will take you to a more detailed dictionary entry for the word. Many of these entries contain example sentences and other contextual information about the word, giving you a clearer understanding of its meaning.</p><p>At the very top right of the dictionary list screen you\'ll find a <b>+</b> icon. Touching this icon will open a recording screen allowing you to add a new entry to your dictionary. You can type in the Iwaidja word, the English translation, and other information to make your entry as detailed or as basic as you wish.</p></div>"
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><div class=infotitle><p><b>Synchronisation</b></p></div><p>Touching the + icon at the top right of the list screen will open a screen where you can record and transcribe a new Iwaidja term, record and transcribe an English translation of the term, and record a comment about the term, adding example sentences, discussing different senses, and so on. Comments may be recorded as audio-only or video. Use the sliding button to select video. Comments may also be added to existing entries by touching the EDIT button which appears at the top right of the detailed entry screen for any entry.</p><p>Transcribing the Iwaidja and English words on your device is optional. If you choose not to add transcriptions, the app will auto-fill the transcription fields for you as ‘An untitled entry’ followed by the time and date.</p><p>On the same screen you can choose to take a photo relating to the new entry, or choose an image from your on-board collection, and also view metadata and add information about the speaker.</p><p>By touching the DONE button all information is saved and you are returned to the list screen. By swiping downwards you will activate the SYNC function. By touching the green SYNC button you will simultaneously upload your new entries to the database and download any new information which has been published since your last sync. The first time you sync, you will be asked to register. This process will only happen once, after which syncing will begin as soon the the SYNC button is touched.</p></div>"
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><p><b>List of Abbreviations for Parts of Speech</b></p><p><div><div class=partofspeechabrev>adj.</div><div class=partofspeechdesc>adjective</div></div><div><div class=partofspeechabrev>adv.</div><div class=partofspeechdesc>adverb</div></div><div><div class=partofspeechabrev>cov.</div><div class=partofspeechdesc>coverb</div></div><div><div class=partofspeechabrev>conj.</div><div class=partofspeechdesc>conjunction</div></div><div><div class=partofspeechabrev>dem.</div><div class=partofspeechdesc>demonstrative</div></div><div><div class=partofspeechabrev>dev.adj.</div><div class=partofspeechdesc>deverbal adjective</div></div><div><div class=partofspeechabrev>dev.n.</div><div class=partofspeechdesc>deverbal noun</div></div><div><div class=partofspeechabrev>int.</div><div class=partofspeechdesc>interjection</div></div><div><div class=partofspeechabrev>interr.</div><div class=partofspeechdesc>interrogative</div></div><div><div class=partofspeechabrev>n.</div><div class=partofspeechdesc>noun</div></div><div><div class=partofspeechabrev>n.constr.</div><div class=partofspeechdesc>noun construction</div></div><div><div class=partofspeechabrev>n.infl.</div><div class=partofspeechdesc>inflecting noun</div></div><div><div class=partofspeechabrev>n.prop.</div><div class=partofspeechdesc>proper noun</div></div><div><div class=partofspeechabrev>post.</div><div class=partofspeechdesc>postposition</div></div><div><div class=partofspeechabrev>prep.</div><div class=partofspeechdesc>preposition</div></div><div><div class=partofspeechabrev>pron.</div><div class=partofspeechdesc>pronoun</div></div><div><div class=partofspeechabrev>rel.pron.</div><div class=partofspeechdesc>relative pronoun</div></div><div><div class=partofspeechabrev>suff.</div><div class=partofspeechdesc>suffix</div></div><div><div class=partofspeechabrev>v.ang</div><div class=partofspeechdesc>\'ang\' verb (most of these verbs are associated with the ground, the land, or water)</div></div><div><div class=partofspeechabrev>v.constr.</div><div class=partofspeechdesc>verbal construction</div></div><div><div class=partofspeechabrev>v.exp.obj.</div><div class=partofspeechdesc>object experiencer verb</div></div><div><div class=partofspeechabrev>v.i.</div><div class=partofspeechdesc>intransitive verb</div></div><div><div class=partofspeechabrev>v.t.`</div><div class=partofspeechdesc>transitive verb</div></div></p><p>(Note: Our understanding of Iwaidja\'s grammatical categories is at an early stage. The assigning of entries to parts of speech is provisional only and clearly Eurocentric at this stage.)</p></div>",
            }
        ]
    }
});