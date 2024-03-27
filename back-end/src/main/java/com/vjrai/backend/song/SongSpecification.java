package com.vjrai.backend.song;

import com.vjrai.backend.album.Album;
import com.vjrai.backend.artist.Artist;
import com.vjrai.backend.common.SearchCriteria;
import com.vjrai.backend.common.enums.SearchOperation;
import com.vjrai.backend.genre.Genre;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.Calendar;
import java.util.Objects;
import java.util.TimeZone;

public class SongSpecification implements Specification<Song>{

    private final SearchCriteria searchCriteria;

    public SongSpecification(SearchCriteria searchCriteria) {
        this.searchCriteria = searchCriteria;
    }

    @Override
    public Predicate toPredicate(Root<Song> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

        String strToSearch = searchCriteria
                .getValue()
                .toString()
                .toLowerCase();

        switch(Objects.requireNonNull(SearchOperation.getSearchOperation(searchCriteria.getOperation()))){

            case LESS_THAN:
                if(searchCriteria.getFilterKey().equals("id")) {
                    return criteriaBuilder.lessThan(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("duration")) {
                    return criteriaBuilder.lessThan(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("releaseDate")) {
                    return criteriaBuilder.lessThan(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }

                break;
            case LESS_THAN_EQUAL:
                if(searchCriteria.getFilterKey().equals("id")) {
                    return criteriaBuilder.lessThanOrEqualTo(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("duration")) {
                    return criteriaBuilder.lessThanOrEqualTo(
                            root.get(searchCriteria.getFilterKey())
                            , strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("releaseDate")) {
                    return criteriaBuilder.lessThanOrEqualTo(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }
            break;
            case GREATER_THAN:
                if(searchCriteria.getFilterKey().equals("id")) {
                    return criteriaBuilder.greaterThan(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("duration")) {
                    return criteriaBuilder.greaterThan(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("releaseDate")) {
                    return criteriaBuilder.greaterThan(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }
            break;
            case GREATER_THAN_EQUAL:
                if(searchCriteria.getFilterKey().equals("id")) {
                    return criteriaBuilder.greaterThanOrEqualTo(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("duration")) {
                    return criteriaBuilder.greaterThanOrEqualTo(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("releaseDate")) {
                    return criteriaBuilder.greaterThanOrEqualTo(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }
            break;
            case EQUAL:
                if(searchCriteria.getFilterKey().equals("id")) {
                    return criteriaBuilder.equal(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );
                }
                if(searchCriteria.getFilterKey().equals("title")) {
                    return criteriaBuilder.equal(
                        criteriaBuilder.lower(
                            root.get(searchCriteria.getFilterKey())
                        )
                        , strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("artist")) {

                    return criteriaBuilder.equal(
                        criteriaBuilder.lower(
                            artistJoin(root).get("name")
                        )
                        , strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("album")) {

                    return criteriaBuilder.equal(
                        criteriaBuilder.lower(
                                albumJoin(root).get("name")
                        )
                        , strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("genre")) {

                    return criteriaBuilder.equal(
                        criteriaBuilder.lower(
                                genreJoin(root).get("name")
                        )
                        ,  strToSearch
                    );
                }

                if(searchCriteria.getFilterKey().equals("duration")) {

                    return criteriaBuilder.equal(
                        root.get(searchCriteria.getFilterKey())
                        , strToSearch
                    );

                }

                if(searchCriteria.getFilterKey().equals("releaseDate")) {

                    Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
                    calendar.setTimeInMillis(Long.parseLong(strToSearch));
                    calendar.set(Calendar.DAY_OF_YEAR, 1);
                    calendar.set(Calendar.SECOND, 0);
                    calendar.set(Calendar.MINUTE, 0);
                    calendar.set(Calendar.HOUR_OF_DAY, 0);
                    calendar.set(Calendar.MILLISECOND, 0);

                    Long firstDay = calendar.getTime().getTime();

                    calendar.set(Calendar.DAY_OF_YEAR, calendar.getActualMaximum(Calendar.DAY_OF_YEAR));
                    calendar.set(Calendar.MINUTE, 59);
                    calendar.set(Calendar.HOUR_OF_DAY, 23);
                    calendar.set(Calendar.SECOND, 59);

                    Long lastDayOfYear = calendar.getTime().getTime();

                    return criteriaBuilder.between(
                        root.get(searchCriteria.getFilterKey())
                        , firstDay, lastDayOfYear
                    );

                }

            break;
        }

        return null;

    }

    private Join<Song, Artist> artistJoin(Root<Song> root){
        return root.join("artists").join("artist");
    }

    private Join<Song, Album> albumJoin(Root<Song> root){
        return root.join("albums").join("album");
    }

    private Join<Song, Genre> genreJoin(Root<Song> root){
        return root.join("genres", JoinType.LEFT);
    }
}
