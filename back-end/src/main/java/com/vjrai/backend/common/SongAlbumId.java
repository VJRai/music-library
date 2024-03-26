package com.vjrai.backend.common;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SongAlbumId implements Serializable {

    @Column(name="song_id")
    private Long songId;

    @Column(name="album_id")
    private Long albumId;

}
