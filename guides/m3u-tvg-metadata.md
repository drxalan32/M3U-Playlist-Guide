# M3U TVG Metadata Explained: tvg-id, tvg-name and tvg-logo

M3U playlists can contain optional attributes that help compatible media players identify and display entries. Common examples include `tvg-id`, `tvg-name`, `tvg-logo` and `group-title`.

These fields do not guarantee that an electronic programme guide (EPG) or logo will appear. The player must support the attributes, and the values must match the data source it uses.

## tvg-id

The `tvg-id` attribute is commonly used as an identifier for matching a playlist entry with an EPG channel. For example:

```m3u
#EXTINF:-1 tvg-id="sample.news" group-title="News",Sample News
https://example.com/authorized-news.m3u8
```

Use a verified identifier from the relevant guide provider. Do not guess an ID based only on a channel's display name.

## tvg-name

The `tvg-name` attribute can provide a channel name used by some player and playlist workflows. Keep it consistent with the intended channel and the naming convention used by your EPG source.

## tvg-logo

The `tvg-logo` attribute can contain a URL for a channel logo image:

```m3u
#EXTINF:-1 tvg-logo="https://example.com/logo.png",Sample Channel
https://example.com/authorized-stream.m3u8
```

The image URL is illustrative. Use logo images only when you have permission to use and distribute them. A structurally valid URL may still point to a missing or inaccessible image.

## group-title

The `group-title` attribute assigns an entry to a category in applications that support playlist grouping:

```m3u
#EXTINF:-1 group-title="Documentaries",Sample Documentary Channel
https://example.com/authorized-documentary.m3u8
```

Use consistent category names. For example, avoid switching between `Sports`, `Sport` and `SPORTS` if they are intended to represent one group.

## Example with multiple attributes

```m3u
#EXTM3U
#EXTINF:-1 tvg-id="sample.one" tvg-name="Sample One" tvg-logo="https://example.com/one.png" group-title="News",Sample One
https://example.com/authorized-one.m3u8
```

All example domains are placeholders. They are not working media or logo links.

## Metadata troubleshooting

| Symptom | What to review |
| --- | --- |
| EPG data does not match | Confirm the tvg-id against the EPG provider |
| Logo is missing | Check the image URL, access and player support |
| Entry appears in the wrong group | Check group-title spelling and player behavior |
| Channel name differs | Review display name and tvg-name values |

The [M3U Playlist Generator](https://drxalan32.github.io/m3u-playlist-inspector/#playlist-generator) supports editing common channel metadata fields. The [online checker](https://drxalan32.github.io/m3u-playlist-inspector/) can inspect basic playlist structure but cannot confirm EPG matches or remote image availability.

## Related guides

- [M3U EXTINF explained](m3u-extinf-explained.md)
- [Organize an M3U playlist](organize-m3u-playlist.md)
- [M3U playlist format](m3u-playlist-format.md)

Only use metadata and media sources you are authorized to use.
