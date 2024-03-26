package com.vjrai.backend.common.enums;

public enum SearchOperation {

    GREATER_THAN, GREATER_THAN_EQUAL, LESS_THAN, LESS_THAN_EQUAL,
    CONTAINS, DOES_NOT_CONTAIN,
    EQUAL, NOT_EQUAL,
    ANY, ALL;
    public static final String[] OPERATION_SET = {
            "gt", "ge", "lt", "le",
            "cn", "nc", "eq", "ne",
    };

    public static SearchOperation getSearchType(final String searchType){
        return switch (searchType) {
            case "all" -> ALL;
            case "any" -> ANY;
            default -> null;
        };
    }

    public static SearchOperation getSearchOperation(final String operation) {
        return switch (operation) {
            case "gt" -> GREATER_THAN;
            case "gte" -> GREATER_THAN_EQUAL;
            case "lt" -> LESS_THAN;
            case "lte" -> LESS_THAN_EQUAL;
            case "cn" -> CONTAINS;
            case "nc" -> DOES_NOT_CONTAIN;
            case "eq" -> EQUAL;
            case "ne" -> NOT_EQUAL;
            default -> null;
        };
    }
}
