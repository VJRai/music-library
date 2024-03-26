package com.vjrai.backend.genre;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    public Genre findByName(String name);
}
