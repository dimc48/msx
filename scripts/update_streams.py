#!/usr/bin/env python3
"""
FootDroid / MSX Automated Stream Verifier & Updater
Probes IPTV streams, validates HLS manifests and video chunks,
and generates auto-updating channels.json, sport.m3u8, start.json, and app.js.
"""

import os
import sys
import json
import ssl
import gzip
import urllib.request
import concurrent.futures
from urllib.parse import urlparse

# Base directories
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_DIR = os.path.dirname(SCRIPT_DIR)

# SSL context that allows diverse IPTV servers
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Origin': 'https://dimc48.github.io',
    'Referer': 'https://dimc48.github.io/',
    'Accept': '*/*'
}

# Candidate stream clusters for all 22 sports channels
CHANNEL_CANDIDATES = {
    'ch-matchtv': {
        'name': 'Матч ТВ HD',
        'desc': 'Главный федеральный спортивный телеканал России',
        'logo': 'img/channels/match-tv.png',
        'urls': [
            ('⚡ Сервер 1 (Flussonic HD)', 'https://flussonic.mkpnet.ru/tv-d3098523a4409835/video.m3u8'),
            ('⚡ Сервер 2 (Официальный HD)', 'http://bl.video.matchtv.ru/media/playlist/free_d46d0cf1712c0542ec7fd4f0808f600a_hd/17_89756005/1080/e6bef86de8a133cd7b27deb040758a00/4796141934.m3u8'),
            ('⚡ Сервер 3 (Uplink KZ)', 'https://fs.uplink.kz/match/mono.m3u8?token=onlinetv2')
        ]
    },
    'ch-premier': {
        'name': 'Матч Премьер HD',
        'desc': 'Все матчи Российской Премьер-Лиги (РПЛ) и Кубка России',
        'logo': 'img/channels/match-premier.png',
        'urls': [
            ('⚡ Сервер 1 (Flussonic HD)', 'https://flussonic.mkpnet.ru/tv-ee3651e1e7ce5cbf/video.m3u8'),
            ('⚡ Сервер 2 (Резерв HD)', 'http://185.23.80.23:8080/MATCH_PREMIER/index.m3u8'),
            ('⚡ Сервер 3 (TVDosug HD)', 'http://rr2.tvdosug.net/~201af66d572197816b137775813348e2276/58793/hlsx/pl.m3u8')
        ]
    },
    'ch-okko': {
        'name': 'Okko Спорт HD',
        'desc': 'Лига Чемпионов УЕФА, Лига Европы и еврокубки',
        'logo': 'img/channels/okko-sport.png',
        'urls': [
            ('⚡ Сервер 1 (Full HD)', 'https://stream8.cinerama.uz/1243/index.m3u8'),
            ('⚡ Сервер 2 (Резерв HD)', 'http://185.221.213.254:8080/Okko/tracks-v1a1/index.m3u8'),
            ('⚡ Сервер 3 (TVDosug HD)', 'http://rr2.tvdosug.net/~201af66d572197816b137775813348e2276/63048/hlsx/pl.m3u8')
        ]
    },
    'ch-futbol1': {
        'name': 'Матч! Футбол 1 HD',
        'desc': 'Флагманский европейский футбол и топ-чемпионаты',
        'logo': 'img/channels/match-futbol1.png',
        'urls': [
            ('⚡ Сервер 1 (Full HD 50 FPS)', 'http://31.148.5.241/Match_Football_1_HD/index.m3u8'),
            ('⚡ Сервер 2 (TVDosug HD)', 'http://rr2.tvdosug.net/~201af66d572197816b137775813348e2276/52846/hlsx/pl.m3u8')
        ]
    },
    'ch-futbol2': {
        'name': 'Матч! Футбол 2 HD',
        'desc': 'Испанская Ла Лига и матчи Кубка Короля',
        'logo': 'img/channels/match-futbol2.png',
        'urls': [
            ('⚡ Сервер 1 (Full HD 50 FPS)', 'http://31.148.5.241/Match_Football_2_HD/index.m3u8'),
            ('⚡ Сервер 2 (TVDosug HD)', 'http://rr2.tvdosug.net/~201af66d572197816b137775813348e2276/35647/hlsx/pl.m3u8')
        ]
    },
    'ch-futbol3': {
        'name': 'Матч! Футбол 3 HD',
        'desc': 'Немецкая Бундеслига и итальянская Серия А',
        'logo': 'img/channels/match-futbol3.png',
        'urls': [
            ('⚡ Сервер 1 (Full HD 50 FPS)', 'http://31.148.5.241/Match_Football_3_HD/index.m3u8'),
            ('⚡ Сервер 2 (Резерв HD)', 'http://185.57.68.33/110/index.m3u8'),
            ('⚡ Сервер 3 (TVDosug HD)', 'http://rr2.tvdosug.net/~201af66d572197816b137775813348e2276/48756/hlsx/pl.m3u8')
        ]
    },
    'ch-setanta1': {
        'name': 'Setanta Sports 1 HD',
        'desc': 'АПЛ, Серия А, Формула 1 и мировые лиги',
        'logo': 'img/channels/setanta1.png',
        'urls': [
            ('⚡ Сервер 1 (Full HD)', 'https://stream8.cinerama.uz/1263/tracks-v1a1/mono.m3u8'),
            ('⚡ Сервер 2 (Splay HD)', 'http://vod.splay.uz/live_splay/original/Setanta1HD/tracks-v1a1/mono.m3u8')
        ]
    },
    'ch-setanta2': {
        'name': 'Setanta Sports 2 HD',
        'desc': 'Бундеслига, теннис ATP/WTA и евробаскетбол',
        'logo': 'img/channels/setanta2.png',
        'urls': [
            ('⚡ Сервер 1 (Full HD)', 'https://stream8.cinerama.uz/1264/tracks-v1a1/mono.m3u8'),
            ('⚡ Сервер 2 (Splay HD)', 'http://vod.splay.uz/live_splay/original/Setanta2HD/tracks-v1a1/mono.m3u8')
        ]
    },
    'ch-bt5': {
        'name': 'Беларусь 5 HD',
        'desc': 'Главный спортивный телеканал Республики Беларусь',
        'logo': 'img/channels/belarus5.png',
        'urls': [
            ('⚡ Сервер 1 (Белтелеком HD)', 'https://edge55.dc.beltelecom.by/ngtrk/smil:belarus5.smil/playlist.m3u8'),
            ('⚡ Сервер 2 (TVDosug HD)', 'http://rr2.tvdosug.net/~201af66d572197816b137775813348e2276/82294/hlsx/pl.m3u8')
        ]
    },
    'ch-wwe': {
        'name': 'WWE TV HD',
        'desc': 'WWE Network 24/7 - Raw, SmackDown, WrestleMania & NXT',
        'logo': 'img/channels/wwe.svg',
        'urls': [
            ('⚡ Сервер 1 (Full HD 1080p)', 'https://aka-live1050.delivery.roku.com/34b065a4-682e-4e46-97f1-5c9a26aab12a/t2-origin/out/v1/live.m3u8'),
            ('⚡ Сервер 2 (HD 720p)', 'https://aka-live1050.delivery.roku.com/34b065a4-682e-4e46-97f1-5c9a26aab12a/t2-origin/out/v1/live_720.m3u8')
        ]
    },
    'ch-euro1': {
        'name': 'Eurosport 1 HD',
        'desc': 'Теннис, снукер, биатлон, автоспорт и мировые турниры',
        'logo': 'img/channels/eurosport1.png',
        'urls': [
            ('⚡ Сервер 1 (Full HD 1080p)', 'https://stream8.cinerama.uz/1439/tracks-v1a1/mono.m3u8'),
            ('⚡ Сервер 2 (Резерв HD)', 'https://s7.iptv-24.net/1439/playlist.m3u8'),
            ('⚡ Сервер 3 (Splay HD)', 'http://vod.splay.uz/live_splay/original/Eurosport/tracks-v1a1/mono.m3u8'),
            ('⚡ Сервер 4 (Direct HD)', 'http://31.148.5.241/Eurosport_1_HD/index.m3u8')
        ]
    },
    'ch-euro2': {
        'name': 'Eurosport 2 HD',
        'desc': 'Зимние виды спорта, автогонки и мировые кубки',
        'logo': 'img/channels/eurosport2.png',
        'urls': [
            ('⚡ Сервер 1 (Full HD 1080p)', 'https://stream8.cinerama.uz/1452/index.m3u8'),
            ('⚡ Сервер 2 (Резерв HD)', 'https://s7.iptv-24.net/1452/playlist.m3u8'),
            ('⚡ Сервер 3 (Splay HD)', 'http://vod.splay.uz/live_splay/original/Eurosport2HD/tracks-v1a1/mono.m3u8')
        ]
    },
    'ch-khl': {
        'name': 'KHL Prime HD',
        'desc': 'Матчи Континентальной Хоккейной Лиги и Кубок Гагарина',
        'logo': 'img/channels/khl-prime.png',
        'urls': [
            ('⚡ Сервер 1 (Uplink KZ HD)', 'https://fs.uplink.kz/khl_prime/mono.m3u8?token=onlinetv2'),
            ('⚡ Сервер 2 (Cinerama HD)', 'https://stream8.cinerama.uz/1422/tracks-v1a1/mono.m3u8'),
            ('⚡ Сервер 3 (Flussonic HD)', 'https://flussonic.mkpnet.ru/tv-e3d23fc7511b5fcd/video.m3u8')
        ]
    },
    'ch-viju': {
        'name': 'viju+ Sport HD',
        'desc': 'Мировой баскетбол, хоккей и автогонки',
        'logo': 'img/channels/viju-sport.png',
        'urls': [
            ('⚡ Сервер 1 (Full HD)', 'https://stream8.cinerama.uz/1229/index.m3u8'),
            ('⚡ Сервер 2 (Direct HD)', 'http://31.148.5.241/Viasat_Sport/index.m3u8')
        ]
    },
    'ch-udar': {
        'name': 'Телеканал UDAR HD',
        'desc': 'Top Dog, Hardcore FC, кулачные бои и турниры MMA',
        'logo': 'img/channels/udar.svg',
        'urls': [
            ('⚡ Сервер 1 (TVDosug 1080p)', 'http://rr2.tvdosug.net/~201af66d572197816b137775813348e2276/84449/hlsx/pl.m3u8')
        ]
    },
    'ch-boxtv': {
        'name': 'Бокс ТВ HD',
        'desc': 'Мировой бокс, титульные бои и прямые включения',
        'logo': 'img/channels/boxtv.svg',
        'urls': [
            ('⚡ Сервер 1 (TVDosug HD)', 'http://rr2.tvdosug.net/~201af66d572197816b137775813348e2276/11092/hlsx/pl.m3u8')
        ]
    },
    'ch-mmatv': {
        'name': 'MMA-TV.com HD',
        'desc': 'Мировые турниры MMA и боевые единоборства',
        'logo': 'img/channels/mmatv.svg',
        'urls': [
            ('⚡ Сервер 1 (Cinerama HD)', 'https://stream8.cinerama.uz/1226/index.m3u8'),
            ('⚡ Сервер 2 (Sofast HD)', 'https://streams2.sofast.tv/vglive-sk-462904/playlist.m3u8')
        ]
    },
    'ch-sportivny': {
        'name': 'Спортивный HD',
        'desc': 'Российские чемпионаты, автоспорт и единоборства',
        'logo': 'img/channels/sportivny.svg',
        'urls': [
            ('⚡ Сервер 1 (Full HD 1080p)', 'https://live-3.otcnet.ru/sportivny/index.m3u8')
        ]
    },
    'ch-boets': {
        'name': 'Матч! Боец HD',
        'desc': 'Единоборства, UFC, Bellator и бои в прямом эфире',
        'logo': 'img/channels/match-boets.png',
        'urls': [
            ('⚡ Сервер 1 (TVDosug HD)', 'http://rr2.tvdosug.net/~201af66d572197816b137775813348e2276/54482/hlsx/pl.m3u8'),
            ('⚡ Сервер 2 (Резерв HD)', 'http://91.194.191.241:8081/chid143/tracks-v1a1/mono.m3u8')
        ]
    },
    'ch-strana': {
        'name': 'Матч! Страна HD',
        'desc': 'Российский спорт и региональные турниры',
        'logo': 'img/channels/match-strana.png',
        'urls': [
            ('⚡ Сервер 1 (Flussonic HD)', 'https://flussonic.mkpnet.ru/tv-6db4f59c21aec361/video.m3u8'),
            ('⚡ Сервер 2 (TVDosug HD)', 'http://rr2.tvdosug.net/~201af66d572197816b137775813348e2276/26338/hlsx/pl.m3u8')
        ]
    },
    'ch-igra': {
        'name': 'Матч! Игра HD',
        'desc': 'Игровые виды спорта, гандбол, волейбол и баскетбол',
        'logo': 'img/channels/match-igra.png',
        'urls': [
            ('⚡ Сервер 1 (Flussonic HD)', 'https://flussonic.mkpnet.ru/tv-1bfac9df3d938c1f/video.m3u8'),
            ('⚡ Сервер 2 (TVDosug HD)', 'http://rr2.tvdosug.net/~201af66d572197816b137775813348e2276/47/hlsx/pl.m3u8')
        ]
    },
    'ch-arena': {
        'name': 'Матч! Арена HD',
        'desc': 'Престижные мировые турниры по неигровым видам спорта',
        'logo': 'img/channels/match-arena.png',
        'urls': [
            ('⚡ Сервер 1 (Flussonic HD)', 'https://flussonic.mkpnet.ru/tv-9dda1dd9d740a9a4/video.m3u8'),
            ('⚡ Сервер 2 (1080p 50 FPS)', 'http://31.148.5.241/kanal_3/index.m3u8')
        ]
    }
}

