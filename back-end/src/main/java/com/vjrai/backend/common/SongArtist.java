package com.vjrai.backend.common;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.vjrai.backend.artist.Artist;
import com.vjrai.backend.artist.ArtistCredit;
import com.vjrai.backend.song.Song;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Date;
import java.util.Objects;


@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@Entity(name = "songArtist")
@Table(name = "songs_artists")
public class SongArtist {

    @EmbeddedId
    private SongArtistId songArtistId;

    @JsonIgnoreProperties("artists")
    @ManyToOne
    @JoinColumn(name = "song_id")
    @MapsId("songId")
    @EqualsAndHashCode.Include
    private Song song;

    @JsonIgnoreProperties("songs")
    @ManyToOne
    @JoinColumn(name = "artist_id")
    @MapsId("artistId")
    @EqualsAndHashCode.Include
    private Artist artist;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "artist_credit")
    @EqualsAndHashCode.Include
    private ArtistCredit artistCredit;

    @NotNull
    private Date createdAt = new Date();

    public SongArtist(Song song, Artist artist, ArtistCredit artistCredit) {
        this.song = song;
        this.artist = artist;
        this.artistCredit = artistCredit;
        this.songArtistId = new SongArtistId(song.getId(), artist.getId());
    }

}

