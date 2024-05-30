"use client";
import React, { useState, useEffect } from "react";
import TransactionCard from "@/components/transactions/TransactionCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Transaction {
  TransID: string;
  TransTime: string;
  TransAmount: string;
}

const getToday = () => new Date().toISOString().split("T")[0];
const getYesterday = () =>
  new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .split("T")[0];

const url = "/api/transactions";
const makeURL = (date: string) => {
  if (!date) return url;
  if (date === "7days") {
    const end = new Date().toISOString().split("T")[0];
    const start = new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0];
    return url + `?start=${start}&end=${end}`;
  }
  return url + `?date=${date}`;
};

export default function IndexPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState(getToday());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions(selectedPeriod);
  }, [selectedPeriod]);

  const fetchTransactions = async (period: string) => {
    setLoading(true);
    try {
      const response = await fetch(makeURL(period));
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data: Transaction[] = await response.json();
      setTransactions(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(error.message as string);
    } finally {
      setLoading(false);
    }
  };

  const renderTransactions = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
    return (
      <>
        {!transactions.length ? (
          <div className="h-60 flex items-center justify-center">
            No data found
          </div>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.TransID}
              transTime={transaction.TransTime}
              transAmount={transaction.TransAmount}
              transID={transaction.TransID}
            />
          ))
        )}
      </>
    );
  };

  return (
    <>
      <div className="lg:w-[95%] w-full mx-auto h-auto ">
        <Tabs defaultValue="today" className="w-full">
          <div className="flex w-full items-center justify-center">
            {/* <TabsList> */}
            <TabsList className="fixed mt-[1.5rem] z-50">
              <TabsTrigger
                value="today"
                onClick={() => setSelectedPeriod(getToday())}
              >
                Today
              </TabsTrigger>
              <TabsTrigger
                value="yesterday"
                onClick={() => setSelectedPeriod(getYesterday())}
              >
                Yesterday
              </TabsTrigger>
              <TabsTrigger
                value="7days"
                onClick={() => setSelectedPeriod("7days")}
              >
                Last 7 days
              </TabsTrigger>
              <TabsTrigger value="all" onClick={() => setSelectedPeriod("")}>
                All Transactions
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="my-10 p-2">
            <TabsContent value="today" className="w-full flex flex-wrap gap-1">
              {renderTransactions()}
            </TabsContent>
            <TabsContent
              value="yesterday"
              className="w-full flex flex-wrap gap-1"
            >
              {renderTransactions()}
            </TabsContent>
            <TabsContent value="7days" className="w-full flex flex-wrap gap-1">
              {renderTransactions()}
            </TabsContent>
            <TabsContent value="all" className="w-full flex flex-wrap gap-1">
              {renderTransactions()}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
}
