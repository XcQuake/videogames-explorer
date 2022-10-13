import React, { useState, useEffect } from 'react';

export const useInfiniteScroll = (calle: (link: string) => void, link: string) => {
  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    calle(link);
  }
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}