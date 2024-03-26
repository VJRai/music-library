package com.vjrai.backend.artist;

import com.vjrai.backend.common.SongArtist;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class ArtistResponseDTO {

    private Long id;

    private String name;

}
