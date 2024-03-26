package com.vjrai.backend.album;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    public Album findByName(String name);
}
