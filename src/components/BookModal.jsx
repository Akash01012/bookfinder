import { getCoverUrl } from '../utils'

export default function BookModal({ book, onClose, onToggleReading, inReading }){
if(!book) return null
const coverUrl = getCoverUrl(book.cover_i,'L')
const authors = (book.author_name||[]).join(', ')
return (
<div className="fixed inset-0 z-50 flex items-center justify-center">
<div onClick={onClose} className="absolute inset-0 bg-black/40" />
<div className="relative z-10 bg-white rounded-xl p-4 max-w-lg w-full">
<div className="flex justify-between items-center">
<h2 className="font-semibold">{book.title}</h2>
<button onClick={onClose}>✖</button>
</div>
<div className="mt-4 grid grid-cols-[150px,1fr] gap-4">
{coverUrl && <img src={coverUrl} alt={book.title} className="rounded-xl" />}
<div>
<p className="text-sm">By {authors || 'Unknown'}</p>
<p className="text-xs mt-2">First published: {book.first_publish_year || '—'}</p>
<button onClick={onToggleReading} className={`mt-3 px-3 py-1 rounded ${inReading ? 'bg-emerald-600 text-white' : 'border'}`}>{inReading ? 'Saved' : 'Save'}</button>
<a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noreferrer" className="block mt-3 text-indigo-600 underline">View on Open Library</a>
</div>
</div>
</div>
</div>
)
}