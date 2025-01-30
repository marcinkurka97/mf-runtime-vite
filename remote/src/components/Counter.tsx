import { useState } from "react";

import styled from "styled-components";

const StyledButton = styled.button`
  border: 0 solid #e2e8f0;
  margin-top: 10px;
  background: rgb(53, 210, 41);
  border-radius: 0.25rem;
  font-weight: 700;
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: rgb(24, 24, 24);
`;

export default () => {
  const [count, setCount] = useState<number>(0);

  return (
    <StyledButton onClick={() => setCount(count + 1)}>
      Remote counter: {count}
    </StyledButton>
  );
};
