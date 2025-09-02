export function getCoverUrl(id,size='M'){if(!id) return '';return `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`} 
export function escaped(s){return s.replace(/\s+/g,'+').replace(/[:()\[\]"]/g,' ')} 
export function toMinimalBook(doc){return {key:doc.key,title:doc.title,author_name:doc.author_name||[],cover_i:doc.cover_i||null}}