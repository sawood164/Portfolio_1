"use client";

import React from "react";
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
}

export function SEO({ title, description }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
