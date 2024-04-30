// "use client";
// import React, { useState, useEffect } from "react";
// import TransactionCard from "@/components/transactions/TransactionCard";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// interface Transaction {
//   TransID: string;
//   TransTime: string;
//   TransAmount: string;
//   TransactionTime: Date;
// }

// export default function IndexPage() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [selectedPeriod, setSelectedPeriod] = useState("today");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchTransactions(selectedPeriod);
//   }, [selectedPeriod]);

//   const fetchTransactions = async (period: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/transactions");
//       if (!response.ok) {
//         throw new Error("Failed to fetch transactions");
//       }
//       const data: Transaction[] = await response.json();
//       console.log("Fetched data:", data);
//       // Parse the TransactionTime property to a Date object
//       const parsedData = data.map((transaction) => ({
//         ...transaction,
//         TransactionTime: new Date(transaction.TransTime),
//       }));
//       setTransactions(parsedData);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       setError(error.message as string);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterTransactionsByPeriod = () => {
//     const currentDate = new Date();
//     const currentDateStart = new Date(currentDate.setHours(0, 0, 0, 0));
//     const currentDateEnd = new Date(currentDate.setHours(23, 59, 59, 999));

//     switch (selectedPeriod) {
//       case "today":
//         return transactions.filter((transaction) => {
//           return (
//             transaction.TransactionTime >= currentDateStart &&
//             transaction.TransactionTime <= currentDateEnd
//           );
//         });
//       case "yesterday":
//         const yesterday = new Date(currentDateStart.getTime() - 86400000);
//         const yesterdayEnd = new Date(yesterday.getTime() + 86400000 - 1);
//         return transactions.filter((transaction) => {
//           return (
//             transaction.TransactionTime >= yesterday &&
//             transaction.TransactionTime <= yesterdayEnd
//           );
//         });
//       case "7days":
//         const sevenDaysAgo = new Date(currentDateStart.getTime() - 604800000);
//         return transactions.filter((transaction) => {
//           return transaction.TransactionTime >= sevenDaysAgo;
//         });
//       default:
//         return [];
//     }
//   };

//   const renderTransactions = () => {
//     const filteredTransactions = filterTransactionsByPeriod();
//     console.log("Filtered transactions:", filteredTransactions);
//     if (loading) {
//       return <p>Loading...</p>;
//     }
//     if (error) {
//       return <p>{error}</p>;
//     }
//     if (filteredTransactions.length === 0) {
//       return (
//         <div className="h-60 flex items-center justify-center">
//           No data found
//         </div>
//       );
//     }
//     return filteredTransactions.map((transaction) => (
//       <TransactionCard
//         key={transaction.TransID}
//         transTime={transaction.TransTime}
//         transAmount={transaction.TransAmount}
//         transID={transaction.TransID}
//       />
//     ));
//   };

//   return (
//     <>
//       <div className="my-4 lg:w-[95%] w-full mx-auto h-auto p-2 bg-green-400">
//         <Tabs defaultValue="today" className="w-full bg-pink-900">
//           <TabsList>
//             <TabsTrigger
//               value="today"
//               onClick={() => setSelectedPeriod("today")}
//             >
//               Today
//             </TabsTrigger>
//             <TabsTrigger
//               value="yesterday"
//               onClick={() => setSelectedPeriod("yesterday")}
//             >
//               Yesterday
//             </TabsTrigger>
//             <TabsTrigger
//               value="7days"
//               onClick={() => setSelectedPeriod("7days")}
//             >
//               Last 7 days
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="today" className="w-full flex flex-wrap gap-1">
//             {renderTransactions()}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import TransactionCard from "@/components/transactions/TransactionCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Transaction {
  TransID: string;
  TransTime: string;
  TransAmount: string;
  TransactionTime: Date;
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
    // const p = new URLSearchParams({ start, end });
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

      console.log("Fetched data:", data);
      // Parse the TransactionTime property to a Date object
      const parsedData = data.map((transaction) => ({
        ...transaction,
        TransactionTime: new Date(transaction.TransTime),
      }));
      setTransactions(parsedData);
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

  const filterTransactionsByPeriod = () => {
    const currentDate = new Date();
    const currentDateStart = new Date(currentDate.setHours(0, 0, 0, 0));
    const currentDateEnd = new Date(currentDate.setHours(23, 59, 59, 999));

    switch (selectedPeriod) {
      case "today":
        return transactions.filter((transaction) => {
          return (
            transaction.TransactionTime >= currentDateStart &&
            transaction.TransactionTime <= currentDateEnd
          );
        });
      case "yesterday":
        const yesterday = new Date(currentDateStart.getTime() - 86400000);
        const yesterdayEnd = new Date(yesterday.getTime() + 86400000 - 1);
        return transactions.filter((transaction) => {
          return (
            transaction.TransactionTime >= yesterday &&
            transaction.TransactionTime <= yesterdayEnd
          );
        });
      case "7days":
        const sevenDaysAgo = new Date(currentDateStart.getTime() - 604800000);
        return transactions.filter((transaction) => {
          return transaction.TransactionTime >= sevenDaysAgo;
        });
      case "all":
        return transactions; // Return all transactions
      default:
        return [];
    }
  };

  return (
    <>
      <div className="my-4 lg:w-[95%] w-full mx-auto h-auto p-2 bg-green-400">
        <Tabs defaultValue="today" className="w-full bg-pink-900">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setSelectedPeriod("all")}>
              All Transactions
            </TabsTrigger>
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
          </TabsList>
          <TabsContent value="all" className="w-full flex flex-wrap gap-1">
            {renderTransactions()}
          </TabsContent>
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
        </Tabs>
      </div>
    </>
  );
}
