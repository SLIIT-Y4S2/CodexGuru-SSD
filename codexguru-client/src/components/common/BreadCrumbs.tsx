"use client";

import React from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";

export default function BreadCrumbs({ linkList }) {
  return <Breadcrumb items={linkList} />;
}
