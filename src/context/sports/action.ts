import { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';

export const useFetchSports = () => {
  const [sports, setSports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSports = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_ENDPOINT}/sports`);
        const data = await response.json();
        setSports(data.sports);
      } catch (error) {
        console.error('Error fetching sports:', error);
        setError('Error fetching sports');
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  return { sports, loading, error };
};
