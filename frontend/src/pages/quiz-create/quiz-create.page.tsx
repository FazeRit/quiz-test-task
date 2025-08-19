import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import React from 'react';
import Typography from '@mui/material/Typography';
import { IQuizCreatePageProps } from './types/quiz-create-page.types';
import { QuizForm } from '../../features/create-quiz/ui/components/quiz-form.component';
import { useQuizCreatePage } from './hooks/use-quiz-create-page.hook';

export const QuizCreatePage: React.FC<IQuizCreatePageProps> = ({ className }) => {
  const { handleBack, handleSuccess } = useQuizCreatePage();

  return (
    <Container maxWidth="md" className={className}>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />} sx={{ mr: 2 }}>
            Back
          </Button>
          <Typography variant="h4" component="h1">
            Create New Quiz
          </Typography>
        </Box>

        <Card>
          <CardContent>
            <QuizForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
