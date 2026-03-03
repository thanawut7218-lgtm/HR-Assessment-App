import { Routes, Route, NavLink } from 'react-router-dom';
import { ChartLineUp, AppWindow, GearSix, ShieldCheck, Users } from '@phosphor-icons/react';
import Dashboard from './components/Dashboard';
import AssessmentForm from './components/AssessmentForm';
import Settings from './components/Settings';
import EmployeeManagement from './components/EmployeeManagement';

function App() {
    return (
        <div className="app-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem', color: 'var(--color-primary)' }}>
                    <ShieldCheck size={40} weight="fill" />
                    <h2 style={{ fontSize: '1.25rem', lineHeight: '1.2', margin: 0 }}>
                        ระบบประเมินประสิทธิภาพ<br />
                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                            (POLICE PERFORMANCE)
                        </span>
                    </h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <ChartLineUp size={24} /> กระดานสรุปผล (Dashboard)
                    </NavLink>
                    <NavLink
                        to="/employees"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <Users size={24} /> จัดการข้อมูลพนักงาน
                    </NavLink>
                    <NavLink
                        to="/assessment"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <AppWindow size={24} /> แบบฟอร์มประเมินใหม่
                    </NavLink>
                    <div style={{ marginTop: 'auto', paddingTop: '2rem' }}></div>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <GearSix size={24} /> ตั้งค่าแบบประเมิน
                    </NavLink>
                </nav>

                {/* NavLink styling handled here for brevity, ideal to move to CSS */}
                <style>{`
          .nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-radius: var(--border-radius-sm);
            color: var(--color-text-muted);
            font-weight: 600;
            transition: all 0.2s;
          }
          .nav-link:hover {
            background-color: var(--color-bg-surface-hover);
            color: var(--color-primary);
          }
          .nav-link.active {
            background-color: var(--color-primary-alpha);
            color: var(--color-primary);
            border-left: 4px solid var(--color-primary);
          }
        `}</style>
            </aside>

            {/* Main Feature Content */}
            <main className="main-content">
                <div className="animate-fade-in">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<EmployeeManagement />} />
                        <Route path="/assessment" element={<AssessmentForm />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;
