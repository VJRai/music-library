package com.vjrai.backend.artist;

import com.vjrai.backend.artist.ArtistCredit;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ArtistDTO {

    @NotNull(message = "Must have a value.")
    @NotBlank(message = "Must not be blank.")
    private String name;

    @Valid
    @NotNull(message = "Must have a value.")
    private ArtistCredit credit;

}
