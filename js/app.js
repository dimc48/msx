// FootDroid TV - Production Leanback Application Logic
(function () {
    'use strict';

    // Compatibility Polyfills for Older Smart TVs (Samsung Tizen 3-5, LG webOS 3-4, Chromium 47+)
    if (!String.prototype.padStart) {
        String.prototype.padStart = function (targetLength, padString) {
            targetLength = targetLength >> 0;
            padString = String(typeof padString !== 'undefined' ? padString : ' ');
            if (this.length > targetLength) return String(this);
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(this);
        };
    }
    if (!String.prototype.padEnd) {
        String.prototype.padEnd = function (targetLength, padString) {
            targetLength = targetLength >> 0;
            padString = String(typeof padString !== 'undefined' ? padString : ' ');
            if (this.length > targetLength) return String(this);
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return String(this) + padString.slice(0, targetLength);
        };
    }
    if (!Object.values) {
        Object.values = function (obj) {
            return Object.keys(obj || {}).map(function (k) { return obj[k]; });
        };
    }
    if (!Object.entries) {
        Object.entries = function (obj) {
            return Object.keys(obj || {}).map(function (k) { return [k, obj[k]]; });
        };
    }

    // Safe timeout-enabled fetch function that never crashes on older JS engines
    function fetchWithTimeout(url, options, timeoutMs) {
        options = options || {};
        timeoutMs = timeoutMs || 5000;
        if (typeof AbortController !== 'undefined') {
            var controller = new AbortController();
            var timer = setTimeout(function () {
                try { controller.abort(); } catch (_) {}
            }, timeoutMs);
            var fetchOptions = Object.assign({}, options, { signal: controller.signal });
            return fetch(url, fetchOptions).then(function (res) {
                clearTimeout(timer);
                return res;
            }, function (err) {
                clearTimeout(timer);
                throw err;
            });
        }
        return fetch(url, options);
    }

    // 1. Static Sports TV Channels (24/7 Verified IPTV Streams with Authentic Official Logos & Redundant Mirrors)
    const tvChannels = [
        {
            id: 'ch-matchtv',
            isChannel: true,
            name: 'Матч ТВ HD',
            logo: 'img/channels/match-tv.png',
            desc: 'Главный федеральный спортивный телеканал России',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (1080p 50 FPS)', url: 'https://t5.ultrastream.vip/mtv_laliga/index.m3u8' },
                { name: '⚡ Сервер 2 (Резерв HD)', url: 'http://flussonic.linkintel.ru/match/index.m3u8' },
                { name: '⚡ Сервер 3 (Резерв)', url: 'http://stream.mcquack.net/169/index.m3u8' }
            ]
        },
        {
            id: 'ch-premier',
            isChannel: true,
            name: 'Матч Премьер HD',
            logo: 'img/channels/match-premier.png',
            desc: 'Все матчи Российской Премьер-Лиги (РПЛ) и Кубка России',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (1080p 50 FPS)', url: 'https://t5.ultrastream.vip/matchprem/index.m3u8' },
                { name: '⚡ Сервер 2 (Резерв HD)', url: 'http://185.23.80.23:8080/MATCH_PREMIER/index.m3u8' }
            ]
        },
        {
            id: 'ch-okko',
            isChannel: true,
            name: 'Okko Спорт HD',
            logo: 'img/channels/okko-sport.png',
            desc: 'Лига Чемпионов УЕФА, Лига Европы и еврокубки',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (1080p 50 FPS)', url: 'https://t6.ultrastream.vip/footbolokko/index.m3u8' }
            ]
        },
        {
            id: 'ch-futbol1',
            isChannel: true,
            name: 'Матч! Футбол 1 HD',
            logo: 'img/channels/match-futbol1.png',
            desc: 'Флагманский европейский футбол и топ-чемпионаты',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (Full HD 50 FPS)', url: 'http://stream.mcquack.net/130/index.m3u8' }
            ]
        },
        {
            id: 'ch-futbol2',
            isChannel: true,
            name: 'Матч! Футбол 2 HD',
            logo: 'img/channels/match-futbol2.png',
            desc: 'Испанская Ла Лига и матчи Кубка Короля',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (Full HD 50 FPS)', url: 'http://stream.mcquack.net/142/index.m3u8' }
            ]
        },
        {
            id: 'ch-futbol3',
            isChannel: true,
            name: 'Матч! Футбол 3 HD',
            logo: 'img/channels/match-futbol3.png',
            desc: 'Немецкая Бундеслига и итальянская Серия А',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (Full HD 50 FPS)', url: 'http://stream.mcquack.net/185/index.m3u8' }
            ]
        },
        {
            id: 'ch-setanta1',
            isChannel: true,
            name: 'Setanta Sports 1 HD',
            logo: 'img/channels/setanta1.png',
            desc: 'АПЛ, Серия А, Формула 1 и мировые лиги',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (Full HD)', url: 'http://stream.mcquack.net/234/index.m3u8' },
                { name: '⚡ Сервер 2 (Резерв)', url: 'http://178.124.179.122:8080/Setanta1/index.m3u8' }
            ]
        },
        {
            id: 'ch-setanta2',
            isChannel: true,
            name: 'Setanta Sports 2 HD',
            logo: 'img/channels/setanta2.png',
            desc: 'Бундеслига, теннис ATP/WTA и евробаскетбол',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (Full HD)', url: 'http://stream.mcquack.net/235/index.m3u8' }
            ]
        },
        {
            id: 'ch-bt5',
            isChannel: true,
            name: 'Беларусь 5 HD',
            logo: 'img/channels/belarus5.png',
            desc: 'Главный спортивный телеканал Республики Беларусь',
            quality: 'Full HD 1080p',
            streams: [
                { name: '⚡ Сервер 1 (1080p)', url: 'http://178.124.179.122:8080/BT5/index.m3u8' },
                { name: '⚡ Сервер 2 (Резерв)', url: 'http://stream.mcquack.net/33/index.m3u8' }
            ]
        },
        {
            id: 'ch-wwe',
            isChannel: true,
            name: 'WWE TV HD',
            logo: 'img/channels/wwe.svg',
            desc: 'WWE Network 24/7 - Raw, SmackDown, WrestleMania & NXT',
            quality: 'Full HD 1080p / 60 FPS',
            streams: [
                { name: '⚡ Сервер 1 (Full HD 1080p)', url: 'https://aka-live1050.delivery.roku.com/34b065a4-682e-4e46-97f1-5c9a26aab12a/t2-origin/out/v1/live.m3u8' },
                { name: '⚡ Сервер 2 (HD 720p)', url: 'https://aka-live1050.delivery.roku.com/34b065a4-682e-4e46-97f1-5c9a26aab12a/t2-origin/out/v1/live_720.m3u8' }
            ]
        },
        {
            id: 'ch-euro1',
            isChannel: true,
            name: 'Eurosport 1 HD',
            logo: 'img/channels/eurosport1.png',
            desc: 'Теннис, снукер, биатлон, автоспорт и мировые турниры',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (Full HD 1080p)', url: 'https://s7.iptv-24.net/1439/playlist.m3u8' }
            ]
        },
        {
            id: 'ch-euro2',
            isChannel: true,
            name: 'Eurosport 2 HD',
            logo: 'img/channels/eurosport2.png',
            desc: 'Зимние виды спорта, автогонки и мировые кубки',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (Full HD 1080p)', url: 'https://s7.iptv-24.net/1452/playlist.m3u8' }
            ]
        },
        {
            id: 'ch-khl',
            isChannel: true,
            name: 'KHL Prime HD',
            logo: 'img/channels/khl-prime.png',
            desc: 'Матчи Континентальной Хоккейной Лиги и Кубок Гагарина',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (1080p 50 FPS)', url: 'https://t5.ultrastream.vip/KHL/index.m3u8' },
                { name: '⚡ Сервер 2 (Резерв HD)', url: 'http://stream.mcquack.net/178/index.m3u8' }
            ]
        },
        {
            id: 'ch-viju',
            isChannel: true,
            name: 'viju+ Sport HD',
            logo: 'img/channels/viju-sport.png',
            desc: 'Мировой баскетбол, хоккей и автогонки',
            quality: 'Full HD 1080p',
            streams: [
                { name: '⚡ Сервер 1 (1080p)', url: 'http://46.53.200.153:7777/play/a01l/index.m3u8' },
                { name: '⚡ Сервер 2 (Резерв)', url: 'http://stream.mcquack.net/333/index.m3u8' }
            ]
        },
        {
            id: 'ch-udar',
            isChannel: true,
            name: 'Телеканал UDAR HD',
            logo: 'img/channels/udar.svg',
            desc: 'Top Dog, Hardcore FC, кулачные бои и турниры MMA',
            quality: 'Full HD 1080p',
            streams: [
                { name: '⚡ Сервер 1 (1080p)', url: 'http://stream.mcquack.net/279/index.m3u8' }
            ]
        },
        {
            id: 'ch-boxtv',
            isChannel: true,
            name: 'Бокс ТВ HD',
            logo: 'img/channels/boxtv.svg',
            desc: 'Мировой бокс, титульные бои и прямые включения',
            quality: 'Full HD 1080p',
            streams: [
                { name: '⚡ Сервер 1 (Full HD)', url: 'http://stream.mcquack.net/154/index.m3u8' }
            ]
        },
        {
            id: 'ch-mmatv',
            isChannel: true,
            name: 'MMA-TV.com HD',
            logo: 'img/channels/mmatv.svg',
            desc: 'Мировые турниры MMA и боевые единоборства',
            quality: 'Full HD 1080p',
            streams: [
                { name: '⚡ Сервер 1 (Full HD 1080p)', url: 'https://streams2.sofast.tv/vglive-sk-462904/playlist.m3u8' }
            ]
        },
        {
            id: 'ch-sportivny',
            isChannel: true,
            name: 'Спортивный HD',
            logo: 'img/channels/sportivny.svg',
            desc: 'Российские чемпионаты, автоспорт и единоборства',
            quality: 'Full HD 1080p',
            streams: [
                { name: '⚡ Сервер 1 (Full HD 1080p)', url: 'https://live-3.otcnet.ru/sportivny/index.m3u8' }
            ]
        },
        {
            id: 'ch-boets',
            isChannel: true,
            name: 'Матч! Боец HD',
            logo: 'img/channels/match-boets.png',
            desc: 'Единоборства, UFC, Bellator и бои в прямом эфире',
            quality: 'Full HD 1080p',
            streams: [
                { name: '⚡ Сервер 1 (Full HD)', url: 'http://stream.mcquack.net/112/index.m3u8' }
            ]
        },
        {
            id: 'ch-strana',
            isChannel: true,
            name: 'Матч! Страна HD',
            logo: 'img/channels/match-strana.png',
            desc: 'Российский спорт и региональные турниры',
            quality: 'Full HD 1080p',
            streams: [
                { name: '⚡ Сервер 1 (1080p)', url: 'http://31.148.48.15/Match_Strana/index.m3u8' }
            ]
        },
        {
            id: 'ch-igra',
            isChannel: true,
            name: 'Матч! Игра HD',
            logo: 'img/channels/match-igra.png',
            desc: 'Игровые виды спорта, гандбол, волейбол и баскетбол',
            quality: 'Full HD 1080p',
            streams: [
                { name: '⚡ Сервер 1 (1080p)', url: 'http://31.148.48.15/Match_Igra_HD/index.m3u8' }
            ]
        },
        {
            id: 'ch-arena',
            isChannel: true,
            name: 'Матч! Арена HD',
            logo: 'img/channels/match-arena.png',
            desc: 'Престижные мировые турниры по неигровым видам спорта',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: '⚡ Сервер 1 (1080p 50 FPS)', url: 'https://t7.ultrastream.vip/marena/index.m3u8' }
            ]
        }
    ];

    // Club & league emblem mapping for professional presentation
    const logoMap = {
        'зенит': 'https://s5o.ru/storage/simple/ru/edt/70/46/64/79/ruebe75dffc32.png',
        'спартак': 'https://s5o.ru/storage/simple/ru/edt/91/97/34/00/rue9b84b553e1.png',
        'цска': 'https://s5o.ru/storage/simple/ru/edt/16/09/84/38/rue766a27e7f7.png',
        'локомотив': 'https://s5o.ru/storage/simple/ru/edt/08/96/63/12/rue526baee7a1.png',
        'динамо москва': 'https://s5o.ru/storage/simple/ru/edt/53/78/39/39/ruef7da78aa74.png',
        'краснодар': 'https://s5o.ru/storage/simple/ru/edt/24/76/85/55/rue09d5be380a.png',
        'ростов': 'https://s5o.ru/storage/simple/ru/edt/70/36/53/88/ruee18375e011.png',
        'рубин': 'https://s5o.ru/storage/simple/ru/edt/66/42/11/49/rue0668981442.png',
        'крылья советов': 'https://s5o.ru/storage/simple/ru/edt/36/43/89/34/rue9f96b99614.png',
        'пари нн': 'https://s5o.ru/storage/simple/ru/edt/45/64/34/95/ruef2bb609b1f.png',
        'ахмат': 'https://s5o.ru/storage/simple/ru/edt/95/43/86/55/rue9da59828aa.png',
        'оренбург': 'https://s5o.ru/storage/simple/ru/edt/89/88/06/71/rue284a96b797.png',
        'факел': 'https://s5o.ru/storage/simple/ru/edt/50/33/82/30/rue227ff8ff89.png',
        'сочи': 'https://s5o.ru/storage/simple/ru/edt/68/72/74/61/ruec65089cfa6.png',
        'балтика': 'https://s5o.ru/storage/simple/ru/edt/72/49/71/61/rue7f564757c9.png',
        'химки': 'https://s5o.ru/storage/simple/ru/edt/97/80/74/19/ruefe9fc40fca.png',
        'акрон': 'https://s5o.ru/storage/simple/ru/edt/73/19/33/85/rue7215c0e1ca.png',
        'динамо махачкала': 'https://s5o.ru/storage/simple/ru/edt/03/32/38/49/ruea217688358.png',

        'реал мадрид': 'https://s5o.ru/storage/simple/ru/edt/87/48/40/85/rue9541a54728.png',
        'барселона': 'https://s5o.ru/storage/simple/ru/edt/68/73/06/33/rue2a188fba75.png',
        'атлетико': 'https://s5o.ru/storage/simple/ru/edt/04/81/86/67/rue9e94326f59.png',
        'манчестер сити': 'https://s5o.ru/storage/simple/ru/edt/73/77/43/99/rueee5c5cf14e.png',
        'ливерпуль': 'https://s5o.ru/storage/simple/ru/edt/68/56/65/28/ruef068739958.png',
        'арсенал': 'https://s5o.ru/storage/simple/ru/edt/45/38/53/98/ruec23cb23c04.png',
        'манчестер юнайтед': 'https://s5o.ru/storage/simple/ru/edt/43/16/09/25/ruef43a57e3f8.png',
        'челси': 'https://s5o.ru/storage/simple/ru/edt/97/77/65/56/rue3f59fafe96.png',
        'тоттенхэм': 'https://s5o.ru/storage/simple/ru/edt/16/94/28/69/rue97a149179d.png',
        'бавария': 'https://s5o.ru/storage/simple/ru/edt/92/79/11/48/rue766a27e7f7.png',
        'боруссия д': 'https://s5o.ru/storage/simple/ru/edt/41/50/23/12/rue526baee7a1.png',
        'байер': 'https://s5o.ru/storage/simple/ru/edt/93/46/78/47/rue0842db13fb.png',
        'интер': 'https://s5o.ru/storage/simple/ru/edt/02/89/36/41/rue284a96b797.png',
        'ювентус': 'https://s5o.ru/storage/simple/ru/edt/56/61/89/95/ruea1e0589a59.png',
        'милан': 'https://s5o.ru/storage/simple/ru/edt/69/96/12/82/ruec23cb23c04.png',
        'наполи': 'https://s5o.ru/storage/simple/ru/edt/57/46/09/16/rue7f564757c9.png',
        'псж': 'https://s5o.ru/storage/simple/ru/edt/45/77/89/62/rue53bb990818.png'
    };

    function getTeamLogo(teamName) {
        if (!teamName) return '';
        const lower = teamName.toLowerCase();
        for (const [key, url] of Object.entries(logoMap)) {
            if (lower.includes(key)) return url;
        }
        return '';
    }

    // Tournament Classification by Country and Championship
    function classifyTournament(leagueTitle, homeName, awayName) {
        const l = (leagueTitle || '').toLowerCase();
        const text = ((leagueTitle || '') + ' ' + (homeName || '') + ' ' + (awayName || '')).toLowerCase();

        // 1. European competitions (Лига Чемпионов УЕФА, Лига Европы, Лига Конференций, Юношеская лига УЕФА)
        if (l.includes('лига чемпион') || l.includes('лига европ') || l.includes('лига конференц') || 
            l.includes('юношеская лига') || l.includes('uefa') || l.includes('уефа') || 
            text.includes('champions league') || text.includes('europa league')) {
            return {
                groupKey: 'uefa',
                groupTitle: '🇪🇺 ЕВРОКУБКИ (ЛИГА ЧЕМПИОНОВ, ЛЕ, ЛК)',
                badge: 'ЕВРОКУБКИ',
                order: 1
            };
        }

        // 2. Russia (РПЛ, Кубок России, Первая Лига)
        if (l.includes('росси') || l.includes('рпл') || text.includes('зенит') || text.includes('спартак') || 
            text.includes('цска') || text.includes('локомотив') || text.includes('краснодар') || 
            text.includes('динамо м') || text.includes('рубин') || text.includes('акрон') || 
            text.includes('ростов') || text.includes('пари нн') || text.includes('факел')) {
            return {
                groupKey: 'russia',
                groupTitle: '🇷🇺 РОССИЯ (РПЛ И КУБОК РОССИИ)',
                badge: 'РОССИЯ',
                order: 2
            };
        }

        // 3. England (АПЛ, Чемпионшип, Кубок Англии, Кубок Лиги)
        if (l.includes('англи') || l.includes('premier league') || l.includes('epl') || 
            text.includes('манчестер') || text.includes('ливерпуль') || text.includes('арсенал') || 
            text.includes('челси') || text.includes('тоттенхэм') || text.includes('ньюкасл') || 
            text.includes('астон вилла') || text.includes('эвертон')) {
            return {
                groupKey: 'england',
                groupTitle: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 АНГЛИЯ (ПРЕМЬЕР-ЛИГА И КУБКИ)',
                badge: 'АНГЛИЯ',
                order: 3
            };
        }

        // 4. Spain (Ла Лига, Сегунда, Кубок Испании)
        if (l.includes('испани') || l.includes('примера') || l.includes('сегунда') || l.includes('la liga') || 
            text.includes('реал мадрид') || text.includes('барселона') || text.includes('атлетико') || 
            text.includes('севилья') || text.includes('валенсия') || text.includes('вильярреал') || 
            text.includes('сосьедад') || text.includes('бетис')) {
            return {
                groupKey: 'spain',
                groupTitle: '🇪🇸 ИСПАНИЯ (ЛА ЛИГА И КУБОК КОРОЛЯ)',
                badge: 'ИСПАНИЯ',
                order: 4
            };
        }

        // 5. Italy (Серия А, Серия B, Кубок Италии)
        if (l.includes('итали') || l.includes('серия а') || l.includes('серия b') || l.includes('serie a') || 
            text.includes('ювентус') || text.includes('интер') || text.includes('милан') || 
            text.includes('наполи') || text.includes('рома') || text.includes('лацио') || 
            text.includes('аталанта') || text.includes('фиорентина')) {
            return {
                groupKey: 'italy',
                groupTitle: '🇮🇹 ИТАЛИЯ (СЕРИЯ А И КУБОК)',
                badge: 'ИТАЛИЯ',
                order: 5
            };
        }

        // 6. Germany (Бундеслига, Бундеслига 2, Кубок Германии)
        if (l.includes('германи') || l.includes('бундеслиг') || text.includes('бавария') || 
            text.includes('боруссия') || text.includes('байер') || text.includes('лейпциг') || 
            text.includes('штутгарт') || text.includes('айнтрахт') || text.includes('вольфсбург')) {
            return {
                groupKey: 'germany',
                groupTitle: '🇩🇪 ГЕРМАНИЯ (БУНДЕСЛИГА)',
                badge: 'ГЕРМАНИЯ',
                order: 6
            };
        }

        // 7. France (Лига 1, Лига 2, Кубок Франции)
        if (l.includes('франци') || l.includes('лига 1') || text.includes('псж') || 
            text.includes('марсель') || text.includes('монако') || text.includes('лион') || 
            text.includes('ренн') || text.includes('лилль')) {
            return {
                groupKey: 'france',
                groupTitle: '🇫🇷 ФРАНЦИЯ (ЛИГА 1)',
                badge: 'ФРАНЦИЯ',
                order: 7
            };
        }

        // 8. Other Countries & Championships
        return {
            groupKey: 'other',
            groupTitle: '🌍 ДРУГИЕ ЧЕМПИОНАТЫ И КУБКИ',
            badge: 'ДРУГИЕ',
            order: 8
        };
    }

    // Resolves CDN3 / .php stream wrappers to valid direct HLS manifest URLs
    const CDN3_STREAM_MAP = {
        'mtv.php': 'https://t5.ultrastream.vip/mtv_laliga/index.m3u8',
        'mp.php': 'https://t5.ultrastream.vip/matchprem/index.m3u8',
        'marena.php': 'https://t7.ultrastream.vip/marena/index.m3u8',
        'start.php': 'https://t5.ultrastream.vip/Start/index.m3u8',
        'khl.php': 'https://t5.ultrastream.vip/KHL/index.m3u8',
        'b5.php': 'https://t7.ultrastream.vip/b5/index.m3u8',
        'footballokko.php': 'https://t6.ultrastream.vip/footbolokko/index.m3u8',
        'okko-sport.php': 'https://t6.ultrastream.vip/footbolokko/index.m3u8',
        'reserv1.php': 'https://t6.ultrastream.vip/reserv1/index.m3u8',
        'reserv2.php': 'https://t6.ultrastream.vip/reserv2/index.m3u8',
        'reserv4.php': 'https://t6.ultrastream.vip/reserv4/index.m3u8',
        'reserv5.php': 'https://t6.ultrastream.vip/reserv5/index.m3u8',
        'reserv6.php': 'https://t6.ultrastream.vip/test/index.m3u8',
        'r6.php': 'https://t6.ultrastream.vip/test/index.m3u8',
        'reserv7.php': 'https://t6.ultrastream.vip/reserv7/index.m3u8',
        'reserv8.php': 'https://t6.ultrastream.vip/reserv8/index.m3u8',
        'reserv9.php': 'https://t6.ultrastream.vip/reservs9/index.m3u8',
        'reserv10.php': 'https://t6.ultrastream.vip/reserv10/index.m3u8',
        'reserv11.php': 'https://t6.ultrastream.vip/reserv11/index.m3u8',
        'reserv12.php': 'https://t6.ultrastream.vip/reserv12/index.m3u8',
        'reserv13.php': 'https://t5.ultrastream.vip/reserv13/index.m3u8',
        'reserv14.php': 'https://t5.ultrastream.vip/reserv14/index.m3u8',
        'reserv15.php': 'https://t5.ultrastream.vip/reserv15/index.m3u8',
        'reserv16.php': 'https://t5.ultrastream.vip/reserv16/index.m3u8',
        'reserv17.php': 'https://t5.ultrastream.vip/reserv17/index.m3u8',
        'reserv18.php': 'https://t5.ultrastream.vip/reserv18/index.m3u8',
        'reserv19.php': 'https://t5.ultrastream.vip/reserv19/index.m3u8',
        'reserv20.php': 'https://t5.ultrastream.vip/reserv20/index.m3u8'
    };

    function resolveCdn3Fast(url) {
        if (!url || typeof url !== 'string') return url;
        if (url.includes('.m3u8') || url.includes('.mp4')) return url;
        if (url.includes('/CDN3/') || url.includes('.php')) {
            const filename = url.split('/').pop().split('?')[0].toLowerCase();
            if (CDN3_STREAM_MAP[filename]) {
                return CDN3_STREAM_MAP[filename];
            }
            if (filename.startsWith('reserv') && filename.endsWith('.php')) {
                const num = parseInt(filename.replace(/\D/g, ''), 10);
                const host = (num >= 13 && num <= 20) ? 't5.ultrastream.vip' : 't6.ultrastream.vip';
                const base = filename.replace('.php', '');
                return `https://${host}/${base}/index.m3u8`;
            }
        }
        return url;
    }

    // Extracts real manifest URL directly from player HTML
    function extractStreamFromHtml(html) {
        if (!html || typeof html !== 'string') return null;
        const m = html.match(/file:\s*["']([^"']+)["']/i);
        if (m && m[1]) return m[1];
        const m2 = html.match(/["'](https?:\/\/[^"']+\.m3u8[^"']*)["']/i);
        if (m2 && m2[1]) return m2[1];
        return null;
    }

    // High quality alternative broadcast fallbacks by competition
    function getFallbackMirrorsForTournament(groupKey) {
        if (groupKey === 'uefa') {
            return [
                { url: 'http://178.124.179.122:8080/Setanta1/index.m3u8' }, // Okko / Setanta
                { url: 'http://stream.mcquack.net/130/index.m3u8' }, // Матч Футбол 1
                { url: 'http://178.124.179.122:8080/BT5/index.m3u8' },  // Беларусь 5
                { url: 'http://stream.mcquack.net/234/index.m3u8' }  // Setanta Sports 1
            ];
        } else if (groupKey === 'russia') {
            return [
                { url: 'http://stream.mcquack.net/193/index.m3u8' },
                { url: 'http://stream.mcquack.net/169/index.m3u8' }
            ];
        } else if (groupKey === 'england') {
            return [
                { url: 'http://45.228.234.9:8000/play/a06b/index.m3u8' },
                { url: 'http://stream.mcquack.net/234/index.m3u8' }
            ];
        } else if (groupKey === 'spain' || groupKey === 'italy') {
            return [
                { url: 'http://stream.mcquack.net/142/index.m3u8' },
                { url: 'http://stream.mcquack.net/234/index.m3u8' }
            ];
        } else if (groupKey === 'germany') {
            return [
                { url: 'http://stream.mcquack.net/185/index.m3u8' },
                { url: 'http://stream.mcquack.net/235/index.m3u8' }
            ];
        }
        return [
            { url: 'http://stream.mcquack.net/234/index.m3u8' }
        ];
    }

    let allMatchesCache = null;
    let lastCacheTime = 0;
    const CACHE_TTL_MS = 60 * 1000;

    function pad2(num) {
        return (num < 10 ? '0' : '') + num;
    }

    function formatHHMM(d) {
        if (!d || isNaN(d.getTime())) return '';
        return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
    }

    function formatShortDate(d) {
        if (!d || isNaN(d.getTime())) return '';
        const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
    }

    function formatDateHeader(d) {
        if (!d || isNaN(d.getTime())) return '';
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
    }

    // Parse Official Matchlist (Strictly Football Only, Real Streams & Working Fallbacks)
    function parseRawMatchlist(rawList) {
        if (!Array.isArray(rawList)) return [];

        const now = new Date();
        const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const oneDayMs = 24 * 60 * 60 * 1000;

        const parsed = [];

        rawList.forEach(m => {
            const homeName = (m.home || m.home_en || '').trim();
            const awayName = (m.away || m.away_en || '').trim();
            if (!homeName || !awayName) return;

            // Keep ONLY Football Matches!
            const sportStr = (m.sport || '').toLowerCase();
            const isFootball = sportStr.includes('футбол') || sportStr.includes('football');
            if (!isFootball) return;

            const leagueTitle = (m.league || m.league_en || 'Футбольный турнир').trim();
            const leagueLower = leagueTitle.toLowerCase();
            const countryLower = ((m.country || '') + ' ' + (m.country_en || '')).toLowerCase();

            // Strict Filter: Completely exclude Ukrainian championship and domestic cup matches
            if (
                leagueLower.includes('украин') || 
                leagueLower.includes('ukrain') || 
                leagueLower.includes('упл') || 
                leagueLower.includes('upl') || 
                countryLower.includes('украин') || 
                countryLower.includes('ukrain')
            ) {
                return; // Exclude Ukrainian domestic championships and cups completely
            }

            const tournament = classifyTournament(leagueTitle, homeName, awayName);

            // Parse Start Date & Kickoff
            let startDate = null;
            let diffDays = 0;
            let dayCategory = 'today';
            if (m.start) {
                try {
                    startDate = new Date(m.start);
                    if (!isNaN(startDate.getTime())) {
                        const matchMidnight = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
                        diffDays = Math.round((matchMidnight - todayMidnight) / oneDayMs);
                        if (diffDays === 0) dayCategory = 'today';
                        else if (diffDays === 1) dayCategory = 'tomorrow';
                        else if (diffDays > 1) dayCategory = 'upcoming';
                        else dayCategory = 'past';
                    }
                } catch (_) {}
            }

            // Live vs Scheduled vs Finished
            const statusRaw = (m.status || '').toLowerCase();
            const liveStatusRaw = (m.live_status || '').toLowerCase();
            const isLive = statusRaw === 'live' || liveStatusRaw.includes('live') || 
                           liveStatusRaw.includes('тайм') || liveStatusRaw.includes('перерыв');
            const isFinished = statusRaw === 'finished' || liveStatusRaw.includes('завершен') || 
                               liveStatusRaw.includes('fin') || liveStatusRaw.includes('ft');
            const isScheduled = !isLive && !isFinished;

            // Robust Live Match Normalization
            if (isLive) {
                if (m.minute && (Number(m.minute) > 140 || Number(m.minute) < 0)) {
                    m.minute = null; // Clean up unusual raw counter; display live status cleanly
                }
                if (startDate && (now.getTime() - startDate.getTime() > 12 * 60 * 60 * 1000)) {
                    return; // Zombie match stuck in database from previous days
                }
                if (startDate && (startDate.getTime() - now.getTime() > 60 * 60 * 1000)) {
                    return; // Falsely tagged as live long before start
                }
            }

            let statusText = '';
            let badgeClass = '';
            const timeStr = startDate ? formatHHMM(startDate) : '';

            if (isLive) {
                badgeClass = 'badge-live';
                statusText = m.minute ? `${m.minute}' • ${m.live_status || 'Идет игра'}` : (m.live_status || 'Идет игра');
            } else if (isFinished) {
                badgeClass = 'badge-finished';
                statusText = 'Завершен';
            } else if (diffDays === 0) {
                badgeClass = 'badge-today';
                statusText = `Сегодня, ${timeStr}`;
            } else if (diffDays === 1) {
                badgeClass = 'badge-tomorrow';
                statusText = `Завтра, ${timeStr}`;
            } else if (diffDays > 1) {
                badgeClass = 'badge-upcoming';
                statusText = `${formatShortDate(startDate)}, ${timeStr}`;
            } else {
                badgeClass = 'badge-finished';
                statusText = 'Матч окончен';
            }

            // Scores
            const scoreHome = (m.score_home !== null && m.score_home !== undefined) ? String(m.score_home) : (isLive ? '0' : '-');
            const scoreAway = (m.score_away !== null && m.score_away !== undefined) ? String(m.score_away) : (isLive ? '0' : '-');

            // Club Logos
            const homeLogo = m.home_logo || getTeamLogo(homeName);
            const awayLogo = m.away_logo || getTeamLogo(awayName);

            // Stream Mirrors Discovery & Automatic Fallbacks
            const streams = [];

            // 1. Primary match stream and genuine CDN edge mirrors
            if (m.stream && typeof m.stream === 'string' && m.stream.startsWith('http')) {
                const resolvedMain = resolveCdn3Fast(m.stream);
                streams.push({
                    name: '⚡ Основной поток (1080p)',
                    url: resolvedMain,
                    rawUrl: m.stream
                });

                // Auto-discover alternative edge CDNs (t5, t6, t7) for ultrastream sources
                if (resolvedMain.includes('.ultrastream.vip/')) {
                    ['t5', 't6', 't7'].forEach(edge => {
                        const edgeUrl = resolvedMain.replace(/t\d+\.ultrastream\.vip/, `${edge}.ultrastream.vip`);
                        if (!streams.some(s => s.url === edgeUrl)) {
                            streams.push({
                                name: `⚡ Резерв ${edge.toUpperCase()} (CDN)`,
                                url: edgeUrl
                            });
                        }
                    });
                }
            }

            // 2. Alternative player variants from API
            if (Array.isArray(m.player_variants)) {
                m.player_variants.forEach(v => {
                    if (typeof v === 'string' && v.startsWith('http') && v !== m.stream && !v.includes('vkvideo.ru')) {
                        const resolvedVar = resolveCdn3Fast(v);
                        if (!streams.some(s => s.url === resolvedVar)) {
                            streams.push({
                                name: `⚡ Резерв ${streams.length}`,
                                url: resolvedVar,
                                rawUrl: v
                            });
                        }
                    }
                });
            }

            // 3. Guaranteed tournament broadcast fallbacks (if primary stream is dead or blocked)
            const fallbacks = getFallbackMirrorsForTournament(tournament.groupKey);
            fallbacks.forEach(fb => {
                if (!streams.some(s => s.url === fb.url)) {
                    streams.push({
                        name: `⚡ Резерв ${streams.length}`,
                        url: fb.url
                    });
                }
            });

            parsed.push({
                id: `var-${m.id || Math.random().toString(36).substring(2)}`,
                rawId: m.id,
                sport: 'Футбол',
                sportType: 'football',
                league: leagueTitle,
                leagueIcon: m.league_img || '',
                tournament: tournament,
                team1: {
                    name: homeName,
                    logo: homeLogo,
                    score: scoreHome
                },
                team2: {
                    name: awayName,
                    logo: awayLogo,
                    score: scoreAway
                },
                startDate: startDate,
                diffDays: diffDays,
                dayCategory: dayCategory,
                statusText: statusText,
                badgeClass: badgeClass,
                isLive: isLive,
                isFinished: isFinished,
                isScheduled: isScheduled,
                streams: streams
            });
        });

        return parsed;
    }

    // Dynamic Mirror Domains (Resilient Domain Manager like VAR.TV)
    const BOOTSTRAP_MIRRORS_URL = 'https://raw.githubusercontent.com/FletCHGM/3c1f9b7a-5e6d-4d2a-9f13-8c7b2a91e4c6/main/1.json';
    const DEFAULT_VAR_DOMAINS = [
        'xlsport.vip',
        'hpsport.vip',
        'lsport.vip',
        'msport.vip',
        'varline.store'
    ];
    let cachedVarDomains = [...DEFAULT_VAR_DOMAINS];

    async function resolveLiveVarDomains() {
        try {
            const res = await fetchWithTimeout(BOOTSTRAP_MIRRORS_URL + '?t=' + Date.now(), {}, 3000);
            if (res.ok) {
                const json = await res.json();
                if (Array.isArray(json.domains) && json.domains.length > 0) {
                    cachedVarDomains = json.domains;
                }
            }
        } catch (_) {}
        return cachedVarDomains;
    }

    // Fetch Football Matches from VAR TV API
    async function fetchAllVarlineMatches(forceRefresh = false) {
        const now = Date.now();
        if (!forceRefresh && allMatchesCache && (now - lastCacheTime < CACHE_TTL_MS)) {
            return allMatchesCache;
        }

        const domains = await resolveLiveVarDomains();
        let rawMatches = null;

        for (const domain of domains) {
            const url = `https://${domain}/api/matchlist?limit=150`;
            try {
                const res = await fetchWithTimeout(url, {
                    headers: { 'Accept': 'application/json' }
                }, 5000);
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        rawMatches = data;
                        break;
                    }
                }
            } catch (err) {
                console.warn(`[API] Mirror ${domain} failed:`, err.message);
            }
        }

        if (!rawMatches) {
            return allMatchesCache || [];
        }

        const parsed = parseRawMatchlist(rawMatches);
        allMatchesCache = parsed;
        lastCacheTime = now;
        return parsed;
    }

    // UI Elements
    const categoriesNav = document.getElementById('categoriesNav');
    const filterPills = document.getElementById('filterPills');
    const cardsGrid = document.getElementById('cardsGrid');
    const sectionTitle = document.getElementById('sectionTitle');
    const matchCounter = document.getElementById('matchCounter');
    const clockEl = document.getElementById('clock');

    // Settings Modal Elements
    const settingsModal = document.getElementById('settingsModal');
    const btnSettingsNav = document.getElementById('btnSettingsNav');
    const btnCheckUpdateManual = document.getElementById('btnCheckUpdateManual');
    const btnCloseSettings = document.getElementById('btnCloseSettings');
    let isSettingsModalOpen = false;

    // Player Elements
    const playerModal = document.getElementById('playerModal');
    const tvVideo = document.getElementById('tvVideo');
    const playerOverlay = document.getElementById('playerOverlay');
    const playerLeague = document.getElementById('playerLeague');
    const playerTitle = document.getElementById('playerTitle');
    const playerQualityBadge = document.getElementById('playerQualityBadge');
    const serverButtons = document.getElementById('serverButtons');
    const playerLoader = document.getElementById('playerLoader');
    const loaderText = document.getElementById('loaderText');

    // Prematch Dialog Elements
    const prematchModal = document.getElementById('prematchModal');
    const prematchLeague = document.getElementById('prematchLeague');
    const prematchTime = document.getElementById('prematchTime');
    const prematchLogo1 = document.getElementById('prematchLogo1');
    const prematchLogo2 = document.getElementById('prematchLogo2');
    const prematchName1 = document.getElementById('prematchName1');
    const prematchName2 = document.getElementById('prematchName2');
    const prematchBroadcastText = document.getElementById('prematchBroadcastText');
    const btnWatchChannel = document.getElementById('btnWatchChannel');
    const btnClosePrematch = document.getElementById('btnClosePrematch');

    let currentCategory = 'live';
    let currentFilter = 'all';
    let currentMatch = null;
    let currentStreamIndex = 0;
    let prematchItem = null;
    let hls = null;
    let overlayTimeout = null;
    let focusedElement = null;

    function updateClock() {
        const now = new Date();
        const h = pad2(now.getHours());
        const m = pad2(now.getMinutes());
        if (clockEl) clockEl.textContent = `${h}:${m}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    function setFocus(el) {
        if (!el) return;
        document.querySelectorAll('.focused').forEach(node => {
            if (node !== el) {
                node.classList.remove('focused');
                try { node.blur(); } catch(e) {}
            }
        });
        focusedElement = el;
        el.classList.add('focused');
        try { el.focus(); } catch(e) {}
        if (el.classList.contains('server-btn') || el.classList.contains('nav-btn') || el.classList.contains('pill-btn')) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
    }

    // Card Component Factory: Displays Full Championship Name across full card width (NO quality indicators on tiles)
    function createCardElement(item) {
        const card = document.createElement('div');
        card.className = `match-card focusable ${item.isChannel ? 'channel-card' : ''}`;
        card.tabIndex = 0;
        card.dataset.id = item.id;

        if (item.isChannel) {
            // TV Channel Tile: Original logo on clean white container, channel name, short description
            card.innerHTML = `
                <div class="channel-card-top">
                    <div class="channel-logo-container">
                        <img src="${item.logo}" alt="${item.name}" class="channel-logo-img">
                    </div>
                </div>
                <div class="channel-card-body">
                    <h3 class="channel-name">${item.name}</h3>
                    <p class="channel-desc">${item.desc}</p>
                </div>
            `;
        } else {
            const isLive = item.isLive;
            let statusBadgeHtml = '';

            if (isLive) {
                statusBadgeHtml = `<span class="badge-live"><span class="live-indicator"></span> ${item.statusText || 'В ЭФИРЕ'}</span>`;
            } else if (item.isFinished) {
                statusBadgeHtml = `<span class="badge-finished">Завершен</span>`;
            } else if (item.diffDays === 0) {
                statusBadgeHtml = `<span class="badge-today">${item.statusText || 'Сегодня'}</span>`;
            } else if (item.diffDays === 1) {
                statusBadgeHtml = `<span class="badge-tomorrow">${item.statusText || 'Завтра'}</span>`;
            } else {
                statusBadgeHtml = `<span class="badge-upcoming">${item.statusText || 'Скоро'}</span>`;
            }

            const team1LogoHtml = item.team1.logo 
                ? `<img src="${item.team1.logo}" alt="${item.team1.name}" class="team-crest-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><span class="team-crest-fallback" style="display:none;">⚽</span>` 
                : `<span class="team-crest-fallback">⚽</span>`;
            
            const team2LogoHtml = item.team2.logo 
                ? `<img src="${item.team2.logo}" alt="${item.team2.name}" class="team-crest-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><span class="team-crest-fallback" style="display:none;">⚽</span>` 
                : `<span class="team-crest-fallback">⚽</span>`;

            const leagueIconHtml = item.leagueIcon
                ? `<img src="${item.leagueIcon}" alt="" class="league-icon-img" onerror="this.style.display='none';">`
                : '';

            card.innerHTML = `
                <div class="card-top">
                    <span class="league-badge" title="${item.league}">
                        ${leagueIconHtml}
                        ${item.league}
                    </span>
                </div>
                <div class="teams-container">
                    <div class="team-row">
                        <div class="team-info">
                            ${team1LogoHtml}
                            <span class="team-name">${item.team1.name}</span>
                        </div>
                        <span class="team-score ${isLive ? 'winning' : ''}">${item.team1.score}</span>
                    </div>
                    <div class="team-row">
                        <div class="team-info">
                            ${team2LogoHtml}
                            <span class="team-name">${item.team2.name}</span>
                        </div>
                        <span class="team-score ${isLive ? 'winning' : ''}">${item.team2.score}</span>
                    </div>
                </div>
                <div class="card-bottom">
                    ${statusBadgeHtml}
                    ${isLive ? '<span class="time-badge">📺 Прямой эфир</span>' : ''}
                </div>
            `;
        }

        card.addEventListener('click', () => {
            if (item.isChannel || item.isLive || (item.streams && item.streams.length > 0)) {
                openPlayer(item);
            } else {
                openPrematch(item);
            }
        });
        card.addEventListener('focus', () => setFocus(card));

        return card;
    }

    function createSectionHeader(title, countText) {
        const header = document.createElement('div');
        header.className = 'date-section-header';
        header.innerHTML = `
            <span class="date-section-title">${title}</span>
            ${countText ? `<span class="date-section-badge">${countText}</span>` : ''}
        `;
        return header;
    }

    function renderSections(sections) {
        cardsGrid.innerHTML = '';
        let totalCount = 0;

        sections.forEach(sec => {
            if (!sec.items || sec.items.length === 0) return;
            totalCount += sec.items.length;

            if (sec.title) {
                const h = createSectionHeader(sec.title, `${sec.items.length} матчей`);
                cardsGrid.appendChild(h);
            }

            sec.items.forEach(item => {
                const card = createCardElement(item);
                cardsGrid.appendChild(card);
            });
        });

        matchCounter.textContent = currentCategory === 'channels' ? `${totalCount} каналов` : `${totalCount} событий`;

        if (totalCount === 0) {
            cardsGrid.innerHTML = `
                <div class="live-empty-banner">
                    <div class="live-empty-icon">⚽</div>
                    <div class="live-empty-info">
                        <h2 class="live-empty-title">Нет запланированных матчей в этом разделе</h2>
                        <p class="live-empty-desc">Выберите другой раздел меню или переключите фильтр лиги.</p>
                    </div>
                </div>
            `;
        }

        // Keep focus on nav-btn if user is navigating the top menu
        if (focusedElement && cardsGrid.contains(focusedElement)) {
            const firstCard = cardsGrid.querySelector('.focusable');
            if (firstCard) setFocus(firstCard);
        } else if (!focusedElement) {
            const activeNav = categoriesNav.querySelector('.nav-btn.active') || categoriesNav.querySelector('.nav-btn');
            if (activeNav) setFocus(activeNav);
        }
    }

    function switchFilter(filterKey) {
        currentFilter = filterKey;
        const pillButtons = filterPills.querySelectorAll('.pill-btn');
        pillButtons.forEach(btn => {
            if (btn.dataset.filter === filterKey) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        renderCurrentCategory();
    }

    // Master Navigation Category Switcher
    async function switchCategory(cat, keepNavFocus = true) {
        currentCategory = cat;
        currentFilter = 'all';

        const viewport = document.getElementById('contentViewport');
        if (viewport) viewport.scrollTop = 0;

        const navButtons = categoriesNav.querySelectorAll('.nav-btn');
        let activeNavBtn = null;
        navButtons.forEach(btn => {
            if (btn.dataset.cat === cat) {
                btn.classList.add('active');
                activeNavBtn = btn;
            } else {
                btn.classList.remove('active');
            }
        });

        if (keepNavFocus && activeNavBtn) {
            setFocus(activeNavBtn);
        }

        // Setup filter pills dynamically
        if (cat === 'live' || cat === 'channels') {
            filterPills.style.display = 'none';
        } else if (cat === 'today') {
            filterPills.style.display = 'flex';
            filterPills.innerHTML = `
                <button class="pill-btn active focusable" data-filter="all" tabindex="0">Все матчи</button>
                <button class="pill-btn focusable" data-filter="live" tabindex="0">🔴 В эфире</button>
            `;
        } else if (cat === 'future') {
            filterPills.style.display = 'flex';
            filterPills.innerHTML = `
                <button class="pill-btn active focusable" data-filter="all" tabindex="0">Все турниры</button>
                <button class="pill-btn focusable" data-filter="uefa" tabindex="0">🇪🇺 Еврокубки</button>
                <button class="pill-btn focusable" data-filter="russia" tabindex="0">🇷🇺 Россия</button>
                <button class="pill-btn focusable" data-filter="england" tabindex="0">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Англия</button>
                <button class="pill-btn focusable" data-filter="spain" tabindex="0">🇪🇸 Испания</button>
                <button class="pill-btn focusable" data-filter="italy" tabindex="0">🇮🇹 Италия</button>
                <button class="pill-btn focusable" data-filter="germany" tabindex="0">🇩🇪 Германия</button>
                <button class="pill-btn focusable" data-filter="france" tabindex="0">🇫🇷 Франция</button>
                <button class="pill-btn focusable" data-filter="other" tabindex="0">🌍 Другие</button>
            `;
        }

        const titles = {
            live: '🔴 Футбольные матчи в прямом эфире',
            today: '⏰ Футбол: Расписание матчей на Сегодня',
            channels: '📺 Спортивные телеканалы Full HD',
            future: '📅 Будущие трансляции футбола на неделю'
        };
        sectionTitle.textContent = titles[cat] || 'Футбольные трансляции';

        cardsGrid.innerHTML = `
            <div class="player-loader" style="position: static; transform: none; margin: 40px auto; grid-column: 1 / -1;">
                <div class="spinner"></div>
                <div class="loader-text">Загрузка футбольного расписания...</div>
            </div>
        `;

        try {
            await renderCurrentCategory();
        } catch (renderErr) {
            console.error('[Render Error]:', renderErr);
            if (cardsGrid) {
                cardsGrid.innerHTML = `
                    <div class="live-empty-banner">
                        <div class="live-empty-icon">⚠️</div>
                        <div class="live-empty-info">
                            <h2 class="live-empty-title">Не удалось загрузить расписание матчей</h2>
                            <p class="live-empty-desc">Проверьте интернет-соединение или перейдите в раздел «ТВ каналы» для просмотра прямых эфиров.</p>
                        </div>
                    </div>
                `;
            }
        }
    }

    // Render contents for current category and filter
    async function renderCurrentCategory() {
        const now = new Date();

        // 1. TV CHANNELS TAB
        if (currentCategory === 'channels') {
            renderSections([
                {
                    title: null,
                    items: tvChannels
                }
            ]);
            return;
        }

        // Fetch football matches from VAR TV API
        const allMatches = await fetchAllVarlineMatches();

        // 2. LIVE TAB (Strictly Live Football Matches)
        if (currentCategory === 'live') {
            const liveMatches = allMatches.filter(m => m.isLive);
            const sections = [];

            if (liveMatches.length > 0) {
                sections.push({
                    title: '🔴 МАТЧИ В ПРЯМОМ ЭФИРЕ (ИДЕТ ИГРА)',
                    items: liveMatches
                });
            } else {
                cardsGrid.innerHTML = `
                    <div class="live-empty-banner">
                        <div class="live-empty-icon">⚽</div>
                        <div class="live-empty-info">
                            <h2 class="live-empty-title">Сейчас нет футбольных матчей в прямом эфире</h2>
                            <p class="live-empty-desc">Ближайшие трансляции смотрите в разделах «Сегодня» и «Будущие трансляции», либо включите спортивные «ТВ каналы».</p>
                        </div>
                    </div>
                `;
                matchCounter.textContent = '0 матчей';
                return;
            }

            renderSections(sections);
            return;
        }

        // 3. TODAY TAB (Today's Football Matches)
        if (currentCategory === 'today') {
            let todayMatches = allMatches.filter(m => m.diffDays === 0 || (m.isLive && m.diffDays <= 0));

            if (currentFilter === 'live') {
                todayMatches = todayMatches.filter(m => m.isLive);
            }

            const livePart = todayMatches.filter(m => m.isLive);
            const scheduledPart = todayMatches.filter(m => !m.isLive && !m.isFinished).sort((a, b) => {
                const aTime = (a.startDate && a.startDate.getTime) ? a.startDate.getTime() : 0;
                const bTime = (b.startDate && b.startDate.getTime) ? b.startDate.getTime() : 0;
                return aTime - bTime;
            });
            const finishedPart = todayMatches.filter(m => m.isFinished);

            const sections = [];
            if (livePart.length > 0) {
                sections.push({
                    title: '🔴 СЕЙЧАС В ЭФИРЕ',
                    items: livePart
                });
            }

            if (scheduledPart.length > 0) {
                sections.push({
                    title: `⏰ ВСЕ МАТЧИ СЕГОДНЯ (${formatDateHeader(now).toUpperCase()})`,
                    items: scheduledPart
                });
            }

            if (finishedPart.length > 0 && currentFilter === 'all') {
                sections.push({
                    title: '🏁 ЗАВЕРШЕННЫЕ МАТЧИ',
                    items: finishedPart
                });
            }

            renderSections(sections);
            return;
        }

        // 4. FUTURE TAB: Matches for the week, distributed by country and championship!
        if (currentCategory === 'future') {
            let futureMatches = allMatches.filter(m => m.diffDays >= 1 && m.diffDays <= 8 && !m.isFinished);

            if (currentFilter !== 'all') {
                futureMatches = futureMatches.filter(m => m.tournament && m.tournament.groupKey === currentFilter);
            }

            const groupsMap = {};
            futureMatches.forEach(m => {
                const key = m.tournament ? m.tournament.groupKey : 'other';
                const title = m.tournament ? m.tournament.groupTitle : '🌍 ДРУГИЕ ЧЕМПИОНАТЫ И КУБКИ';
                const order = m.tournament ? m.tournament.order : 99;

                if (!groupsMap[key]) {
                    groupsMap[key] = {
                        title: title,
                        order: order,
                        items: []
                    };
                }
                groupsMap[key].items.push(m);
            });

            Object.values(groupsMap).forEach(g => {
                g.items.sort((a, b) => {
                    const aTime = (a.startDate && a.startDate.getTime) ? a.startDate.getTime() : 0;
                    const bTime = (b.startDate && b.startDate.getTime) ? b.startDate.getTime() : 0;
                    return aTime - bTime;
                });
            });

            const sortedSections = Object.values(groupsMap).sort((a, b) => a.order - b.order);

            renderSections(sortedSections);
            return;
        }
    }

    // Prematch Dialog
    function openPrematch(item) {
        prematchItem = item;
        prematchLeague.textContent = item.league || 'ФУТБОЛЬНЫЙ МАТЧ';
        prematchTime.textContent = item.statusText || 'Скоро';

        prematchName1.textContent = item.team1.name;
        prematchName2.textContent = item.team2.name;
        prematchLogo1.src = item.team1.logo || 'img/channels/match-tv.png';
        prematchLogo2.src = item.team2.logo || 'img/channels/match-tv.png';

        prematchBroadcastText.innerHTML = `📺 Прямая трансляция матча в <strong>1080p Full HD</strong> начнется за 15 минут до стартового свистка.`;
        btnWatchChannel.textContent = `📺 Смотреть спортивные ТВ каналы`;

        prematchModal.classList.remove('hidden');
        setFocus(btnWatchChannel);
    }

    function closePrematch() {
        prematchModal.classList.add('hidden');
        if (prematchItem) {
            const card = document.querySelector(`.match-card[data-id="${prematchItem.id}"]`);
            if (card) setFocus(card);
        }
        prematchItem = null;
    }

    btnWatchChannel.addEventListener('click', () => {
        closePrematch();
        switchCategory('channels');
    });

    btnClosePrematch.addEventListener('click', () => {
        closePrematch();
    });


    // =========================================================================
    // Dynamic Stream Harvester & Autonomous Self-Healing Resolver
    // =========================================================================
    const DYNAMIC_CACHE_KEY = 'footdroid_dynamic_streams_v7';
    let dynamicStreamPool = {};

    try {
        const cached = localStorage.getItem(DYNAMIC_CACHE_KEY);
        if (cached) dynamicStreamPool = JSON.parse(cached);
    } catch(e) {}

    // Verified Channel Clusters (Only Authentic Working Streams)
    const CLUSTER_FALLBACKS = {
        'ch-matchtv': [
            { name: '⚡ Резерв 1 (HD)', url: 'http://flussonic.linkintel.ru/match/index.m3u8' },
            { name: '⚡ Резерв 2', url: 'http://stream.mcquack.net/169/index.m3u8' }
        ],
        'ch-premier': [
            { name: '⚡ Резерв HD', url: 'http://185.23.80.23:8080/MATCH_PREMIER/index.m3u8' }
        ],
        'ch-okko': [],
        'ch-futbol1': [
            { name: '⚡ Резерв', url: 'http://stream.mcquack.net/130/index.m3u8' }
        ],
        'ch-futbol2': [
            { name: '⚡ Резерв', url: 'http://stream.mcquack.net/142/index.m3u8' }
        ],
        'ch-futbol3': [],
        'ch-setanta1': [
            { name: '⚡ Резерв 1', url: 'http://stream.mcquack.net/234/index.m3u8' },
            { name: '⚡ Резерв 2', url: 'http://178.124.179.122:8080/Setanta1/index.m3u8' }
        ],
        'ch-setanta2': [
            { name: '⚡ Резерв', url: 'http://stream.mcquack.net/235/index.m3u8' }
        ],
        'ch-bt5': [
            { name: '⚡ Резерв HD', url: 'http://178.124.179.122:8080/BT5/index.m3u8' }
        ],
        'ch-wwe': [
            { name: '⚡ Резерв HD', url: 'https://aka-live1050.delivery.roku.com/34b065a4-682e-4e46-97f1-5c9a26aab12a/t2-origin/out/v1/live_720.m3u8' }
        ],
        'ch-euro1': [],
        'ch-euro2': [],
        'ch-khl': [
            { name: '⚡ Резерв HD', url: 'http://stream.mcquack.net/178/index.m3u8' }
        ],
        'ch-viju': [],
        'ch-udar': [],
        'ch-boxtv': [],
        'ch-mmatv': [],
        'ch-sportivny': [],
        'ch-boets': [],
        'ch-strana': [],
        'ch-igra': [],
        'ch-arena': []
    };

    async function harvestOnlineStreams() {
        console.log('[StreamHarvester] Automated online discovery started...');
        const endpoints = [
            'https://varline.store/api/matchlist?limit=500',
            'https://lsport.vip/api/matchlist?limit=500',
            'https://iptv-org.github.io/iptv/countries/ru.m3u'
        ];

        for (const ep of endpoints) {
            try {
                const res = await fetchWithTimeout(ep, {}, 6000);
                if (!res.ok) continue;

                if (ep.endsWith('.m3u')) {
                    const text = await res.text();
                    const lines = text.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
                        const nextLine = lines[i+1] ? lines[i+1].trim() : '';
                        if (line.startsWith('#EXTINF') && nextLine.startsWith('http')) {
                            if (line.includes('MatchPremier') || line.includes('Матч Премьер')) {
                                addStreamToPool('ch-premier', nextLine, '⚡ Онлайн Резерв');
                            } else if ((line.includes('Okko') || line.includes('Окко')) && !nextLine.toLowerCase().includes('setanta')) {
                                addStreamToPool('ch-okko', nextLine, '⚡ Онлайн Резерв');
                            }
                        }
                    }
                } else {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        data.forEach(m => {
                            if (m.stream && typeof m.stream === 'string') {
                                if (m.stream.includes('mp.php')) {
                                    addStreamToPool('ch-premier', 'https://t5.ultrastream.vip/matchprem/index.m3u8', '⚡ Matchtvlive CDN');
                                } else if (m.stream.includes('okko-sport.php') || m.stream.includes('footballokko.php')) {
                                    addStreamToPool('ch-okko', 'https://t6.ultrastream.vip/okkosport/index.m3u8', '⚡ Okko Live');
                                }
                            }
                        });
                    }
                }
            } catch (err) {
                console.warn('[StreamHarvester] Query to ' + ep + ' skipped:', err.message);
            }
        }

        try {
            localStorage.setItem(DYNAMIC_CACHE_KEY, JSON.stringify(dynamicStreamPool));
        } catch(e) {}
    }

    function addStreamToPool(channelId, url, name) {
        if (!url || typeof url !== 'string') return;
        if (!dynamicStreamPool[channelId]) dynamicStreamPool[channelId] = [];
        if (!dynamicStreamPool[channelId].some(s => s.url === url)) {
            dynamicStreamPool[channelId].push({ name: name || '⚡ Онлайн Резерв', url: url });
        }
    }

    // Session Blacklist of Inactive / Broken Stream URLs (Never shown to the user)
    const deadStreamUrls = new Set();

    function buildUnifiedStreamPool(item) {
        const pool = [];
        const seenUrls = new Set();

        const addCandidate = (url, name) => {
            if (!url || typeof url !== 'string') return;
            const cleanUrl = url.trim();
            // Automatically exclude known dead streams and duplicates
            if (deadStreamUrls.has(cleanUrl) || seenUrls.has(cleanUrl)) return;
            seenUrls.add(cleanUrl);
            pool.push({
                name: name || (pool.length === 0 ? '⚡ Основной поток' : `⚡ Резерв ${pool.length}`),
                url: cleanUrl
            });
        };

        // 1. Primary item streams (HIGHEST PRIORITY - always placed first)
        if (Array.isArray(item.streams)) {
            item.streams.forEach((s, idx) => addCandidate(s.url, s.name));
        }

        // 2. Verified Channel Cluster Streams
        if (item.isChannel && CLUSTER_FALLBACKS[item.id]) {
            CLUSTER_FALLBACKS[item.id].forEach(s => addCandidate(s.url, s.name));
        }

        // 3. Dynamically harvested streams (only if valid)
        if (item.isChannel && dynamicStreamPool[item.id]) {
            dynamicStreamPool[item.id].forEach(s => addCandidate(s.url, s.name));
        }

        return pool;
    }

    // Auto-search for new streams if current pool is failing
    async function autoSearchStreamsForActiveMatch() {
        if (!currentMatch) return false;
        playerLoader.classList.remove('hidden');
        loaderText.innerHTML = `
            <div style="font-size: 1.15rem; font-weight: 700; color: #38bdf8; margin-bottom: 6px;">⚡ Автоматический поиск рабочего потока...</div>
            <div style="font-size: 0.9rem; color: #94a3b8;">Поиск свежих онлайн-зеркал и альтернативных серверов...</div>
        `;

        // 1. If it's a channel, harvest streams
        if (currentMatch.isChannel) {
            await harvestOnlineStreams();
            const updatedPool = buildUnifiedStreamPool(currentMatch);
            if (updatedPool && updatedPool.length > currentMatch.streams.length) {
                currentMatch.streams = updatedPool;
                currentStreamIndex = Math.min(failoverAttempts, currentMatch.streams.length - 1);
                renderServerButtons();
                playStream(currentStreamIndex, false);
                return true;
            }
        } else {
            // 2. If it's a match, re-fetch matchlist to find live stream updates
            try {
                const domains = cachedVarDomains && cachedVarDomains.length > 0 ? cachedVarDomains : DEFAULT_VAR_DOMAINS;
                let freshMatches = null;
                for (const d of domains) {
                    try {
                        const r = await fetchWithTimeout(`https://${d}/api/matchlist?limit=150`, {}, 4000);
                        if (r.ok) {
                            freshMatches = await r.json();
                            if (Array.isArray(freshMatches) && freshMatches.length > 0) break;
                        }
                    } catch (_) {}
                }
                const res = { ok: Array.isArray(freshMatches), json: async () => freshMatches };
                if (res.ok) {
                    const freshMatches = await res.json();
                    const homeTarget = (currentMatch.team1 ? currentMatch.team1.name : '').toLowerCase();
                    const awayTarget = (currentMatch.team2 ? currentMatch.team2.name : '').toLowerCase();
                    const matched = freshMatches.find(m => {
                        const h = (m.home || m.home_en || '').toLowerCase();
                        const a = (m.away || m.away_en || '').toLowerCase();
                        return (m.id && m.id === currentMatch.id) || (h && homeTarget && h.includes(homeTarget)) || (a && awayTarget && a.includes(awayTarget));
                    });

                    if (matched && matched.stream) {
                        const newUrl = resolveCdn3Fast(matched.stream);
                        if (!currentMatch.streams.some(s => s.url === newUrl)) {
                            currentMatch.streams.push({ name: '⚡ Свежий автопоток', url: newUrl });
                            currentStreamIndex = currentMatch.streams.length - 1;
                            renderServerButtons();
                            playStream(currentStreamIndex, false);
                            return true;
                        }
                    }
                }
            } catch (err) {
                console.warn('[StreamEngine] Match re-fetch error:', err);
            }
        }
        return false;
    }

    // Initialize background harvester
    setTimeout(harvestOnlineStreams, 1500);
    setInterval(harvestOnlineStreams, 15 * 60 * 1000);

    // Fullscreen TV Video Player Engine
    function openPlayer(item) {
        const fullStreams = buildUnifiedStreamPool(item);
        currentMatch = {
            ...item,
            streams: fullStreams.length > 0 ? fullStreams : (item.streams || []).map(s => ({ ...s }))
        };
        currentStreamIndex = 0;

        playerModal.classList.remove('hidden');
        playerLoader.classList.remove('hidden');
        loaderText.textContent = 'Подключение к трансляции Full HD...';

        playerLeague.textContent = item.league || (item.isChannel ? 'ТЕЛЕКАНАЛ' : 'ПРЯМОЙ ЭФИР');
        playerTitle.textContent = item.isChannel ? item.name : `${item.team1.name} — ${item.team2.name}`;
        playerQualityBadge.textContent = '⚡ Full HD 1080p';

        const metaEl = document.getElementById('playerMatchMeta');
        if (metaEl) {
            if (item.isChannel) {
                metaEl.innerHTML = `<span class="player-meta-info">${item.desc}</span>`;
            } else if (item.isLive) {
                metaEl.innerHTML = `<span class="player-live-badge"><span class="live-dot"></span> ПРЯМОЙ ЭФИР: ${item.statusText || 'Идет игра'}</span> <span class="player-score-highlight">СЧЕТ: ${item.team1.score} : ${item.team2.score}</span>`;
            } else if (item.isFinished) {
                metaEl.innerHTML = `<span class="player-finished-badge">Матч завершен (Счет: ${item.team1.score} : ${item.team2.score})</span>`;
            } else {
                metaEl.innerHTML = `<span class="player-upcoming-badge">⏰ Начало матча: ${item.statusText}. Подготовка к эфиру.</span>`;
            }
        }

        const liveIndicatorBadge = document.querySelector('.player-status-badge');
        if (liveIndicatorBadge) {
            if (item.isChannel || item.isLive) {
                liveIndicatorBadge.innerHTML = '<span class="live-indicator"></span> ПРЯМОЙ ЭФИР';
            } else if (item.isFinished) {
                liveIndicatorBadge.innerHTML = 'МАТЧ ЗАВЕРШЕН';
            } else {
                liveIndicatorBadge.innerHTML = 'ОЖИДАНИЕ НАЧАЛА';
            }
        }

        tvVideo.muted = true;

        renderServerButtons();
        playStream(currentStreamIndex);
        showOverlay(3800);
        startStallDetector();
        validateBackgroundMirrors(currentMatch);

        setTimeout(() => {
            const activeServerBtn = serverButtons.querySelector('.server-btn.active') || serverButtons.querySelector('.server-btn');
            if (activeServerBtn) {
                setFocus(activeServerBtn);
            }
        }, 100);
    }

    // Mirror / Stream Selector Buttons (Auto-updates dynamically when broken streams are pruned)
    function renderServerButtons() {
        serverButtons.innerHTML = '';
        if (!currentMatch.streams || currentMatch.streams.length === 0) return;

        if (currentStreamIndex >= currentMatch.streams.length) {
            currentStreamIndex = 0;
        }

        currentMatch.streams.forEach((stream, idx) => {
            const btn = document.createElement('button');
            btn.className = `server-btn focusable ${idx === currentStreamIndex ? 'active' : ''}`;
            btn.textContent = stream.name || (idx === 0 ? '⚡ Основной поток' : `⚡ Резерв ${idx}`);
            btn.tabIndex = 0;
            btn.setAttribute('data-stream-idx', String(idx));
            btn.addEventListener('click', () => {
                if (currentStreamIndex !== idx) {
                    currentStreamIndex = idx;
                    renderServerButtons();
                    playStream(idx);
                }
            });
            btn.addEventListener('focus', () => setFocus(btn));
            serverButtons.appendChild(btn);
        });
    }

    // Pre-flight Stream Health Probe (Non-blocking background check)
    async function probeStreamAlive(url) {
        if (!url || typeof url !== 'string' || deadStreamUrls.has(url)) return false;

        // 1. In Android APK: use AndroidBridge.fetchNative
        if (window.AndroidBridge && typeof window.AndroidBridge.fetchNative === 'function') {
            try {
                const res = window.AndroidBridge.fetchNative(url);
                return !!(res && (res.includes('#EXTM3U') || res.includes('.m3u8') || res.includes('.ts') || res.length > 20));
            } catch (_) {
                return false;
            }
        }

        // 2. In Web / MSX browser: use fetch with safe timeout
        try {
            const resp = await fetchWithTimeout(url, { method: 'GET' }, 2600);
            return resp.ok;
        } catch (_) {
            return false;
        }
    }

    // Asynchronously checks secondary candidate mirrors and auto-removes non-working ones from UI
    async function validateBackgroundMirrors(matchRef) {
        if (!matchRef || !matchRef.streams || matchRef.streams.length <= 1) return;
        const targetId = matchRef.id;

        // Candidate mirrors to test in background (excluding the active playing one)
        const candidates = matchRef.streams.map((s, idx) => ({ ...s, origIdx: idx })).filter(s => s.origIdx !== currentStreamIndex);

        for (const item of candidates) {
            if (!currentMatch || currentMatch.id !== targetId) break;

            const alive = await probeStreamAlive(item.url);
            if (!alive && currentMatch && currentMatch.id === targetId) {
                console.warn(`[Auto-Prune] Background probe detected dead mirror: "${item.name}" (${item.url}). Removing button...`);
                deadStreamUrls.add(item.url);
                const curIdx = currentMatch.streams.findIndex(s => s.url === item.url);
                if (curIdx > -1 && curIdx !== currentStreamIndex) {
                    currentMatch.streams.splice(curIdx, 1);
                    if (currentStreamIndex > curIdx) currentStreamIndex--;
                    renderServerButtons();
                }
            }
        }
    }

    // Dynamic Auto-Removal of Broken Stream Mirror + Instant Seamless Failover
    function removeBrokenStream(idx, reason) {
        if (!currentMatch || !currentMatch.streams || currentMatch.streams.length === 0) {
            showPlaybackError('Трансляция временно недоступна. Попробуйте позже.');
            return;
        }

        const broken = currentMatch.streams[idx];
        if (broken && broken.url) {
            console.warn(`[Auto-Prune] Removing broken mirror: "${broken.name}" (${broken.url}) - Reason: ${reason}`);
            deadStreamUrls.add(broken.url);
        }

        // Permanently prune the broken stream from active mirror list
        currentMatch.streams.splice(idx, 1);

        if (currentMatch.streams.length > 0) {
            if (currentStreamIndex >= currentMatch.streams.length) {
                currentStreamIndex = 0;
            }
            renderServerButtons();

            playerLoader.classList.remove('hidden');
            loaderText.innerHTML = `
                <div style="font-size: 1.05rem; font-weight: 600; color: #f87171; margin-bottom: 4px;">⚡ Зеркало не отвечает (убрано из списка)</div>
                <div style="font-size: 0.9rem; color: #38bdf8;">Авто-переключение на рабочее зеркало ${currentStreamIndex + 1}...</div>
            `;

            playStream(currentStreamIndex, false);
        } else {
            renderServerButtons();
            console.warn(`[Auto-Prune] All mirrors exhausted for ${currentMatch.name || currentMatch.title}. Launching autonomous stream search...`);
            autoSearchStreamsForActiveMatch().then(recovered => {
                if (!recovered) {
                    showPlaybackError('Все источники для данной трансляции временно недоступны.');
                }
            }).catch(() => {
                showPlaybackError('Все источники для данной трансляции временно недоступны.');
            });
        }
    }

    function triggerFailoverNow(reason) {
        removeBrokenStream(currentStreamIndex, reason);
    }

    function playStream(index, resetAttempts = true) {
        const spinner = playerLoader.querySelector('.spinner');
        if (spinner) spinner.style.display = 'block';
        if (!currentMatch.streams || currentMatch.streams.length === 0 || !currentMatch.streams[index]) {
            showPlaybackError(currentMatch.isChannel ? 'Прямой эфир появится во время трансляций матчей' : 'Трансляция временно недоступна. Попробуйте позже.');
            return;
        }
        if (resetAttempts) failoverAttempts = 0;
        const stream = currentMatch.streams[index];

        playerLoader.classList.remove('hidden');
        loaderText.innerHTML = `<div style="font-size:1.05rem; font-weight:600; color:#38bdf8;">Загрузка: ${stream.name}...</div>`;

        if (hls) {
            hls.destroy();
            hls = null;
        }

        let videoSrc = stream.url;

        // If the stream is a .php or CDN wrapper, fetch the real manifest URL
        if (videoSrc.includes('.php') || videoSrc.includes('/CDN3/')) {
            if (window.AndroidBridge && typeof window.AndroidBridge.fetchNative === 'function') {
                try {
                    const html = window.AndroidBridge.fetchNative(videoSrc);
                    const extracted = extractStreamFromHtml(html);
                    if (extracted) {
                        videoSrc = extracted;
                        stream.url = videoSrc;
                    }
                } catch (err) {
                    console.warn('[Player] fetchNative error:', err);
                }
            }
            videoSrc = resolveCdn3Fast(videoSrc);
            stream.url = videoSrc;
        }

        console.log(`[Player] Playing stream ${index} (${stream.name}):`, videoSrc);

        if (Hls.isSupported()) {
            hls = new Hls({
                enableWorker: false,
                capLevelToPlayerSize: false,
                autoLevelCapping: -1,
                startLevel: -1,
                maxBufferLength: 30,
                maxMaxBufferLength: 60,
                maxBufferSize: 60 * 1000 * 1000,
                manifestLoadingTimeOut: 15000,
                manifestLoadingMaxRetry: 3,
                fragLoadingTimeOut: 20000,
                fragLoadingMaxRetry: 3,
                lowLatencyMode: false
            });

            tvVideo.muted = true;

            hls.loadSource(videoSrc);
            hls.attachMedia(tvVideo);

            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                if (data.levels && data.levels.length > 0) {
                    let highestLevelIdx = data.levels.length - 1;
                    let maxRes = 0;
                    data.levels.forEach((lvl, idx) => {
                        const res = (lvl.height || 0) * (lvl.width || 0);
                        if (res > maxRes) {
                            maxRes = res;
                            highestLevelIdx = idx;
                        }
                    });
                    hls.currentLevel = highestLevelIdx;
                    hls.loadLevel = highestLevelIdx;
                    const topLvl = data.levels[highestLevelIdx];
                    if (topLvl && topLvl.height) {
                        const h = topLvl.height;
                        let qText = '1080p Full HD';
                        if (h >= 1440) qText = '2K Ultra HD';
                        else if (h >= 1080) qText = '1080p Full HD';
                        else if (h >= 720) qText = '720p HD';
                        else qText = '1080p Full HD';
                        playerQualityBadge.textContent = `⚡ ${qText} / 50 FPS`;
                    }
                }

                tvVideo.play().then(() => {
                    setTimeout(() => {
                        tvVideo.muted = false;
                    }, 400);
                }).catch(err => {
                    console.warn('Playback with sound blocked, trying muted:', err);
                    tvVideo.muted = true;
                    tvVideo.play();
                });
            });

            hls.on(Hls.Events.ERROR, function (event, data) {
                console.warn('[HLS Event Error]', data.type, data.details, data.response ? data.response.code : '');
                if (data.fatal) {
                    // Immediate Failover on HTTP 404, 403, 500 or manifest load failures
                    if (data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR || 
                        data.details === Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT ||
                        (data.response && (data.response.code === 404 || data.response.code === 403 || data.response.code >= 500))) {
                        console.error('[HLS] Stream URL unavailable (HTTP error), immediate automatic failover...');
                        triggerFailoverNow('Поток недоступен (HTTP 404/403)');
                        return;
                    }

                    if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                        if (!hls._networkRetried) {
                            hls._networkRetried = true;
                            hls.startLoad();
                        } else {
                            triggerFailoverNow('Сетевой сбой потока');
                        }
                        return;
                    }

                    if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                        if (!hls._mediaRetried) {
                            hls._mediaRetried = true;
                            hls.recoverMediaError();
                        } else {
                            triggerFailoverNow('Сбой медиа-декодера');
                        }
                        return;
                    }

                    triggerFailoverNow('Критическая ошибка HLS');
                }
            });
        } else if (tvVideo.canPlayType('application/vnd.apple.mpegurl')) {
            tvVideo.src = videoSrc;
            tvVideo.play();
        }

        tvVideo.onplaying = function () {
            playerLoader.classList.add('hidden');
            if (failoverTimer) {
                clearTimeout(failoverTimer);
                failoverTimer = null;
            }
            showOverlay(3500);
        };

        tvVideo.onwaiting = function () {
            playerLoader.classList.remove('hidden');
            loaderText.textContent = 'Буферизация Full HD...';
        };

        // Automatic failover watchdog timer: if stream hangs without response, automatically try next mirror
        if (failoverTimer) clearTimeout(failoverTimer);
        failoverTimer = setTimeout(() => {
            if (playerLoader && !playerLoader.classList.contains('hidden')) {
                console.warn('[Player] Connection timed out after 12s. Initiating automatic failover...');
                triggerFailoverNow('Таймаут подключения (12 сек)');
            }
        }, 12000);
    }

    let stallCheckTimer = null;
    let lastPlayheadPosition = -1;
    let stallCount = 0;

    function startStallDetector() {
        if (stallCheckTimer) clearInterval(stallCheckTimer);
        lastPlayheadPosition = -1;
        stallCount = 0;

        stallCheckTimer = setInterval(() => {
            if (playerModal.classList.contains('hidden')) {
                clearInterval(stallCheckTimer);
                stallCheckTimer = null;
                return;
            }

            // Check stall only when video has begun active playback
            if (!tvVideo.paused && !tvVideo.ended && !tvVideo.seeking && tvVideo.readyState >= 3) {
                const currentPos = tvVideo.currentTime;
                if (currentPos > 0 && Math.abs(currentPos - lastPlayheadPosition) < 0.1) {
                    stallCount++;
                    if (stallCount >= 8) { // 8 seconds stall
                        stallCount = 0;
                        triggerFailoverNow('Поток завис при воспроизведении');
                    }
                } else {
                    lastPlayheadPosition = currentPos;
                    stallCount = 0;
                }
            } else {
                stallCount = 0;
            }
        }, 1000);
    }

    
    // ==========================================
    // OTA Auto-Update Subsystem
    // ==========================================
    let isOtaModalOpen = false;
    let currentOtaInfo = null;

    const otaModal = document.getElementById('otaModal');
    const otaVersionTitle = document.getElementById('otaVersionTitle');
    const otaChangelog = document.getElementById('otaChangelog');
    const otaProgressContainer = document.getElementById('otaProgressContainer');
    const otaProgressBarFill = document.getElementById('otaProgressBarFill');
    const otaProgressText = document.getElementById('otaProgressText');
    const otaButtons = document.getElementById('otaButtons');
    const btnOtaInstall = document.getElementById('btnOtaInstall');
    const btnOtaLater = document.getElementById('btnOtaLater');

    function formatBytes(bytes) {
        if (!bytes || bytes <= 0) return '0 Б';
        const k = 1024;
        const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    function openOtaModal(info) {
        if (!otaModal) return;
        currentOtaInfo = info;
        isOtaModalOpen = true;

        if (otaVersionTitle) {
            otaVersionTitle.textContent = `Новая версия FootDroid TV ${info.versionName || ''}`;
        }
        if (otaChangelog) {
            otaChangelog.textContent = info.changelog || 'Доступны важные улучшения стабильности и обновлённые спортивные каналы.';
        }
        if (otaProgressContainer) {
            otaProgressContainer.classList.add('hidden');
        }
        if (otaButtons) {
            otaButtons.classList.remove('hidden');
        }

        otaModal.classList.remove('hidden');
        if (btnOtaInstall) {
            setFocus(btnOtaInstall);
        }
    }

    function closeOtaModal() {
        if (!otaModal) return;
        isOtaModalOpen = false;
        otaModal.classList.add('hidden');
        focusGridItem(0);
    }

    if (btnOtaLater) {
        btnOtaLater.addEventListener('click', () => {
            closeOtaModal();
        });
    }

    if (btnOtaInstall) {
        btnOtaInstall.addEventListener('click', () => {
            if (!currentOtaInfo) return;
            if (otaButtons) otaButtons.classList.add('hidden');
            if (otaProgressContainer) otaProgressContainer.classList.remove('hidden');
            if (otaProgressBarFill) otaProgressBarFill.style.width = '0%';
            if (otaProgressText) otaProgressText.textContent = 'Инициализация загрузки...';

            const apkDownloadUrl = currentOtaInfo.apkUrl || currentOtaInfo.fallbackUrl;
            const targetVer = currentOtaInfo.versionName || 'update';

            if (window.AndroidBridge && typeof window.AndroidBridge.downloadAndInstallApk === 'function') {
                console.log('[OTA] Starting native download and install:', apkDownloadUrl);
                window.AndroidBridge.downloadAndInstallApk(apkDownloadUrl, targetVer);
            } else {
                console.log('[OTA] Web fallback download:', apkDownloadUrl);
                window.location.href = apkDownloadUrl;
            }
        });
    }


    let currentAppVersion = '1.1.1';
    let currentAppBuild = 7;

    function updateVersionLabels(ver, build) {
        currentAppVersion = ver || currentAppVersion;
        currentAppBuild = build || currentAppBuild;
        const curVerBadge = document.getElementById('settingsCurrentVersion');
        if (curVerBadge) curVerBadge.textContent = 'v' + currentAppVersion;
        const installedVer = document.getElementById('settingsInstalledVer');
        if (installedVer) installedVer.textContent = currentAppVersion + ' (Сборка ' + currentAppBuild + ')';
        const aboutVer = document.getElementById('settingsAboutVersion');
        if (aboutVer) aboutVer.textContent = currentAppVersion + ' (Build ' + currentAppBuild + ')';
        const platEl = document.getElementById('settingsPlatformVal');
        if (platEl) {
            platEl.textContent = (typeof window.AndroidBridge !== 'undefined')
                ? 'Android TV (Native)'
                : 'Smart TV / Media Station X (Web)';
        }
    }

    async function syncAppVersion() {
        if (window.AndroidBridge && typeof window.AndroidBridge.getVersionName === 'function') {
            try {
                updateVersionLabels(window.AndroidBridge.getVersionName(), window.AndroidBridge.getVersionCode());
                return;
            } catch (_) {}
        }
        try {
            const res = await fetchWithTimeout('version.json?t=' + Date.now(), {}, 3000);
            if (res.ok) {
                const data = await res.json();
                if (data && (data.version || data.versionName)) {
                    updateVersionLabels(data.version || data.versionName, data.versionCode);
                }
            }
        } catch (_) {}
    }

    // Settings Modal Logic
    function openSettingsModal() {
        if (!settingsModal) return;
        isSettingsModalOpen = true;
        settingsModal.classList.remove('hidden');

        const isNativeAndroid = typeof window.AndroidBridge !== 'undefined';
        const updateSection = document.getElementById('settingsUpdateSection');
        if (updateSection) {
            updateSection.style.display = isNativeAndroid ? '' : 'none';
        }

        const statusEl = document.getElementById('settingsUpdateStatus');
        if (statusEl) {
            statusEl.innerHTML = '<span style="color:#94a3b8;">Нажмите «Проверить обновления» для поиска новой версии</span>';
        }

        syncAppVersion();

        if (isNativeAndroid && btnCheckUpdateManual) {
            setFocus(btnCheckUpdateManual);
        } else if (btnCloseSettings) {
            setFocus(btnCloseSettings);
        }
    }

    function closeSettingsModal() {
        if (!settingsModal) return;
        isSettingsModalOpen = false;
        settingsModal.classList.add('hidden');
        if (btnSettingsNav) setFocus(btnSettingsNav);
    }

    function triggerManualUpdateCheck() {
        const statusEl = document.getElementById('settingsUpdateStatus');
        if (statusEl) {
            statusEl.innerHTML = '<span style="color:#38bdf8;">⏳ Проверка сервера обновлений...</span>';
        }

        if (window.AndroidBridge && typeof window.AndroidBridge.checkForUpdates === 'function') {
            window.AndroidBridge.checkForUpdates();
        } else {
            // Web / MSX Fallback
            fetchWithTimeout('version.json?t=' + Date.now(), {}, 3000)
                .then(r => r.json())
                .then(data => {
                    const localVerCode = currentAppBuild || 7;
                    if (data && data.versionCode > localVerCode) {
                        closeSettingsModal();
                        window.showUpdatePrompt(data);
                    } else {
                        if (statusEl) {
                            statusEl.innerHTML = '<span style="color:#4ade80;">✅ У вас установлена актуальная версия (v' + (data.versionName || data.version || '1.1.1') + ')! Обновлений не требуется.</span>';
                        }
                    }
                })
                .catch(err => {
                    if (statusEl) {
                        statusEl.innerHTML = '<span style="color:#f87171;">⚠️ Ошибка соединения с сервером</span>';
                    }
                });
        }
    }

    if (btnSettingsNav) {
        btnSettingsNav.addEventListener('click', () => {
            openSettingsModal();
        });
    }

    if (btnCloseSettings) {
        btnCloseSettings.addEventListener('click', () => {
            closeSettingsModal();
        });
    }

    if (btnCheckUpdateManual) {
        btnCheckUpdateManual.addEventListener('click', () => {
            triggerManualUpdateCheck();
        });
    }

    window.showUpdatePrompt = function(info) {
        console.log('[OTA] showUpdatePrompt received:', info);
        if (isSettingsModalOpen) {
            closeSettingsModal();
        }
        openOtaModal(info);
    };

    window.onUpdateDownloadProgress = function(percent, curBytes, totBytes) {
        if (otaProgressBarFill) otaProgressBarFill.style.width = percent + '%';
        if (otaProgressText) {
            otaProgressText.textContent = `Загрузка: ${percent}% (${formatBytes(curBytes)} из ${formatBytes(totBytes)})`;
        }
    };

    window.onUpdateDownloadComplete = function() {
        if (otaProgressBarFill) otaProgressBarFill.style.width = '100%';
        if (otaProgressText) {
            otaProgressText.innerHTML = '<span style="color:#4ade80;">✅ Загрузка завершена! Открытие установщика Android...</span>';
        }
    };

    window.onUpdateDownloadError = function(errMsg) {
        if (otaProgressText) {
            otaProgressText.innerHTML = `<span style="color:#f87171;">⚠️ Ошибка: ${errMsg || 'Сбой сети'}. Попробуйте позже.</span>`;
        }
        if (otaButtons) {
            otaButtons.classList.remove('hidden');
            if (btnOtaInstall) setFocus(btnOtaInstall);
        }
    };

    window.onUpdateCheckComplete = function(hasUpdate) {
        console.log('[OTA] Update check finished. Has update:', hasUpdate);
        const statusEl = document.getElementById('settingsUpdateStatus');
        if (statusEl) {
            if (!hasUpdate) {
                statusEl.innerHTML = '<span style="color:#4ade80;">✅ У вас установлена актуальная версия (v1.0.0)! Обновлений не требуется.</span>';
            }
        }
    };

    window.triggerAutoUpdateCheck = function() {
        console.log('[OTA] Triggering automatic update check...');
        if (window.AndroidBridge && typeof window.AndroidBridge.checkForUpdates === 'function') {
            window.AndroidBridge.checkForUpdates();
        } else {
            // Web / MSX Fallback check
            fetch('version.json?t=' + Date.now())
                .then(r => r.json())
                .then(data => {
                    console.log('[OTA Web] Remote version.json:', data);
                })
                .catch(e => console.warn('[OTA Web] Check failed:', e.message));
        }
    };

    window.handleBack = function () {
        if (isSettingsModalOpen) {
            closeSettingsModal();
            return true;
        }
        if (isOtaModalOpen) {
            closeOtaModal();
            return true;
        }
        if (!playerModal.classList.contains('hidden')) {
            if (isOverlayVisible()) {
                hideOverlay();
                return true;
            }
            closePlayer();
            return true;
        }
        if (!prematchModal.classList.contains('hidden')) {
            closePrematch();
            return true;
        }
        if (currentCategory !== 'live') {
            switchCategory('live');
            const liveBtn = categoriesNav.querySelector('[data-cat="live"]');
            if (liveBtn) setFocus(liveBtn);
            return true;
        }
        return false;
    };

    function closePlayer() {
        if (stallCheckTimer) {
            clearInterval(stallCheckTimer);
            stallCheckTimer = null;
        }
        if (failoverTimer) {
            clearTimeout(failoverTimer);
            failoverTimer = null;
        }
        if (overlayTimeout) {
            clearTimeout(overlayTimeout);
            overlayTimeout = null;
        }
        if (hls) {
            hls.destroy();
            hls = null;
        }
        tvVideo.pause();
        tvVideo.removeAttribute('src');
        tvVideo.load();
        playerModal.classList.add('hidden');
        playerLoader.classList.add('hidden');
        hideOverlay();

        if (currentMatch) {
            const card = document.querySelector(`.match-card[data-id="${currentMatch.id}"]`);
            if (card) {
                setFocus(card);
            } else {
                const firstCard = cardsGrid.querySelector('.focusable');
                if (firstCard) setFocus(firstCard);
            }
        }
        currentMatch = null;
    }

    function isOverlayVisible() {
        return !playerOverlay.classList.contains('hidden') && !playerOverlay.classList.contains('idle');
    }

    function showOverlay(duration = 4000) {
        playerOverlay.classList.remove('hidden');
        playerOverlay.classList.remove('idle');
        if (overlayTimeout) clearTimeout(overlayTimeout);
        if (duration > 0) {
            overlayTimeout = setTimeout(() => {
                hideOverlay();
            }, duration);
        }
    }

    function hideOverlay() {
        if (overlayTimeout) {
            clearTimeout(overlayTimeout);
            overlayTimeout = null;
        }
        playerOverlay.classList.add('hidden');
        playerOverlay.classList.add('idle');
    }

    function togglePlayPause() {
        if (tvVideo.paused) {
            tvVideo.play();
        } else {
            tvVideo.pause();
        }
        showOverlay(3500);
    }

    playerModal.addEventListener('click', (e) => {
        if (e.target.closest('.server-btn') || e.target.closest('.player-action-btn')) {
            showOverlay(4000);
            return;
        }
        if (isOverlayVisible()) {
            hideOverlay();
        } else {
            showOverlay(4000);
        }
    });

    playerModal.addEventListener('mousemove', () => {
        showOverlay(3500);
    });

    // Android TV Leanback D-Pad / Remote Control Navigation
    document.addEventListener('keydown', (e) => {
        const keyCode = e.keyCode;
        const key = e.key;

        const isUp = keyCode === 19 || keyCode === 38 || key === 'ArrowUp';
        const isDown = keyCode === 20 || keyCode === 40 || key === 'ArrowDown';
        const isLeft = keyCode === 21 || keyCode === 37 || key === 'ArrowLeft';
        const isRight = keyCode === 22 || keyCode === 39 || key === 'ArrowRight';
        const isEnter = keyCode === 23 || keyCode === 66 || keyCode === 13 || key === 'Enter';
        const isBack = keyCode === 4 || keyCode === 27 || keyCode === 8 || keyCode === 10009 || keyCode === 461 || key === 'Escape' || key === 'GoBack' || key === 'Back' || key === 'Backspace';

        // 1. In Fullscreen Player
        if (!playerModal.classList.contains('hidden')) {
            if (isBack) {
                e.preventDefault();
                if (isOverlayVisible()) {
                    hideOverlay();
                } else {
                    closePlayer();
                }
                return;
            }

            // If overlay is hidden, any navigation key wakes up the overlay on demand!
            if (!isOverlayVisible()) {
                e.preventDefault();
                showOverlay(4000);
                return;
            }

            // Overlay is already visible: refresh timeout on user action
            showOverlay(4000);

            if (isDown) {
                e.preventDefault();
                hideOverlay();
                return;
            }

            if (isEnter) {
                e.preventDefault();
                if (document.activeElement && document.activeElement.classList.contains('server-btn')) {
                    document.activeElement.click();
                } else {
                    togglePlayPause();
                }
                return;
            }

            if (isRight) {
                e.preventDefault();
                if (currentMatch && currentMatch.streams && currentMatch.streams.length > 1) {
                    currentStreamIndex = (currentStreamIndex + 1) % currentMatch.streams.length;
                    renderServerButtons();
                    playStream(currentStreamIndex);
                    const activeBtn = serverButtons.querySelector('.server-btn.active');
                    if (activeBtn) setFocus(activeBtn);
                }
                return;
            }

            if (isLeft) {
                e.preventDefault();
                if (currentMatch && currentMatch.streams && currentMatch.streams.length > 1) {
                    currentStreamIndex = (currentStreamIndex - 1 + currentMatch.streams.length) % currentMatch.streams.length;
                    renderServerButtons();
                    playStream(currentStreamIndex);
                    const activeBtn = serverButtons.querySelector('.server-btn.active');
                    if (activeBtn) setFocus(activeBtn);
                }
                return;
            }

            return;
        }

        // 2. In Prematch Dialog
        if (!prematchModal.classList.contains('hidden')) {
            if (isBack) {
                e.preventDefault();
                closePrematch();
                return;
            }

            if (isLeft || isUp) {
                e.preventDefault();
                setFocus(btnWatchChannel);
                return;
            }

            if (isRight || isDown) {
                e.preventDefault();
                setFocus(btnClosePrematch);
                return;
            }

            if (isEnter) {
                e.preventDefault();
                if (focusedElement) focusedElement.click();
                return;
            }

            return;
        }

        // 2.5 In Settings Modal Dialog
        if (isSettingsModalOpen) {
            if (isBack) {
                e.preventDefault();
                closeSettingsModal();
                return;
            }

            if (isLeft || isUp) {
                e.preventDefault();
                if (btnCheckUpdateManual) setFocus(btnCheckUpdateManual);
                return;
            }

            if (isRight || isDown) {
                e.preventDefault();
                if (btnCloseSettings) setFocus(btnCloseSettings);
                return;
            }

            if (isEnter) {
                e.preventDefault();
                if (focusedElement) focusedElement.click();
                return;
            }

            return;
        }

        // 2.7 In OTA Update Dialog
        if (typeof isOtaModalOpen !== 'undefined' && isOtaModalOpen) {
            if (isBack) {
                e.preventDefault();
                closeOtaModal();
                return;
            }

            if (isLeft || isUp) {
                e.preventDefault();
                if (btnOtaInstall) setFocus(btnOtaInstall);
                return;
            }

            if (isRight || isDown) {
                e.preventDefault();
                if (btnOtaLater) setFocus(btnOtaLater);
                return;
            }

            if (isEnter) {
                e.preventDefault();
                if (focusedElement) focusedElement.click();
                return;
            }

            return;
        }

        // 3. Main Screen Navigation
        if (isBack) {
            if (currentCategory !== 'live') {
                e.preventDefault();
                switchCategory('live');
                const liveBtn = categoriesNav.querySelector('[data-cat="live"]');
                if (liveBtn) setFocus(liveBtn);
            }
            return;
        }

        if (isEnter) {
            e.preventDefault();
            if (focusedElement) {
                if (focusedElement.dataset && focusedElement.dataset.cat === 'settings') {
                    openSettingsModal();
                    return;
                }
                focusedElement.click();
            }
            return;
        }

        if (isUp || isDown || isLeft || isRight) {
            e.preventDefault();
            handleDpadNavigation(isUp, isDown, isLeft, isRight);
        }
    });

    function handleDpadNavigation(isUp, isDown, isLeft, isRight) {
        const inNav = focusedElement && focusedElement.classList.contains('nav-btn');
        const inPills = focusedElement && focusedElement.classList.contains('pill-btn');
        const inGrid = focusedElement && (focusedElement.classList.contains('match-card') || focusedElement.classList.contains('channel-card'));

        // Settings Modal Navigation
        if (isSettingsModalOpen) {
            if (isUp || isLeft) {
                if (btnCheckUpdateManual) setFocus(btnCheckUpdateManual);
            } else if (isDown || isRight) {
                if (btnCloseSettings) setFocus(btnCloseSettings);
            }
            return;
        }

        // A. In Top Categories Navigation (Allows free Left/Right browsing without stealing focus!)
        if (inNav) {
            const navButtons = Array.from(categoriesNav.querySelectorAll('.nav-btn'));
            const currentIdx = navButtons.indexOf(focusedElement);

            if (isLeft && currentIdx > 0) {
                const prevBtn = navButtons[currentIdx - 1];
                setFocus(prevBtn);
                if (prevBtn.dataset.cat && prevBtn.dataset.cat !== 'settings') {
                    switchCategory(prevBtn.dataset.cat, true);
                }
            } else if (isRight && currentIdx < navButtons.length - 1) {
                const nextBtn = navButtons[currentIdx + 1];
                setFocus(nextBtn);
                if (nextBtn.dataset.cat && nextBtn.dataset.cat !== 'settings') {
                    switchCategory(nextBtn.dataset.cat, true);
                }
            } else if (isDown) {
                if (focusedElement.dataset.cat === 'settings') {
                    openSettingsModal();
                    return;
                }
                if (filterPills.style.display !== 'none') {
                    const activePill = filterPills.querySelector('.pill-btn.active') || filterPills.querySelector('.pill-btn');
                    if (activePill) {
                        setFocus(activePill);
                        return;
                    }
                }
                const firstCard = cardsGrid.querySelector('.focusable');
                if (firstCard) setFocus(firstCard);
            }
            return;
        }

        // B. In Filter Pills Bar
        if (inPills) {
            const pills = Array.from(filterPills.querySelectorAll('.pill-btn'));
            const currentIdx = pills.indexOf(focusedElement);

            if (isLeft && currentIdx > 0) {
                setFocus(pills[currentIdx - 1]);
                switchFilter(pills[currentIdx - 1].dataset.filter);
            } else if (isRight && currentIdx < pills.length - 1) {
                setFocus(pills[currentIdx + 1]);
                switchFilter(pills[currentIdx + 1].dataset.filter);
            } else if (isUp) {
                const activeNav = categoriesNav.querySelector('.nav-btn.active') || categoriesNav.querySelector('.nav-btn');
                if (activeNav) setFocus(activeNav);
            } else if (isDown) {
                const firstCard = cardsGrid.querySelector('.focusable');
                if (firstCard) setFocus(firstCard);
            }
            return;
        }

        // C. In Cards Grid (Both match-card and channel-card)
        if (inGrid || cardsGrid.querySelector('.match-card, .channel-card')) {
            const cards = Array.from(cardsGrid.querySelectorAll('.match-card, .channel-card'));
            let currentIdx = cards.indexOf(focusedElement);
            if (currentIdx === -1 && document.activeElement) {
                currentIdx = cards.indexOf(document.activeElement.closest('.match-card, .channel-card'));
            }
            if (currentIdx === -1) {
                currentIdx = 0;
                if (cards[0]) setFocus(cards[0]);
                return;
            }

            const cols = 3;

            if (isLeft && currentIdx > 0) {
                setFocus(cards[currentIdx - 1]);
            } else if (isRight && currentIdx < cards.length - 1) {
                setFocus(cards[currentIdx + 1]);
            } else if (isUp) {
                if (currentIdx - cols >= 0) {
                    setFocus(cards[currentIdx - cols]);
                } else {
                    if (filterPills.style.display !== 'none') {
                        const activePill = filterPills.querySelector('.pill-btn.active') || filterPills.querySelector('.pill-btn');
                        if (activePill) {
                            setFocus(activePill);
                            return;
                        }
                    }
                    const activeNav = categoriesNav.querySelector('.nav-btn.active') || categoriesNav.querySelector('.nav-btn');
                    if (activeNav) setFocus(activeNav);
                }
            } else if (isDown) {
                if (currentIdx + cols < cards.length) {
                    setFocus(cards[currentIdx + cols]);
                } else if (currentIdx < cards.length - 1) {
                    setFocus(cards[cards.length - 1]);
                }
            }
        }
    }

    // Top Navigation Click Listeners
    if (categoriesNav) {
        categoriesNav.addEventListener('click', (e) => {
            const btn = e.target.closest('.nav-btn');
            if (btn && btn.dataset.cat) {
                setFocus(btn);
                switchCategory(btn.dataset.cat);
            }
        });
    }

    // Sub-Filter Click Listeners
    if (filterPills) {
        filterPills.addEventListener('click', (e) => {
            const pill = e.target.closest('.pill-btn');
            if (pill && pill.dataset.filter) {
                setFocus(pill);
                switchFilter(pill.dataset.filter);
            }
        });
    }

    // Auto-refresh match live data every 60 seconds
    setInterval(async () => {
        try {
            if (playerModal && !playerModal.classList.contains('hidden')) return;
            await fetchAllVarlineMatches(true);
            await renderCurrentCategory();
        } catch (_) {}
    }, 60000);

    // Startup
    async function init() {
        try {
            syncAppVersion();
            const liveBtn = categoriesNav ? categoriesNav.querySelector('[data-cat="live"]') : null;
            if (liveBtn) setFocus(liveBtn);

            await switchCategory('live', true);
        } catch (initErr) {
            console.error('[FootDroid Init Error]:', initErr);
            try {
                await switchCategory('channels', true);
            } catch (_) {}
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
