import React from 'react';
import { Divider } from '@material-ui/core';
import PanelModule from 'components/common/PanelModule';
import { redirectToCustomerPortal } from 'services/PlansServices';
import Section from 'components/common/Section';
import Button from 'components/common/Button';
import AccountPasswordPanel from './accountPasswordPanel/AccountPasswordPanel';
import AccountInfoPanel from './accountInfoPanel/AccountInfoPanel';

const TITLE = 'Account Info';

const AccountDetailsPanel = () => (
  <>
    <PanelModule title={TITLE}>
      <AccountInfoPanel />
      <Divider />
      <AccountPasswordPanel />
    </PanelModule>
    <Section>
      <PanelModule title="Billing">
        <Button text="Manage Billing" onClick={redirectToCustomerPortal} />
      </PanelModule>
    </Section>
  </>
);

export default AccountDetailsPanel;
