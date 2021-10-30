import {configureStore} from "@reduxjs/toolkit";
import {coinrankingApi} from "../services/coinrankingApi";
import {bingNewsSearchApi} from "../services/bingNewsSearchApi";

export default configureStore({
    reducer: {
        [coinrankingApi.reducerPath]: coinrankingApi.reducer,
        [bingNewsSearchApi.reducerPath]: bingNewsSearchApi.reducer,
    },
});