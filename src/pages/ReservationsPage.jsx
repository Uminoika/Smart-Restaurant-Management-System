import React, { useState } from 'react';

const TIME_SLOTS = [
    '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM'
];

export default function ReservationsPage() {
    const today = new Date().toISOString().split('T')[0];

    const [reservation, setReservation] = useState({
        name: '',
        email: '',
        date: today,
        time: '6:00 PM',
        guests: 2,
        eventType: 'Standard Table',
        specialRequests: ''
    });
    const [confirmation, setConfirmation] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const confId = 'RES-' + Math.floor(100000 + Math.random() * 900000);
        setConfirmation({ ...reservation, id: confId });
    };

    return (
        <div style={styles.container}>
            <h2>Book a Table or Special Event</h2>
            <p style={styles.subtitle}>
                Open daily from 11:00 AM – 10:00 PM (last seating at 9:30 PM).
            </p>

            {confirmation ? (
                <div style={styles.successBox}>
                    <h3>Reservation Confirmed!</h3>
                    <p>Confirmation ID: <strong>{confirmation.id}</strong></p>
                    <p>Name: <strong>{confirmation.name}</strong></p>
                    <p>Type: <strong>{confirmation.eventType}</strong></p>
                    <p>Date & Time: <strong>{confirmation.date} at {confirmation.time}</strong></p>
                    <p>Guests: <strong>{confirmation.guests} people</strong></p>
                    <p style={styles.notice}>A confirmation notification email has been sent to {confirmation.email}.</p>
                    <button onClick={() => setConfirmation(null)} style={styles.resetBtn}>Book Another Reservation</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label>Full Name:</label>
                            <input
                                type="text"
                                required
                                value={reservation.name}
                                onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                                style={styles.input}
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div style={styles.field}>
                            <label>Email Address:</label>
                            <input
                                type="email"
                                required
                                value={reservation.email}
                                onChange={(e) => setReservation({ ...reservation, email: e.target.value })}
                                style={styles.input}
                                placeholder="jane@example.com"
                            />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label>Reservation Date:</label>
                            <input
                                type="date"
                                min={today}
                                required
                                value={reservation.date}
                                onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.field}>
                            <label>Time Slot (30-min intervals):</label>
                            <select
                                required
                                value={reservation.time}
                                onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                                style={styles.input}
                            >
                                {TIME_SLOTS.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label>Number of Guests:</label>
                            <input
                                type="number"
                                min="1"
                                max="50"
                                required
                                value={reservation.guests}
                                onChange={(e) => setReservation({ ...reservation, guests: Number(e.target.value) })}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.field}>
                            <label>Event Type:</label>
                            <select
                                value={reservation.eventType}
                                onChange={(e) => setReservation({ ...reservation, eventType: e.target.value })}
                                style={styles.input}
                            >
                                <option value="Standard Table">Standard Dining Table</option>
                                <option value="Birthday Party">Birthday Party</option>
                                <option value="Corporate Gathering">Corporate Gathering</option>
                                <option value="Anniversary">Anniversary Celebration</option>
                            </select>
                        </div>
                    </div>

                    <div style={styles.field}>
                        <label>Special Requests / Notes:</label>
                        <textarea
                            value={reservation.specialRequests}
                            onChange={(e) => setReservation({ ...reservation, specialRequests: e.target.value })}
                            style={{ ...styles.input, height: '80px', resize: 'vertical' }}
                            placeholder="Allergies, high chair needed, seating preference..."
                        />
                    </div>

                    <button type="submit" style={styles.submitBtn}>Submit Reservation</button>
                </form>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '700px',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    },
    subtitle: {
        color: '#666',
        marginBottom: '24px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    row: {
        display: 'flex',
        gap: '16px'
    },
    field: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    input: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '0.95rem',
        backgroundColor: '#fff'
    },
    submitBtn: {
        backgroundColor: '#2c3e50',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '12px'
    },
    successBox: {
        backgroundColor: '#e8f5e9',
        border: '1px solid #c8e6c9',
        padding: '24px',
        borderRadius: '8px',
        textAlign: 'center'
    },
    notice: {
        fontSize: '0.85rem',
        color: '#2e7d32',
        margin: '16px 0'
    },
    resetBtn: {
        backgroundColor: '#2e7d32',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};