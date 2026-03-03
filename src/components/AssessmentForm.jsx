import React, { useState, useEffect } from 'react';
import { initialCategories, initialQuestions, mockEmployees, mockDepartments } from '../data/mockData';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function AssessmentForm() {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Fetch Employees from Firebase
                const empSnapshot = await getDocs(collection(db, 'employees'));
                const empList = empSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEmployees(empList.sort((a, b) => a.id - b.id));

                // 2. Fetch Questions/Categories (Keep LocalStorage for now or could move to Firebase too)
                const storedQ = localStorage.getItem('appQuestions');
                const storedC = localStorage.getItem('appCategories');

                if (storedQ && storedC) {
                    setQuestions(JSON.parse(storedQ));
                    setCategories(JSON.parse(storedC));
                } else {
                    setQuestions(initialQuestions);
                    setCategories(initialCategories);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSaveAssessment = async () => {
        alert("บันทึกข้อมูลการประเมินเรียบร้อยแล้ว (ฟังก์ชันนี้ยังไม่ได้เชื่อมฐานข้อมูล Cloud)");
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>กำลังโหลดข้อมูล...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.25rem' }}>แบบฟอร์มประเมินพนักงาน</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>กรุณากรอกข้อมูลเพื่อประเมินประสิทธิภาพการทำงาน</p>
                </div>
                <button className="btn btn-primary" onClick={handleSaveAssessment}>
                    บันทึกผลการประเมิน
                </button>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                    ข้อมูลพนักงาน
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label className="form-label">เลือกพนักงาน</label>
                        <select className="form-control">
                            <option value="">-- เลือกพนักงาน --</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.name} ({emp.title})</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">วันที่ประเมิน</label>
                        <input type="date" className="form-control" defaultValue={new Date().toISOString().substring(0, 10)} />
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                    คำถามการประเมิน
                </h2>

                {categories.map((cat, idx) => {
                    const catQuestions = questions.filter(q => q.category === cat);
                    if (catQuestions.length === 0) return null;

                    return (
                        <div key={idx} style={{ marginBottom: '2rem' }}>
                            <h3 style={{ color: 'var(--color-primary)', fontSize: '1rem', marginBottom: '1rem' }}>{idx + 1}. {cat}</h3>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '50%' }}>หัวข้อประเมิน</th>
                                        <th style={{ textAlign: 'center' }}>1<br /><span style={{ fontSize: '0.7rem' }}>ต่ำกว่าเกณฑ์</span></th>
                                        <th style={{ textAlign: 'center' }}>2<br /><span style={{ fontSize: '0.7rem' }}>ต่ำกว่าคาดหวัง</span></th>
                                        <th style={{ textAlign: 'center' }}>3<br /><span style={{ fontSize: '0.7rem' }}>ตามคาดหวัง</span></th>
                                        <th style={{ textAlign: 'center' }}>4<br /><span style={{ fontSize: '0.7rem' }}>เกินคาดหวัง</span></th>
                                        <th style={{ textAlign: 'center' }}>5<br /><span style={{ fontSize: '0.7rem' }}>ยอดเยี่ยม</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {catQuestions.map(q => (
                                        <tr key={q.id}>
                                            <td style={{ fontSize: '0.9rem' }}>{q.text}</td>
                                            {[1, 2, 3, 4, 5].map(val => (
                                                <td key={val} style={{ textAlign: 'center' }}>
                                                    <input type="radio" name={q.id} value={val} style={{ transform: 'scale(1.2)', accentColor: 'var(--color-primary)' }} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
