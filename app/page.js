// pages/index.js
'use client';
import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/header.jsx';
import About from '@/components/about.jsx';

// Chargement dynamique des composants non critiques avec un code splitting et lazy loading appropriés
const Portfolio = dynamic(() => import('@/components/portfolio.jsx'), { 
    suspense: true, 
    ssr: false 
});
const ContactForm = dynamic(() => import('@/components/ContactForm.jsx'), { 
    suspense: true, 
    ssr: false 
});

export default function Home() {
    const [works, setWorks] = useState([]);

    useEffect(() => {
        async function loadProjects() {
            try {
                const response = await fetch('/api/projects');
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const projects = await response.json();
                setWorks(projects);
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
                <Suspense fallback={<div>Loading Portfolio...</div>}>
                    <Portfolio works={works} />
                </Suspense>
                <Suspense fallback={<div>Loading Contact Form...</div>}>
                    <ContactForm />
                </Suspense>
            </main>
        </>
    );
}
