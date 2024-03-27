package com.vjrai.backend.song;

import com.vjrai.backend.album.Album;
import com.vjrai.backend.album.AlbumRepository;
import com.vjrai.backend.artist.Artist;
import com.vjrai.backend.artist.ArtistRepository;
import com.vjrai.backend.common.*;
import com.vjrai.backend.album.AlbumDTO;
import com.vjrai.backend.artist.ArtistDTO;
import com.vjrai.backend.common.exception.SongNotFoundException;
import com.vjrai.backend.genre.Genre;
import com.vjrai.backend.genre.GenreRepository;
import com.vjrai.backend.song.dto.request.SongGetRequestDTO;
import com.vjrai.backend.song.dto.response.SongGetResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class SongService {

    private final SongRepository songRepository;
    private final ArtistRepository artistRepository;
    private final AlbumRepository albumRepository;
    private final GenreRepository genreRepository;
    private final SongArtistRepository songArtistRepository;

    private final SongAlbumRepository songAlbumRepository;

    @Autowired
    public SongService(
            SongRepository songRepository,
            ArtistRepository artistRepository,
            AlbumRepository albumRepository,
            GenreRepository genreRepository,
            SongArtistRepository songArtistRepository,
            SongAlbumRepository songAlbumRepository
    ) {
        this.songRepository = songRepository;
        this.artistRepository = artistRepository;
        this.albumRepository = albumRepository;
        this.genreRepository = genreRepository;
        this.songArtistRepository = songArtistRepository;
        this.songAlbumRepository = songAlbumRepository;

    }

    public Page<SongGetResponseDTO>getSongs(Integer pageNumber, Integer pageSize, Sort sort, Specification<Song> songSpecification){
        Pageable page = PageRequest.of(pageNumber, pageSize).withSort(sort);
        Page<Song> songs = this.songRepository.findAll(songSpecification, page);
        return songs.map(SongGetResponseDTO::fromEntity);
    }

    public Page<SongGetResponseDTO>getSongs(Integer pageNumber, Integer pageSize, Sort sort){
        Pageable page = PageRequest.of(pageNumber, pageSize).withSort(sort);
        Page<Song> songs = this.songRepository.findAll(page);
        return songs.map(SongGetResponseDTO::fromEntity);
    }

    public SongGetResponseDTO getSong(Long songId) {

        Optional<Song> song = this.songRepository.findById(songId);

        if(song.isPresent()){
            return SongGetResponseDTO.fromEntity(song.get());
        }else{
            throw new SongNotFoundException("Song with id " + songId + " not found.");
        }

    }

    public Song addSong(SongGetRequestDTO songGetRequestDto){

        Song song = new Song(
            songGetRequestDto.getTitle(),
            songGetRequestDto.getDuration(),
            songGetRequestDto.getReleaseTimestamp()
        );

        this.songRepository.save(song);


        List<Artist> artists = null;
        for(ArtistDTO artistDto: songGetRequestDto.getArtists()) {

            Artist artist = null;
            String artistName = artistDto.getName();

            artist = this.artistRepository.findByName(artistName);

            if(artist == null){
                artist = new Artist(artistName);
                this.artistRepository.save(artist);
            }

            SongArtist songArtist = new SongArtist(song, artist, artistDto.getCredit());
            artist.getSongs().add(songArtist);
            song.getArtists().add(songArtist);

            this.songArtistRepository.save(songArtist);

        }

        for(AlbumDTO albumDTO: songGetRequestDto.getAlbums()){

            Album album = null;

            String albumName = albumDTO.getName();

            album = this.albumRepository.findByName(albumName);

            if(album == null){
                album = new Album(albumName);
                this.albumRepository.save(album);
            }

            SongAlbum songAlbum = new SongAlbum(song, album, albumDTO.getTrackNumber());
            song.getAlbums().add(songAlbum);
            album.getSongs().add(songAlbum);

            this.songAlbumRepository.save(songAlbum);

        }

        for(String genreDto: songGetRequestDto.getGenres()){
            Genre genre;

            genre = this.genreRepository.findByName(genreDto);

            if(genre == null){
                genre = new Genre(genreDto);
                this.genreRepository.save(genre);
            }

            song.getGenres().add(genre);

        }

        this.songRepository.save(song);

        return song;

    }
}
