import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function ParticipantsSkeleton() {
    return (
        <div className="my-5 flex flex-wrap gap-4">
            <div className="z-50 flex w-full gap-4 rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none sm:w-80">
                <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
                <div className="w-full space-y-1">
                    <Skeleton className="block h-5 w-1/3" />
                    <Skeleton className="block h-4 w-3/4" />
                </div>
            </div>
            <div className="z-50 flex w-full gap-4 rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none sm:w-80">
                <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
                <div className="w-full space-y-1">
                    <Skeleton className="block h-5 w-1/3" />
                    <Skeleton className="block h-4 w-3/4" />
                </div>
            </div>
            <div className="z-50 flex w-full gap-4 rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none sm:w-80">
                <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
                <div className="w-full space-y-1">
                    <Skeleton className="block h-5 w-1/3" />
                    <Skeleton className="block h-4 w-3/4" />
                </div>
            </div>
            <div className="z-50 flex w-full gap-4 rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none sm:w-80">
                <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
                <div className="w-full space-y-1">
                    <Skeleton className="block h-5 w-1/3" />
                    <Skeleton className="block h-4 w-3/4" />
                </div>
            </div>
        </div>
    )
}

export default ParticipantsSkeleton
