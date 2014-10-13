// Sounds of Iwaidja Carousel View
//

Ext.define('Sencha.view.SoundsOfIwaidjaInfoView', {
    extend: 'Ext.Carousel',
    xtype: 'soundsofiwaidjainfoview',
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
                html : "<div class=infosection><div class=header><p>The sounds of Iwaidja</p></div><p>The idea of this section is to give you a little time to listen closely to the sounds of Iwaidja before plunging into learning to speak the language.</p><div class=infotitle><p>Vowels</p></div><p>Iwaidja has 20 consonants, but only three vowels. You may not find the vowels too difficult. For a start, there are less of them than in English. What’s more, they should be fairly familiar to most of you, because they’re the basic vowels in the languages of the world. They’re very similar to some English vowels and are easy to pronounce. Touch the words in the 'Iwaidja' column in the table below to hear what they sound like. You should quickly get the hang of it. Just remember always to pronounce an ‘a’ as in ‘car’, an ‘i’ as in ‘bin’, or sometimes as in ‘bean’ (we’ll let you know when) and a ‘u’ as in ‘full’ or ‘wool’. That’s all!</p><table cellspacing=\'0\' cellpadding=\'0\'><tbody><tr><td valign=\'bottom\' width=\'33%\'><p><b>Vowel</b></p></td><td valign=\'bottom\'><p><b>Iwaidja Example</b></p></td><td valign=\'bottom\'><p><b>English Rhyme</b></p></td></tr><tr><td valign=\'middle\'><p><b>a</b> (ah)</p></td><td valign=\'middle\'><div class='ma_sound soundURL'><div>m<b>a</b></div><div>'ok'</div></div></td><td valign=\'middle\'><p>c<b>a</b>r</p></td></tr><tr><td valign=\'middle\'><p><b>i</b> (ee)</p></td><td valign=\'middle\'><div class='kindi_sound soundURL'><div>k<b>i</b>nd<b>i</b></a></div><div>'how?'</div></div></td><td valign=\'middle\'><p>w<b>i</b>ndy</p></td></tr><tr><td valign=\'middle\'><p><b>u</b> (oo)</p></td><td valign=\'middle\'><div class='wuk_sound soundURL'><div>w<b>u</b>k</div><div>'ant'</div></div></td><td valign=\'middle\'><p>book</p></td></tr></tbody></table><br><br></div>",
                listeners : [
                    {
                        element: 'element',
                        delegate: 'div.ma_sound',
                        event: 'tap',
                        fn: function(event, el) {
                        	Sencha.app.playAudioAssetAndRelease( "sounds/ma.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.kindi_sound',
                        event: 'tap',
                        fn: function() {
                             Sencha.app.playAudioAssetAndRelease( "sounds/kindi.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.wuk_sound',
                        event: 'tap',
                        fn: function() {
                             Sencha.app.playAudioAssetAndRelease( "sounds/wuk.m4a" );
                        }
                    } 
                ] 
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><div class=infotitle><p>Consonants</p></div><p>Of the 20 Iwaidja consonants, some are represented by a single letter, such as \‘k\’, and others by two letters, such as \‘ng\’. Let’s start with the consonants represented by a single letter and which sound pretty much the same as in English.</p><table cellspacing=\'0\' cellpadding=\'0\'> <tbody><tr><td valign=\'bottom\' width=\'10%\'><p><b>Iwaijda Cons\'</b></p> </td><td valign=\'bottom\' width=\'40%\'><p><b>Iwaidja Example</b></p></td><td valign=\'bottom\' width=\'50%\'> <p><b>English Consonant</b></p></td></tr><tr><td valign=\'middle\'><p><b>b</b></p></td><td valign=\'middle\'><div class='barda_sound soundURL'><div><b>b</b>arda</div><div>'then'</div></div></td><td valign=\'middle\'><p><b>b</b></p> </td></tr><tr><td valign=\'middle\'><p><b>d</b></p></td><td valign=\'middle\'><div class='dubulu_sound soundURL'><div><b>d</b>ubulu</div><div>'card game'</div></div></td><td valign=\'middle\'><p><b>t </b>(at the end of a word) or <b>d</b> elsewhere</p></td></tr><tr><td valign=\'middle\'><p><b>j</b></p></td><td valign=\'middle\'><div class='ijalkud_sound soundURL'><div>i<b>j</b>alkud</div><div>'really'</div></div></td><td valign=\'middle\'><p><b>ch </b>(at the end of a word) or <b>j</b> elsewhere</p></td></tr><tr><td valign=\'middle\'><p><b>k</b></p></td><td valign=\'middle\'><div class='kayirrk_sound soundURL'><div><b>k</b>ayirr<b>k</b></div><div>'today'</div></div></td><td valign=\'middle\'><p><b>k</b> (at the end of a word) or <b>g</b> (as in <b>g</b>olf) elsewhere</p></td></tr><tr><td valign=\'middle\'><p><b>l</b></p></td><td valign=\'middle\'><div class='burruli_sound soundURL'><div>burru<b>l</b>i</div><div>'good'</div></div></td><td valign=\'middle\'><p><b>l</b></p></td></tr><tr><td valign=\'middle\'><p><b>m</b></p></td><td valign=\'middle\'><div class='maminga_sound soundURL'><div><b>m</b>a<b>m</b>inga</div><div>'clam'</div></div></td><td valign=\'middle\'><p><b>m</b></p></td></tr><tr><td valign=\'middle\'> <p><b>n</b></p></td><td valign=\'middle\'><div class='nanung_sound soundURL'><div><b>n</b>a<b>n</b>ung</div><div>'brother-in-law'</div></div></td><td valign=\'middle\'> <p><b>n</b></p> </td></tr><tr><td valign=\'middle\'><p><b>w</b></p></td><td valign=\'middle\'><div class='warrkbi_sound soundURL'><div><b>w</b>arrkbi</div><div>'man'</div></div></td><td valign=\'middle\'><p><b>w</b></p></td></tr><tr><td valign=\'middle\'><p><b>y</b></p></td><td valign=\'middle\'><div class='yarda_sound soundURL'><div><b>y</b>arda</div><div>'eye'</div></div></td><td valign=\'middle\'><p><b>y</b></p></td></tr></tbody></table></div>",
                listeners : 
                    [
                        {
                             element: 'element',
                             delegate: 'div.barda_sound',
                             event: 'tap',
                             fn: function(event, el) {
                                Sencha.app.playAudioAssetAndRelease( "sounds/barda.m4a" );
                             }
                        },
                        {
                             element: 'element',
                             delegate: 'div.dubulu_sound',
                             event: 'tap',
                             fn: function() {
                                Sencha.app.playAudioAssetAndRelease( "sounds/dubulu.m4a" );
                             }
                        },
                        {
                             element: 'element',
                             delegate: 'div.ijalkud_sound',
                             event: 'tap',
                             fn: function() {
                                Sencha.app.playAudioAssetAndRelease( "sounds/ijalkud.m4a" );
                             }
                        },
                        {
                            element: 'element',
                            delegate: 'div.kayirrk_sound',
                            event: 'tap',
                            fn: function(event, el) {
                                Sencha.app.playAudioAssetAndRelease( "sounds/kayirrk.m4a" );
                            }
                        },
                        {
                            element: 'element',
                            delegate: 'div.burruli_sound',
                            event: 'tap',
                            fn: function() {
                                Sencha.app.playAudioAssetAndRelease( "sounds/burruli.m4a" );
                            }
                        },
                        {
                            element: 'element',
                            delegate: 'div.maminga_sound',
                            event: 'tap',
                            fn: function() {
                                Sencha.app.playAudioAssetAndRelease( "sounds/maminga.m4a" );
                            }
                        },
                        {
                            element: 'element',
                            delegate: 'div.nanung_sound',
                            event: 'tap',
                            fn: function(event, el) {
                                Sencha.app.playAudioAssetAndRelease( "sounds/nanung.m4a" );
                            }
                        },
                        {
                            element: 'element',
                            delegate: 'div.warrkbi_sound',
                            event: 'tap',
                            fn: function() {
                                Sencha.app.playAudioAssetAndRelease( "sounds/warrkbi.m4a" );
                            }
                        },
                        {
                            element: 'element',
                            delegate: 'div.yarda_sound',
                            event: 'tap',
                            fn: function() {
                                Sencha.app.playAudioAssetAndRelease( "sounds/yarda.m4a" );
                            }
                        }
					]
            	},
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><p>The next three Iwaidja consonants we'll look at occur in both English and Iwaidja, but in different places in the word in each language. These sounds are written using two characters.</p><table cellspacing=\'0\' cellpadding=\'0\'> <tbody><tr><td valign=\'middle\'><p><b>Iwaijda Consonant</b></p></td><td valign=\'middle\'><p><b>Iwaidja Example</b></p></td></tr><tr><td valign=\'middle\'><p><b>ng</b></p></td><td valign=\'middle\'><div class='ngabi_sound soundURL'><b>ng</b>abi</a> 'I/my'</div></td></tr></tbody></table><p><b>ng</b> sounds as it does in the English word ‘si<b>ng</b>er’ (SI-ngah), not as in the English word ‘fi<b>ng</b>er’ (FING-gah). The sound ‘<b>ng</b>’ often comes at the start of words in Iwaidja (as it also does in Vietnamese) but never in English. To get used to this, try repeating the word ‘singer’ as over and over, making the second syllable much louder than the first (si-NGAH, si-NGAH, si-NGAH and so on). Then gradually drop the first syllable ‘si’, leaving only the final syllable NGAH. Repeat this until it feels natural.</p><table cellspacing=\'0\' cellpadding=\'0\'><tbody><tr><td valign=\'middle\'><p><b>Iwaijda Consonant</b></p></td><td valign=\'middle\'><p><b>Iwaidja Example</b></p></td></tr><tr><td valign=\'middle\'><p><b>ld</b></p></td><td valign=\'middle\'><div class='lda_sound soundURL'><b>ld</b>a</a> 'and'</div></td></tr></tbody></table><p><b>ld</b> sounds as it does in the English word ‘old’. Like the sound '<b>ng</b>' above, though, it may come at the start of a word in Iwaidja but not in English. Pronounce the word ‘o<b>ld</b>er’ very quickly and lightly, then try silencing the initial ‘o’, and by then you should be saying the Iwaidja word for ‘and’, <b>lda</b>.</p><table cellspacing=\'0\' cellpadding=\'0\'><tbody><tr><td valign=\'middle\'><p><b>Iwaijda Consonant</b></p></td><td valign=\'middle\'><p><b>Iwaidja Example</b></p></td></tr><tr><td valign=\'middle\'><p><b>ny</b></p></td><td valign=\'middle\'><div class='marruny_sound soundURL'>marru<b>ny</b></a> 'kentia palm'</div></td></tr></tbody></table></div>",
                listeners : [
                    {
                        element: 'element',
                        delegate: 'div.ngabi_sound',
                        event: 'tap',
                        fn: function(event, el) {
                             Sencha.app.playAudioAssetAndRelease( "sounds/ngabi.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.lda_sound',
                        event: 'tap',
                        fn: function() {
                            Sencha.app.playAudioAssetAndRelease( "sounds/lda.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.marruny_sound',
                        event: 'tap',
                        fn: function() {
                            Sencha.app.playAudioAssetAndRelease( "sounds/marruny.m4a" );
                        }
                    } 
                ] 
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><p><b>ny</b> sounds as it does in the English word ba<b>ny</b>an. The key difference here is that this sound often comes at the end of words in Iwaidja, but never in English. Don’t confuse it with the ‘ny’ at the end of the English word ‘any’, which, as you know, sounds like ‘nee’. </p><p>Something which might help you recognize the sound ‘ny’ in Iwaidja is that it has a strong effect on the vowel coming before it, which is how you know it’s ‘<b>ny</b>’ and not simply ‘n’. ‘<b>ny</b>’ changes the sound ‘a’ so that it sounds more like the English word ‘eye’, ‘u’ so that it sounds more like the vowel in the English word ‘boy’, and ‘i’ from something like the vowel in ‘win’ to more like the vowel in ‘wean’. </p><p>So if you listen to the vowel in the second syllable in the word <b>marruny</b> (above)you may notice it sounds more like the English sound ‘oy’ than the English sound 'oo'. Similarly the second syllable in the Iwaidja word <b>malany</b> (MAH-line) ‘why’, sounds just like the English word ‘line’; and the second syllable in the Iwaidja word <b>abiny</b> (AH-been) ‘he said’, sounds just like the English word ‘been’. The same applies to vowels that are followed by ‘j’, e.g., the vowel in the second syllable of the word <b>ngunbuj</b> ‘younger sibling’ often sounds more like 'oy' than 'oo' (NGOON-boydj).</p><table cellspacing=\'0\' cellpadding=\'0\'><tbody><tr><td valign=\'middle\'><p><b>Iwaijda Consonant</b></p></td><td valign=\'middle\'><p><b>Iwaidja Example</b></p></td></tr><tr><td valign=\'middle\'><p><b>ld</b></p></td><td valign=\'middle\'><div class='lda_sound soundURL'><b>ld</b>a</a> 'and'</div></td></tr></tbody></table><p><b>ld</b> sounds as it does in the English word ‘old’. Like the sound '<b>ng</b>' above, though, it may come at the start of a word in Iwaidja but not in English. Pronounce the word ‘o<b>ld</b>er’ very quickly and lightly, then try silencing the initial ‘o’, and by then you should be saying the Iwaidja word for ‘and’, <b>lda</b>.</p><table cellspacing=\'0\' cellpadding=\'0\'><tbody><tr><td valign=\'middle\'><p><b>Iwaijda Consonant</b></p></td><td valign=\'middle\'><p><b>Iwaidja Example</b></p></td></tr><tr><td valign=\'middle\'><p><b>ny</b></p></td><td valign=\'middle\'><div class='marruny_sound soundURL'>marru<b>ny</b></a> 'kentia palm'</div></td></tr></tbody></table></div>" 
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><p>The next sound occurs in many dialects of English, but we are often unconscious of it.</p><table cellspacing='0' cellpadding='0'><tbody><tr><td valign='middle'><p><b>Iwaijda Consonant</b></p></td><td valign='middle'><p><b>Iwaidja Example</b></p></td></tr><tr><td valign='middle'><p><b>rr</b></p></td><td valign='middle'><p><div class='barra_sound soundURL'>ba<b>rr</b>a</div> 'northwest monsoon'</p></td></tr></tbody></table><p>We use this sound in Australian and American English when we say words like ‘butter’ and ‘city’ in a relaxed way, making the 't' sound in the middle of these words more like a soft ‘d’, i.e., 'budder' and 'ciddy'. This process is called ‘flapping’ or 'tapping' as the tongue briefly flaps or taps against the upper palate. If you say the word ‘butter’, flapping the ‘t’ to make it  more like ‘budder’, you’re already pretty close to saying the Iwaidja word <b>barra</b> ‘northwest monsoon’.</p><p>Next come a group of consonants that might sound unusual to some English speakers: this is the retroflex group consisting of six consonants (see table below). This group of sounds is found in most Australian Indigenous languages. Retroflex means ‘curled back’ and describes the position of the tongue, with its tip curled back so that the underside of the tongue-tip touches the roof of the mouth. </p><p>These sounds occur in some dialects of American English. Speakers of other English dialects, such as Australian English, can imitate them by pronouncing the words ‘car’, ‘card’, ‘Carl’, ‘world’, ‘darn’ and ‘part’ in the right-hand column of the table below like a typical American TV newsreader.</p></div>",
                listeners : [
                    {
                        element: 'element',
                        delegate: 'div.barra_sound',
                        event: 'tap',
                        fn: function(event, el) {
                            Sencha.app.playAudioAssetAndRelease( "sounds/barra.m4a" );
                        }
                    } 
                ] 
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><table cellspacing='0' cellpadding='0'><tbody><tr><td valign='middle'><p><b>Iwaijda Consonant</b></p></td><td valign='middle'><p><b>Iwaidja Example</b></p></td><td valign='middle'><p><b>English Equivalent</b></p></td></tr><tr><td valign='middle'><p><b>r</b></p></td><td valign='middle'><div class='wara_sound soundURL'>wa<b>r</b>a</div><div>'he/she/it goes'</div></td><td valign='middle'><p>ca<b>r</b></p></td></tr><tr><td valign='middle'><p><b>rd</b></p></td><td valign='middle'><div class='mardan_sound soundURL'>ma<b>rd</b>an</div><div>'small'</div></td><td valign='middle'><p>ca<b>rd</b></p></td></tr><tr><td valign='middle'><p><b>rl</b></p></td><td valign='middle'><div class='karlu_sound soundURL'>ka<b>rl</b>u</div><div>'no'</div></td><td valign='middle'><p>Ca<b>rl</b></p></td></tr><tr><td valign='middle'><p><b>rld</b></p></td><td valign='middle'><div class='marldu_sound soundURL'>ma<b>rld</b>u</div><div>'wind'</div></td><td valign='middle'><p>wo<b>rld</b></p></td></tr><tr><td valign='middle'><p><b>rn</b></p></td><td valign='middle'><div class='marnung_sound soundURL'>ma<b>rn</b>ung</div><div>'cockatoo sp.'</div> </td><td valign='middle'><p>da<b>rn</b></p></td></tr><tr><td valign='middle'><p>rt</p></td><td valign='middle'><div class='artayan_sound soundURL'>a<b>rt</b>ayan</div><div>'I see ihim/her/it'</div></td><td valign='middle'><p>pa<b>rt</b></p></td></tr></tbody></table><p>Finally, there’s one sound in Iwaidja that isn’t found in any dialect of English, whether spoken consciously or unconsciously. Although this sound is written as ‘<b>h</b>’, it’s not the same as the ‘h’ sound in English.</p><table cellspacing='0' cellpadding='0'><tbody><tr><td valign='middle'><p><b>Iwaijda Consonant</b></p></td><td valign='middle'><p><b>Iwaidja Example</b></p></td></tr><tr><td valign='middle'><p><b>h</b></p></td><td valign='middle'><div class='baharl_sound soundURL'>ba<b>h</b>arl</div><div>'his/her/its head'</div></td></tr></tbody></table><p>A weak sound, close to the French ‘r’ in ‘Arabe’, or the German ‘r’ in ‘gebracht’. The closest sound we have to this in English is the sound ‘g’, as in the word ‘rugger’. When you make this sound, you’ll find that the back of your tongue makes contact with an area at the back of your upper palate. In the Iwaidja sound ‘<b>h</b>’, the tongue moves towards the same place, but never quite reaches it. To practice this sound, try saying the word ‘rugger’ several times slowly, noticing the part of your mouth where the tongue makes contact. Then try it again, only this time don’t let the tongue make contact. Move it towards the same place, but stop and retract the tongue before you get there. </p><p>If you’ve done this successfully, you should now be saying something close to the Iwaidja word <b>raha</b>, meaning ‘he/she/it is hunched over’. Because this sound is relatively weak, people tend to completely leave it out in everyday speech. If <b>h</b> comes between two vowels as in the word ba<b>h</b>arl ‘head’ in the example above, people often simply drop the consonant, producing the word with a long vowel, as in b<b>aa</b>rl.</p></div>",
                listeners : [
                    {
                        element: 'element',
                        delegate: 'div.wara_sound',
                        event: 'tap',
                        fn: function(event, el) {
                            Sencha.app.playAudioAssetAndRelease( "sounds/wara.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.mardan_sound',
                        event: 'tap',
                        fn: function(event, el) {
                            Sencha.app.playAudioAssetAndRelease( "sounds/mardan.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.karlu_sound',
                        event: 'tap',
                        fn: function(event, el) {
                            Sencha.app.playAudioAssetAndRelease( "sounds/karlu.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.marldu_sound',
                        event: 'tap',
                        fn: function(event, el) {
                            Sencha.app.playAudioAssetAndRelease( "sounds/marldu.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.marnung_sound',
                        event: 'tap',
                        fn: function(event, el) {
                            Sencha.app.playAudioAssetAndRelease( "sounds/marnung.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.artayan_sound',
                        event: 'tap',
                        fn: function(event, el) {
                            Sencha.app.playAudioAssetAndRelease( "sounds/artayan.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.baharl_sound',
                        event: 'tap',
                        fn: function(event, el) {
                            Sencha.app.playAudioAssetAndRelease( "sounds/baharl.m4a" );
                        }
                    }
                ] 
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                html : "<div class=infosection><div class=header><p>English-friendly pronunciation guide</p></div><p>To help you pronounce Iwaidja words correctly, alongside the usual Iwaidja spelling we have used an English-friendly spelling for vowels and some consonants. For example, the word <b>ngabi</b>, meaning ‘I’ or ‘my’, is also written as <b>NGAH-bee</b>. This is intended specifically to help English speakers get the sound right.</p><p>The sound written as ‘ah’ in the English exclamation ‘Ah!’ is close to the sound written as ‘a’ in the usual spelling of Iwaidja, and the sound written as ‘ee’ in the English word ‘bee’ is close to the sound written as ‘i’ in the usual spelling of Iwaidja.</p><p>In addition, we have used UPPER CASE to indicate the stressed syllables in words. Iwaidja is similar to English in terms of stress. Just as in English the word ‘mother’ spoken in isolation has an accent on the first syllable that makes it more prominent, i.e., MAH-ther, the word for ‘mother’ in Iwaidja, <b>kamu</b>, works the same way, i.e., it sounds like <b>KAH-moo</b>.</p><p>Along with listening closely to words and phrases in this app, the English-friendly spelling is intended to help you get closer to the sounds of Iwaidja as they are pronounced by Iwaidja people.</p><p>Below are a few examples to help you get the hang of how this works.</p><table cellspacing='0' cellpadding='0'><tbody><tr><td valign='middle'><div class='ngabiyarda_sound soundURL'><b>ngabi yarda</b></div></td><td valign='middle'><p>ngah-bee YAHRD-ah</p></td><td valign='middle'><p>'my eye/s'</p></td></tr><tr><td valign='middle'><div class='nuyiburruli_sound soundURL'><b>Nuyi burruli?</b></div></td><td valign='middle'><p>noo-yee BOOD-oo-lee</p></td><td valign='middle'><p>Are you well?</p></td></tr><tr><td valign='middle'><div class='kindi_sound soundURL'><b>kindi</b></div></td><td valign='middle'><p>KIN-dee</p></td><td valign='middle'><p>how</p></td></tr></tbody></table></div>",
                listeners : [
                    {
                        element: 'element',
                        delegate: 'div.ngabiyarda_sound',
                        event: 'tap',
                        fn: function(event, el) {
                            Sencha.app.playAudioAssetAndRelease( "sounds/ngabiyarda.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.nuyiburruli_sound',
                        event: 'tap',
                        fn: function() {
                            Sencha.app.playAudioAssetAndRelease( "sounds/nuyiburruli.m4a" );
                        }
                    },
                    {
                        element: 'element',
                        delegate: 'div.kindi_sound',
                        event: 'tap',
                        fn: function() {
                            Sencha.app.playAudioAssetAndRelease( "sounds/kindi.m4a" );
                        }
                    } 
                ] 
                },
                {
                scrollable: {
                direction: 'vertical',
                directionLock: true
                },
                html : "<div class=infosection><p>No spelling system is perfect though, and there are a few things to watch out for.</p><p>Firstly, the sound written as ‘<b>oo</b>’ must always be produced as if it’s the vowel sound in the English word ‘<b>good</b>’, and never as in the English word ‘<b>moon</b>’. Although these two sounds are written the same way in English, they are quite different, especially in Australian English. If you pronounce the last syllable in the Iwaidja word <b>arlamun</b> (<b>AHR-lah-moon</b>) ‘kidney’, as if it were the English word 'moon' in a broad Australian accent, it will be so far removed from the actual sound of that syllable in Iwaidja that people may not even understand what you’re trying to say. So whenever you see ‘<b>oo</b>’, think of the way that sounds in the word ‘<b>good</b>’, and you’ll be right every time.</p><p>Secondly, as mentioned above, whenever you see the letter ‘<b>r</b>’ you need to pronounce it as if you were an American TV newsreader. As a speaker of Australian English, or many dialects of British English, you leave out the sound of the letter ‘r’ in the word ‘bar’, for instance, whereas speakers of many American dialects pronounce it clearly. In Iwaidja, too, whenever you see an ‘r’, it’s there to be clearly pronounced. Syllables written as <b>AH</b> and <b>AHR</b> in the English-friendly spelling should sound quite different from each other, although in Australian English they do not.</p><p>Thirdly, in the English-friendly spelling, we have written the sound ‘<b>rr</b>’ as ‘<b>d</b>’. However, if you pronounce this very strongly it could result in giving the word a different meaning. So whenever you see a ‘d’, make sure to keep it soft. You’ll also see a ‘d’ occasionally where you’d never expect it in English, such as before a ‘k’. Don’t worry about this; just pronounce it softly and it will come out alright.</p><p>Remember always that these spellings are only aids to pronunciation. The only way to really get it right is to listen to the sounds themselves and try to match what you hear.</p></div>"
            }
        ]
    }
    
});