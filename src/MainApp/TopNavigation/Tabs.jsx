import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const CustomTabs = withStyles((theme) => ({
  root: {
    minHeight: 40,
    [theme.breakpoints.down('sm')]: {
      minHeight: 36,
    },
  },
}))((props) => <Tabs disableRipple {...props} />);

const CustomTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    padding: '6px 8px',
    fontSize: 18,
    minWidth: 60,
    marginRight: theme.spacing(2),
    minHeight: 40,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      minHeight: 36,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export default ({ selectedTab, handleTabChange, tabsList }) => (
  <CustomTabs
    value={selectedTab}
    onChange={handleTabChange}
    indicatorColor="primary"
    textColor="primary"
    variant="scrollable"
    scrollButtons="auto"
    aria-label="scrollable-text"
    className="container"
  >
    { tabsList.map((tabName, idx) => (
      <CustomTab
        label={tabName}
        {...a11yProps(idx)}
        disableRipple
      />
    ))}
  </CustomTabs>
);
