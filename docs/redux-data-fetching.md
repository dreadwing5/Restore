# Data Fetching in Redux: Thunks vs RTK Query

## Why Not in Reducers?

Reducers must be pure functions - they should:

- Only calculate the new state value based on state/action arguments
- Not modify state directly
- Not have side effects (API calls, async logic, etc.)

Therefore, data fetching logic must live outside reducers.

## Redux Thunks

### What is a Thunk?

A thunk is a function that wraps an expression to delay its evaluation. In Redux, thunks are middleware that allow you to write action creators that return a function instead of an action object.

### Example with Thunks

```typescript
// Action Types
interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

// Action Creator (Thunk)
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("api/products");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    error: null,
  } as ProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Usage in Component
function ProductList() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  return <div>{/* render products */}</div>;
}
```

## RTK Query

RTK Query is a powerful data fetching and caching tool that eliminates the need to write thunks and reducers for data fetching.

### Example with RTK Query

```typescript
// API Slice
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = apiSlice;

// Usage in Component
function ProductList() {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  return <div>{/* render products */}</div>;
}
```

## Why RTK Query?

1. **Less Boilerplate**: Compare the two examples above - RTK Query requires significantly less code.

2. **Automatic Caching**: RTK Query handles caching automatically, including:

   - Deduplication of requests
   - Cache invalidation
   - Polling
   - Optimistic updates

3. **Built-in Loading States**: No need to manage loading/error states manually.

4. **Automatic Re-fetching**: Configurable re-fetching on window focus, reconnection, etc.

5. **Generated Hooks**: Automatically generates typed hooks for your endpoints.

## When to Use Each

### Use Thunks When:

- You need complex async logic
- You need to coordinate multiple actions
- You need more control over the data flow

### Use RTK Query When:

- You're building a data-heavy application
- You need automatic caching
- You want to minimize boilerplate code
- You're making standard CRUD API calls

## Setting Up RTK Query

```typescript
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Optional: enable refetchOnFocus/refetchOnReconnect
import { setupListeners } from "@reduxjs/toolkit/query";
setupListeners(store.dispatch);
```

For more information, see the [official RTK Query documentation](https://redux-toolkit.js.org/tutorials/rtk-query).
