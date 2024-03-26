package com.vjrai.backend.artist;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {

    public Artist findByName(String name);

}
