"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, User, Users, X } from "lucide-react";
import { searchUsersByUsername } from "@/lib/server_actions/user_search";

interface UserSearchResult {
  id: string;
  user_id: string | null;
  user_name: string | null;
  weight: number | null;
  height: number | null;
  fitness_goal: string | null;
  created_at: string;
}

interface UserSearchProps {
  onUserSelect: (profileId: string) => void;
  onClose: () => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onUserSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const results = await searchUsersByUsername(searchQuery.trim());
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching users:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
        setHasSearched(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="space-y-4 px-1 sm:px-2 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
            Search Users
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
            Find other users by username
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
        />
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {loading && (
          <div className="flex items-center justify-center py-6 sm:py-8">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <span className="ml-3 text-muted-foreground text-sm sm:text-base">
              Searching...
            </span>
          </div>
        )}

        {!loading && hasSearched && searchResults.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-muted-foreground mb-2">
              No users found
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground px-4">
              Try searching with a different username
            </p>
          </div>
        )}

        {!loading && !hasSearched && (
          <div className="text-center py-8 sm:py-12">
            <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-muted-foreground mb-2">
              Start typing to search
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground px-4">
              Enter a username to find other users
            </p>
          </div>
        )}

        {!loading && searchResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-semibold">
              Found {searchResults.length} user
              {searchResults.length !== 1 ? "s" : ""}
            </h3>
            <div className="grid gap-2 sm:gap-3">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => onUserSelect(user.id)}
                  className="flex items-start sm:items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors mt-1 sm:mt-0">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-medium truncate text-sm sm:text-base">
                      {user.user_name || "Anonymous User"}
                    </h4>
                    <div className="flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground">
                      <span>Joined {formatDate(user.created_at)}</span>
                      {user.fitness_goal && (
                        <span className="truncate">
                          Goal: {user.fitness_goal}
                        </span>
                      )}
                      {/* Mobile: Show weight/height below on smaller screens */}
                      <div className="flex gap-2 sm:hidden">
                        {user.weight && (
                          <span className="bg-muted px-2 py-1 rounded text-xs whitespace-nowrap">
                            {user.weight} lbs
                          </span>
                        )}
                        {user.height && (
                          <span className="bg-muted px-2 py-1 rounded text-xs whitespace-nowrap">
                            {user.height}&quot;
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Desktop: Show weight/height on the right */}
                  <div className="hidden sm:flex flex-row items-center gap-2 text-xs text-muted-foreground">
                    {user.weight && (
                      <span className="bg-muted px-2 py-1 rounded whitespace-nowrap">
                        {user.weight} lbs
                      </span>
                    )}
                    {user.height && (
                      <span className="bg-muted px-2 py-1 rounded whitespace-nowrap">
                        {user.height}&quot;
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
