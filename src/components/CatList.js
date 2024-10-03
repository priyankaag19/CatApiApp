import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CatList = () => {
  const [cats, setCats] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);  
  const catsPerPage = 9; 

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true); 
        const response = await axios.get(
          'https://api.thecatapi.com/v1/images/search?limit=54&api_key=live_D58FL46aWZDZ6svvcx3q37GiXYR4o4tNItW3wkc15T2IYwje9J4DrVC6uCdHo1Hs'
        );
        setCats(response.data);
      } catch (error) {
        setError('Error fetching cat images');
        console.error('Error fetching cat images:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchCats();
  }, []);

  // Filter cats based on the search term
  const filteredCats = cats.filter(cat =>
    cat.id.toLowerCase().includes(searchTerm.toLowerCase())  // Filtering by cat ID
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredCats.length / catsPerPage);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * catsPerPage;
  const endIndex = startIndex + catsPerPage;
  const currentCats = filteredCats.slice(startIndex, endIndex);  // Cats to display for the current page

  return (
    <div className="container mt-4">
      
      {/* Display error if fetching cats failed */}
      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {/* Search Input Field */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Cat ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // Update search term on input change
        />
      </div>

      {/* Display loading message while data is being fetched */}
      {loading && (
        <div className="alert alert-info text-center">
          Loading cat list...
        </div>
      )}

      {/* Display message when there is no data */}
      {!loading && !error && cats.length === 0 && (
        <div className="alert alert-warning text-center">
          No data available.
        </div>
      )}

      {/* Displaying filtered cats */}
      <div className="row">
        {currentCats.map((cat) => (
          <div className="col-md-4 mb-4" key={cat.id}>
            <div className="card">
              <img src={cat.url} className="card-img-top" alt="cat" />
              <div className="card-body">
                <h5 className="card-title">Cat ID: {cat.id}</h5>
                <Link to={`/cat/${cat.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* If no cats match the search */}
        {currentCats.length === 0 && !loading && !error && cats.length > 0 && (
          <div className="col-12">
            <p className="text-center text-danger">No cats found matching your search.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && !error && filteredCats.length > 0 && (
        <nav>
          <ul className="pagination justify-content-center">
            {/* Previous button */}
            {currentPage > 1 && (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>
              </li>
            )}
            {/* Page numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            {/* Next button */}
            {currentPage < totalPages && (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  Next
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default CatList;
