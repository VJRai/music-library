package com.vjrai.backend.album;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vjrai.backend.common.SongAlbum;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.*;
import org.hibernate.annotations.FetchMode;

import java.util.*;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "albums")
@Table(name = "albums")
@Data
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotNull
    @EqualsAndHashCode.Include
    private String name;

    @OneToMany(mappedBy = "album")
    private Set<SongAlbum> songs = new HashSet<>();

    @Column
    @NotNull
    private Date createdAt = new Date();

    public Album(String name) {
        this.name = name;
    }

}
