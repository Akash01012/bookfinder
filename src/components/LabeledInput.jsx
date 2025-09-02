export default function LabeledInput({ label, value, onChange, placeholder, type='text' }){
return (
<label className="flex flex-col gap-1">
<span className="text-xs font-medium uppercase text-slate-500">{label}</span>
<input type={type} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} className="rounded-xl border px-3 py-2 text-sm" />
</label>
)
}