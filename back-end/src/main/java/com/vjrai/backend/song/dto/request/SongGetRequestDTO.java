package com.vjrai.backend.song.dto.request;

import com.vjrai.backend.album.AlbumDTO;
import com.vjrai.backend.artist.ArtistDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SongGetRequestDTO {

    @NotNull(message = "Must have a value.")
    @NotBlank(message = "Must not be blank.")
    private String title;

    @Valid
    private List<ArtistDTO> artists = new ArrayList<>();

    @Valid
    private List<AlbumDTO> albums = new ArrayList<>();

    @Valid
    @NotEmpty(message = "Must not be empty.")
    private List<String> genres = new ArrayList<>();

    @Min(value = 1, message = "Must be more than 0 seconds.")
    @NotNull(message = "Must have a value.")
    private Integer duration;

    @NotNull(message = "Must have a value.")
    private Long releaseTimestamp;

}
