import React from 'react';
import styled, { css } from 'styled-components';

import { useSelector, store } from '../../index';
import Nui from "../../Nui";

Nui.onEvent("SHOW", (payload) => {
  store.dispatch({type: "SHOW", payload})
})

const Container = styled.div`
position: absolute;
width: 100%;
height: 100%;
${process.env.NODE_ENV == "development" && 
    css`
        background-image: url("https://cdn.discordapp.com/attachments/655453054522621964/669602739545964564/20190715004102_1.jpg");
    `
}
`;

const App = () => {
  const show = useSelector(state => state.Show)

  return (
    <Container hidden={!show}>
      <h1 style={{fontSize: "30px"}}>{show.toString()}</h1>
    </Container>
  )
};

export default App

