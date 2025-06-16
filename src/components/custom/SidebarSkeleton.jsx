import React from "react";
import { Skeleton } from "../ui/skeleton";

const SidebarSkeleton = () => {
  return (
    <aside className="h-full w-1/4 rounded p-5 flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-center gap-5 opacity-30">
        <Skeleton className={"size-16 rounded-full"} />
        <div className="flex flex-col gap-2">
          <Skeleton className={"h-3 w-40"} />
          <Skeleton className={"h-3 w-20"} />
        </div>
      </div>
      <div className="flex items-center gap-5 opacity-30">
        <Skeleton className={"size-16 rounded-full"} />
        <div className="flex flex-col gap-2">
          <Skeleton className={"h-3 w-40"} />
          <Skeleton className={"h-3 w-20"} />
        </div>
      </div>
      <div className="flex items-center gap-5 opacity-30">
        <Skeleton className={"size-16 rounded-full"} />
        <div className="flex flex-col gap-2">
          <Skeleton className={"h-3 w-40"} />
          <Skeleton className={"h-3 w-20"} />
        </div>
      </div>
      <div className="flex items-center gap-5 opacity-30">
        <Skeleton className={"size-16 rounded-full"} />
        <div className="flex flex-col gap-2">
          <Skeleton className={"h-3 w-40"} />
          <Skeleton className={"h-3 w-20"} />
        </div>
      </div>
      <div className="flex items-center gap-5 opacity-30">
        <Skeleton className={"size-16 rounded-full"} />
        <div className="flex flex-col gap-2">
          <Skeleton className={"h-3 w-40"} />
          <Skeleton className={"h-3 w-20"} />
        </div>
      </div>
      <div className="flex items-center gap-5 opacity-30">
        <Skeleton className={"size-16 rounded-full"} />
        <div className="flex flex-col gap-2">
          <Skeleton className={"h-3 w-40"} />
          <Skeleton className={"h-3 w-20"} />
        </div>
      </div>
      <div className="flex items-center gap-5 opacity-30">
        <Skeleton className={"size-16 rounded-full"} />
        <div className="flex flex-col gap-2">
          <Skeleton className={"h-3 w-40"} />
          <Skeleton className={"h-3 w-20"} />
        </div>
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
