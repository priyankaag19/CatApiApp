import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CatDetail() {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cat data');
        }
        const data = await response.json();
        setCat(data);  
      } catch (error) {
        console.error('Error fetching cat data:', error);
        setError('Failed to load cat details.');
      } finally {
        setLoading(false); 
      }
    };

    fetchCat();
  }, [id]);

  // Show loading message while fetching
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there's an error
  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  // Ensure the cat object exists and has data
  if (!cat || !cat.breeds || cat.breeds.length === 0) {
    return <div className="text-danger">No details available for this cat.</div>;
  }

  // Fallback values if some breed details are missing
  const breed = cat.breeds[0] || {};
  const breedName = breed.name || 'Unknown';
  const temperament = breed.temperament || 'Unknown temperament';
  const origin = breed.origin || 'Unknown origin';
  const lifeSpan = breed.life_span || 'N/A';
  const wikipediaUrl = breed.wikipedia_url || '#';

  return (
    <div>
      <h2>{breedName}</h2>
      <img src={cat.url} alt={breedName} width="400" />
      <p>Temperament: {temperament}</p>
      <p>Origin: {origin}</p>
      <p>Life Span: {lifeSpan} years</p>
      {wikipediaUrl !== '#' && (
        <a href={wikipediaUrl} target="_blank" rel="noopener noreferrer">
          More about {breedName}
        </a>
      )}
    </div>
  );
}

export default CatDetail;
