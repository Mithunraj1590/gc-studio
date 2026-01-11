import nextFetch from "@/utilities/nextFetch";
import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface UseSearchProps {
  setIsSearchOpen: (value: boolean) => void;
  setIsSearchMenuOpen: (value: boolean) => void;
}

interface UseSearchReturn {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchKeywords: any[];
  searchResults: any[];
}

export const useSearch = (
  setIsSearchOpen: (value: boolean) => void,
  setIsSearchMenuOpen: (value: boolean) => void
): UseSearchReturn => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchKeywords, setSearchKeywords] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const getSearchData = async (): Promise<void> => {
    const response = await nextFetch(`api/general/search?search=${searchTerm}`);
    setSearchKeywords(response?.data?.widgets?.[0]?.data?.search_keywords);
    setSearchResults(response?.data?.widgets?.[0]?.data?.results);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getSearchData();
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (
        event.key === "Enter" &&
        // !pathname.includes("search") &&
        searchKeywords.length > 0
      ) {
        router.push(`/search`);
        setIsSearchOpen(false);
        setIsSearchMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchTerm, searchKeywords, router, setIsSearchOpen, setIsSearchMenuOpen]);

  return {
    searchTerm,
    setSearchTerm,
    handleInputChange,
    searchKeywords,
    searchResults,
  };
};

