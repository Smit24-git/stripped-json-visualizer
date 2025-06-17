'use client'
import React from "react";
import { Menu, Flex, SegmentedControl, Text } from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";
import { BsCheck2 } from "react-icons/bs";
import { CgChevronDown } from "react-icons/cg";
import { ViewMode } from "../../../../_enums/viewMode.enum";
import useConfig from "../../../../_store/useConfig";
import styles from './toolbar.module.css'

export const ViewMenu = () => {
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);
  const toggleDarkMode = useConfig(state => state.toggleDarkMode);
  const [viewMode, setViewMode] = useSessionStorage({
    key: "viewMode",
    defaultValue: ViewMode.Graph,
  });

  return (
    <Menu shadow="md" closeOnItemClick={false} withArrow>
      <Menu.Target>
       <button className={styles['styled-toolbar-button']}>
          <Flex align="center" gap={3}>
            View <CgChevronDown />
          </Flex>
        </button>
      </Menu.Target>
      <Menu.Dropdown>
        <SegmentedControl
          size="xs"
          miw="120"
          w="100%"
          value={viewMode}
          onChange={e => {
            // disabled for the time being.
            // TODO: enable when both modes are available for tree view; dark and light
            setViewMode(e as ViewMode);
          }}
          data={[
            { value: ViewMode.Graph, label: "Graph" },
            { value: ViewMode.Tree, label: "Tree" },
          ]}
          fullWidth
          mb="4"
        />
        <Menu.Divider />
        <Menu.Item
          leftSection={<BsCheck2 opacity={darkmodeEnabled ? 100 : 0} />}
          onClick={() => {
            toggleDarkMode(!darkmodeEnabled);
          }}
        >
          <Text size="xs">Dark Mode</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
