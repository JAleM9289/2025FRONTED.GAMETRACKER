import React, { useState, useEffect } from 'react';
import axios from 'axios';

// **¡CORRECCIÓN!**
// Se cambia la URL local (http://localhost:3001/api) por la URL de Render.
const API_BASE_URL = 'https://two025backend-gametracker.onrender.com/api';

function ListaResenas() {
    const [resenas, setResenas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarResenas = async () => {
        setLoading(true);
        setError(null);
        try {
            // La llamada ahora va a la URL de Render: https://two025backend-gametracker.onrender.com/api/resenas
            const response = await axios.get(`${API_BASE_URL}/resenas`);
            setResenas(response.data);
            
        } catch (err) {
            console.error('Error al cargar reseñas:', err);
            // Mensaje de error ajustado para reflejar el despliegue
            setError('No se pudieron cargar las reseñas. Por favor, verifica la URL de Render y el estado del Backend.');
            
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarResenas();
    }, []); 

    if (loading) {
        return <h3 className="loading-text">Cargando Reseñas...</h3>;
    }

    if (error) {
        return <h3 className="error-text">{error}</h3>;
    }

    return (
        <div className="main-content">
            <div className="resenas-list-wrapper">
                <h2>📝 Reseñas Recientes</h2>
                {resenas.length === 0 ? (
                    <p>Aún no hay reseñas. ¡Sé el primero en agregar una!</p>
                ) : (
                    <div className="resenas-grid">
                        {resenas.map((resena) => (
                            <div key={resena._id} className="resena-card">
                                {/* ¡IMPORTANTE! Aquí se usa resena.juegoId.titulo */}
                                <h3>{resena.juegoId ? resena.juegoId.titulo : 'Juego no encontrado'}</h3>
                                <p className="resena-puntuacion">⭐ Puntuación: {resena.puntuacion} / 5</p>
                                <p>🕰️ Horas Jugadas: {resena.horasJugadas}</p>
                                <p>💪 Dificultad: {resena.dificultad}</p>
                                <hr />
                                <p className="resena-texto">"{resena.resena}"</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListaResenas;

