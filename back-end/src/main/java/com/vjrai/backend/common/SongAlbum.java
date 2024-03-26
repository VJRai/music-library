package com.vjrai.backend.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vjrai.backend.album.Album;
import com.vjrai.backend.song.Song;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "songAlbum")
@Table(name = "songs_albums")
public class SongAlbum {

    @EmbeddedId
    private SongAlbumId songAlbumId;

    @JsonIgnoreProperties({"albums", "artists"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id")
    @MapsId("songId")
    @EqualsAndHashCode.Include
    private Song song;

    @JsonIgnoreProperties("songs")
    @ManyToOne
    @JoinColumn(name = "album_id")
    @MapsId("albumId")
    @EqualsAndHashCode.Include
    private Album album;

    @NotNull
    private Integer trackNumber;

    private Date createdAt = new Date();

    public SongAlbum(Song song, Album album, Integer trackNumber) {
        this.song = song;
        this.album = album;
        this.trackNumber = trackNumber;
        this.songAlbumId = new SongAlbumId(song.getId(), album.getId());
    }
}
