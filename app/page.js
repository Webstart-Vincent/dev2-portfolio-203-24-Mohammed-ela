'use client'
import React, { useEffect, useState } from 'react';
import Header from '@/components/header.jsx';
import About from '@/components/about.jsx';
import Portfolio from '@/components/portfolio.jsx';
import ContactForm from '@/components/ContactForm.jsx';

export default function Home() {
    const [works, setWorks] = useState([]);

    useEffect(() => {
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
            <Header className="animate-fadeIn" />
            <main className="animate-fadeIn">
                <About className="animate-slideIn" />
                <Portfolio works={works} className="animate-slideIn" />
                <ContactForm className="animate-slideIn" />
            </main>
        </>
    );
}
