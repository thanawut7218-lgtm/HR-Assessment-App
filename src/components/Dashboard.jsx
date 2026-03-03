import React from 'react';

export default function Dashboard() {
    return (
        <div>
            <h1 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.25rem' }}>กระดานสรุปผล (Dashboard)</h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>ภาพรวมผลการประเมินประสิทธิภาพพนักงาน</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {/* Summary Card 1 */}
                <div className="card" style={{ gridColumn: 'span 4', borderTop: '4px solid var(--color-primary)' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>คะแนนเฉลี่ยองค์กร</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginTop: '0.5rem' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: 1 }}>68.2</span>
                        <span style={{ color: 'var(--color-success)', fontWeight: 600, paddingBottom: '4px' }}>ได้ตามความคาดหวัง</span>
                    </div>
                </div>

                {/* Summary Card 2 */}
                <div className="card" style={{ gridColumn: 'span 4' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>พนักงานยอดเยี่ยม</h3>
                    <div style={{ marginTop: '0.5rem' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>พนักงาน 11</div>
                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>แผนก: เทคโนโลยี (92.5 คะแนน)</div>
                    </div>
                </div>

                {/* Summary Card 3 */}
                <div className="card" style={{ gridColumn: 'span 4' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>พนักงานที่ต้องปรับปรุง</h3>
                    <div style={{ marginTop: '0.5rem' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-danger)' }}>พนักงาน 4</div>
                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>แผนก: ทรัพยากรบุคคล (45.0 คะแนน)</div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'var(--color-text-muted)' }}>[ พื้นที่สำหรับแผนภูมิแสดงผลคะแนนย้อนหลัง (Chart.js) ]</p>
            </div>
        </div>
    );
}
