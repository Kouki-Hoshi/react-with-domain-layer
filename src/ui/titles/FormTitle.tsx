type FormTitleProps = {
  title: string;
};

const FormTitle: React.FC<FormTitleProps> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default FormTitle;
