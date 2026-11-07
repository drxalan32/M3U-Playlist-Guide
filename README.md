# M3U Playlist Guide

Practical, beginner-friendly documentation about **M3U and M3U8 playlist files**: how they are structured, how metadata works, how to organize entries, and how to troubleshoot common formatting problems.

This repository is an independent learning resource for developers, playlist maintainers, and people working with media playlists they own or are authorized to use.

## Start here

- [M3U playlist format explained](guides/m3u-playlist-format.md)
- [M3U vs M3U8: key differences](guides/m3u-vs-m3u8.md)
- [How to organize an M3U playlist](guides/organize-m3u-playlist.md)
- [How to validate and troubleshoot an M3U file](guides/validate-and-troubleshoot-m3u.md)

## Online tools

Need to inspect or build a playlist locally in your browser?

- **[Online M3U Playlist Checker](https://drxalan32.github.io/m3u-playlist-inspector/)** — check playlist structure, metadata and common formatting issues.
- **[M3U Playlist Generator](https://drxalan32.github.io/m3u-playlist-inspector/#playlist-generator)** — create, import, edit, reorder and export M3U entries.
- **[IPTV M3U Playlist Guide](https://drxalan32.github.io/m3u-playlist-inspector/iptv-m3u-playlist-guide.html)** — learn about EXTINF, channel metadata and safe validation.

The browser tools process the playlist content you select in your browser. They do not test remote stream availability, guarantee playback, or determine whether a source is licensed.

## What is covered?

| Topic | What you will learn |
| --- | --- |
| M3U structure | Header, EXTINF records and media locations |
| M3U8 | UTF-8 text and common use cases |
| Metadata | tvg-id, tvg-name, tvg-logo and group-title |
| Organization | Consistent names, categories and ordering |
| Validation | Missing fields, malformed entries and duplicates |
| Troubleshooting | How to isolate common playlist formatting problems |

## Example

A basic extended M3U playlist can look like this:

```m3u
#EXTM3U
#EXTINF:-1 group-title="News",Example News
https://example.com/authorized-media-stream.m3u8
```

The address above is illustrative only and is not a working stream.

## Contributing

Corrections and educational improvements are welcome. Please keep examples original, avoid publishing private playlist URLs or credentials, and only include media sources you are authorized to share.

## Responsible use

M3U is a playlist text format; it does not grant access rights to media. Use only content you own or are authorized to access. Do not commit private subscription links, tokens, usernames, passwords, or personal playlist files.

---

Maintained as an educational companion to [M3U Playlist Inspector](https://github.com/drxalan32/m3u-playlist-inspector).
