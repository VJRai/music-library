package com.vjrai.backend.song.dto.response;

import com.vjrai.backend.album.Album;
import com.vjrai.backend.artist.Artist;
import com.vjrai.backend.common.SongAlbum;
import com.vjrai.backend.common.SongArtist;
import com.vjrai.backend.genre.Genre;
import com.vjrai.backend.song.Song;
import lombok.Getter;

import java.io.Serializable;
import java.util.*;


@Getter
public class SongGetResponseDTO implements Serializable {

    private final Long id;

    private final String title;

    private final Integer duration;

    private final Long releaseDate;

    private final List<SongArtistDTO> artists = new ArrayList<>();

    private final List<SongAlbumDTO> albums = new ArrayList<>();

    private final List<SongGenreDTO> genres = new ArrayList<>();

    public SongGetResponseDTO(Long id, String title, Integer duration, Long releaseDate) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.releaseDate = releaseDate;
    }

    public static SongGetResponseDTO fromEntity(Song song){

        SongGetResponseDTO songGetResponseDTO = new SongGetResponseDTO(
                song.getId(),
                song.getTitle(),
                song.getDuration(),
                song.getReleaseDate()
        );

        for(SongArtist songArtist: song.getArtists()){

            Artist artist = songArtist.getArtist();
            songGetResponseDTO.getArtists().add(new SongArtistDTO(artist.getId(), artist.getName()));
        }

        for(SongAlbum songAlbum: song.getAlbums()){

            Album album = songAlbum.getAlbum();
            songGetResponseDTO.getAlbums().add(new SongAlbumDTO(album.getId(), album.getName()));
        }

        for(Genre genre: song.getGenres()){
            songGetResponseDTO.getGenres().add(new SongGenreDTO(genre.getId(),genre.getName()));
        }

        return songGetResponseDTO;
    }

}
