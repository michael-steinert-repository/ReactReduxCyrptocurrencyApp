import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const bingNewsSearchApiHeaders = {
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
}
const baseUrl = "https://bing-news-search1.p.rapidapi.com";
const createRequest = (url) => ({
    url: url,
    headers: bingNewsSearchApiHeaders
});

export const bingNewsSearchApi = createApi({
    reducerPath: "bingNewsSearchApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getBingNewsSearch: builder.query({
            query: ({newsCategory, newsCount}) => (
                createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${newsCount}`)
            )
        })
    })
});

export const {
    /* Redux Toolkit creates a Hook from created Endpoints */
    /* Constraint of auto generated Hooks: use + "Endpoint Name" + Query */
    useGetBingNewsSearchQuery,
} = bingNewsSearchApi;