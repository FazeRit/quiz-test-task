import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Typography from '@mui/material/Typography';
import ViewIcon from '@mui/icons-material/Visibility';
import { IQuizCardProps } from '../types/quiz-list.types';

export const QuizCard: React.FC<IQuizCardProps> = ({ quiz, onSelect, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(quiz.id);
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(quiz.id);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.2s ease-in-out',
      }}
      onClick={handleView}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom noWrap>
          {quiz.title}
        </Typography>
        {quiz.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 1,
            }}
          >
            {quiz.description}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Chip label={`${quiz.questionCount} questions`} size="small" color="primary" variant="outlined" />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Created: {new Date(quiz.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <IconButton size="small" color="primary" onClick={handleView} aria-label="view quiz">
          <ViewIcon />
        </IconButton>
        <IconButton size="small" color="error" onClick={handleDelete} aria-label="delete quiz">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
