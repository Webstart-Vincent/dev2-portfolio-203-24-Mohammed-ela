"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
export default function Home() {
    const [works, setWorks] = useState([]);

    useEffect(() => {
        //list des projets
      async function loadProjects() {
          try {
              const response = await fetch('/api/projects');
              if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
              }
              const text = await response.text(); 
              try {
                  const projects = JSON.parse(text); 
                  setWorks(projects);
              } catch (error) {
                  console.error("Failed to parse JSON:", text, error);
              }
          } catch (error) {
              console.error("Failed to fetch projects:", error);
          }
      }
      loadProjects();
  }, []);
  

    return (
        <>
            <Header />
            <main>
                <About />
                {/* on passe des params au components */}
                <Portfolio works={works} />
            </main>
        </>
    );
}
