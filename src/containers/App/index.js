import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector, store } from '../../index';
import Nui from '../../Nui';

Nui.onEvent('SHOW', (payload) => {
  store.dispatch({ type: 'SHOW', payload });
});

const useStyles = makeStyles(() => ({
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundImage: 'url("https://cdn.discordapp.com/attachments/655453054522621964/669602739545964564/20190715004102_1.jpg")',
  },
}));

const App = () => {
  const show = useSelector((state) => state.Show.show);
  const classes = useStyles();

  let toggle = true;

  let test = 5;

  const handleKeyPress = useCallback(
    (e) => {
      // Press U to trigger Event
      if (e.keyCode === 85) {
        e.preventDefault();
        Nui.emitEvent('SHOW', { show: !toggle });
        toggle = !toggle;
      }
    }, [],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, [handleKeyPress]);

  return (
    <div className={classes.background} hidden={!show}>
      <h1 style={{ fontSize: '30px' }}>{show.toString()}</h1>
    </div>
  );
};

export default App;
