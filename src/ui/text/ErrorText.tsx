import { styled } from "@mui/material";

type ErrorTextProps = {
  message: string;
};

const Message = styled("div")({
  color: "red",
});

const ErrorText: React.FC<ErrorTextProps> = ({ message }) => {
  return <Message>{message}</Message>;
};

export default ErrorText;
