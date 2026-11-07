# M3U EXTINF Explained: Duration, Attributes and Channel Names

The `#EXTINF` line is one of the central parts of an extended M3U playlist. It describes the media item that follows and can include a duration, optional attributes and a display name.

## Basic EXTINF syntax

A simple entry looks like this:

```m3u
#EXTM3U
#EXTINF:-1,Example Channel
https://example.com/authorized-stream.m3u8
```

The line after `#EXTINF` is the media location associated with that entry. The example URL is a placeholder.

## Understanding the parts

- **Tag:** `#EXTINF` marks an extended information record.
- **Duration:** the value after the tag commonly represents the media duration in seconds. Live-style playlists often use `-1`.
- **Attributes:** optional key/value metadata may appear before the comma.
- **Display name:** the text after the comma is commonly shown as the entry name.

## EXTINF with channel metadata

```m3u
#EXTINF:-1 tvg-id="sample.channel" tvg-name="Sample Channel" group-title="News",Sample Channel
https://example.com/authorized-channel.m3u8
```

The attributes are conventions interpreted by compatible applications; not every player supports every field.

## Common EXTINF mistakes

1. Missing comma before the display name.
2. Unclosed quotation marks around an attribute value.
3. Putting the media URL on the same line as EXTINF when the consuming application expects a separate line.
4. Leaving the display name empty.
5. Using an incorrect EPG identifier.
6. Forgetting the media location after an EXTINF line.

## Does -1 mean the stream is broken?

No. In many IPTV-style extended playlists, `-1` is used as a duration marker for live entries. It is not, by itself, evidence that a media URL is unavailable or invalid.

## How to check an EXTINF entry

- Confirm the line starts with `#EXTINF:`.
- Review the duration and attribute syntax.
- Confirm the display name follows the comma.
- Confirm a media location follows the metadata line.
- Check that quoted values are properly closed.

The [Online M3U Playlist Checker](https://drxalan32.github.io/m3u-playlist-inspector/) can help identify structural problems in a selected local playlist. It does not connect to the media URL or verify playback.

## Related M3U guides

- [M3U playlist format](m3u-playlist-format.md)
- [TVG metadata explained](m3u-tvg-metadata.md)
- [Playlist errors and fixes](m3u-playlist-errors.md)

Use only media sources you own or are authorized to access.
