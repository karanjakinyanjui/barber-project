"use client";

import React, { useEffect, useState } from "react";
import { Combobox } from "../ui/combobox";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePicker } from "../ui/DatePicker";
import { doSearch } from "./doSearch";
import { DateRangePicker } from "../ui/DateRangePicker";
import { User } from "@prisma/client";
import Loading from "../ui/Loading";

const url = "/api/transactions";

function getDateString(date?: Date) {
  if (!date) return "";
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const getToday = () => {
  const date = getDateString(new Date());
  return `?date=${date}`;
};

const getYesterday = () => {
  const date = getDateString(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );
  return `?date=${date}`;
};

const getMondayOfCurrentWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // getDay() returns 0 for Sunday, 1 for Monday, etc.
  const differenceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // calculate difference from today to Monday
  const monday = new Date(today);
  monday.setDate(today.getDate() - differenceToMonday); // set the date to the previous Monday
  return getDateString(monday);
};

const getThisWeek = () => {
  const monday = getMondayOfCurrentWeek();
  const today = getDateString(new Date());
  return `?start=${monday}&end=${today}`;
};

const getLastSevenDays = () => {
  const end = getDateString(new Date());
  const start = getDateString(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  return `?start=${start}&end=${end}`;
};

const getMonthToDate = () => {
  const end = getDateString(new Date());
  const start = getDateString(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  return `?start=${start}&end=${end}`;
};

const dates = [
  {
    label: "Today",
    value: getToday(),
  },
  {
    label: "Yesterday",
    value: getYesterday(),
  },
  {
    label: "This Week",
    value: getThisWeek(),
  },
  {
    label: "Last 7 Days",
    value: getLastSevenDays(),
  },
  {
    label: "Month to Date",
    value: getMonthToDate(),
  },
];

interface Props {
  params: string;
  users: User[];
}

const Filters = ({ params, users }: Props) => {
  const [filter, setFilter] = useState(params);
  const [routing, setRouting] = useState(false);
  const [nextParams, setNextParams] = useState(params);
  const searchParams = useSearchParams();
  const router = useRouter();

  let userChoices = [
    {
      label: "All Users",
      value: "",
    },
    ...users.map((i) => ({
      label: i.name || "",
      value: i.name || "",
    })),
  ];
  const search = new URLSearchParams(filter);
  const dateStr = search.get("date");
  const date = dateStr ? new Date(dateStr) : undefined;

  const handleFilterChange = (searchStr: string) => {
    const allParams = new URLSearchParams(params);
    if (searchStr.includes("date")) {
      allParams.delete("start");
      allParams.delete("end");
    }
    if (searchStr.includes("start")) allParams.delete("date");
    const newParams = new URLSearchParams(searchStr);
    const list = ["user", "start", "end", "date", "claimed"];
    for (const param of list) {
      const newParam = newParams.get(param);
      if (newParam !== null) {
        newParam ? allParams.set(param, newParam) : allParams.delete(param);
      } else {
        if (!allParams.get(param)) allParams.delete(param);
      }
    }
    setRouting(true);
    router.push("?" + allParams.toString());
  };

  const handleValueChange = (value: string) => {
    doSearch(value);
    handleFilterChange(value);
  };

  const handleSetUser = (name: string) => {
    handleFilterChange(`?user=${name}`);
  };

  useEffect(() => {
    setRouting(false);
  }, [searchParams]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="w-full">
          <Combobox
            value={filter}
            items={dates}
            onValueChange={handleValueChange}
            placeholder="Select a date range"
          />
        </div>
        <div className="w-full">
          <DatePicker
            date={date}
            setDate={(date?: Date) => {
              const dateStr = getDateString(date);
              handleFilterChange(`?date=${dateStr}`);
            }}
          />
        </div>
        <div className="w-full">
          <DateRangePicker
            start={search.get("start")}
            end={search.get("end")}
            setDateRange={(start?: Date, end?: Date) => {
              let startStr = getDateString(start);
              let endStr = getDateString(end);
              handleFilterChange(`?start=${startStr}&end=${endStr}`);
            }}
          />
        </div>
        <div className="w-full">
          <Combobox
            onValueChange={handleSetUser}
            items={userChoices}
            value={search.get("user") || ""}
            placeholder="Select User"
          />
        </div>
      </div>
      {routing && <Loading />}
    </>
  );
};

export default Filters;
