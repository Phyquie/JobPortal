import { configureStore } from "@reduxjs/toolkit";

import { featureApi } from "./slices/featureapislice";
import { userApi } from "./slices/userSlice";
import { companyApi } from "./slices/companySlice";
import { clerkApi } from "./slices/clerkSlice";

const store = configureStore({
    reducer: {
        [featureApi.reducerPath]: featureApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
        [clerkApi.reducerPath]: clerkApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(featureApi.middleware)
        .concat(userApi.middleware)
        .concat(companyApi.middleware)
        .concat(clerkApi.middleware),

    // Enable Redux DevTools in development mode
    devTools: process.env.NODE_ENV !== "production",
});

export default store;