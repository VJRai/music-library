package com.vjrai.backend.common;


import lombok.*;

@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SearchCriteria {

    private String filterKey;
    private Object value;
    private String operation;
    private String searchType;

}
