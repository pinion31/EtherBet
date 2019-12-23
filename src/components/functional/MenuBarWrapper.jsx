/* eslint-disable react/display-name */
import React from 'react';
import LoginBar from './LoginBar.jsx';

export const menuWrapper = Children => props => <LoginBar><Children {...props} /></LoginBar>;
