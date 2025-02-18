import { useEffect } from "react";
import { ThemeProvider } from "styled-components";

import Counter from "./components/Counter";
import Wrapper from "./components/Wrapper";

export default () => {
  useEffect(() => {
    console.log("Remote useEffect");
  }, []);

  return (
    <ThemeProvider theme={{ primary: "blue" }}>
      <Wrapper>
        <Counter />
      </Wrapper>
    </ThemeProvider>
  );
};
