import { useState, useEffect } from 'react'
export function useDebounce(value, delay=300){
    const [v,setV]=useState(value);
    useEffect(()=>{
        const id=setTimeout(()=>setV(value),delay);
        return()=>clearTimeout(id)
        },[value,delay]);
        return v;
    }
export function useLocalStorage(key,initial){
    const [s,setS]=useState(()=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):initial}catch{return initial}
    });
    useEffect(()=>{
        try{localStorage.setItem(key,JSON.stringify(s))}catch{}},[key,s]);
        return[s,setS]
    }