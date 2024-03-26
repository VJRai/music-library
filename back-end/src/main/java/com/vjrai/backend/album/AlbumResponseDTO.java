package com.vjrai.backend.album;

import com.vjrai.backend.common.SongAlbum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class AlbumResponseDTO {

    private Long id;

    private String name;

}
