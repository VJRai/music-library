package com.vjrai.backend.song.dto.response;

import lombok.Getter;

import java.io.Serializable;

@Getter
public class SongArtistDTO implements Serializable {

    private final Long id;

    private final String name;

    public SongArtistDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    
}
