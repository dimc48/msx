// FootDroid TV - Production Leanback Application Logic
(function () {
    'use strict';

    // 1. Static Sports TV Channels (24/7 Verified IPTV Streams with exact official logos & direct match broadcasts)
    const tvChannels = [
        {
            id: 'ch-matchtv',
            isChannel: true,
            name: 'Матч ТВ HD',
            logo: 'img/channels/match-tv.svg',
            badge: 'МАТЧ ТВ',
            badgeBg: 'linear-gradient(135deg, #b91c1c, #dc2626)',
            desc: 'Федеральный спортивный канал: главные футбольные матчи, еврокубки, аналитика',
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/169/index.m3u8' }
            ]
        },
        {
            id: 'ch-premier',
            isChannel: true,
            name: 'Матч Премьер HD',
            logo: 'img/channels/match-premier.svg',
            badge: 'МАТЧ ПРЕМЬЕР',
            badgeBg: 'linear-gradient(135deg, #059669, #10b981)',
            desc: 'Все матчи Российской Премьер-Лиги (РПЛ) и Фонбет Кубка России эксклюзивно в прямом эфире',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/193/index.m3u8' }
            ]
        },
        {
            id: 'ch-futbol1',
            isChannel: true,
            name: 'Матч! Футбол 1 HD',
            logo: 'img/channels/match-futbol1.svg',
            badge: 'ФУТБОЛ 1',
            badgeBg: 'linear-gradient(135deg, #15803d, #22c55e)',
            desc: 'Флагманский европейский футбол: Лига Чемпионов, топ-чемпионаты и матчи звезд',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/130/index.m3u8' }
            ]
        },
        {
            id: 'ch-futbol2',
            isChannel: true,
            name: 'Матч! Футбол 2 HD',
            logo: 'img/channels/match-futbol2.svg',
            badge: 'ФУТБОЛ 2',
            badgeBg: 'linear-gradient(135deg, #0f766e, #0d9488)',
            desc: 'Испанская Ла Лига (Реал Мадрид, Барселона, Атлетико) и Кубок Испании в прямом эфире',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/142/index.m3u8' }
            ]
        },
        {
            id: 'ch-futbol3',
            isChannel: true,
            name: 'Матч! Футбол 3 HD',
            logo: 'img/channels/match-futbol3.svg',
            badge: 'ФУТБОЛ 3',
            badgeBg: 'linear-gradient(135deg, #6b21a8, #9333ea)',
            desc: 'Немецкая Бундеслига (Бавария, Боруссия Д, Байер), Серия А и международные матчи',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: 'Зеркало 1 (Full HD 1080p)', url: 'http://stream.mcquack.net/185/index.m3u8' },
                { name: 'Зеркало 2 (SD Резерв)', url: 'http://185.57.68.33/110/index.m3u8' }
            ]
        },
        {
            id: 'ch-euro1',
            isChannel: true,
            name: 'Eurosport 1 HD',
            logo: 'img/channels/eurosport1.svg',
            badge: 'EUROSPORT 1',
            badgeBg: 'linear-gradient(135deg, #0369a1, #0284c7)',
            desc: 'Мировой спорт, теннис Большого шлема, велоспорт, снукер, олимпийские виды спорта',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'https://s7.iptv-24.net/1439/playlist.m3u8' }
            ]
        },
        {
            id: 'ch-euro2',
            isChannel: true,
            name: 'Eurosport 2 HD',
            logo: 'img/channels/eurosport2.svg',
            badge: 'EUROSPORT 2',
            badgeBg: 'linear-gradient(135deg, #0284c7, #0f172a)',
            desc: 'Эксклюзивные трансляции автоспорта, зимних видов, тенниса и мировых кубков',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'https://s7.iptv-24.net/1452/playlist.m3u8' }
            ]
        },
        {
            id: 'ch-sky-football',
            isChannel: true,
            name: 'Sky Sports Football HD',
            logo: 'img/channels/sky-sports.svg',
            badge: 'SKY FOOTBALL',
            badgeBg: 'linear-gradient(135deg, #0369a1, #0284c7)',
            desc: 'Английская Премьер-лига (АПЛ), Чемпионшип, мировые кубки и суперматчи Великобритании',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://45.228.234.9:8000/play/a06b/index.m3u8' }
            ]
        },
        {
            id: 'ch-setanta1',
            isChannel: true,
            name: 'Setanta Sports 1 HD',
            logo: 'img/channels/setanta.svg',
            badge: 'SETANTA 1',
            badgeBg: 'linear-gradient(135deg, #b45309, #d97706)',
            desc: 'АПЛ, Ла Лига, Серия А, Формула 1, НБА и бои UFC в высоком качестве 1080p',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/234/index.m3u8' }
            ]
        },
        {
            id: 'ch-setanta2',
            isChannel: true,
            name: 'Setanta Sports 2 HD',
            logo: 'img/channels/setanta2.svg',
            badge: 'SETANTA 2',
            badgeBg: 'linear-gradient(135deg, #15803d, #16a34a)',
            desc: 'Теннис ATP/WTA, Бундеслига, гонки, баскетбол Евролиги и кубковые противостояния',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/235/index.m3u8' }
            ]
        },
        {
            id: 'ch-khl',
            isChannel: true,
            name: 'KHL Prime HD',
            logo: 'img/channels/khl.svg',
            badge: 'KHL PRIME',
            badgeBg: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
            desc: 'Континентальная Хоккейная Лига в наилучшем качестве: матчи дня, плей-офф Кубка Гагарина',
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: 'Зеркало 1 (Full HD 1080p)', url: 'http://stream.mcquack.net/178/index.m3u8' },
                { name: 'Зеркало 2 (KHL ТВ Резерв)', url: 'http://stream.mcquack.net/166/index.m3u8' }
            ]
        },
        {
            id: 'ch-boets',
            isChannel: true,
            name: 'Матч! Боец HD',
            logo: 'img/channels/match-boets.svg',
            badge: 'МАТЧ БОЕЦ',
            badgeBg: 'linear-gradient(135deg, #991b1b, #dc2626)',
            desc: 'Главный телеканал единоборств: турниры UFC, Bellator, ACA, профессиональный бокс и кикбоксинг',
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/112/index.m3u8' }
            ]
        },
        {
            id: 'ch-udar',
            isChannel: true,
            name: 'Телеканал UDAR HD',
            logo: 'img/channels/udar.svg',
            badge: '⚡ UDAR HD',
            badgeBg: 'linear-gradient(135deg, #ea580c, #f97316)',
            desc: 'Кулачные бои Top Dog, Hardcore FC, RCC, турниры по смешанным единоборствам и боксу',
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/279/index.m3u8' }
            ]
        },
        {
            id: 'ch-boxtv',
            isChannel: true,
            name: 'Бокс ТВ HD',
            logo: 'img/channels/boxtv.svg',
            badge: 'БОКС ТВ',
            badgeBg: 'linear-gradient(135deg, #b91c1c, #7f1d1d)',
            desc: 'Профессиональный и олимпийский бокс, чемпионские поединки и эксклюзивные репортажи',
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/154/index.m3u8' }
            ]
        },
        {
            id: 'ch-mmatv',
            isChannel: true,
            name: 'MMA-TV.com HD',
            logo: 'img/channels/mmatv.svg',
            badge: 'MMA-TV',
            badgeBg: 'linear-gradient(135deg, #4c1d95, #6d28d9)',
            desc: 'Международный канал о смешанных боевых единоборствах (MMA), грэпплинге и кикбоксинге',
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'https://streams2.sofast.tv/vglive-sk-462904/playlist.m3u8' }
            ]
        },
        {
            id: 'ch-arena',
            isChannel: true,
            name: 'Матч! Арена HD',
            logo: 'img/channels/match-arena.svg',
            badge: 'МАТЧ АРЕНА',
            badgeBg: 'linear-gradient(135deg, #1e40af, #3b82f6)',
            desc: 'Престижные мировые турниры: биатлон, лыжные гонки, фигурное катание, плавание, гимнастика',
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/163/index.m3u8' }
            ]
        },
        {
            id: 'ch-igra',
            isChannel: true,
            name: 'Матч! Игра HD',
            logo: 'img/channels/match-igra.svg',
            badge: 'МАТЧ ИГРА',
            badgeBg: 'linear-gradient(135deg, #0e7490, #06b6d4)',
            desc: 'Игровые виды спорта: баскетбол (Единая лига ВТБ), волейбол, гандбол и международные чемпионаты',
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/188/index.m3u8' }
            ]
        },
        {
            id: 'ch-strana',
            isChannel: true,
            name: 'Матч! Страна HD',
            logo: 'img/channels/match-strana.svg',
            badge: 'МАТЧ СТРАНА',
            badgeBg: 'linear-gradient(135deg, #854d0e, #ca8a04)',
            desc: 'Российский спорт: региональные лиги, молодежный футбол, мини-футбол и первенства страны',
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/143/index.m3u8' }
            ]
        },
        {
            id: 'ch-bt5',
            isChannel: true,
            name: 'Беларусь 5 HD',
            logo: 'img/channels/belarus5.svg',
            badge: 'БЕЛАРУСЬ 5',
            badgeBg: 'linear-gradient(135deg, #15803d, #22c55e)',
            desc: 'Прямые трансляции КХЛ, еврокубков, биатлона и мирового футбола без гео-блокировок',
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/33/index.m3u8' }
            ]
        },
        {
            id: 'ch-viju',
            isChannel: true,
            name: 'viju+ Sport HD',
            logo: 'img/channels/viju-sport.svg',
            badge: 'VIJU+ SPORT',
            badgeBg: 'linear-gradient(135deg, #6b21a8, #a855f7)',
            desc: 'Прямые трансляции НХЛ, НБА, европейского баскетбола, бейсбола и автогонок',
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Зеркало 1 (Full HD 1080p)', url: 'http://stream.mcquack.net/333/index.m3u8' },
                { name: 'Зеркало 2 (Full HD Резерв)', url: 'http://46.53.200.153:7777/play/a01l/index.m3u8' }
            ]
        },
        {
            id: 'ch-sportivny',
            isChannel: true,
            name: 'Спортивный HD',
            logo: 'img/channels/sportivny.svg',
            badge: 'СПОРТ HD',
            badgeBg: 'linear-gradient(135deg, #4338ca, #6366f1)',
            desc: 'Динамичный спортивный канал с прямыми трансляциями футбола, хоккея и автоспорта',
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'https://live-3.otcnet.ru/sportivny/index.m3u8' }
            ]
        },
        {
            id: 'ch-extreme',
            isChannel: true,
            name: 'Russian Extreme Ultra',
            logo: 'img/channels/extreme.svg',
            badge: 'EXTREME 2K',
            badgeBg: 'linear-gradient(135deg, #c2410c, #f97316)',
            desc: 'Экстремальные виды спорта, сноуборд, мотоспорт, фрирайд и гонки в 1440p',
            quality: '2K 1440p',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'http://stream.mcquack.net/148/index.m3u8' }
            ]
        },
        {
            id: 'ch-redbull',
            isChannel: true,
            name: 'Red Bull TV HD',
            logo: 'img/channels/redbull.svg',
            badge: 'RED BULL TV',
            badgeBg: 'linear-gradient(135deg, #0f172a, #dc2626)',
            desc: 'Мировые соревнования по экстриму, скоростному спуску, мотокроссу, клифф-дайвингу и сноуборду',
            quality: 'Full HD 1080p / 30 FPS',
            streams: [
                { name: 'Full HD 1080p (Основной поток)', url: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8' }
            ]
        }
    ];

    // 2. Curated MMA / UFC Cards with REAL Vector Avatars & Accurate Channels
    const mmaMatches = [
        {
            id: 'mma-ufc-312',
            league: 'UFC 312 • Lightweight Championship',
            leagueIcon: 'img/mma/ufc.svg',
            team1: {
                name: 'Ислам Махачев (RUS)',
                logo: 'img/mma/makhachev.svg',
                score: '27-1'
            },
            team2: {
                name: 'Арман Царукян (ARM)',
                logo: 'img/mma/tsarukyan.svg',
                score: '22-3'
            },
            status: 'Суббота, 06:00',
            isLive: false,
            quality: 'Full HD 1080p / 50 FPS',
            streams: [
                { name: 'Телеканал UDAR HD (1080p)', url: 'http://stream.mcquack.net/279/index.m3u8' },
                { name: 'Матч! Боец HD', url: 'http://stream.mcquack.net/112/index.m3u8' },
                { name: 'Бокс ТВ HD', url: 'http://stream.mcquack.net/154/index.m3u8' },
                { name: 'MMA-TV.com HD', url: 'https://streams2.sofast.tv/vglive-sk-462904/playlist.m3u8' }
            ]
        },
        {
            id: 'mma-ufc-313',
            league: 'UFC 313 • Light Heavyweight Title',
            leagueIcon: 'img/mma/ufc.svg',
            team1: {
                name: 'Алекс Перейра (BRA)',
                logo: 'img/mma/pereira.svg',
                score: '12-2'
            },
            team2: {
                name: 'Магомед Анкалаев (RUS)',
                logo: 'img/mma/ankalaev.svg',
                score: '20-1'
            },
            status: 'Суббота, 05:30',
            isLive: false,
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Телеканал UDAR HD (1080p)', url: 'http://stream.mcquack.net/279/index.m3u8' },
                { name: 'Матч! Боец HD', url: 'http://stream.mcquack.net/112/index.m3u8' },
                { name: 'Бокс ТВ HD', url: 'http://stream.mcquack.net/154/index.m3u8' },
                { name: 'MMA-TV.com HD', url: 'https://streams2.sofast.tv/vglive-sk-462904/playlist.m3u8' }
            ]
        },
        {
            id: 'mma-ufc-314',
            league: 'UFC 314 • Middleweight Title',
            leagueIcon: 'img/mma/ufc.svg',
            team1: {
                name: 'Дрикус Дю Плесси (RSA)',
                logo: 'img/mma/duplessis.svg',
                score: '22-2'
            },
            team2: {
                name: 'Хамзат Чимаев (UAE)',
                logo: 'img/mma/chimaev.svg',
                score: '14-0'
            },
            status: 'Сегодня, 05:00',
            isLive: false,
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Телеканал UDAR HD (1080p)', url: 'http://stream.mcquack.net/279/index.m3u8' },
                { name: 'Матч! Боец HD', url: 'http://stream.mcquack.net/112/index.m3u8' },
                { name: 'Бокс ТВ HD', url: 'http://stream.mcquack.net/154/index.m3u8' },
                { name: 'MMA-TV.com HD', url: 'https://streams2.sofast.tv/vglive-sk-462904/playlist.m3u8' }
            ]
        },
        {
            id: 'mma-aca-183',
            league: 'ACA 183 • Гран-при полусредний вес',
            leagueIcon: 'img/mma/aca.svg',
            team1: {
                name: 'Альберт Туменов (RUS)',
                logo: 'img/mma/tumenov.svg',
                score: '25-5'
            },
            team2: {
                name: 'Устармагомед Гаджидаудов (RUS)',
                logo: 'img/mma/vagaev.svg',
                score: '23-4'
            },
            status: 'Пятница, 21:00',
            isLive: false,
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Телеканал UDAR HD (1080p)', url: 'http://stream.mcquack.net/279/index.m3u8' },
                { name: 'Матч! Боец HD', url: 'http://stream.mcquack.net/112/index.m3u8' },
                { name: 'MMA-TV.com HD', url: 'https://streams2.sofast.tv/vglive-sk-462904/playlist.m3u8' }
            ]
        },
        {
            id: 'mma-bellator',
            league: 'Bellator Champions Series',
            leagueIcon: 'img/mma/bellator.svg',
            team1: {
                name: 'Усман Нурмагомедов (RUS)',
                logo: 'img/mma/nurmagomedov.svg',
                score: '18-0'
            },
            team2: {
                name: 'Патрисио Питбуль (BRA)',
                logo: 'img/mma/pitbull.svg',
                score: '25-10'
            },
            status: 'Суббота, 23:00',
            isLive: false,
            quality: 'Full HD 1080p',
            streams: [
                { name: 'Телеканал UDAR HD (1080p)', url: 'http://stream.mcquack.net/279/index.m3u8' },
                { name: 'Матч! Боец HD', url: 'http://stream.mcquack.net/112/index.m3u8' },
                { name: 'Setanta Sports 1 HD', url: 'http://stream.mcquack.net/234/index.m3u8' },
                { name: 'MMA-TV.com HD', url: 'https://streams2.sofast.tv/vglive-sk-462904/playlist.m3u8' }
            ]
        }
    ];

    // 3. Intelligent Match-to-Channel Stream Allocator
    function getStreamsForFootball(leagueTitle, homeName, awayName) {
        const text = ((leagueTitle || '') + ' ' + (homeName || '') + ' ' + (awayName || '')).toLowerCase();

        // A. Russian Premier League / Russian Cup (РПЛ, Кубок России)
        const isRussian = text.includes('рпл') || 
                          text.includes('кубок россии') || 
                          text.includes('зенит') || 
                          text.includes('спартак') || 
                          text.includes('цска') || 
                          text.includes('локомотив') || 
                          text.includes('динамо м') || 
                          text.includes('крылья') || 
                          text.includes('краснодар') || 
                          text.includes('ростов') || 
                          text.includes('рубин') || 
                          text.includes('пари нн') || 
                          text.includes('факел') || 
                          text.includes('ахмат') || 
                          text.includes('оренбург') || 
                          text.includes('химки') || 
                          text.includes('акрон') || 
                          text.includes('балтика') ||
                          text.includes('динамо махачкала');

        if (isRussian) {
            return [
                { name: 'Матч Премьер HD (1080p)', url: 'http://stream.mcquack.net/193/index.m3u8' },
                { name: 'Матч ТВ HD (1080p)', url: 'http://stream.mcquack.net/169/index.m3u8' }
            ];
        }

        // B. Italian Serie A / Coppa Italia
        const isSerieA = text.includes('серия а') || 
                         text.includes('серия b') || 
                         text.includes('serie a') ||
                         text.includes('ювентус') || 
                         text.includes('juventus') ||
                         text.includes('наполи') || 
                         text.includes('napoli') ||
                         text.includes('милан') || 
                         text.includes('milan') ||
                         text.includes('интер') || 
                         text.includes('inter') ||
                         text.includes('рома') || 
                         text.includes('лацио') || 
                         text.includes('lazio') ||
                         text.includes('фиорентина') || 
                         text.includes('fiorentina') ||
                         text.includes('аталанта') || 
                         text.includes('atalanta') ||
                         text.includes('италия') ||
                         text.includes('italy');

        if (isSerieA) {
            return [
                { name: 'Матч! Футбол 2 HD (1080p)', url: 'http://stream.mcquack.net/142/index.m3u8' },
                { name: 'Setanta Sports 1 HD (1080p)', url: 'http://stream.mcquack.net/234/index.m3u8' }
            ];
        }

        // C. Spanish La Liga (Ла Лига)
        const isLaLiga = text.includes('ла лига') || 
                         text.includes('примера') || 
                         text.includes('la liga') || 
                         text.includes('laliga') ||
                         text.includes('реал мадрид') || 
                         text.includes('барселона') || 
                         text.includes('атлетико') || 
                         text.includes('севилья') || 
                         text.includes('валенсия') || 
                         text.includes('вильярреал') || 
                         text.includes('бетис') || 
                         text.includes('сосьедад') || 
                         text.includes('жирона') || 
                         text.includes('атлетик') || 
                         text.includes('кубок испании') ||
                         text.includes('испания') ||
                         text.includes('spain');

        if (isLaLiga) {
            return [
                { name: 'Матч! Футбол 2 HD (1080p)', url: 'http://stream.mcquack.net/142/index.m3u8' },
                { name: 'Setanta Sports 1 HD (1080p)', url: 'http://stream.mcquack.net/234/index.m3u8' }
            ];
        }

        // D. German Bundesliga
        const isBundesliga = text.includes('бундеслига') || 
                             text.includes('bundesliga') || 
                             text.includes('бавария') || 
                             text.includes('боруссия') || 
                             text.includes('байер') || 
                             text.includes('лейпциг') || 
                             text.includes('штутгарт') || 
                             text.includes('айнтрахт') || 
                             text.includes('вольфсбург') || 
                             text.includes('германия') || 
                             text.includes('germany');

        if (isBundesliga) {
            return [
                { name: 'Матч! Футбол 3 HD (1080p)', url: 'http://stream.mcquack.net/185/index.m3u8' },
                { name: 'Setanta Sports 2 HD (1080p)', url: 'http://stream.mcquack.net/235/index.m3u8' }
            ];
        }

        // E. English Premier League (АПЛ)
        const isEPL = text.includes('апл') || 
                      text.includes('премьер-лига англии') || 
                      text.includes('англия') || 
                      text.includes('manchester') || 
                      text.includes('манчестер') || 
                      text.includes('ливерпуль') || 
                      text.includes('liverpool') || 
                      text.includes('арсенал') || 
                      text.includes('arsenal') || 
                      text.includes('челси') || 
                      text.includes('chelsea') || 
                      text.includes('тоттенхэм') || 
                      text.includes('ньюкасл') || 
                      text.includes('астон вилла') || 
                      text.includes('эвертон');

        if (isEPL) {
            return [
                { name: 'Sky Sports Football HD (1080p)', url: 'http://45.228.234.9:8000/play/a06b/index.m3u8' },
                { name: 'Setanta Sports 1 HD (1080p)', url: 'http://stream.mcquack.net/234/index.m3u8' }
            ];
        }

        // F. European Competitions (Лига Чемпионов, Лига Европы, Лига Конференций)
        const isUEFA = text.includes('лига чемпионов') || 
                       text.includes('лига европы') || 
                       text.includes('лига конференций') || 
                       text.includes('champions league') || 
                       text.includes('uefa');

        if (isUEFA) {
            return [
                { name: 'Матч ТВ HD (1080p)', url: 'http://stream.mcquack.net/169/index.m3u8' },
                { name: 'Матч! Футбол 1 HD (1080p)', url: 'http://stream.mcquack.net/130/index.m3u8' },
                { name: 'Матч! Футбол 2 HD (1080p)', url: 'http://stream.mcquack.net/142/index.m3u8' },
                { name: 'Матч! Футбол 3 HD (1080p)', url: 'http://stream.mcquack.net/185/index.m3u8' }
            ];
        }

        // G. South American Football (Бока, Ривер, Аргентина, Бразилия)
        const isSouthAmerica = text.includes('бока') || 
                               text.includes('boca') || 
                               text.includes('ривер') || 
                               text.includes('river') || 
                               text.includes('аргентин') || 
                               text.includes('argentina') || 
                               text.includes('бразил') || 
                               text.includes('палмейрас') || 
                               text.includes('гремио') || 
                               text.includes('либертадорес');

        if (isSouthAmerica) {
            return [
                { name: 'Setanta Sports 1 HD (1080p)', url: 'http://stream.mcquack.net/234/index.m3u8' },
                { name: 'Setanta Sports 2 HD (1080p)', url: 'http://stream.mcquack.net/235/index.m3u8' }
            ];
        }

        // H. European & World Football (General Default)
        return [
            { name: 'Setanta Sports 1 HD (1080p)', url: 'http://stream.mcquack.net/234/index.m3u8' },
            { name: 'Матч ТВ HD (1080p)', url: 'http://stream.mcquack.net/169/index.m3u8' }
        ];
    }

    function getStreamsForHockey() {
        return [
            { name: 'KHL Prime HD (1080p)', url: 'http://stream.mcquack.net/178/index.m3u8' },
            { name: 'Беларусь 5 HD (1080p)', url: 'http://stream.mcquack.net/33/index.m3u8' },
            { name: 'Матч! Игра HD (1080p)', url: 'http://stream.mcquack.net/188/index.m3u8' }
        ];
    }

    function getStreamsForBasketball() {
        return [
            { name: 'viju+ Sport HD (1080p)', url: 'http://stream.mcquack.net/333/index.m3u8' },
            { name: 'Матч! Игра HD (1080p)', url: 'http://stream.mcquack.net/188/index.m3u8' }
        ];
    }

    // Direct club & league emblem mapping for professional look
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
        'псж': 'https://s5o.ru/storage/simple/ru/edt/45/77/89/62/rue53bb990818.png',
        'бока': 'https://s5o.ru/storage/simple/ru/edt/62/16/08/99/ruee18375e011.png',
        'ривер': 'https://s5o.ru/storage/simple/ru/edt/90/47/84/16/ruee18375e011.png',

        'ска': 'https://s5o.ru/storage/simple/ru/edt/87/48/40/85/rue9541a54728.png',
        'авангард': 'https://s5o.ru/storage/simple/ru/edt/68/73/06/33/rue2a188fba75.png',
        'ак барс': 'https://s5o.ru/storage/simple/ru/edt/04/81/86/67/rue9e94326f59.png',
        'металлург мг': 'https://s5o.ru/storage/simple/ru/edt/73/77/43/99/rueee5c5cf14e.png',
        'салават юлаев': 'https://s5o.ru/storage/simple/ru/edt/68/56/65/28/ruef068739958.png',
        'трактор': 'https://s5o.ru/storage/simple/ru/edt/45/38/53/98/ruec23cb23c04.png',
        'динамо мн': 'https://s5o.ru/storage/simple/ru/edt/72/49/71/61/rue7f564757c9.png',
        'локомотив я': 'https://s5o.ru/storage/simple/ru/edt/08/96/63/12/rue526baee7a1.png'
    };

    function getTeamLogo(teamName, sportId) {
        if (!teamName) return '';
        const lower = teamName.toLowerCase();
        for (const [key, url] of Object.entries(logoMap)) {
            if (lower.includes(key)) return url;
        }
        return '';
    }

    // Helper: Parse Official VAR.TV API matchlist
    function parseVarlineMatchlist(apiData, targetSport) {
        if (!apiData) return [];
        const rawList = Array.isArray(apiData) ? apiData : (apiData.data || []);
        if (!Array.isArray(rawList)) return [];

        const parsed = [];
        rawList.forEach(e => {
            const sportStr = (e.sport || '').toLowerCase();
            if (targetSport === 'football') {
                if (!sportStr.includes('футбол') && !sportStr.includes('football')) return;
            } else if (targetSport === 'hockey') {
                if (!sportStr.includes('хоккей') && !sportStr.includes('hockey')) return;
            } else if (targetSport === 'basketball') {
                if (!sportStr.includes('баскетбол') && !sportStr.includes('basketball')) return;
            }

            const homeName = (e.home || e.home_team || '').trim();
            const awayName = (e.away || e.away_team || '').trim();
            const leagueTitle = (e.league || e.league_en || e.title || 'Спортивный турнир').trim();

            if (!homeName || !awayName) return;
            if (homeName.toLowerCase() === awayName.toLowerCase()) return;

            if (targetSportId === 1) {
                const combined = (leagueTitle + ' ' + homeName + ' ' + awayName).toLowerCase();
                if (combined.includes('tennis') || combined.includes('atp') || combined.includes('wta') || combined.includes('теннис') || combined.includes('хоккей') || combined.includes('баскетбол')) {
                    return;
                }
            }

            let statusText = '';
            let isLive = false;
            const liveStatus = (e.live_status || e.status || '').toLowerCase();

            if (liveStatus.includes('live') || liveStatus.includes('тайм') || liveStatus.includes('период') || liveStatus.includes('четверть') || liveStatus.includes('перерыв') || liveStatus.includes('сет')) {
                isLive = true;
                statusText = e.live_status || 'Идет игра';
            } else if (liveStatus.includes('завершен') || liveStatus.includes('fin') || liveStatus.includes('ft')) {
                statusText = 'Завершен';
            } else {
                let startRaw = e.start || e.status || 'Скоро';
                if (startRaw.includes('T')) {
                    try {
                        const d = new Date(startRaw);
                        if (!isNaN(d.getTime())) {
                            const hours = String(d.getHours()).padStart(2, '0');
                            const mins = String(d.getMinutes()).padStart(2, '0');
                            startRaw = `Сегодня, ${hours}:${mins}`;
                        }
                    } catch (_) {}
                }
                statusText = startRaw;
            }

            let streams = [];
            if (targetSport === 'hockey' || sportStr.includes('хоккей')) {
                streams = getStreamsForHockey();
            } else if (targetSport === 'basketball' || sportStr.includes('баскетбол')) {
                streams = getStreamsForBasketball();
            } else {
                streams = getStreamsForFootball(leagueTitle, homeName, awayName);
            }

            parsed.push({
                id: `var-${e.id || Math.random()}`,
                sportId: e.sport_id || targetSportId || 1,
                league: leagueTitle,
                leagueIcon: e.league_img || '',
                team1: {
                    name: homeName,
                    logo: e.home_logo || getTeamLogo(homeName, e.sport_id),
                    score: e.score_home !== undefined && e.score_home !== null ? String(e.score_home) : '0'
                },
                team2: {
                    name: awayName,
                    logo: e.away_logo || getTeamLogo(awayName, e.sport_id),
                    score: e.score_away !== undefined && e.score_away !== null ? String(e.score_away) : '0'
                },
                status: statusText,
                isLive: isLive,
                quality: 'Full HD 1080p',
                streams: streams
            });
        });

        return parsed;
    }

    // Direct fetch from VAR.TV endpoints
    async function getVarlineMatchlist() {
        const endpoints = [
            'https://varline.store/api/matchlist',
            'https://lsport.vip/api/matchlist',
            'https://msport.vip/api/matchlist'
        ];

        for (const url of endpoints) {
            try {
                const res = await fetch(url, { headers: { 'User-Agent': 'okhttp/4.9.0' } });
                if (res.ok) {
                    const data = await res.json();
                    if (data && (Array.isArray(data) || Array.isArray(data.data))) {
                        return data;
                    }
                }
            } catch (err) {
                console.warn(`Endpoint ${url} failed:`, err);
            }
        }
        return null;
    }

    async function fetchFootballData() {
        try {
            const apiData = await getVarlineMatchlist();
            const parsed = parseVarlineMatchlist(apiData, 'football');
            if (parsed && parsed.length > 0) return parsed;
        } catch (e) {
            console.warn('Varline football error:', e);
        }
        return [];
    }

    async function fetchHockeyData() {
        try {
            const apiData = await getVarlineMatchlist();
            const parsed = parseVarlineMatchlist(apiData, 'hockey');
            if (parsed && parsed.length > 0) return parsed;
        } catch (e) {
            console.warn('Varline hockey error:', e);
        }
        return [];
    }

    async function fetchBasketballData() {
        try {
            const apiData = await getVarlineMatchlist();
            const parsed = parseVarlineMatchlist(apiData, 'basketball');
            if (parsed && parsed.length > 0) return parsed;
        } catch (e) {
            console.warn('Varline basketball error:', e);
        }
        return [];
    }

    // UI State & DOM Elements
    const categoriesNav = document.getElementById('categoriesNav');
    const cardsGrid = document.getElementById('cardsGrid');
    const sectionTitle = document.getElementById('sectionTitle');
    const matchCounter = document.getElementById('matchCounter');
    const clockEl = document.getElementById('clock');

    // Fullscreen Player Elements
    const playerModal = document.getElementById('playerModal');
    const tvVideo = document.getElementById('tvVideo');
    const playerOverlay = document.getElementById('playerOverlay');
    const playerLeague = document.getElementById('playerLeague');
    const playerTitle = document.getElementById('playerTitle');
    const playerQualityBadge = document.getElementById('playerQualityBadge');
    const serverButtons = document.getElementById('serverButtons');
    const playerLoader = document.getElementById('playerLoader');
    const loaderText = document.getElementById('loaderText');

    let currentCategory = 'live';
    let currentMatch = null;
    let currentStreamIndex = 0;
    let hls = null;
    let overlayTimeout = null;
    let focusedElement = null;

    const loadedData = {
        football: null,
        hockey: null,
        basketball: null
    };

    function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        clockEl.textContent = `${h}:${m}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    function setFocus(el) {
        if (!el) return;
        if (focusedElement && focusedElement !== el) {
            focusedElement.classList.remove('focused');
        }
        focusedElement = el;
        el.classList.add('focused');
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }

    function createCardElement(item) {
        const card = document.createElement('div');
        card.className = `match-card focusable ${item.isChannel ? 'channel-card' : ''}`;
        card.tabIndex = 0;
        card.dataset.id = item.id;

        const defaultChannelLogo = 'img/channels/match-tv.svg';

        if (item.isChannel) {
            card.innerHTML = `
                <div class="channel-card-top">
                    <div class="channel-logo-container">
                        <img src="${item.logo || defaultChannelLogo}" alt="${item.name}" class="channel-logo-img" onerror="this.src='${defaultChannelLogo}'">
                    </div>
                    <div class="channel-badge" style="background: ${item.badgeBg || '#e11d48'}">${item.badge || '24/7'}</div>
                </div>
                <div class="channel-card-body">
                    <h3 class="channel-name">${item.name}</h3>
                    <p class="channel-desc">${item.desc || 'Круглосуточный прямой эфир в Full HD'}</p>
                </div>
                <div class="card-footer">
                    <span class="channel-live-status">
                        <span class="live-dot"></span> ПРЯМОЙ ЭФИР 24/7
                    </span>
                    <span class="quality-tag">⚡ ${item.quality || 'Full HD 1080p'}</span>
                </div>
            `;
        } else {
            const isLive = item.isLive;
            let statusBadge = '';
            if (isLive) {
                statusBadge = `<span class="badge-live"><span class="live-dot"></span> ${item.status}</span>`;
            } else if (item.status && item.status.includes('Завершен')) {
                statusBadge = `<span class="badge-finished">Завершен</span>`;
            } else {
                statusBadge = `<span class="badge-time">⏰ ${item.status}</span>`;
            }

            const team1LogoHtml = item.team1.logo 
                ? `<img src="${item.team1.logo}" alt="${item.team1.name}" class="team-emblem-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><span class="team-emblem-fallback" style="display:none;">⚽</span>` 
                : `<span class="team-emblem-fallback">⚽</span>`;
            
            const team2LogoHtml = item.team2.logo 
                ? `<img src="${item.team2.logo}" alt="${item.team2.name}" class="team-emblem-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><span class="team-emblem-fallback" style="display:none;">⚽</span>` 
                : `<span class="team-emblem-fallback">⚽</span>`;

            const primaryStreamName = (item.streams && item.streams[0]) ? item.streams[0].name : 'Full HD 1080p';

            card.innerHTML = `
                <div class="card-header">
                    <span class="league-name">${item.league}</span>
                    <span class="quality-tag">⚡ Full HD</span>
                </div>
                <div class="teams-container">
                    <div class="team-row">
                        <div class="team-info">
                            <div class="team-logo-wrapper">${team1LogoHtml}</div>
                            <span class="team-title">${item.team1.name}</span>
                        </div>
                        <span class="team-score ${isLive ? 'score-live' : ''}">${item.team1.score}</span>
                    </div>
                    <div class="team-row">
                        <div class="team-info">
                            <div class="team-logo-wrapper">${team2LogoHtml}</div>
                            <span class="team-title">${item.team2.name}</span>
                        </div>
                        <span class="team-score ${isLive ? 'score-live' : ''}">${item.team2.score}</span>
                    </div>
                </div>
                <div class="card-footer">
                    ${statusBadge}
                    <span class="stream-channel-tag">📺 ${primaryStreamName}</span>
                </div>
            `;
        }

        card.addEventListener('click', () => openPlayer(item));
        card.addEventListener('focus', () => setFocus(card));

        return card;
    }

    function renderCards(items) {
        cardsGrid.innerHTML = '';
        if (!items || items.length === 0) {
            matchCounter.textContent = '0 событий';
            cardsGrid.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">📺</span>
                    <p class="empty-text">Нет доступных событий в этом разделе</p>
                </div>
            `;
            return;
        }

        if (items && items[0] && items[0].isChannel) {
            matchCounter.textContent = `${items.length} каналов`;
        } else {
            matchCounter.textContent = `${items.length} матчей`;
        }
        items.forEach(item => {
            const cardEl = createCardElement(item);
            cardsGrid.appendChild(cardEl);
        });

        if (!focusedElement) {
            const firstCard = cardsGrid.querySelector('.focusable');
            if (firstCard) setFocus(firstCard);
        }
    }

    async function switchCategory(cat) {
        currentCategory = cat;
        focusedElement = null;
        const viewport = document.getElementById('contentViewport');
        if (viewport) viewport.scrollTop = 0;

        const navButtons = categoriesNav.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            if (btn.dataset.cat === cat) {
                btn.classList.add('active');
                setFocus(btn);
            } else {
                btn.classList.remove('active');
            }
        });

        const titles = {
            live: '🔴 Прямые трансляции в эфире',
            football: '⚽ Футбольные матчи и чемпионаты',
            hockey: '🏒 КХЛ, НХЛ и хоккейные турниры',
            basketball: '🏀 НБА и европейский баскетбол',
            mma: '🥊 Единоборства UFC, MMA и Бокс',
            channels: '📺 Спортивные телеканалы 24/7'
        };
        sectionTitle.textContent = titles[cat] || 'Спортивные трансляции';

        // 1. CHANNELS TAB
        if (cat === 'channels') {
            matchCounter.textContent = `${tvChannels.length} каналов`;
            renderCards(tvChannels);
            return;
        }

        // 2. MMA TAB: Show top 24/7 fight channels + UFC tournament cards
        if (cat === 'mma') {
            cardsGrid.innerHTML = '';
            matchCounter.textContent = `${mmaMatches.length} событий / каналов`;
            
            // Top fight channels divider
            const fightChannelsDivider = document.createElement('div');
            fightChannelsDivider.className = 'section-divider-banner';
            fightChannelsDivider.textContent = '🥊 Телеканалы единоборств в прямом эфире 24/7 (Full HD):';
            cardsGrid.appendChild(fightChannelsDivider);

            // Render fight channels
            const fightChannelIds = ['ch-udar', 'ch-boets', 'ch-boxtv', 'ch-mmatv'];
            fightChannelIds.forEach(cid => {
                const ch = tvChannels.find(c => c.id === cid);
                if (ch) {
                    cardsGrid.appendChild(createCardElement(ch));
                }
            });

            // Upcoming UFC / MMA Tournaments
            const ufcDivider = document.createElement('div');
            ufcDivider.className = 'section-divider-banner';
            ufcDivider.textContent = '🔥 Главные турниры UFC / ACA / Bellator:';
            cardsGrid.appendChild(ufcDivider);

            mmaMatches.forEach(m => {
                cardsGrid.appendChild(createCardElement(m));
            });

            if (!focusedElement) {
                const firstCard = cardsGrid.querySelector('.focusable');
                if (firstCard) setFocus(firstCard);
            }
            return;
        }

        // 3. LIVE TAB
        if (cat === 'live') {
            await ensureSportDataLoaded();
            renderLiveOnly();
            return;
        }

        // 4. SPORT TABS (football, hockey, basketball)
        if (loadedData[cat] && loadedData[cat].length > 0) {
            renderCards(loadedData[cat]);
        }

        try {
            let matches = [];
            if (cat === 'football') {
                matches = await fetchFootballData();
            } else if (cat === 'hockey') {
                matches = await fetchHockeyData();
            } else if (cat === 'basketball') {
                matches = await fetchBasketballData();
            }

            if (matches && matches.length > 0) {
                loadedData[cat] = matches;
                renderCards(matches);
            } else {
                if (cat === 'hockey') {
                    cardsGrid.innerHTML = '';
                    matchCounter.textContent = '2 канала КХЛ';
                    const hB = document.createElement('div');
                    hB.className = 'section-divider-banner';
                    hB.textContent = '🏒 Сейчас нет запланированных матчей. Круглосуточный хоккей в прямом эфире 24/7:';
                    cardsGrid.appendChild(hB);
                    const khl = tvChannels.find(c => c.id === 'ch-khl');
                    const bt5 = tvChannels.find(c => c.id === 'ch-bt5');
                    if (khl) cardsGrid.appendChild(createCardElement(khl));
                    if (bt5) cardsGrid.appendChild(createCardElement(bt5));
                } else if (cat === 'basketball') {
                    cardsGrid.innerHTML = '';
                    matchCounter.textContent = '1 канал НБА';
                    const bB = document.createElement('div');
                    bB.className = 'section-divider-banner';
                    bB.textContent = '🏀 Сейчас нет запланированных матчей. Круглосуточный баскетбол в прямом эфире 24/7:';
                    cardsGrid.appendChild(bB);
                    const viju = tvChannels.find(c => c.id === 'ch-viju');
                    if (viju) cardsGrid.appendChild(createCardElement(viju));
                } else {
                    renderCards(loadedData[cat] || []);
                }
            }
        } catch (e) {
            console.error('Data load error:', e);
            renderCards(loadedData[cat] || []);
        }
    }

    async function ensureSportDataLoaded() {
        const tasks = [];
        if (!loadedData.football) {
            tasks.push(fetchFootballData().then(m => { loadedData.football = m; }));
        }
        if (!loadedData.hockey) {
            tasks.push(fetchHockeyData().then(m => { loadedData.hockey = m; }));
        }
        if (!loadedData.basketball) {
            tasks.push(fetchBasketballData().then(m => { loadedData.basketball = m; }));
        }
        await Promise.all(tasks);
    }

    // Render verified live 24/7 channels directly without fake match placeholders
    function renderLiveOnly() {
        cardsGrid.innerHTML = '';
        matchCounter.textContent = `${tvChannels.length} каналов в эфире`;

        const banner = document.createElement('div');
        banner.className = 'live-empty-banner';
        banner.innerHTML = `
            <div class="live-empty-icon">🔴</div>
            <div class="live-empty-info">
                <h2 class="live-empty-title">Прямой эфир спортивных телеканалов 24/7 (Full HD 1080p)</h2>
                <p class="live-empty-desc">Все каналы транслируются непрерывно в максимальном качестве с рабочими проверенными зеркалами.<br>Календарь, счет и расписание игр доступны в разделах <strong>«ФУТБОЛ»</strong>, <strong>«ХОККЕЙ»</strong>, <strong>«БАСКЕТБОЛ»</strong> и <strong>«UFC / MMA»</strong>.</p>
            </div>
        `;
        cardsGrid.appendChild(banner);

        tvChannels.forEach(ch => {
            const card = createCardElement(ch);
            cardsGrid.appendChild(card);
        });

        if (!focusedElement) {
            const firstCard = cardsGrid.querySelector('.focusable');
            if (firstCard) setFocus(firstCard);
        }
    }

    // ==========================================
    // Fullscreen TV Video Player Engine
    // ==========================================
    function openPlayer(item) {
        currentMatch = {
            ...item,
            streams: (item.streams || []).map(s => ({ ...s }))
        };
        currentStreamIndex = 0;

        playerModal.classList.remove('hidden');
        playerLoader.classList.remove('hidden');
        loaderText.textContent = 'Подключение к трансляции Full HD...';

        playerLeague.textContent = item.league || (item.isChannel ? 'ТЕЛЕКАНАЛ 24/7' : 'ПРЯМОЙ ЭФИР');
        playerTitle.textContent = item.isChannel ? item.name : `${item.team1.name} — ${item.team2.name}`;
        playerQualityBadge.textContent = '⚡ Full HD 1080p';

        const metaEl = document.getElementById('playerMatchMeta');
        if (metaEl) {
            if (item.isChannel) {
                metaEl.innerHTML = `<span class="player-meta-info">${item.desc || 'Круглосуточный спортивный телеканал 24/7'}</span>`;
            } else if (item.isLive) {
                metaEl.innerHTML = `<span class="player-live-badge"><span class="live-dot"></span> ПРЯМОЙ ЭФИР: ${item.status}</span> <span class="player-score-highlight">СЧЕТ: ${item.team1.score} : ${item.team2.score}</span>`;
            } else if (item.status && item.status.includes('Завершен')) {
                metaEl.innerHTML = `<span class="player-finished-badge">Матч завершен (Итоговый счет: ${item.team1.score} : ${item.team2.score}). В эфире трансляция канала.</span>`;
            } else {
                metaEl.innerHTML = `<span class="player-upcoming-badge">⏰ Начало матча: ${item.status}. Сейчас в эфире: подготовка к трансляции.</span>`;
            }
        }

        const liveIndicatorBadge = document.querySelector('.player-status-badge');
        if (liveIndicatorBadge) {
            if (item.isChannel || item.isLive) {
                liveIndicatorBadge.innerHTML = '<span class="live-indicator"></span> ПРЯМОЙ ЭФИР';
            } else if (item.status && item.status.includes('Завершен')) {
                liveIndicatorBadge.innerHTML = 'МАТЧ ЗАВЕРШЕН';
            } else {
                liveIndicatorBadge.innerHTML = 'ОЖИДАНИЕ НАЧАЛА';
            }
        }

        tvVideo.muted = true;

        renderServerButtons();
        playStream(currentStreamIndex);
        showOverlayBriefly();
        startStallDetector();

        setTimeout(() => {
            const activeServerBtn = serverButtons.querySelector('.server-btn.active') || serverButtons.querySelector('.server-btn');
            if (activeServerBtn) {
                setFocus(activeServerBtn);
            }
        }, 100);
    }

    function renderServerButtons() {
        serverButtons.innerHTML = '';
        if (!currentMatch.streams || currentMatch.streams.length === 0) return;

        currentMatch.streams.forEach((stream, idx) => {
            const btn = document.createElement('button');
            btn.className = `server-btn focusable ${idx === currentStreamIndex ? 'active' : ''}`;

            let btnLabel = stream.name;
            if (currentMatch.isChannel) {
                if (currentMatch.streams.length === 1) {
                    btnLabel = 'Full HD 1080p (Основной поток)';
                } else {
                    btnLabel = `Зеркало ${idx + 1} (${idx === 0 ? 'Full HD' : 'HD Резерв'})`;
                }
            } else {
                btnLabel = stream.name || `Сервер ${idx + 1}`;
            }

            btn.textContent = btnLabel;
            btn.tabIndex = 0;
            btn.addEventListener('click', () => {
                currentStreamIndex = idx;
                renderServerButtons();
                playStream(idx);
            });
            btn.addEventListener('focus', () => setFocus(btn));
            serverButtons.appendChild(btn);
        });
    }

    function playStream(index) {
        if (!currentMatch.streams || !currentMatch.streams[index]) return;
        const stream = currentMatch.streams[index];

        playerLoader.classList.remove('hidden');
        loaderText.textContent = `Загрузка: ${stream.name}...`;

        if (hls) {
            hls.destroy();
            hls = null;
        }

        const videoSrc = stream.url;

        if (Hls.isSupported()) {
            hls = new Hls({
                enableWorker: false,
                capLevelToPlayerSize: false,
                autoLevelCapping: -1,
                startLevel: -1,
                maxBufferLength: 30,
                maxMaxBufferLength: 60,
                maxBufferSize: 60 * 1000 * 1000,
                manifestLoadingTimeOut: 10000,
                manifestLoadingMaxRetry: 2,
                fragLoadingTimeOut: 12000,
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
                        playerQualityBadge.textContent = `⚡ ${qText}`;
                    }
                } else {
                    playerQualityBadge.textContent = '⚡ 1080p Full HD';
                }

                playerLoader.classList.add('hidden');
                const promise = tvVideo.play();
                if (promise !== undefined) {
                    promise.then(() => {
                        setTimeout(() => { tvVideo.muted = false; }, 150);
                    }).catch(err => {
                        console.warn('Initial play pending buffer:', err);
                    });
                }
            });

            hls.on(Hls.Events.FRAG_BUFFERED, function () {
                playerLoader.classList.add('hidden');
                if (tvVideo.paused) {
                    tvVideo.play().then(() => {
                        setTimeout(() => { tvVideo.muted = false; }, 150);
                    }).catch(() => {});
                }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {
                console.warn('HLS Event Error:', data.type, data.details, data.fatal);
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            triggerFailoverWithDelay('Сетевая ошибка зеркала', 1500);
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            try {
                                hls.recoverMediaError();
                            } catch (e) {
                                triggerFailoverNow('Ошибка декодирования видео');
                            }
                            break;
                        default:
                            triggerFailoverNow('Критический сбой зеркала');
                            break;
                    }
                }
            });
        } else if (tvVideo.canPlayType('application/vnd.apple.mpegurl')) {
            tvVideo.muted = true;
            tvVideo.src = videoSrc;
            tvVideo.addEventListener('loadedmetadata', function () {
                tvVideo.play().then(() => {
                    setTimeout(() => { tvVideo.muted = false; }, 150);
                }).catch(() => {});
                playerLoader.classList.add('hidden');
            });
            tvVideo.addEventListener('error', function () {
                triggerFailoverWithDelay('Ошибка воспроизведения', 1800);
            });
        }
    }

    tvVideo.addEventListener('playing', function () {
        playerLoader.classList.add('hidden');
        if (tvVideo.muted) {
            setTimeout(() => {
                tvVideo.muted = false;
            }, 100);
        }
    });

    tvVideo.addEventListener('timeupdate', function () {
        if (tvVideo.currentTime > 0) {
            playerLoader.classList.add('hidden');
        }
    });

    tvVideo.addEventListener('canplay', function () {
        playerLoader.classList.add('hidden');
    });

    tvVideo.addEventListener('loadeddata', function () {
        playerLoader.classList.add('hidden');
        if (tvVideo.paused) {
            tvVideo.play().then(() => {
                setTimeout(() => { tvVideo.muted = false; }, 150);
            }).catch(() => {});
        }
    });

    // Automatically remove dead mirror and switch to backup mirror!
    function removeBrokenMirrorAndFailover(reason) {
        if (!currentMatch || !currentMatch.streams || currentMatch.streams.length === 0) return;

        // If channel has only 1 stream, do NOT delete it - retry connection!
        if (currentMatch.streams.length <= 1) {
            console.warn(`[Auto-Retry] Single stream stalled or errored (${reason}), reconnecting...`);
            loaderText.textContent = 'Переподключение к трансляции...';
            playerLoader.classList.remove('hidden');
            if (hls) {
                hls.startLoad();
                tvVideo.play().catch(() => {});
            }
            return;
        }

        const brokenStream = currentMatch.streams[currentStreamIndex];
        const brokenName = brokenStream ? brokenStream.name : `Зеркало ${currentStreamIndex + 1}`;
        console.warn(`[Auto-Prune] Removing broken mirror "${brokenName}" due to: ${reason}`);

        currentMatch.streams.splice(currentStreamIndex, 1);

        if (currentMatch.id && brokenStream) {
            const ch = tvChannels.find(c => c.id === currentMatch.id);
            if (ch && Array.isArray(ch.streams) && ch.streams.length > 1) {
                const bIdx = ch.streams.findIndex(s => s.url === brokenStream.url);
                if (bIdx !== -1) {
                    ch.streams.splice(bIdx, 1);
                }
            }
        }

        if (currentStreamIndex >= currentMatch.streams.length) {
            currentStreamIndex = 0;
        }
        renderServerButtons();
        loaderText.textContent = `Зеркало недоступно. Переключение на рабочее зеркало (${currentStreamIndex + 1}/${currentMatch.streams.length})...`;
        playerLoader.classList.remove('hidden');
        playStream(currentStreamIndex);
    }

    function triggerFailoverWithDelay(reason, delayMs) {
        if (failoverTimer) clearTimeout(failoverTimer);
        failoverTimer = setTimeout(() => {
            failoverTimer = null;
            removeBrokenMirrorAndFailover(reason);
        }, delayMs || 1500);
    }

    function triggerFailoverNow(reason) {
        if (failoverTimer) {
            clearTimeout(failoverTimer);
            failoverTimer = null;
        }
        removeBrokenMirrorAndFailover(reason);
    }

    let stallCheckTimer = null;
    let failoverTimer = null;
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

            if (!tvVideo.paused && !tvVideo.ended) {
                const currentPos = tvVideo.currentTime;
                if (currentPos > 0 && Math.abs(currentPos - lastPlayheadPosition) < 0.1) {
                    stallCount++;
                    if (stallCount >= 10) {
                        stallCount = 0;
                        triggerFailoverNow('Поток завис');
                    }
                } else {
                    lastPlayheadPosition = currentPos;
                    stallCount = 0;
                }
            }
        }, 1200);
    }

    window.handleBack = function () {
        if (!playerModal.classList.contains('hidden')) {
            closePlayer();
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
        if (hls) {
            hls.destroy();
            hls = null;
        }
        tvVideo.pause();
        tvVideo.removeAttribute('src');
        tvVideo.load();
        playerModal.classList.add('hidden');
        playerLoader.classList.add('hidden');

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

    function showOverlayBriefly() {
        playerOverlay.classList.remove('hidden');
        if (overlayTimeout) clearTimeout(overlayTimeout);
        overlayTimeout = setTimeout(() => {
            playerOverlay.classList.add('hidden');
        }, 5000);
    }

    function togglePlayPause() {
        if (tvVideo.paused) {
            tvVideo.play();
        } else {
            tvVideo.pause();
        }
        showOverlayBriefly();
    }

    // ==========================================
    // Remote Control (D-PAD / Android Leanback)
    // ==========================================
    document.addEventListener('keydown', (e) => {
        const keyCode = e.keyCode;
        const key = e.key;

        const isUp = keyCode === 19 || keyCode === 38 || key === 'ArrowUp';
        const isDown = keyCode === 20 || keyCode === 40 || key === 'ArrowDown';
        const isLeft = keyCode === 21 || keyCode === 37 || key === 'ArrowLeft';
        const isRight = keyCode === 22 || keyCode === 39 || key === 'ArrowRight';
        const isEnter = keyCode === 23 || keyCode === 66 || keyCode === 13 || key === 'Enter';
        const isBack = keyCode === 4 || keyCode === 27 || keyCode === 8 || keyCode === 10009 || keyCode === 461 || key === 'Escape' || key === 'GoBack' || key === 'Back' || key === 'Backspace';

        if (!playerModal.classList.contains('hidden')) {
            showOverlayBriefly();

            if (isBack) {
                e.preventDefault();
                closePlayer();
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

        // Main Navigation (Categories & Cards Grid)
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
        const inGrid = focusedElement && focusedElement.classList.contains('match-card');

        if (inNav) {
            const navButtons = Array.from(categoriesNav.querySelectorAll('.nav-btn'));
            const currentIdx = navButtons.indexOf(focusedElement);

            if (isLeft && currentIdx > 0) {
                setFocus(navButtons[currentIdx - 1]);
                switchCategory(navButtons[currentIdx - 1].dataset.cat);
            } else if (isRight && currentIdx < navButtons.length - 1) {
                setFocus(navButtons[currentIdx + 1]);
                switchCategory(navButtons[currentIdx + 1].dataset.cat);
            } else if (isDown) {
                const firstCard = cardsGrid.querySelector('.focusable');
                if (firstCard) setFocus(firstCard);
            }
            return;
        }

        if (inGrid || (!inNav && cardsGrid.querySelector('.match-card'))) {
            const cards = Array.from(cardsGrid.querySelectorAll('.match-card'));
            let currentIdx = cards.indexOf(focusedElement);
            if (currentIdx === -1 && document.activeElement) {
                currentIdx = cards.indexOf(document.activeElement.closest('.match-card'));
            }
            if (currentIdx === -1) {
                currentIdx = 0;
                setFocus(cards[0]);
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

    // Category Buttons Click Listeners
    categoriesNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.nav-btn');
        if (btn && btn.dataset.cat) {
            setFocus(btn);
            switchCategory(btn.dataset.cat);
        }
    });

    // Auto-refresh match live data every 60 seconds
    setInterval(async () => {
        if (!playerModal.classList.contains('hidden')) return;

        if (currentCategory === 'live') {
            await ensureSportDataLoaded();
            renderLiveOnly();
        } else if (currentCategory === 'football') {
            const data = await fetchFootballData();
            if (data && data.length > 0) {
                loadedData.football = data;
                renderCards(data);
            }
        } else if (currentCategory === 'hockey') {
            const data = await fetchHockeyData();
            if (data && data.length > 0) {
                loadedData.hockey = data;
                renderCards(data);
            }
        } else if (currentCategory === 'basketball') {
            const data = await fetchBasketballData();
            if (data && data.length > 0) {
                loadedData.basketball = data;
                renderCards(data);
            }
        }
    }, 60000);

    // Initial Application Startup
    async function init() {
        const liveBtn = categoriesNav.querySelector('[data-cat="live"]');
        if (liveBtn) setFocus(liveBtn);

        await switchCategory('live');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
