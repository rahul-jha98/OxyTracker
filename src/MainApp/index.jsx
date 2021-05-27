import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import TopNavigation from './TopNavigation';
import ContentArea from './ContentArea';

import { TAB_HEIGHT_BELOW_SM, TAB_HEIGHT_ABOVE_SM } from './common/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  tabs: {
    minHeight: TAB_HEIGHT_BELOW_SM + 8,
    [theme.breakpoints.up('sm')]: {
      minHeight: TAB_HEIGHT_ABOVE_SM + 8,
    },
  },
  content: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();

  const tabsList = ['Entities', 'Cylinders', 'Home Patients', 'Add Entities'];
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopNavigation
        tabsList={tabsList}
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.tabs} />
        <div className="container padding">
          <ContentArea selectedTab={selectedTab} />
        </div>
      </main>

    </div>
  );
};
