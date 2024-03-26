package com.vjrai.backend.song;

import com.vjrai.backend.common.utils.ParamUtils;
import com.vjrai.backend.song.dto.request.SongGetRequestDTO;
import com.vjrai.backend.song.dto.response.SongGetResponseDTO;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/songs")
public class SongController {
    private final SongService songService;

    private ModelMapper modelMapper;

    @Autowired
    public SongController(SongService songService, ModelMapper modelMapper) {
        this.songService = songService;
        this.modelMapper = modelMapper;
    }

    @GetMapping()
    public ResponseEntity<Page<SongGetResponseDTO>> getSongs(
            @RequestParam (value ="page", required = false, defaultValue = "0") int page,
            @RequestParam (value ="size", required = false, defaultValue = "10") int size,
            @RequestParam (value ="sortBy", required = false, defaultValue = "id:asc") String sort,
            @RequestParam (value ="filter", required = false) String filter
    ){

        Page<SongGetResponseDTO> songPage;
        List<Sort.Order> sorts = ParamUtils.stringToSortOrderList(sort);

        if(filter != null){
            SongSpecificationBuilder songSpecificationBuilder = new SongSpecificationBuilder();
            Specification<Song> songSpecification = ParamUtils.stringToSpecification(filter, songSpecificationBuilder);

            System.out.println(songSpecificationBuilder);


            songPage = this.songService.getSongs(page, size, Sort.by(sorts), songSpecification);
        }else{
            songPage = this.songService.getSongs(page, size, Sort.by(sorts));
        }

        return new ResponseEntity<>(songPage, HttpStatus.OK);

    }


    @GetMapping("/{id}")
    public ResponseEntity<SongGetResponseDTO> getSong(@PathVariable("id") Long songId) throws ChangeSetPersister.NotFoundException {

        SongGetResponseDTO songGetResponseDTO = this.songService.getSong(songId);

        return new ResponseEntity<>(songGetResponseDTO, HttpStatus.OK);

    }

    @PostMapping()
    public ResponseEntity<SongGetResponseDTO> addSong(@RequestBody @Valid SongGetRequestDTO songGetRequestDto){

        System.out.println(songGetRequestDto);

        Song song = this.songService.addSong(songGetRequestDto);
        return new ResponseEntity<>(SongGetResponseDTO.fromEntity(song), HttpStatus.CREATED);
    }

}
