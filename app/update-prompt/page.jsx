"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);

  // state to catch the data
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  // get only the wanted data to edit
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      
      setPost({
        prompt: data.prompt,
        tag: data.tag
      });

    }
     
    if(promptId) getPromptDetails();
  }, [promptId]);

  // update data
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
      
    // check if prompt ID not found
    if(!promptId) return alert('Prompt ID not found');

    try {
      // update the data
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt