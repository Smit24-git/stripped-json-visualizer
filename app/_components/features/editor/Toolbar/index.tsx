'use client'
import React from "react";
import { Flex, Group, Select, Button } from "@mantine/core";
import toast from "react-hot-toast";
import { AiOutlineFullscreen } from "react-icons/ai";
import { type FileFormat, formats } from "../../../../_enums/file.enum";
import { JSONVisLogo } from "../../../../_components/layout/JsonVisLogo";
import useFile from "../../../../_store/useFile";
import { FileMenu } from "./FileMenu";
import { ToolsMenu } from "./ToolsMenu";
import { ViewMenu } from "./ViewMenu";
import ToolbarOuterWrapper from "./_components/ToolbarOuterWrapper";
import styles from './toobar.module.css'


export const Toolbar = () => {
  const setFormat = useFile(state => state.setFormat);
  const format = useFile(state => state.format);

  return (
    <ToolbarOuterWrapper>
      <Group gap="xs" justify="left" w="100%" style={{ flexWrap: "nowrap" }}>
        <button style={{color: 'var(--interactive-normal-color)'}} className={styles['styled-toolbar-button']}>
          <Flex align="center" gap={3}>
            <JSONVisLogo/>
          </Flex>
        </button>
        <Select
          defaultValue="json"
          size="xs"
          value={format}
          onChange={e => setFormat(e as FileFormat)}
          miw={80}
          w={120}
          data={formats}
          allowDeselect={false}
        />

        <FileMenu />
        <ViewMenu />
        <ToolsMenu />
      </Group>
      <Group gap="xs" justify="right" w="100%" style={{ flexWrap: "nowrap" }}>
        <button style={{color: 'var(--interactive-normal-color)'}} className={styles['styled-toolbar-button']}>
          <AiOutlineFullscreen size="18" />
        </button>
      </Group>
    </ToolbarOuterWrapper>
  );
};
