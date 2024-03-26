package com.vjrai.backend.song;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vjrai.backend.artist.Artist;
import com.vjrai.backend.artist.ArtistCredit;
import com.vjrai.backend.common.SongAlbum;
import com.vjrai.backend.common.SongArtist;
import com.vjrai.backend.genre.Genre;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.*;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "songs")
@Table(name = "songs")
@Data
@NamedEntityGraph(
        name = "song",
        attributeNodes = {
                @NamedAttributeNode(value = "artists", subgraph = "artists"),
                @NamedAttributeNode(value = "albums", subgraph = "albums"),
                @NamedAttributeNode(value = "genres")
        },
        subgraphs = {
                @NamedSubgraph(name = "artists", attributeNodes = @NamedAttributeNode("artist")),
                @NamedSubgraph(name = "albums", attributeNodes = @NamedAttributeNode("album")),
        }
)
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @EqualsAndHashCode.Include
    @Column
    private String title;

    @EqualsAndHashCode.Include
    @Column
    private Integer duration;

    @EqualsAndHashCode.Include
    @Column
    private Long releaseDate;

    @JsonIgnoreProperties("song")
    @OneToMany(mappedBy = "song")
    private Set<SongArtist> artists = new HashSet<>();

    @JsonIgnoreProperties("song")
    @OneToMany(mappedBy = "song")
    private Set<SongAlbum> albums = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "songs_genres", joinColumns = @JoinColumn(name = "song_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id", referencedColumnName = "id")
    )
    private Set<Genre> genres = new HashSet<>();

    private Date createdAt = new Date();

    public Song(String title, Integer duration, Long releaseDate) {
        this.title = title;
        this.duration = duration;
        this.releaseDate = releaseDate;
    }

}
