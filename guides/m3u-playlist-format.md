# M3U Playlist Format Explained

M3U is a text-based playlist format. A playlist usually contains a header, metadata lines that describe entries, and media locations. Because it is plain text, you can inspect a file with a text editor before opening it in a compatible player.

## 1. The playlist header

An extended M3U playlist normally starts with:

```m3u
#EXTM3U
```

The header identifies the document as an extended M3U playlist. Check that it appears at the beginning of the file and is not preceded by unrelated text or a byte-order mark that a particular player cannot handle.

## 2. EXTINF entries

An extended entry commonly uses this pattern:

```m3u
#EXTINF:-1,Example Channel
https://example.com/authorized-stream.m3u8
```

- `#EXTINF` introduces information about the next media item.
- `-1` is a commonly used duration value for live-style entries; other playlist types may use a duration in seconds.
- The text after the comma is the display name.
- The next line contains the media location.

The example URL is a placeholder, not a playable stream.

## 3. Common metadata attributes

You may encounter attributes such as:

| Attribute | Typical purpose |
| --- | --- |
| `tvg-id` | Identifier used to match a channel with guide data |
| `tvg-name` | Channel name used by some playlist workflows |
| `tvg-logo` | URL of a channel logo image |
| `group-title` | Category or group label |

Player support varies. Some applications ignore attributes they do not recognize.

## 4. Example with metadata

```m3u
#EXTM3U
#EXTINF:-1 tvg-id="example.news" tvg-name="Example News" group-title="News",Example News
https://example.com/authorized-news-stream.m3u8
```

Do not invent guide identifiers or use logo URLs without permission. Keep metadata consistent and verify it against a trusted source.

## 5. Common formatting problems

- Missing `#EXTM3U` header.
- An `#EXTINF` line without a following media location.
- A media location with no preceding entry metadata.
- Empty or inconsistent display names.
- Invalid quoting or punctuation in attributes.
- Encoding problems with non-English characters.

## 6. Validate the text

You can use the [Online M3U Playlist Checker](https://drxalan32.github.io/m3u-playlist-inspector/) to inspect common structural issues in a selected local file. It does not connect to remote media locations or confirm playback.

## Related guides

- [M3U vs M3U8](m3u-vs-m3u8.md)
- [Organize an M3U playlist](organize-m3u-playlist.md)
- [Validate and troubleshoot an M3U file](validate-and-troubleshoot-m3u.md)

Use playlist files and media sources that you own or are authorized to access.
