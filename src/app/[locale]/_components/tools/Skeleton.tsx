

const Skeleton = (props:any) => (
    <>
        <div className="group animate-pulse">
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="px-4 py-5 sm:p-6">
                <div className="h-32 bg-gray-200 rounded"></div>
                </div>
                <div className="px-4 py-4 sm:px-6 text-center">
                <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
            </div>
        </div>
    </>
  )
  
const SVGSkeleton = (props:any) => (
    <svg
        className={
        props.className + " animate-pulse rounded bg-gray-300"
        }
    />
)
  
  export { Skeleton, SVGSkeleton}