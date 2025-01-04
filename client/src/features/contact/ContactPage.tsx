import { useDispatch, useSelector } from "react-redux";
import { CounterState, decrement, increment } from "./conterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";

export default function ContactPage() {
  const data = useSelector((state: CounterState) => state.data);
  const dispatch = useDispatch();
  return (
    <>
      <Typography variant="h1">Contact Page</Typography>
      <Typography variant="body1">The data is : {data}</Typography>
      <ButtonGroup>
        <Button color="error" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
        <Button color="success" onClick={() => dispatch(increment())}>
          Increment
        </Button>

        <Button color="primary" onClick={() => dispatch(increment(5))}>
          Increment by 5
        </Button>
      </ButtonGroup>
    </>
  );
}
