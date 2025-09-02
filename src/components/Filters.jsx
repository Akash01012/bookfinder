import LabeledInput from './LabeledInput'

export default function Filters({ title, setTitle, author, setAuthor, subject, setSubject, yearFrom, setYearFrom, yearTo, setYearTo, sort, setSort, limit, setLimit, numFound }){
return (
<div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
<LabeledInput label="Title" value={title} onChange={setTitle} placeholder="e.g., The Hobbit" />
<LabeledInput label="Author" value={author} onChange={setAuthor} placeholder="e.g., Agatha Christie" />
<LabeledInput label="Subject" value={subject} onChange={setSubject} placeholder="e.g., fantasy" />
<div className="grid grid-cols-2 gap-2">
<LabeledInput label="Year from" value={yearFrom} onChange={setYearFrom} type="number" />
<LabeledInput label="Year to" value={yearTo} onChange={setYearTo} type="number" />
</div>
</div>
<div className="mt-4 flex flex-wrap gap-3 items-center">
<div>
<label className="text-xs uppercase">Sort</label>
<select value={sort} onChange={(e) => setSort(e.target.value)} className="ml-2 border rounded-xl px-2 py-1">
<option value="relevance">Relevance</option>
<option value="newest">Newest</option>
<option value="oldest">Oldest</option>
</select>
</div>
<div>
<label className="text-xs uppercase">Per page</label>
<select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="ml-2 border rounded-xl px-2 py-1">
{[10,20,30,40,50].map(n => <option key={n} value={n}>{n}</option>)}
</select>
</div>
<div className="ml-auto text-xs text-slate-500">{numFound} results</div>
</div>
</div>
)
}