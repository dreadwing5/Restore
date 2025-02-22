# Optimistic Updates in RTK Query

## What are Optimistic Updates?

Optimistic updates are a UI pattern where we update the local state immediately before receiving confirmation from the server. This creates a more responsive user experience by:

1. Showing changes instantly to users
2. Avoiding loading states for common actions
3. Rolling back changes if the server request fails

## How Optimistic Updates Work

The general flow of an optimistic update is:

1. Update local cache immediately
2. Send request to server
3. If successful: Keep the optimistic update
4. If failed: Rollback to previous state

## Implementation Example

Here's a real-world example of optimistic updates in a shopping basket:

```typescript
addBasketItem: builder.mutation<Basket, { product: Product; quantity: number }>({
  query: ({ product, quantity }) => ({
    url: "basket",
    params: { productId: product.id, quantity },
    method: "POST",
  }),
  // Optimistic update logic
  onQueryStarted: async ({ product, quantity }, { dispatch, queryFulfilled }) => {
    // 1. Create optimistic update patch
    const patchResult = dispatch(
      basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
        const existingItem = draft.items.find(
          (item) => item.productId === product.id
        );
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          draft.items.push(new Item(product, quantity));
        }
      })
    );

    try {
      // 2. Wait for the server response
      await queryFulfilled;
    } catch (error) {
      // 3. If error occurs, undo the optimistic update
      patchResult.undo();
    }
  },
}),
```

## Key Components

### 1. onQueryStarted

This callback runs when the mutation starts. It receives:

- The mutation arguments
- A context object with `dispatch` and `queryFulfilled`

```typescript
onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
  // Optimistic update logic here
};
```

### 2. updateQueryData

Used to modify the cached data:

```typescript
dispatch(
  api.util.updateQueryData("queryName", queryArg, (draft) => {
    // Modify draft using "mutating" logic
    // Immer makes this immutable under the hood
  })
);
```

### 3. Rollback Mechanism

The `patchResult.undo()` function restores the previous state if the server request fails:

```typescript
try {
  await queryFulfilled;
} catch (error) {
  patchResult.undo();
}
```

## Best Practices

1. **Keep Updates Simple**: Optimistic updates should be predictable and easy to rollback.

2. **Handle Edge Cases**: Consider scenarios like:

   - Network failures
   - Concurrent updates
   - Server validation errors

3. **User Feedback**: Inform users when:
   - Updates are in progress
   - Updates fail and are rolled back
   - Updates succeed

## When to Use Optimistic Updates

Optimistic updates are ideal for:

✅ High-frequency actions (adding/removing items)
✅ Actions that rarely fail
✅ UI responsiveness is crucial
✅ Network latency is noticeable

Avoid for:

❌ Complex state changes
❌ Actions that often fail
❌ Critical financial transactions
❌ When consistency is more important than speed

## Example Use Cases

1. **Shopping Cart Operations**

   - Adding/removing items
   - Updating quantities
   - Applying coupons

2. **Social Media Actions**

   - Likes/unlikes
   - Following/unfollowing
   - Simple comments

3. **Task Management**
   - Completing todos
   - Reordering items
   - Setting priorities

## Error Handling

Always implement proper error handling:

```typescript
try {
  await queryFulfilled;
} catch (error) {
  // 1. Rollback optimistic update
  patchResult.undo();

  // 2. Show error to user
  console.error(error);
  // or toast.error("Failed to update basket");

  // 3. Optional: Additional error handling
  // - Retry logic
  // - Error reporting
  // - Recovery strategies
}
```

For more information, see the [official RTK Query documentation](https://redux-toolkit.js.org/rtk-query/usage/optimistic-updates).

```

This documentation provides a comprehensive guide to optimistic updates in RTK Query, using your basket implementation as a practical example. It covers the concept, implementation details, best practices, and common use cases.
```
