import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React from 'react';
import Typography from '@mui/material/Typography';
import { IQuizListPageProps } from './types/quiz-list-page.types';
import { QUIZ_LIST_PAGE_CONFIG } from './config/quiz-list-page.config';
import { QuizCard } from '../../features/quiz-list/ui/components/quiz-card.component';
import { useQuizListPage } from './hooks/use-quiz-list-page.hook';

export const QuizListPage: React.FC<IQuizListPageProps> = ({ className }) => {
  const { quizzes, error, handleQuizSelect, handleQuizDelete, handleCreateQuiz } = useQuizListPage();

  if (error) {
    return (
      <Container maxWidth="lg" className={className}>
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">Failed to load quizzes: {error.message}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className={className}>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom>
            {QUIZ_LIST_PAGE_CONFIG.title}
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateQuiz} size="large">
            {QUIZ_LIST_PAGE_CONFIG.createButtonText}
          </Button>
        </Box>

        {!quizzes || quizzes.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="40vh"
            textAlign="center"
          >
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {QUIZ_LIST_PAGE_CONFIG.emptyState.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              {QUIZ_LIST_PAGE_CONFIG.emptyState.description}
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateQuiz} size="large">
              {QUIZ_LIST_PAGE_CONFIG.emptyState.buttonText}
            </Button>
          </Box>
        ) : (
          <Grid container spacing={QUIZ_LIST_PAGE_CONFIG.grid.spacing}>
            {quizzes.map(quiz => (
              <Grid key={quiz.id}>
                <QuizCard quiz={quiz} onSelect={handleQuizSelect} onDelete={handleQuizDelete} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};
