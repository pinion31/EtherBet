import React from 'react';
import MenuBar from './MenuBar.jsx';

export const menuWrapper = Children => props => <MenuBar><Children {...props} /></MenuBar>;