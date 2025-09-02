import { getCoverUrl } from '../utils'

export default function ReadingList({ reading, onToggle }){
return (
<div className="mt-10">
<h3 className="font-medium bg-gradient-to-r from-green-200 to-green-600 bg-clip-text text-transparent">
  Reading List ({reading.length})
</h3>

<div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
{reading.length === 0 ? (
<div className="col-span-full text-white text-center">No books saved yet.</div>
) : (
reading.map(b => (
<div key={b.key} className="border rounded-xl bg-white p-2">
{b.cover_i ? <img src={getCoverUrl(b.cover_i)} alt={b.title} className="h-32 w-full object-cover" /> : <div>No cover</div>}
<div className="text-sm font-medium line-clamp-2 mt-2">{b.title}</div>
<button onClick={() => onToggle(b)} className="mt-2 w-full text-xs border px-2 py-1 rounded text-rose-600">Remove</button>
</div>
))
)}
</div>
</div>
)
}