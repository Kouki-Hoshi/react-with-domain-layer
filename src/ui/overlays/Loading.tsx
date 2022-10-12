import { CircularProgress, styled } from "@mui/material";

const Overlay = styled("div")({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  background: "rgba(100, 100, 100, .8)",
  zIndex: 2147483647,
});

const Loading: React.FC<{}> = ({}) => {
  return (
    <Overlay>
      <CircularProgress />
    </Overlay>
  );
};

export default Loading;
