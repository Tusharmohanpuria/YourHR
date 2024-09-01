import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { validationSchema, stageValidationSchema } from '../utils/validationSchema';

const MultiStageForm = ({ onSubmit, initialValues = {} }) => {
  const [stage, setStage] = useState(0);
  const stages = ['Basic Info', 'Education', 'Experience', 'Projects', 'Skills'];

  const defaultInitialValues = {
    fullName: '',
    email: '',
    password: '',
    contactInfo: { phone: '', address: '' },
    education: [{ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    projects: [{ name: '', description: '', link: '', technologies: '' }],
    skills: [{ skill: '', proficiency: '' }],
  };

  const mergedInitialValues = { ...defaultInitialValues, ...initialValues };

  const renderField = (name, label, type = 'text', options = []) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      {type === 'select' ? (
        <Field name={name} as="select" className="form-select">
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Field>
      ) : (
        <Field name={name} type={type} className="form-control" />
      )}
      <ErrorMessage name={name} component="div" className="text-danger mt-1" />
    </div>
  );

  const renderArrayFields = (values, arrayName, fields) => (
    <FieldArray name={arrayName}>
      {({ push, remove }) => (
        <>
          {values[arrayName].map((_, index) => (
            <div key={index} className="mb-4 p-3 border rounded bg-light">
              <h5 className="text-primary">{arrayName.charAt(0).toUpperCase() + arrayName.slice(1)} #{index + 1}</h5>
              {fields.map(field => renderField(`${arrayName}.${index}.${field.name}`, field.label, field.type, field.options))}
              {index > 0 && (
                <button type="button" className="btn btn-danger mt-2" onClick={() => remove(index)}>
                  Remove {arrayName.charAt(0).toUpperCase() + arrayName.slice(1)}
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => push(Object.fromEntries(fields.map(field => [field.name, ''])))}
          >
            Add {arrayName.charAt(0).toUpperCase() + arrayName.slice(1)}
          </button>
        </>
      )}
    </FieldArray>
  );

  const renderStage = (values) => {
    switch (stage) {
      case 0:
        return (
          <>
            {renderField('fullName', 'Full Name')}
            {renderField('email', 'Email', 'email')}
            {renderField('password', 'Password', 'password')}
            {renderField('contactInfo.phone', 'Phone')}
            {renderField('contactInfo.address', 'Address')}
          </>
        );
      case 1:
        return renderArrayFields(values, 'education', [
          { name: 'institution', label: 'Institution' },
          { name: 'degree', label: 'Degree' },
          { name: 'fieldOfStudy', label: 'Field of Study' },
          { name: 'startDate', label: 'Start Date', type: 'date' },
          { name: 'endDate', label: 'End Date', type: 'date' },
        ]);
      case 2:
        return renderArrayFields(values, 'experience', [
          { name: 'company', label: 'Company' },
          { name: 'position', label: 'Position' },
          { name: 'startDate', label: 'Start Date', type: 'date' },
          { name: 'endDate', label: 'End Date', type: 'date' },
          { name: 'description', label: 'Description' },
        ]);
      case 3:
        return renderArrayFields(values, 'projects', [
          { name: 'name', label: 'Project Name' },
          { name: 'description', label: 'Description' },
          { name: 'link', label: 'Project Link', type: 'url' },
          { name: 'technologies', label: 'Technologies Used' },
        ]);
      case 4:
        return renderArrayFields(values, 'skills', [
          { name: 'skill', label: 'Skill' },
          { name: 'proficiency', label: 'Proficiency', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
        ]);
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={mergedInitialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting, validateForm }) => (
        <Form>
          <div className="progress mb-4">
            <div 
              className="progress-bar" 
              role="progressbar" 
              style={{ width: `${(stage + 1) * 20}%` }} 
              aria-valuenow={(stage + 1) * 20} 
              aria-valuemin="0" 
              aria-valuemax="100"
            >
              {stages[stage]}
            </div>
          </div>
          <div className="card shadow-sm border-0 rounded-lg p-4 mb-4">
            <h2 className="text-center mb-4">{stages[stage]}</h2>
            {renderStage(values)}
          </div>
          <div className="d-flex justify-content-between">
            {stage > 0 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStage(stage - 1)}
              >
                Previous
              </button>
            )}
            {stage < stages.length - 1 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={async () => {
                  const stageErrors = await validateForm(values);
                  const currentStageErrors = Object.keys(stageErrors).filter(key => 
                    Object.keys(stageValidationSchema[stage].fields).includes(key)
                  );
                  if (currentStageErrors.length === 0) {
                    setStage(stage + 1);
                  } else {
                    alert('Please fill out all required fields before proceeding.');
                  }
                }}
              >
                Next
              </button>
            )}
            {stage === stages.length - 1 && (
              <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MultiStageForm;
