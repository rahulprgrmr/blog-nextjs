"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import TextInput from "../ui/text-input";

function PostsFilter() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setSearchText(event.target.value);
  }
  function handleSearch(event: FormEvent) {
    event.preventDefault();
    router.push(`posts/?search=${searchText}`);
  }
  return (
    <div className="filter-component container mx-auto p-10 mt-10 text-center">
      <h1 className="font-bold text-4xl mb-10 text-white">
        Quick and easy search: Find articles on our blog
      </h1>
      <form onSubmit={handleSearch}>
        <TextInput
          type="search"
          className="h-16 text-2xl rounded-lg pl-2"
          placeholder="Search Posts..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default PostsFilter;