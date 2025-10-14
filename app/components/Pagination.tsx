"use client";
import { useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const [currentPage, setCurrentPage] = useState(page);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  };

  return (
    <Pagination
      current={currentPage}
      total={500}
      pageSize={20}
      onChange={onChange}
      align="center"
      responsive
      showSizeChanger={false}
    ></Pagination>
  );
}
