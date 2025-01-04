import { decrement, increment } from "./conterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppSelector } from "../../app/store/store";
import { useAppDispatch } from "../../app/store/store";

export default function ContactPage() {
  const { data } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <>
      <Typography variant="h1">Contact Page</Typography>
      <Typography variant="body1">The data is : {data}</Typography>
      <ButtonGroup>
        <Button color="error" onClick={() => dispatch(decrement(1))}>
          Decrement
        </Button>
        <Button color="success" onClick={() => dispatch(increment(1))}>
          Increment
        </Button>

        <Button color="primary" onClick={() => dispatch(increment(5))}>
          Increment by 5
        </Button>
      </ButtonGroup>
    </>
  );
}
