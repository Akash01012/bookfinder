import { getCoverUrl } from '../utils'

export default function BookCard({ book, onOpen, inReading, onToggleReading }){
const coverUrl = getCoverUrl(book.cover_i)
const authors = (book.author_name||[]).join(', ')
return (
<div className="relative rounded-2xl border bg-white shadow-sm overflow-hidden">
<button onClick={onOpen} className="block w-full text-left">
<div className="aspect-[2/3] bg-slate-100">
{coverUrl ? <img src={coverUrl} alt={book.title} className="h-full w-full object-cover" /> : <div className="text-center p-4">No cover</div>}
</div>
<div className="p-3">
<h3 className="font-medium line-clamp-2">{book.title}</h3>
<p className="text-xs text-slate-500 line-clamp-1">{authors}</p>
</div>
</button>
<div className="absolute right-2 top-2">
<button onClick={(e)=>{e.stopPropagation(); onToggleReading();}} className={`px-3 py-1 rounded-full text-xs ${inReading ? 'bg-emerald-600 text-white' : 'bg-white border'}`}>{inReading ? 'Saved' : 'Save'}</button>
</div>
</div>
)
}