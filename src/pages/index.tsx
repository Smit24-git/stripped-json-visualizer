import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Link from "next/link";

export const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>JSON Visualizer</h1>
      <br/>
      <p>Nothing to see here. this page will be removed shortly...</p>
      <p>Click <Link style={{color: 'blueviolet'}} href={'./editor'}>here</Link> to visit the editor.</p>
    </>
  );
};

export default HomePage;

export const getStaticProps = (async () => {
  try {
    const res = await fetch("https://api.github.com/repos/AykutSarac/jsoncrack.com");
    const data = await res.json();

    return {
      props: {
        stars: data?.stargazers_count || 0,
      },
    };
  } catch (error) {
    return {
      props: {
        stars: 0,
      },
    };
  }
}) satisfies GetStaticProps<{ stars: number }>;
