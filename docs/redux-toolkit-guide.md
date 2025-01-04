# Redux Toolkit Guide

## Key Features

Redux Toolkit includes several powerful features:

### 1. configureStore

```typescript
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
});
```

- Automatically combines reducers
- Adds Redux DevTools integration
- Includes redux-thunk by default

### 2. createSlice

```typescript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer allows "mutating" logic
    },
  },
});
```

- Generates action creators automatically
- Simplifies reducer logic
- Enables "mutating" logic via Immer

### 3. createAsyncThunk

```typescript
const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId: string) => {
    const response = await api.fetchUser(userId);
    return response.data;
  }
);
```

- Simplifies async logic
- Generates pending/fulfilled/rejected action types
- Integrates with TypeScript

## Best Practices

1. Use `createSlice` for all reducer logic
2. Leverage RTK Query for data fetching
3. Keep state slices focused and modular
4. Use TypeScript for better type safety
