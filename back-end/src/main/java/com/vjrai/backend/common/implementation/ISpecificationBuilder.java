package com.vjrai.backend.common.implementation;

import com.vjrai.backend.common.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

public interface ISpecificationBuilder<E> {

    public ISpecificationBuilder with(SearchCriteria searchCriteria);

    public Specification<E> build();

}
