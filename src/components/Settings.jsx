import React, { useState, useEffect } from 'react';
import { initialCategories, initialQuestions } from '../data/mockData';
import { Trash, Plus, FloppyDisk } from '@phosphor-icons/react';

export default function Settings() {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const storedQ = localStorage.getItem('appQuestions');
        const storedC = localStorage.getItem('appCategories');
        if (storedQ && storedC) {
            setQuestions(JSON.parse(storedQ));
            setCategories(JSON.parse(storedC));
        } else {
            setQuestions(initialQuestions);
            setCategories(initialCategories);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('appQuestions', JSON.stringify(questions));
        localStorage.setItem('appCategories', JSON.stringify(categories));
        alert('บันทึกการตั้งค่าเรียบร้อยแล้ว');
    };

    const handleAddQuestion = () => {
        const newId = 'ans' + (Math.floor(Math.random() * 10000));
        setQuestions([...questions, { id: newId, category: categories[0] || 'Uncategorized', text: 'คำถามใหม่...' }]);
    };

    const handleDeleteQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const handleQuestionChange = (id, field, value) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.25rem' }}>ตั้งค่าแบบประเมิน</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>แก้ไข ลบ หรือเพิ่มหัวข้อคำถาม (ข้อมูลบันทึกในหน้าเว็บ)</p>
                </div>
                <button className="btn btn-primary" onClick={handleSave}>
                    <FloppyDisk size={20} /> บันทึกการเปลี่ยนแปลง
                </button>
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.1rem' }}>จัดการคำถาม</h2>
                    <button className="btn btn-secondary" onClick={handleAddQuestion}>
                        <Plus size={18} /> เพิ่มคำถาม
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {questions.map((q, i) => (
                        <div key={q.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--color-bg-base)' }}>
                            <div style={{ width: '40px', textAlign: 'center', color: 'var(--color-text-muted)', fontWeight: 600 }}>#{i + 1}</div>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={q.text}
                                    onChange={(e) => handleQuestionChange(q.id, 'text', e.target.value)}
                                    placeholder="พิมพ์คำถามที่นี่..."
                                />
                            </div>
                            <div style={{ width: '200px' }}>
                                <select
                                    className="form-control"
                                    value={q.category}
                                    onChange={(e) => handleQuestionChange(q.id, 'category', e.target.value)}
                                >
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <button
                                className="btn btn-danger"
                                style={{ padding: '0.5rem', borderRadius: '4px' }}
                                onClick={() => handleDeleteQuestion(q.id)}
                                title="ลบคำถาม"
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
