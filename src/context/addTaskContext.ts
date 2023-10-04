import type { TAddNewTask, TFormDropDown } from '@/types/types';
import { type Dispatch, type SetStateAction, createContext } from 'react';
import type {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export type AddTaskCtx = {
  register: UseFormRegister<TAddNewTask>;
  setValue: UseFormSetValue<TAddNewTask>;
  handleSubmit: UseFormHandleSubmit<TAddNewTask, undefined>;
  formSubmit: SubmitHandler<TAddNewTask>;
  errors?: FieldErrors<TAddNewTask>;
  watch: UseFormWatch<TAddNewTask>;
  isSubmitting: boolean;
  resetField: UseFormResetField<TAddNewTask>;
  reset: UseFormReset<TAddNewTask>;
  isDropDownOpen: TFormDropDown;
  setDropDownOpen: Dispatch<SetStateAction<TFormDropDown>>;
};

export const AddTaskContext = createContext<AddTaskCtx | null>(null);
