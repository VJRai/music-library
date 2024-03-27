package com.vjrai.backend.song;

import com.vjrai.backend.common.SearchCriteria;
import com.vjrai.backend.common.enums.SearchOperation;
import com.vjrai.backend.common.implementation.ISpecificationBuilder;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class SongSpecificationBuilder implements ISpecificationBuilder<Song> {

    private final List<SearchCriteria> searchParams = new ArrayList<>();

    public final SongSpecificationBuilder with(SearchCriteria searchCriteria){
        searchParams.add(searchCriteria);
        return this;
    }

    public Specification<Song> build(){
        if(searchParams.isEmpty()){
            return null;
        }

        Specification<Song> songSpecification = new SongSpecification(searchParams.get(0));

        for (int index = 1; index < searchParams.size(); index++){

            SearchCriteria criteria = searchParams.get(index);

            songSpecification = SearchOperation.getSearchType(criteria.getSearchType()) == SearchOperation.ALL
                    ? Specification.where(songSpecification).and(new SongSpecification(criteria))
                    : Specification.where(songSpecification).or(new SongSpecification(criteria));
        }

        return songSpecification;
    }





}
