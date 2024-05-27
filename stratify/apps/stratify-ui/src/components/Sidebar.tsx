import React from 'react';
import { Link } from 'react-router-dom';

// sidebar components
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem
  // SidebarContent,
  // SidebarFooter,
  // SidebarHeader
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

// icons
import { FaGem, FaHistory, FaRobot } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { BiTestTube } from 'react-icons/bi';
import { VscGraph } from 'react-icons/vsc';

function Sidebar() {
  return (
    <ProSidebar collapsed={false} breakPoint="xl">
      {/* <SidebarHeader></SidebarHeader> */}

      {/* <SidebarContent> */}
      <Menu>
        {/* <Menu iconShape="circle"> // removed from library */}
        <MenuItem icon={<FaRobot />}>
          Your Bots
          <Link to="/bots" />
        </MenuItem>
        <MenuItem icon={<VscGraph />}>
          Dashboard
          <Link to="/" />
        </MenuItem>
        <MenuItem icon={<FaGem />}>
          Strategies
          <Link to="/strategies" />
        </MenuItem>
        <MenuItem icon={<BiTestTube />}>
          Backtesting
          <Link to="/backtesting" />
        </MenuItem>
        <MenuItem icon={<FaHistory />}>
          Trade History
          <Link to="/history" />
        </MenuItem>
        <MenuItem icon={<FiSettings />}>
          Settings
          <Link to="/settings" />
        </MenuItem>
      </Menu>
      {/* </SidebarContent> */}

      {/* <SidebarFooter></SidebarFooter> */}
    </ProSidebar>
  );
}

export default Sidebar;
