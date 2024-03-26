package com.vjrai.backend.common.utils;

import com.vjrai.backend.common.SearchCriteria;
import com.vjrai.backend.common.implementation.ISpecificationBuilder;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ParamUtils {

    public static List<Sort.Order> stringToSortOrderList(String s){

        List<Sort.Order> sorts = new ArrayList<>();

        String[] splitSortParams = s.split(",");

        for (String sortParam: splitSortParams){

            String[] sortCase = sortParam.split(":");

            String field = sortCase[0].trim();
            String direction = sortCase[1].trim();

            Sort.Direction sortDirection = direction.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;

            sorts.add(new Sort.Order(sortDirection, field));

        }

        return sorts;

    }

    public static <E> Specification<E> stringToSpecification(String s, ISpecificationBuilder<E> b){

        String[] filterSplit = s.split("~");

        for(String filterParam: filterSplit){

            String[] params = filterParam.split(":");

            SearchCriteria searchCriteria = new SearchCriteria();
            searchCriteria.setFilterKey(params[0]);
            searchCriteria.setOperation(params[1]);
            searchCriteria.setValue(params[2]);
            searchCriteria.setSearchType("all");

            b.with(searchCriteria);

        }
        return b.build();
    }


}
