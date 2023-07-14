"use client"

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  // console.log(data);
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  ) 
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  
  // fetch all data
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      
      setAllPosts(data);
    }
    
    fetchPosts();
  }, []);

  // filter all requested 
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");

    return allPosts.filter((item) => 
      regex.test(item.creator.username) ||
      regex.test(item.prompt) ||
      regex.test(item.tag)
    );
  }

  // handle search change
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  }

  // handle tag on click
  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResult = filterPrompts(tag);
    setSearchedResults(searchResult);
  }
  

  return (
    <section className='feed'>
      <form className='realtive w-full flex-center'>
        <input 
          type="text" 
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />

      </form>

      {searchText ?
      <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
      :
      <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      }

    </section>
  )
}

export default Feed