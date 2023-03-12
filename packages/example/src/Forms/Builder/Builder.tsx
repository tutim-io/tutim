import { Form } from '@tutim/fields';
import config from './config.json';

const onSubmit = ({ data, schema }: any) => {
  alert(JSON.stringify(data));
  console.log(data);
};

export const Builder = (): JSX.Element => {
  return <Form onSubmit={onSubmit} config={config} />;
};
