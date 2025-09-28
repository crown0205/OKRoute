import api, { handleApiError, ErrorResponse } from './axios';

// 타입 정의
export interface KeyResult {
  id: string;
  value: string;
  isChecked: boolean;
  paddingLeft: number;
}

interface OKR {
  id: string;
  category: string;
  objective: string;
  isShowOKR: boolean;
  createdAt: string;
  updatedAt: string;
  progress: number;
  keyResults: KeyResult[];
}

export interface CreateOkrDto {
  title: string;
}

export interface CreateKeyResultDto {
  title: string;
  targetValue: number;
}

export interface UpdateKeyResultDto {
  currentValue?: number;
  title?: string;
  targetValue?: number;
}

// OKR 관련 API 호출
export const okrService = {
  // OKR 목록 조회

  getOKRs: async (): Promise<OKR[] | ErrorResponse> => {
    try {
      const { data } = await api.get<{ okrs: OKR[] }>('/okr');
      return data.okrs;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // 진행률이 포함된 OKR 목록 조회
  getOKRsWithProgress: async () => {
    try {
      const { data } = await api.get<{ okrs: OKR[] } | ErrorResponse>(
        '/okr/progress',
      );
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // OKR 생성
  createOKR: async (okrData: CreateOkrDto) => {
    try {
      const { data } = await api.post<OKR>('/okr', okrData);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Key Result 추가
  addKeyResult: async (
    objectiveId: string,
    keyResultData: CreateKeyResultDto,
  ) => {
    try {
      const { data } = await api.post<KeyResult>(
        `/okr/${objectiveId}/key-results`,
        keyResultData,
      );
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Key Result 수정
  updateKeyResult: async (
    objectiveId: string,
    keyResultId: string,
    updateData: UpdateKeyResultDto,
  ) => {
    try {
      const { data } = await api.patch<KeyResult>(
        `/okr/${objectiveId}/key-results/${keyResultId}`,
        updateData,
      );
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // OKR 삭제
  deleteOKR: async (objectiveId: string) => {
    try {
      const { data } = await api.delete<void>(`/okr/${objectiveId}`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Key Result 삭제
  deleteKeyResult: async (objectiveId: string, keyResultId: string) => {
    try {
      const { data } = await api.delete<void>(
        `/okr/${objectiveId}/key-results/${keyResultId}`,
      );
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};
