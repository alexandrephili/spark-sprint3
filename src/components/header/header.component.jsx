import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

//import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser }) => (
    <div className='header'>
      <div className='options'>
      <Link className='option' to='/capture'>
          CAPTURE
      </Link>
      <Link className='option' to='/connect'>
          CONNECT
      </Link>
      <Link className='option' to='/invent'>
          INVENT
      </Link>
      <Link className='option' to='/tag-manager'>
          TAG MANAGER
      </Link>
      {currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>
             SIGN OUT
          </div>
      ) : (
          <Link className='option' to='/signin'>
              SIGN IN
          </Link>
      )}
    </div>
  </div>
)

export default Header;