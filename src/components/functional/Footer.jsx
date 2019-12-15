import React from 'react';
import injectSheet from 'react-jss';
import { bluePrimary0 } from '../../constants/colors';

const styles = {
  bg: {
    backgroundColor: bluePrimary0,
    width: '100%',
    height: 150,
    marginTop: -172,
  },
};
const Footer = ({ classes: { bg} }) => (
  <div className={bg}>
    <h5>Copyright 2019 </h5>
  </div>
);

export default injectSheet(styles)(Footer);
