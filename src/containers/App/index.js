import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector, store } from '../../index';
import Nui from '../../Nui';

Nui.onEvent('SHOW', (payload) => {
  store.dispatch({ type: 'SHOW', payload });
});

const useStyles = makeStyles(() => ({
  background: {
    backgroundImage: 'url("https://cdn.discordapp.com/attachments/655453054522621964/669602739545964564/20190715004102_1.jpg")',
  },
}));

const App = () => {
  const show = useSelector((state) => state.Show.show);
  const classes = useStyles();

  return (
    <div className={classes.background} hidden={!show}>
      <h1 style={{ fontSize: '30px' }}>{show.toString()}</h1>
    </div>
  );
};

export default App;
