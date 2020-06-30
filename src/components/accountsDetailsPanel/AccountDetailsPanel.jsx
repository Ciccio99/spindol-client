import React from 'react';
import {
  Divider,
} from '@material-ui/core';
import PanelModule from 'components/organizers/PanelModule';
import AccountInfoPanel from './accountInfoPanel/AccountInfoPanel';
import AccountPasswordPanel from './accountPasswordPanel/AccountPasswordPanel';

const TITLE = 'Account Info';

const AccountDetailsPanel = () => (
  <PanelModule title={TITLE}>
    <AccountInfoPanel />
    <Divider />
    <AccountPasswordPanel />
  </PanelModule>
);

export default AccountDetailsPanel;
