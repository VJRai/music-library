package com.vjrai.backend.artist;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vjrai.backend.common.SongArtist;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.*;

import java.util.*;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "artists")
@Table(name = "artists")
@Data
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    @NotNull
    @EqualsAndHashCode.Include
    private String name;


    @JsonIgnoreProperties("artist")
//    @Fetch(value = FetchMode.JOIN)
    @OneToMany(mappedBy = "artist", fetch = FetchType.EAGER)
    private Set<SongArtist> songs = new HashSet<>();

    @Column
    @NotNull
    private Date createdAt = new Date();

    public Artist(String name) {
        this.name = name;
    }

}
