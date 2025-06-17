'use client'
import { Flex, Menu } from "@mantine/core";
import { event as gaEvent } from "nextjs-google-analytics";
import { CgChevronDown } from "react-icons/cg";
import useFile from "../../../../_store/useFile";
import { useModal } from "../../../../_store/useModal";
import styles from './toolbar.module.css'
``
export const FileMenu = () => {
  const setVisible = useModal(state => state.setVisible);
  const getContents = useFile(state => state.getContents);
  const getFormat = useFile(state => state.getFormat);

  const handleSave = () => {
    const a = document.createElement("a");
    const file = new Blob([getContents()], { type: "text/plain" });

    a.href = window.URL.createObjectURL(file);
    a.download = `jsoncrack.${getFormat()}`;
    a.click();

    gaEvent("save_file", { label: getFormat() });
  };

  return (
    <Menu shadow="md" withArrow>
      <Menu.Target>
        <button style={{color: 'var(--interactive-normal-color)'}} className={styles['styled-toolbar-button']}>
          <Flex align="center" gap={3}>
            File
            <CgChevronDown />
          </Flex>
        </button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item fz={12} onClick={() => setVisible("ImportModal", true)}>
          Import
        </Menu.Item>
        <Menu.Item fz={12} onClick={handleSave}>
          Export
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
