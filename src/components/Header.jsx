export default function Header(){
return (
<header className="sticky h-30 w-100 top-0 z-40 backdrop-blur bg-white/50 border-b border-slate-200">
<div className="mx-auto max-w-7xl px-4 py-4 flex items-center gap-3">
<span className="inline-flex h-10 w-10 items-center justify-center rounded-xl 
  bg-gradient-to-r from-blue-500 via-cyan-500
  text-white font-bold">
  BE
</span>


<div>
<h1 className="text-xl md:text-2xl font-semibold">Book Explorer</h1>
<p className="text-xs md:text-sm text-slate-500">Search millions of books</p>
</div>
</div>
</header>
)
}