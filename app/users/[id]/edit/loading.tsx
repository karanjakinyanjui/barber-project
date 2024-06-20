import React from "react";
import { Skeleton } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function loading() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          <Skeleton variant="text" width={120} height={30} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </div>
          <div className="grid gap-2">
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </div>
          <div className="grid gap-2">
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </div>
          <div className="grid gap-2">
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </div>
          <Skeleton variant="rectangular" width="100%" height={40} />
        </div>
      </CardContent>
    </Card>
  );
}
