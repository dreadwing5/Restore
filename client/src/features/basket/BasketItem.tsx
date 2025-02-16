import { Box, Typography, Paper, Grid2, IconButton } from "@mui/material";
import { Item } from "../../app/models/basket";
import { Add, Close, Remove } from "@mui/icons-material";

type Props = {
  item: Item;
};

export function BasketItem({ item }: Props) {
  return (
    <Paper
      sx={{
        height: 140,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={item.pictureUrl}
          alt={item.name}
          sx={{
            height: 100,
            width: 100,
            objectFit: "cover",
            borderRadius: "4px",
            mr: 8,
            ml: 4,
          }}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">{item.name}</Typography>
          <Box display="flex" alignItems="center" gap={3}>
            <Typography sx={{ fontSize: "1.1rem" }} variant="h6">
              ${((item.price / 100) * item.quantity).toFixed(2)} x
              {item.quantity}
            </Typography>
            <Typography sx={{ fontSize: "1.1rem" }} variant="h6">
              ${((item.price / 100) * item.quantity).toFixed(2)}
            </Typography>
          </Box>

          <Grid2 container spacing={1} alignItems="center">
            <IconButton
              color="error"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6">{item.quantity}</Typography>
            <IconButton
              color="success"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
            >
              <Add />
            </IconButton>
          </Grid2>
        </Box>
      </Box>
      <IconButton
        color="error"
        size="small"
        sx={{
          border: 1,
          borderRadius: 1,
          minWidth: 0,
          alignSelf: "start",
          mr: 1,
          mt: 1,
        }}
      >
        <Close />
      </IconButton>
    </Paper>
  );
}
