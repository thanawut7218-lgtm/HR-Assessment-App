import React, { useState, useEffect } from 'react';
import { Plus, PencilSimple, Trash, Check, X } from '@phosphor-icons/react';
import { mockEmployees, mockDepartments } from '../data/mockData';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

export default function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({ id: null, name: '', title: '', deptId: 1 });
    const [loading, setLoading] = useState(true);

    const employeesCollection = collection(db, 'employees');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(employeesCollection);
            const employeeList = querySnapshot.docs.map(doc => ({
                firebaseId: doc.id,
                ...doc.data()
            }));

            if (employeeList.length === 0) {
                // First time setup: Upload mock data to Firebase
                for (const emp of mockEmployees) {
                    await addDoc(employeesCollection, emp);
                }
                fetchEmployees(); // Re-fetch after upload
            } else {
                setEmployees(employeeList.sort((a, b) => a.id - b.id));
            }
        } catch (error) {
            console.error("Error fetching employees: ", error);
        }
        setLoading(false);
    };

    const handleEdit = (emp) => {
        setCurrentEmployee(emp);
        setIsEditing(true);
    };

    const handleDelete = async (firebaseId) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลพนักงานท่านนี้?')) {
            try {
                await deleteDoc(doc(db, 'employees', firebaseId));
                fetchEmployees();
            } catch (error) {
                console.error("Error deleting employee: ", error);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (currentEmployee.firebaseId) {
                // Update existing
                const { firebaseId, ...data } = currentEmployee;
                await updateDoc(doc(db, 'employees', firebaseId), data);
            } else {
                // Add new
                const nextId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
                await addDoc(employeesCollection, { ...currentEmployee, id: nextId });
            }
            resetForm();
            fetchEmployees();
        } catch (error) {
            console.error("Error saving employee: ", error);
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentEmployee({ id: null, name: '', title: '', deptId: 1 });
    };

    const getDeptName = (deptId) => {
        const dept = mockDepartments.find(d => d.id === parseInt(deptId));
        return dept ? dept.name : 'ไม่ระบุ';
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>กำลังโหลดข้อมูลพนักงาน...</div>;

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.25rem' }}>จัดการข้อมูลพนักงาน (Cloud)</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>พนักงานทุกคนจะเห็นข้อมูลชุดเดียวกันแบบ Real-time</p>
                </div>
                {!isEditing && (
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                        <Plus size={20} weight="bold" /> เพิ่มพนักงานใหม่
                    </button>
                )}
            </div>

            {isEditing && (
                <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--color-primary)' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>{currentEmployee.firebaseId ? 'แก้ไขข้อมูลพนักงาน' : 'เพิ่มพนักงานใหม่'}</h3>
                    <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label className="form-label">ชื่อ-นามสกุล</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={currentEmployee.name}
                                onChange={(e) => setCurrentEmployee({...currentEmployee, name: e.target.value})}
                                required
                                placeholder="ระบุชื่อพนักงาน"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">ตำแหน่ง</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={currentEmployee.title}
                                onChange={(e) => setCurrentEmployee({...currentEmployee, title: e.target.value})}
                                required
                                placeholder="ระบุตำแหน่ง"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">แผนก/กองกำกับการ</label>
                            <select 
                                className="form-control"
                                value={currentEmployee.deptId}
                                onChange={(e) => setCurrentEmployee({...currentEmployee, deptId: parseInt(e.target.value)})}
                            >
                                {mockDepartments.map(dept => (
                                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ gridColumn: 'span 3', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                <X size={18} /> ยกเลิก
                            </button>
                            <button type="submit" className="btn btn-primary">
                                <Check size={18} /> {currentEmployee.firebaseId ? 'บันทึกการแก้ไข' : 'ยืนยันเพิ่มพนักงาน'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>ID</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>ตำแหน่ง</th>
                            <th>แผนก</th>
                            <th style={{ textAlign: 'right' }}>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.firebaseId}>
                                <td style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>#{emp.id}</td>
                                <td style={{ fontWeight: 700 }}>{emp.name}</td>
                                <td>{emp.title}</td>
                                <td>
                                    <span style={{ 
                                        padding: '4px 10px', 
                                        backgroundColor: 'var(--color-primary-alpha)', 
                                        color: 'var(--color-primary-dark)',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600
                                    }}>
                                        {getDeptName(emp.deptId)}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                        <button 
                                            className="btn btn-secondary" 
                                            style={{ padding: '6px 10px' }}
                                            onClick={() => handleEdit(emp)}
                                        >
                                            <PencilSimple size={18} />
                                        </button>
                                        <button 
                                            className="btn btn-secondary" 
                                            style={{ padding: '6px 10px', color: 'var(--color-danger)' }}
                                            onClick={() => handleDelete(emp.firebaseId)}
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
