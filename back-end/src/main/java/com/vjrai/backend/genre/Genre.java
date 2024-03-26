package com.vjrai.backend.genre;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "genres")
@Table(name = "genres")
@Data
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Exclude
    private Long id;

    @Column
    @NotNull
    private String name;

    @Column
    @NotNull
    @EqualsAndHashCode.Exclude
    private Date createdAt = new Date();

    public Genre(String name) {
        this.name = name;
    }
}
