package com.vjrai.backend.song;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vjrai.backend.album.AlbumDTO;
import com.vjrai.backend.artist.ArtistCredit;
import com.vjrai.backend.artist.ArtistDTO;
import com.vjrai.backend.common.exception.ValidationExceptionHandler;
import com.vjrai.backend.song.dto.request.SongCreateRequestDTO;
import com.vjrai.backend.song.dto.response.SongGetResponseDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.bind.MethodArgumentNotValidException;


import java.util.*;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(SongController.class)
class SongControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    SongService songService;

    @Test
    void shouldRespondWith200StatusCodeAndPageableDTOOfGivenParameters() throws Exception {

        // GIVEN
        int page = 0, size = 1;

        List<SongGetResponseDTO> songGetResponseDTOList = new ArrayList<>();
        SongGetResponseDTO songGetResponseDTO = new SongGetResponseDTO(1L, "Human Nature", 180, 171212121L);
        songGetResponseDTOList.add(songGetResponseDTO);

        Pageable pageable = PageRequest.of(page, size);
        Page<SongGetResponseDTO> songGetResponseDTOPage = new PageImpl<>(songGetResponseDTOList, pageable, songGetResponseDTOList.size());

        Mockito.when(songService.getSongs(anyInt(), anyInt(), Mockito.anyString(), Mockito.any())).thenReturn(songGetResponseDTOPage);

        // WHEN
        ResultActions mvcResult = mockMvc.perform(get("/api/v1/songs"));

        // THEN
        mvcResult.andExpect(status().isOk());
        mvcResult.andExpect(content().json(objectMapper.writeValueAsString(songGetResponseDTOPage)));

    };

    @Test
    void shouldRespondWith200StatusCodeAndSongResponse() throws Exception {

        // GIVEN
        Long id = 231L, releaseDate=1723441L;
        String title = "A Sky Full Of Stars";
        Integer duration = 210;

        SongGetResponseDTO songGetResponseDTO = new SongGetResponseDTO(id, title, duration, releaseDate);

        Mockito.when(songService.getSong(Mockito.anyLong())).thenReturn(songGetResponseDTO);

        // WHEN
        ResultActions result = mockMvc.perform(get("/api/v1/songs/2"));

        // THEN
        result.andExpect(status().isOk());
        result.andExpect(content().json(objectMapper.writeValueAsString(songGetResponseDTO)));

    }

    @Test
    void shouldRespondWith400StatusCodeWhenAttemptingToCreateSongWithInvalidFieldValues() throws Exception {
        // GIVEN
        String invalidTitle = "";
        SongCreateRequestDTO songCreateRequestDTO = new SongCreateRequestDTO();
        songCreateRequestDTO.setTitle(invalidTitle);

        ValidationExceptionHandler validationExceptionHandler = new ValidationExceptionHandler();

        Map<String, List<String>> errors = new HashMap<>();

        errors.put("duration", List.of("Must have a value."));
        errors.put("artists", List.of("Song must have at least one artist."));
        errors.put("genres", List.of("Must not be empty."));
        errors.put("releaseTimestamp", List.of("Must have a value."));
        errors.put("title", List.of("Must not be blank."));

        ResponseEntity<Object> errorResponse = validationExceptionHandler.sendBadRequestResponse(errors);

        // WHEN
        ResultActions result = mockMvc.perform(post("/api/v1/songs").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(songCreateRequestDTO)));

        // THEN
        result.andExpect(status().isBadRequest());
        result.andExpect(content().contentType(MediaType.APPLICATION_JSON));
        result.andExpect(content().json(objectMapper.writeValueAsString(errorResponse.getBody())));
    }


    @Test
    void shouldRespondWith201StatusCodeAndSongDTODerivedFromCreatedEntity() throws Exception {

        // GIVEN
        Long id=123L,  releaseDate=1723441L;
        String title = "Hymn For The Weekend";
        Integer duration = 210;
        List<ArtistDTO> artists = List.of(
                new ArtistDTO("Coldplay", ArtistCredit.PRIMARY)
        );
        List<AlbumDTO> albums = List.of(
                new AlbumDTO("A Head Full of Dreams", 1)
        );

        List<String> genres = Arrays.asList("Alternative", "Indie", "R&B");

        Song song = new Song(title, duration, releaseDate);
        song.setId(id);
        Mockito.when(songService.addSong(Mockito.any(SongCreateRequestDTO.class))).thenReturn(song);

        SongGetResponseDTO songGetResponseDTO = new SongGetResponseDTO(id, title, duration, releaseDate);

        // WHEN
        SongCreateRequestDTO songCreateRequestDTO = new SongCreateRequestDTO(title, artists, albums, genres, duration, releaseDate);
        ResultActions result = mockMvc.perform(post("/api/v1/songs").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(songCreateRequestDTO)));

        // THEN
        result.andExpect(status().isCreated());
        result.andExpect(content().json(objectMapper.writeValueAsString(songGetResponseDTO)));

    }

}