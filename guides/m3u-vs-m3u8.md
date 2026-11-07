# M3U vs M3U8: What Is the Difference?

M3U and M3U8 are closely related playlist formats. Both can describe a list of media locations in a text file, but M3U8 is specifically associated with UTF-8 text encoding.

## At a glance

| Feature | M3U | M3U8 |
| --- | --- | --- |
| Basic structure | Text playlist | Text playlist |
| Character encoding | Depends on the file and application; legacy encodings may occur | UTF-8 |
| File extension | Usually `.m3u` | Usually `.m3u8` |
| Playlist entries | Media locations and optional metadata | Media locations and optional metadata |
| Compatibility | Depends on player and encoding | Depends on player and encoding |

The extension alone does not guarantee that a file is correctly encoded or supported by every player.

## Why UTF-8 matters

UTF-8 supports a wide range of characters, including Arabic, French accents and other writing systems. If a playlist contains channel names in multiple languages, saving it as UTF-8 can help avoid corrupted characters—provided the application reading the file also handles UTF-8 correctly.

## Are the entry tags different?

The familiar extended playlist tags, such as `#EXTM3U` and `#EXTINF`, can appear in both. Attributes such as `tvg-id`, `tvg-logo` and `group-title` are metadata conventions interpreted by compatible applications.

## Which extension should I use?

Follow the requirements of the application or workflow that will read the file. If UTF-8 is required or your playlist contains international characters, M3U8 is often a sensible choice. Do not simply rename a file extension and assume its encoding has changed; save or convert the text using the intended encoding.

## Quick checks

1. Open the file in a plain-text editor.
2. Confirm the header and entry structure.
3. Check whether international characters display correctly.
4. Save with the encoding expected by your target application.
5. Test with the intended player if compatibility matters.

Try the [online M3U checker](https://drxalan32.github.io/m3u-playlist-inspector/) to review basic playlist structure. It does not test stream availability or playback.

## Further reading

- [M3U playlist format explained](m3u-playlist-format.md)
- [Organize an M3U playlist](organize-m3u-playlist.md)

Only use media sources you are authorized to access.
