export default function ForbiddenPage() {
    return (
        <>
            <main className="grid min-h-screen bg-muted place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-primary">403</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance  sm:text-7xl text-muted-foreground">
                        Forbidden
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                        Sorry, you do not have permission to access this page.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/"
                            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Go back home
                        </a>
                    </div>
                </div>
            </main>
        </>
    )
}