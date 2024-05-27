import React from "react";
import { Link } from "react-router-dom";

// sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

// icons
import { FaGem, FaHistory, FaRobot } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { BiTestTube } from "react-icons/bi";
import { VscGraph } from "react-icons/vsc";

function Sidebar() {
  return (
    // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    <ProSidebar collapsed={false} breakPoint="xl">
      <SidebarHeader></SidebarHeader>

      <SidebarContent>
        // @ts-expect-error TS(2322): Type 'Element' is not assignable to type 'ReactNod... Remove this comment to see the full error message
        <Menu iconShape="circle">
          // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
          <MenuItem icon={<FaRobot />}>
            Your Bots
            <Link to="/bots" />
          </MenuItem>
          // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
          <MenuItem icon={<VscGraph />}>
            Dashboard
            <Link to="/" />
          </MenuItem>
          // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
          <MenuItem icon={<FaGem />}>
            Strategies
            <Link to="/strategies" />
          </MenuItem>
          // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
          <MenuItem icon={<BiTestTube />}>
            Backtesting
            <Link to="/backtesting" />
          </MenuItem>
          // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
          <MenuItem icon={<FaHistory />}>
            Trade History
            <Link to="/history" />
          </MenuItem>
          // @ts-expect-error TS(2746): This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
          <MenuItem icon={<FiSettings />}>
            Settings
            <Link to="/settings" />
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter></SidebarFooter>
    </ProSidebar>
  );
}

export default Sidebar;
