import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Devices from './Devices';
import Gateways from './Gateways';

export const MyDevices = () => {
  const [tabs, setTabs] = useState([
    { label: 'Devices', content: <Devices /> },
    { label: 'Gateways', content: <Gateways /> },
  ]);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: {
            background: 'none', // Remove the default indicator (bottom border)
          },
        }}
        sx={{
          padding: '10px 0px 0px 10px',
          // borderBottom: '1px solid #ddd', // Add a border to the bottom of tabs
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            label={tab.label}
            key={index}
            sx={{
              border: '1px solid #ddd', // Add borders to all sides of each tab
              borderRadius: '10px 10px 0 0',
              backgroundColor: '#f0f0f0',
              borderBottom: 'none', // Remove the bottom border
              '&.Mui-selected': {
                borderBottom: 'none',
                backgroundColor: '#ffffff'
              },
            }}
          />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={selectedTab} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{}}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};
