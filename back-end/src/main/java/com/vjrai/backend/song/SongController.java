package com.vjrai.backend.song;

import com.vjrai.backend.song.dto.request.SongCreateRequestDTO;
import com.vjrai.backend.song.dto.response.SongGetResponseDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/songs")
public class SongController {
    private final SongService songService;

    @Autowired
    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping()
    public ResponseEntity<Page<SongGetResponseDTO>> getSongs(
            @RequestParam (value ="page", required = false, defaultValue = "0") int page,
            @RequestParam (value ="size", required = false, defaultValue = "10") int size,
            @RequestParam (value ="sortBy", required = false, defaultValue = "id:asc") String sort,
            @RequestParam (value ="filter", required = false) String filter
    ){

        Page<SongGetResponseDTO> songPage = this.songService.getSongs(page, size, sort, filter);

        return new ResponseEntity<>(songPage, HttpStatus.OK);

    }


    @GetMapping("/{id}")
    public ResponseEntity<SongGetResponseDTO> getSong(@PathVariable("id") Long songId) {

        SongGetResponseDTO songGetResponseDTO = this.songService.getSong(songId);

        return new ResponseEntity<>(songGetResponseDTO, HttpStatus.OK);

    }

    @PostMapping()
    public ResponseEntity<SongGetResponseDTO> addSong(@RequestBody @Valid SongCreateRequestDTO songCreateRequestDto){

        Song song = this.songService.addSong(songCreateRequestDto);
        return new ResponseEntity<>(SongGetResponseDTO.fromEntity(song), HttpStatus.CREATED);
    }

}
