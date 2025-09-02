import React, { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Filters from "./components/Filters";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";
import ReadingList from "./components/ReadingList";
import Pagination from "./components/Pagination";
import CardSkeleton from "./components/CardSkeleton";
import EmptyState from "./components/EmptyState";
import { useDebounce, useLocalStorage } from "./hooks";
import { getCoverUrl, escaped, toMinimalBook } from "./utils";

const API_BASE = "https://openlibrary.org/search.json";

export default function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-black"
      style={{ backgroundImage: "url('/Library_background.jpg')" }}
    >
      
      <div className="min-h-screen backdrop-blur-sm">
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 pb-24">
          <BookFinder />
        </main>
        <Footer />
      </div>
    </div>
  );
}


function BookFinder() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [numFound, setNumFound] = useState(0);

  const [selected, setSelected] = useState(null);

  const [reading, setReading] = useLocalStorage("bookfinder_readinglist", []);
  const isInReadingList = (key) => reading.some((b) => b.key === key);
  const toggleReading = (book) => {
    setReading((prev) => {
      const exists = prev.some((b) => b.key === book.key);
      if (exists) return prev.filter((b) => b.key !== book.key);
      return [...prev, book];
    });
  };

  const queryURL = useMemo(() => {
    const params = new URLSearchParams();
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    const trimmedSubject = subject.trim();
    const hasFielded = trimmedTitle || trimmedAuthor || trimmedSubject;
    if (!hasFielded) {
      params.set("q", "");
    } else {
      const parts = [];
      if (trimmedTitle) parts.push(`title:${escaped(trimmedTitle)}`);
      if (trimmedAuthor) parts.push(`author:${escaped(trimmedAuthor)}`);
      if (trimmedSubject) parts.push(`subject:${escaped(trimmedSubject)}`);
      params.set("q", parts.join(" "));
    }
    if (yearFrom || yearTo) {
      const from = yearFrom || "*";
      const to = yearTo || "*";
      params.append("fq", `first_publish_year:[${from} TO ${to}]`);
    }
    if (sort === "newest") params.set("sort", "new");
    else if (sort === "oldest") params.set("sort", "old");
    params.set("page", String(page));
    params.set("limit", String(limit));
    params.set("fields", [
      "key", "title", "author_name", "first_publish_year", "cover_i", "subject", "language", "publisher"
    ].join(","));
    return `${API_BASE}?${params.toString()}`;
  }, [title, author, subject, yearFrom, yearTo, sort, page, limit]);

  const debouncedURL = useDebounce(queryURL, 350);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(debouncedURL);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!ignore) {
          setResults(Array.isArray(data.docs) ? data.docs : []);
          setNumFound(typeof data.numFound === "number" ? data.numFound : 0);
        }
      } catch (e) {
        if (!ignore) setError(e.message || "Something went wrong");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchData();
    return () => { ignore = true };
  }, [debouncedURL]);

  useEffect(() => { setPage(1) }, [title, author, subject, yearFrom, yearTo, sort, limit]);

  const totalPages = Math.max(1, Math.ceil(numFound / limit));

  return (
    <section className="py-6 md:py-8">
      <Filters {...{ title, setTitle, author, setAuthor, subject, setSubject, yearFrom, setYearFrom, yearTo, setYearTo, sort, setSort, limit, setLimit, numFound }} />
      <div className="mt-4 flex justify-between text-sm bg-gradient-to-r from-green-200 to-green-400 bg-clip-text text-transparent">
        <div>{numFound} results</div>
        <div>Page {page} of {totalPages}</div>
      </div>
      {error && <div className="mt-4 p-4 bg-rose-50 text-rose-700 border border-rose-300 rounded-xl">{error}</div>}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {loading ? Array.from({ length: limit }).map((_, i) => <CardSkeleton key={i} />)
          : results.length === 0 ? <EmptyState />
          : results.map((b) => <BookCard key={b.key} book={b} onOpen={() => setSelected(b)} inReading={isInReadingList(b.key)} onToggleReading={() => toggleReading(toMinimalBook(b))} />)}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      <ReadingList reading={reading} onToggle={(bk) => toggleReading(bk)} />
      <BookModal book={selected} onClose={() => setSelected(null)} onToggleReading={() => selected && toggleReading(toMinimalBook(selected))} inReading={selected ? isInReadingList(selected.key) : false} />
    </section>
  );
}