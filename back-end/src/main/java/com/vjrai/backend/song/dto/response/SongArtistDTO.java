package com.vjrai.backend.song.dto.response;

import com.vjrai.backend.artist.ArtistCredit;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SongArtistDTO implements Serializable {

    private final Long id;

    private final String name;

    private final ArtistCredit credit;

    public SongArtistDTO(Long id, String name, ArtistCredit credit) {
        this.id = id;
        this.name = name;
        this.credit = credit;
    }
    
}
