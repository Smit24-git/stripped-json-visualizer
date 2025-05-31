'use client'
import React from "react";
import { Anchor, Button, Image, Overlay, Stack, Text } from "@mantine/core";
import useConfig from "../../../../../_store/useConfig";


export const NotSupported = () => {
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);

  return (
    <Overlay
      backgroundOpacity={0.8}
      color={darkmodeEnabled ? "gray" : "rgb(226, 240, 243)"}
      blur="1.5"
      center
    >
      <Stack maw="60%" align="center" justify="center" gap="sm">
        <Text ta="center" size="lg" fw={500} c="gray" maw="600">
          This diagram is too large and not supported at this momemt.
          <br />
        </Text>
      </Stack>
    </Overlay>
  );
};
