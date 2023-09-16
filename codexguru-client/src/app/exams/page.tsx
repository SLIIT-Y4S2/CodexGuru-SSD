/**
 * ExamsPage implementation for lab instructor
 */
import React, { Suspense } from "react";

import Exams from "@/components/exams-instructor/Exams";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import Link from "next/link";

const ExamsPage: React.FC = () => {
  return (
    <>
      <div style={{ marginLeft: "50px", marginTop: "25px" }}>
        <BreadCrumbs
          linkList={[
            {
              title: <Link href="#">Dashboard</Link>,
            },
            {
              title: "Exams",
            },
          ]}
        />
      </div>{" "}
      <br />
      <Exams />
    </>
  );
};

export default ExamsPage;
