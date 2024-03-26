package com.vjrai.backend.album;


import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AlbumDTO {

    @NotNull(message = "Must have a value.")
    @NotBlank(message = "Must not be blank.")
    private String name;

    @NotNull(message = "Must have a value.")
    @Positive(message = "Must be a positive number")
    private Integer trackNumber;

}
