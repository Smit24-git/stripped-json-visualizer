'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Stack, Text, Title } from "@mantine/core";
import Layout from "./_components/layout/PageLayout";

const Custom500 = () => {
  const router = useRouter();

  return (
    <Layout>
      <Stack mt={100} justify="center" align="center">
        <Title fz={150} style={{ fontFamily: "monospace" }}>
          500
        </Title>
        <Title order={2}>Something bad just happened...</Title>
        <Text c="dimmed" maw={800} style={{ textAlign: "center" }}>
          Our servers could not handle your request. Don&apos;t worry, our development team was
          already notified. Try refreshing the page.
        </Text>
        <Button size="lg" color="gray" type="button" onClick={() => router.refresh()}>
          Refresh the page
        </Button>
      </Stack>
    </Layout>
  );
};

export default Custom500;
