export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading page content"
      className="min-h-screen bg-[#10131A]"
    >
      <div aria-hidden="true" className="mx-auto max-w-7xl animate-pulse px-4 py-12 sm:px-6 lg:px-8">
        <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-5">
            <div className="h-4 w-40 rounded bg-[#2b141a]" />
            <div className="space-y-3">
              <div className="h-9 w-full max-w-xl rounded bg-[#22252f] sm:h-12" />
              <div className="h-9 w-4/5 max-w-lg rounded bg-[#22252f] sm:h-12" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full max-w-lg rounded bg-[#22252f]" />
              <div className="h-4 w-5/6 max-w-md rounded bg-[#22252f]" />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="h-12 w-44 rounded-lg bg-[#3a1b22]" />
              <div className="h-12 w-36 rounded-lg bg-[#22252f]" />
            </div>
          </div>
          <div className="aspect-[16/10] w-full rounded-2xl bg-[#22252f]" />
        </section>

        <section className="mt-14 grid grid-cols-2 gap-4 border-y border-white/10 py-6 sm:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-7 w-24 rounded bg-[#22252f]" />
              <div className="h-3 w-32 max-w-full rounded bg-[#22252f]" />
            </div>
          ))}
        </section>

        <section className="mt-14 space-y-6">
          <div className="mx-auto h-8 w-64 max-w-full rounded bg-[#22252f]" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="h-32 rounded-xl border border-white/10 bg-[#14161d]" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
