import React, { useState } from 'react';

const SUGGESTED_QUESTIONS = [
    "What are today's specials?",
    "What vegetarian meals do you have?",
    "What do you recommend?",
    "Do you have gluten-free options?",
    "What is the most popular dessert?",
    "What did I order last time?"
];

export default function AIChatbot({ activeOrder }) {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: "Hi! I'm your Smart Restaurant AI Assistant. Ask me about today's specials, dietary options, or menu recommendations!"
        }
    ]);

    const getSimulatedAIResponse = (question) => {
        const q = question.toLowerCase().trim();

        if (q.includes('special') || q.includes('today')) {
            return "Today's special is Chicken Alfredo for $18.99.";
        }
        if (q.includes('vegetarian') || q.includes('veg')) {
            return "We offer Vegetable Pasta, Margherita Pizza, and Garden Salad.";
        }
        if (q.includes('recommend') || q.includes('popular meal')) {
            return "Based on popular orders, we recommend our Chicken Alfredo.";
        }
        if (q.includes('gluten') || q.includes('gluten-free')) {
            return "Yes. We offer gluten-free pasta and selected salads.";
        }
        if (q.includes('dessert') || q.includes('sweet')) {
            return "Our Chocolate Lava Cake is our most popular dessert.";
        }
        if (q.includes('last time') || q.includes('order') || q.includes('history')) {
            if (activeOrder && activeOrder.items.length > 0) {
                const itemNames = activeOrder.items.map((i) => `${i.name} (x${i.quantity})`).join(', ');
                return `Your most recent order (${activeOrder.id}) included: ${itemNames}.`;
            }
            return "Your previous order was Chicken Alfredo and Chocolate Lava Cake.";
        }

        return "I'm not sure about that yet! Try asking about today's specials, vegetarian or gluten-free options, popular desserts, or your previous order.";
    };

    const handleSend = (questionText) => {
        const query = questionText || input;
        if (!query.trim()) return;

        const userMsg = { sender: 'user', text: query };
        const aiMsg = { sender: 'ai', text: getSimulatedAIResponse(query) };

        setMessages((prev) => [...prev, userMsg, aiMsg]);
        if (!questionText) setInput('');
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSend();
    };

    return (
        <div style={styles.wrapper}>
            {isOpen ? (
                <div style={styles.chatWindow}>
                    <div style={styles.header}>
                        <div>
                            <strong>Restaurant AI Assistant</strong>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>
                    </div>

                    <div style={styles.messageList}>
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                style={{
                                    ...styles.messageBubble,
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    backgroundColor: msg.sender === 'user' ? '#2c3e50' : '#f1f3f5',
                                    color: msg.sender === 'user' ? '#fff' : '#222'
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div style={styles.chipsContainer}>
                        {SUGGESTED_QUESTIONS.map((q) => (
                            <button
                                key={q}
                                onClick={() => handleSend(q)}
                                style={styles.chipBtn}
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleFormSubmit} style={styles.inputArea}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            style={styles.input}
                        />
                        <button type="submit" style={styles.sendBtn}>Send</button>
                    </form>
                </div>
            ) : (
                <button onClick={() => setIsOpen(true)} style={styles.floatingBtn}>
                    Ask AI Assistant
                </button>
            )}
        </div>
    );
}

const styles = {
    wrapper: {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    floatingBtn: {
        backgroundColor: '#2c3e50',
        color: '#fff',
        border: 'none',
        borderRadius: '30px',
        padding: '14px 22px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    },
    chatWindow: {
        width: '360px',
        height: '480px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        border: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    header: {
        backgroundColor: '#2c3e50',
        color: '#fff',
        padding: '14px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subHeader: {
        fontSize: '0.75rem',
        color: '#bdc3c7',
        marginTop: '2px'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '1.1rem',
        cursor: 'pointer'
    },
    messageList: {
        flex: 1,
        padding: '14px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: '#fff'
    },
    messageBubble: {
        maxWidth: '82%',
        padding: '10px 14px',
        borderRadius: '12px',
        fontSize: '0.9rem',
        lineHeight: '1.4'
    },
    chipsContainer: {
        padding: '8px 12px',
        backgroundColor: '#fafafa',
        borderTop: '1px solid #eee',
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
    },
    chipBtn: {
        backgroundColor: '#e9ecef',
        border: '1px solid #dee2e6',
        borderRadius: '16px',
        padding: '5px 10px',
        fontSize: '0.75rem',
        cursor: 'pointer',
        color: '#333',
        flexShrink: 0
    },
    inputArea: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        gap: '8px'
    },
    input: {
        flex: 1,
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '0.9rem'
    },
    sendBtn: {
        backgroundColor: '#27ae60',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 14px',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
};