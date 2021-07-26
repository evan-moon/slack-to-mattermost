import FormData from 'form-data';

type FormDataMap = Record<string, { value: any; options?: FormData.AppendOptions | string }>;
export function createMultipartFormData(data: FormDataMap) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, { value, options }]) => {
    formData.append(key, value, options);
  });

  return {
    formData,
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
    },
  };
}
