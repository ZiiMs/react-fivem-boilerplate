import { useNuiEvent } from "fivem-nui-react-lib";
import React, { useState, useCallback, useEffect } from "react";
import {   
  chakra,
  Box,
  useColorModeValue,
  } from "@chakra-ui/react";


const App = () => {
  const [show, setShow] = useState(true);
  useNuiEvent('example', 'setShow', setShow);

  const handleKeyPress = useCallback(
    (e) => {
      // Press U to trigger Event
      console.log(show)
      if (e.keyCode === 85) {
        e.preventDefault();
        setShow(!show)
      }
    }, [show],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, [handleKeyPress]);

  return (
    <>
    {show ? (
      <Box bg={useColorModeValue("white", "gray.800")}>
        <chakra.h1>Hello World</chakra.h1>
      </Box>
      ): null}
  </>
  )
}

export default App;