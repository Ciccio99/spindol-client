import React from 'react';
import useMedium from 'hooks/useMedium';
import DesktopNavigation from 'components/common/DesktopNavigation';
import MobileNavigation from 'components/common/MobileNavigation';
import { useUserState } from 'context/userContext';

const Header = () => {
  const user = useUserState();
  const { isMedium } = useMedium();
  const isAuth = !!user._id;

  return isMedium ? (
    <MobileNavigation isAuth={isAuth} />
  ) : (
    <DesktopNavigation isAuth={isAuth} />
  );
};

export default React.memo(Header);
