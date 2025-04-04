"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addBasePath } from "next/dist/client/add-base-path";
import { useDeferredValue } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Search as SearchIcon, AlertCircle, Loader, File } from "lucide-react";

import { useMounted } from "../hooks/use-mounted";
import type { PagefindSearchOptions } from "../types";

interface SubResult {
  excerpt: string;
  title: string;
  url: string;
}

interface SearchResult {
  excerpt: string;
  meta: {
    title: string;
  };
  raw_url: string;
  sub_results: SubResult[];
  url: string;
}

const DEV_SEARCH_NOTICE = (
  <>
    <p>
      Search isn&apos;t available in development because Nextra&nbsp;4 uses
      Pagefind package, which indexes built `.html` files instead of
      `.md`/`.mdx`.
    </p>
    <p className="mt-2">
      To test search during development, run `next build` and then restart your
      app with `next dev`.
    </p>
  </>
);

interface NewSearchProps {
  placeholder?: string;
  searchOptions?: PagefindSearchOptions;
  emptyResult?: React.ReactNode;
  errorText?: React.ReactNode;
  loading?: React.ReactNode;
}

// Import pagefind
async function importPagefind() {
  window.pagefind = await import(
    /* webpackIgnore: true */ addBasePath("/_pagefind/pagefind.js")
  );
  await window.pagefind!.options({
    baseUrl: "/",
  });
}

export function Search({
  placeholder = "Search documentation...",
  searchOptions,
  emptyResult = "No results found.",
  errorText = "Failed to load search index.",
  loading = "Loading...",
}: NewSearchProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<React.ReactNode>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const router = useRouter();
  const mounted = useMounted();

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setDialogOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Handle search
  useEffect(() => {
    const handleSearch = async (value: string) => {
      if (!value) {
        setResults([]);
        setError("");
        return;
      }

      if (!window.pagefind) {
        try {
          await importPagefind();
        } catch (error) {
          const message =
            error instanceof Error
              ? process.env.NODE_ENV !== "production" &&
                error.message.includes("Failed to fetch")
                ? DEV_SEARCH_NOTICE
                : `${error.constructor.name}: ${error.message}`
              : String(error);
          setError(message);
          return;
        }
      }

      try {
        const response = await window.pagefind!.debouncedSearch<SearchResult>(
          value,
          searchOptions
        );
        if (!response) return;

        const data = await Promise.all(response.results.map((o) => o.data()));
        setError("");
        setResults(data as SearchResult[]);
      } catch (error) {
        console.error("Search error:", error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
      }
    };

    handleSearch(deferredSearch);
  }, [deferredSearch, searchOptions]);

  // Handle navigation
  const handleSelect = (url: string) => {
    setDialogOpen(false);
    const [path, hash] = url.split("#");

    if (location.pathname === path) {
      location.href = `#${hash}`;
    } else {
      router.push(url);
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <SearchIcon className="h-4 w-4" />
        {placeholder}
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    );
  }

  return (
    <div className="relative w-full md:w-64">
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setDialogOpen(true)}
      >
        <SearchIcon className="h-4 w-4" />
        {placeholder}
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTitle className="sr-only">Search Documentation</DialogTitle>
        <DialogContent className="max-w-[90vw] gap-0 p-0 h-[300px] overflow-hidden">
          <Command shouldFilter={false} className="rounded-lg py-3">
            <CommandInput
              placeholder={placeholder}
              value={search}
              onValueChange={setSearch}
              className=" mb-2"
            />
            <CommandList className="h-[300px] overflow-y-auto p-2">
              {error ? (
                <div className="flex items-start gap-2 p-4 text-sm">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <div className="grid">
                    <b className="mb-2 text-red-500">{errorText}</b>
                    {error}
                  </div>
                </div>
              ) : results.length === 0 && deferredSearch ? (
                <CommandEmpty className="p-4 text-sm text-muted-foreground flex items-center justify-center">
                  {emptyResult}
                </CommandEmpty>
              ) : (
                results.map((result) => (
                  <CommandGroup
                    key={result.url}
                    heading={result.meta.title}
                    className="px-2"
                  >
                    {result.sub_results.map((item) => {
                      const url = item.url
                        .replace(/\.html$/, "")
                        .replace(/\.html#/, "#");
                      return (
                        <CommandItem
                          key={url}
                          value={url}
                          onSelect={handleSelect}
                          className="flex flex-col items-start gap-1 rounded-md p-2"
                        >
                          <div className="flex items-center gap-2 py-1 w-full">
                            <span className="">
                              <File className="h-4 w-4" />
                            </span>
                            <p
                              className="text-base [&_mark]:text-primary [&_mark]:bg-transparent"
                              dangerouslySetInnerHTML={{ __html: item.excerpt }}
                            />
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                ))
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}
