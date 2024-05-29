// C:\Users\Mohammed\Desktop\portfolio-nextjs\components\ContactForm.jsx
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                setError(result.message || 'An error occurred. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div name="contact" className="flex items-center justify-center min-h-screen bg-gray-900 ">
            <div className="max-w-lg w-full bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-2xl shadow-indigo backdrop-blur-md animate-slideIn">
                <h1 className="text-3xl font-bold text-center text-white mb-4">Contactez-moi</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-white font-bold">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 border border-gray-500 rounded mt-1 bg-transparent text-black focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-white font-bold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 border border-gray-500 rounded mt-1 bg-transparent text-black focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                            placeholder="Votre email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-white font-bold">Sujet</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="w-full p-3 border border-gray-500 rounded mt-1 bg-transparent text-black focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                            placeholder="Sujet"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-white font-bold">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            className="w-full p-3 border border-gray-500 rounded mt-1 bg-transparent text-black focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                            placeholder="Votre message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-indigo hover:bg-purple2 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                            disabled={loading}
                        >
                            {loading ? 'Envoi...' : <>Envoyer <FaPaperPlane className="inline ml-2" /></>}
                        </button>
                    </div>
                    {success && <p className="text-green-500 mt-4 text-center">Votre message a été envoyé avec succès ! &#128512;</p>}
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
            </div>
        </div>
    );
}
