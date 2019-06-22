/* eslint-disable react/display-name */
import React from 'react';
import MenuBar from './MenuBar.jsx';

export default Children => props => <MenuBar><Children {...props} /></MenuBar>;
