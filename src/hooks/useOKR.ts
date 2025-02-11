import { okrService } from '@/services/okrService';

import type {
  CreateKeyResultDto,
  UpdateKeyResultDto,
} from '@/services/okrService';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useOKRs = () => {
  return useQuery({
    queryKey: ['okrs'],
    queryFn: okrService.getOKRs,
  });
};

export const useCreateOKR = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: okrService.createOKR,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['okrs'] });
    },
  });
};

export const useOKRsWithProgress = () => {
  return useQuery({
    queryKey: ['okrs-progress'],
    queryFn: okrService.getOKRsWithProgress,
  });
};

export const useDeleteOKR = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: okrService.deleteOKR,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['okrs'] });
    },
  });
};

export const useAddKeyResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      objectiveId,
      data,
    }: {
      objectiveId: string;
      data: CreateKeyResultDto;
    }) => okrService.addKeyResult(objectiveId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['okrs'] });
    },
  });
};

export const useUpdateKeyResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      objectiveId,
      keyResultId,
      data,
    }: {
      objectiveId: string;
      keyResultId: string;
      data: UpdateKeyResultDto;
    }) => okrService.updateKeyResult(objectiveId, keyResultId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['okrs'] });
    },
  });
};

export const useDeleteKeyResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      objectiveId,
      keyResultId,
    }: {
      objectiveId: string;
      keyResultId: string;
    }) => okrService.deleteKeyResult(objectiveId, keyResultId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['okrs'] });
    },
  });
};
