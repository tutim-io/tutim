import React from 'react';
import { TutimOptionsProviderValue } from '@tutim/types';

const API_BASE_URL = 'http://localhost/api/v0/pb';

const parseResponseJson = async (rawResponse) => {
  try {
    const response = await rawResponse.json();
    return response;
  } catch (err) {
    return { error: { status: rawResponse.status, message: 'response parse error' } };
  }
};

const parseResponse = async (rawResponse) => {
  const response = await parseResponseJson(rawResponse);
  if (response?.error?.status > 300) throw new Error(response.error);
  return response;
};

const request = async ({ clientId, url, method = 'GET' }) => {
  const rawResponse = await fetch(`${API_BASE_URL}/${clientId}/${url}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
  });
  const response = await parseResponse(rawResponse);

  return response;
};

export const useRemoteSchemas = ({ options, setOptions }: TutimOptionsProviderValue) => {
  const { clientId } = options;
  React.useEffect(() => {
    if (clientId) {
      request({ clientId, url: 'schemas' }).then(setOptions);
    }
  }, [clientId]);
};
