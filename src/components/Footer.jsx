export default function Footer(){
return (
<footer className="border-t border-slate-200 bg-white/80">
<div className="mx-auto max-w-7xl px-4 py-6 text-xs md:text-sm text-slate-500 flex items-center justify-center">
<p>© {new Date().getFullYear()} All rights reserved · Akash Kumar</p>
</div>
</footer>
)
}