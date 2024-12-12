import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Paper, CircularProgress, Button } from '@mui/material';

const FetchParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const participantsPerPage = 6;

  useEffect(() => {
    axios.get('https://backenddep-production.up.railway.app/api/participants')
      .then(response => {
        setParticipants(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load participants.');
        setLoading(false);
      });
  }, []);

  const indexOfLastParticipant = page * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const currentParticipants = participants.slice(indexOfFirstParticipant, indexOfLastParticipant);

  const handlePageChange = (direction) => {
    if (direction === 'next' && page * participantsPerPage < participants.length) {
      setPage(page + 1);
    } else if (direction === 'prev' && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#101010', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom style={{ color: '#fff', fontFamily: 'Roboto, sans-serif' }}>
        Participants List
      </Typography>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <CircularProgress style={{ color: '#00bcd4' }} />
        </div>
      ) : error ? (
        <Typography color="error" align="center" variant="h6">{error}</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {currentParticipants.length > 0 ? (
            currentParticipants.map(participant => (
              <Grid item xs={12} sm={6} md={4} key={participant.id}>
                <Card
                  elevation={8}
                  sx={{
                    backgroundColor: '#1e1e1e',
                    borderRadius: '12px',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': { transform: 'scale(1.05)' },
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ color: '#00bcd4' }}>
                      {participant.eventName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom sx={{ color: '#fff' }}>
                      <strong>Venue:</strong> {participant.venue}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom sx={{ color: '#fff' }}>
                      <strong>Category:</strong> {participant.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom sx={{ color: '#fff' }}>
                      <strong>Date:</strong> {participant.date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom sx={{ color: '#fff' }}>
                      <strong>Time:</strong> {participant.time}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom sx={{ color: '#fff' }}>
                      <strong>Email:</strong> {participant.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#333' }}>
                <Typography variant="h6" sx={{ color: '#fff' }}>No participants found.</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange('prev')}
          disabled={page === 1}
          sx={{
            backgroundColor: '#00bcd4',
            color: '#fff',
            '&:hover': { backgroundColor: '#0288d1' },
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange('next')}
          disabled={page * participantsPerPage >= participants.length}
          sx={{
            backgroundColor: '#00bcd4',
            color: '#fff',
            '&:hover': { backgroundColor: '#0288d1' },
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FetchParticipants;
