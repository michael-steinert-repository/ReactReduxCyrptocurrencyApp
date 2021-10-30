import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const coinrankingApiHeaders = {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
}
const baseUrl = "https://coinranking1.p.rapidapi.com";
const createRequest = (url) => ({
    url: url,
    headers: coinrankingApiHeaders
});

export const coinrankingApi = createApi({
    reducerPath: "coinrankingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getCoinranking: builder.query({
            query: (coinCount) => (
                createRequest(`/coins?limit=${coinCount}`)
            )
        }),
        getCoinrankingDetails: builder.query({
            query: (coinId) => (
                createRequest(`/coin/${coinId}`)
            )
        }),
        getCoinrankingHistory: builder.query({
            query: ({coinId, timePeriod}) => (
                createRequest(`/coin/${coinId}/history/${timePeriod}`)
            )
        }),
    })
});

export const {
    /* Redux Toolkit creates a Hook from created Endpoints */
    /* Constraint of auto generated Hooks: use + "Endpoint Name" + Query */
    useGetCoinrankingQuery, useGetCoinrankingDetailsQuery, useGetCoinrankingHistoryQuery
} = coinrankingApi;