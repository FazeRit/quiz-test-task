import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { ControlledInput } from '../../../../shared/ui/controlled-input';
import { Controller } from 'react-hook-form';
import { EQuestionType } from '../../../../entities/quiz/model/quiz';
import { IQuizCreateFormProps } from '../types/quiz-create-form.types';
import { useQuizCreateForm } from '../hooks/use-quiz-create-form.hook';

export const QuizForm: React.FC<IQuizCreateFormProps> = ({ onSuccess, initialData }) => {
  const { form, questionFields, isSubmitting, onSubmit, onAddQuestion, onRemoveQuestion, onAddAnswer, onRemoveAnswer } =
    useQuizCreateForm({ onSuccess, initialData });

  const { control, handleSubmit, watch, setValue, formState } = form;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" gutterBottom>
        Create New Quiz
      </Typography>

      <ControlledInput name="title" control={control} label="Quiz Title" fullWidth required sx={{ mb: 3 }} />

      <ControlledInput
        name="description"
        control={control}
        label="Quiz Description (Optional)"
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 4 }}
      />

      <Divider sx={{ mb: 3 }} />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Questions ({questionFields.length})</Typography>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={onAddQuestion}>
          Add Question
        </Button>
      </Box>

      {questionFields.map((questionField, questionIndex) => {
        const questionType = watch(`questions.${questionIndex}.type`);
        const options = watch(`questions.${questionIndex}.options`) || [];

        return (
          <Card key={questionField.id} sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Typography variant="h6">Question {questionIndex + 1}</Typography>
                <IconButton
                  color="error"
                  onClick={() => onRemoveQuestion(questionIndex)}
                  disabled={questionFields.length === 1}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <ControlledInput
                name={`questions.${questionIndex}.text`}
                control={control}
                label="Question Text"
                fullWidth
                required
                sx={{ mb: 2 }}
              />

              <Controller
                name={`questions.${questionIndex}.type`}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Question Type</InputLabel>
                    <Select
                      {...field}
                      label="Question Type"
                      onChange={e => {
                        field.onChange(e);
                        const newType = e.target.value as EQuestionType;

                        if (newType === EQuestionType.TEXT) {
                          setValue(`questions.${questionIndex}.options`, []);
                        } else if (newType === EQuestionType.TRUE_FALSE) {
                          setValue(`questions.${questionIndex}.options`, [
                            { text: 'True', isCorrect: false },
                            { text: 'False', isCorrect: false },
                          ]);
                        } else if (newType === EQuestionType.MULTIPLE_CHOICE && (!options || options.length === 0)) {
                          setValue(`questions.${questionIndex}.options`, [
                            { text: '', isCorrect: false },
                            { text: '', isCorrect: false },
                          ]);
                        }
                      }}
                    >
                      <MenuItem value={EQuestionType.MULTIPLE_CHOICE}>Multiple Choice</MenuItem>
                      <MenuItem value={EQuestionType.TRUE_FALSE}>True/False</MenuItem>
                      <MenuItem value={EQuestionType.TEXT}>Text Input</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              {questionType !== EQuestionType.TEXT && (
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1">Answer Options ({options.length})</Typography>
                    {questionType === EQuestionType.MULTIPLE_CHOICE && (
                      <Button size="small" startIcon={<AddIcon />} onClick={() => onAddAnswer(questionIndex)}>
                        Add Option
                      </Button>
                    )}
                  </Box>

                  {options.map((_, optionIndex) => (
                    <Box key={optionIndex} display="flex" alignItems="center" gap={1} mb={2}>
                      <ControlledInput
                        name={`questions.${questionIndex}.options.${optionIndex}.text`}
                        control={control}
                        label={`Option ${optionIndex + 1}`}
                        fullWidth
                        required
                      />

                      <Controller
                        name={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<Checkbox checked={field.value} onChange={field.onChange} color="primary" />}
                            label="Correct"
                          />
                        )}
                      />

                      {questionType === EQuestionType.MULTIPLE_CHOICE && options.length > 1 && (
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => onRemoveAnswer(questionIndex, optionIndex)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        );
      })}

      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          disabled={isSubmitting}
          sx={{ minWidth: 200 }}
        >
          {isSubmitting ? 'Saving...' : 'Create Quiz'}
        </Button>
      </Box>
    </Box>
  );
};
