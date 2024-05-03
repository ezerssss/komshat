import { Skeleton } from '@/components/ui/skeleton'

function ProjectsSkeleton() {
    return (
        <div className="my-6 block max-w-[800px] rounded-md border-[1px] border-[#E5E7EB] shadow-md">
            <div className="flex items-center gap-4 p-4">
                <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
                <div className="w-full space-y-1">
                    <Skeleton className="block h-5 w-1/3" />
                    <Skeleton className="block h-4 w-3/4" />
                </div>
            </div>
            <div className="px-6 sm:px-16">
                <section className="mb-3.5 mt-9 space-y-2">
                    <Skeleton className="h-8 w-2/3" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-5 w-1/3" />
                </section>
                <section className="mb-10 mt-8">
                    <Skeleton className="h-[400px] w-full" />
                </section>
            </div>
        </div>
    )
}

export default ProjectsSkeleton