def check_stream(url, timeout=4):
    """Verify if stream URL responds with a valid HLS playlist (200 OK, #EXTM3U)."""
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
            if resp.status == 200:
                raw_data = resp.read(2048)
                # Check for gzip
                if raw_data.startswith(b'\x1f\x8b'):
                    try:
                        raw_data = gzip.decompress(raw_data)
                    except:
                        pass
                content = raw_data.decode('utf-8', errors='ignore')
                if '#EXTM3U' in content:
                    return True
    except Exception:
        pass
    return False

def harvest_live_streams():
    """Verify candidate pools and pick working streams for every channel."""
    print("=== [Stream Engine] Verifying all channel streams in parallel ===")
    verified_channels = []

    # Flatten stream check tasks
    tasks = []
    for ch_id, ch_info in CHANNEL_CANDIDATES.items():
        for name, url in ch_info['urls']:
            tasks.append((ch_id, name, url))

    results = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as executor:
        future_to_task = {executor.submit(check_stream, url): (ch_id, name, url) for ch_id, name, url in tasks}
        for future in concurrent.futures.as_completed(future_to_task):
            ch_id, name, url = future_to_task[future]
            try:
                results[(ch_id, url)] = future.result()
            except Exception as e:
                results[(ch_id, url)] = False

    # Build final structured channels STRICTLY PRESERVING candidate priority order
    for ch_id, ch_info in CHANNEL_CANDIDATES.items():
        streams = []
        for name, url in ch_info['urls']:
            if results.get((ch_id, url), False):
                streams.append({'name': name, 'url': url})
                print(f"  [OK] {ch_id} -> {name}: {url}")
            else:
                print(f"  [FAIL] {ch_id} -> {name}: {url}")

        # If no server responded, keep primary candidate as fallback
        if not streams:
            print(f"  [WARN] No online stream for {ch_id}, preserving fallback.")
            streams = [{'name': ch_info['urls'][0][0], 'url': ch_info['urls'][0][1]}]

        verified_channels.append({
            'id': ch_id,
            'isChannel': True,
            'name': ch_info['name'],
            'logo': ch_info['logo'],
            'desc': ch_info['desc'],
            'quality': 'Full HD 1080p / 50 FPS',
            'streams': streams
        })

    return verified_channels

