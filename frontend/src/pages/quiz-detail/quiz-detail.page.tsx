import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import React from 'react';
import Typography from '@mui/material/Typography';
import { EQuestionType } from '../../entities/quiz/model/quiz';
import { QUESTION_TYPE_CONFIG, QUIZ_DETAIL_PAGE_CONFIG } from './config/quiz-detail.config';
import { RouterKeys } from '../../shared/constants/router-keys.const';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from '../../features/quiz-detail/api/use-quiz.hook';

export const QuizDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: quiz, isLoading, error } = useQuiz(id!);

  const handleBack = () => {
    navigate(RouterKeys.QUIZ.LIST);
  };

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !quiz) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">Failed to load quiz: {error?.message || 'Quiz not found'}</Alert>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />}>
              Back to Quizzes
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Button variant="outlined" onClick={handleBack} startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Typography variant="h3" component="h1" gutterBottom>
              {quiz.title}
            </Typography>

            {quiz.description && (
              <Typography variant="body1" color="text.secondary" paragraph>
                {quiz.description}
              </Typography>
            )}

            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Chip label={`${quiz.questions.length} questions`} color="primary" variant="outlined" />
              <Typography variant="body2" color="text.secondary">
                Created: {new Date(quiz.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h5" component="h2" gutterBottom>
              Questions
            </Typography>

            {quiz.questions.map((question, index) => (
              <Card key={question.id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
                    <Typography variant="h6" component="h3">
                      {index + 1}. {question.text}
                    </Typography>
                    <Chip
                      label={QUESTION_TYPE_CONFIG[question.type]?.label || 'Unknown'}
                      color={QUESTION_TYPE_CONFIG[question.type]?.color || 'default'}
                      size="small"
                    />
                  </Box>

                  {question.options.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Answer Options:
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {question.options.map(option => (
                          <Typography
                            key={option.id}
                            component="li"
                            variant="body2"
                            sx={{
                              color: option.isCorrect ? 'success.main' : 'text.secondary',
                              fontWeight: option.isCorrect ? 600 : 400,
                            }}
                          >
                            {option.text}
                            {option.isCorrect && ' ✓'}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
