import { Grid2, Typography } from "@mui/material";
import { BasketItem } from "./BasketItem";
import { useFetchBasketQuery } from "./basketApi";

export default function BasketPage() {
  const { data, isLoading } = useFetchBasketQuery();

  if (isLoading) return <Typography variant="h3">Loading basket...</Typography>;

  if (!data) return <Typography variant="h3">Your Basket is empty</Typography>;
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {data.items.map((item) => (
          <BasketItem item={item} key={item.productId} />
        ))}
      </Grid2>
    </Grid2>
  );
}