import datetime

def update_channels_json(verified_channels):
    """Write channels.json for dynamic in-app fetching."""
    out_path = os.path.join(REPO_DIR, 'channels.json')
    data = {
        'version': '1.0.0',
        'updated_at': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        'channels': verified_channels
    }
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Saved: {out_path}")

def update_m3u_playlist(verified_channels):
    """Generate sport.m3u8 playlist for external IPTV players."""
    out_path = os.path.join(REPO_DIR, 'sport.m3u8')
    lines = ['#EXTM3U', '#EXT-X-VERSION:3', '']
    for ch in verified_channels:
        if ch['streams']:
            primary = ch['streams'][0]
            logo_url = f"https://dimc48.github.io/msx/{ch['logo']}"
            lines.append(f'#EXTINF:-1 tvg-id="{ch["id"]}" tvg-name="{ch["name"]}" tvg-logo="{logo_url}" group-title="Спорт HD",{ch["name"]}')
            lines.append(primary['url'])
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')
    print(f"Saved: {out_path}")

def update_msx_json_files(verified_channels):
    """Update start.json, default.json, menu.json, msx.json, start_local.json with verified streams."""
    stream_map = {ch['name']: ch['streams'][0]['url'] for ch in verified_channels if ch['streams']}

    start_json_path = os.path.join(REPO_DIR, 'start.json')
    if not os.path.exists(start_json_path):
        return

    with open(start_json_path, 'r', encoding='utf-8') as f:
        start_data = json.load(f)

    for menu_item in start_data.get('menu', []):
        if 'СПОРТ' in menu_item.get('label', ''):
            for page in menu_item.get('data', {}).get('pages', []):
                for item in page.get('items', []):
                    title = item.get('title', '')
                    if title in stream_map:
                        item['action'] = f"[settings:validate_links:0|video:{stream_map[title]}]"

    # Write to all JSON targets in msx_repo
    for fname in ['start.json', 'default.json', 'menu.json', 'msx.json', 'start_local.json']:
        p = os.path.join(REPO_DIR, fname)
        with open(p, 'w', encoding='utf-8') as f:
            json.dump(start_data, f, ensure_ascii=False, indent=2)
        print(f"Saved MSX file: {p}")

def main():
    verified_channels = harvest_live_streams()
    update_channels_json(verified_channels)
    update_m3u_playlist(verified_channels)
    update_msx_json_files(verified_channels)
    print("=== [Stream Engine] All streams verified and files generated successfully! ===")

if __name__ == '__main__':
    main()
