import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  contactInfo: Yup.object().shape({
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
  }),
  education: Yup.array().of(
    Yup.object().shape({
      institution: Yup.string().required('Institution is required'),
      degree: Yup.string().required('Degree is required'),
      fieldOfStudy: Yup.string().required('Field of study is required'),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date().min(Yup.ref('startDate'), "End date can't be before start date"),
    })
  ),
  experience: Yup.array().of(
    Yup.object().shape({
      company: Yup.string().required('Company is required'),
      position: Yup.string().required('Position is required'),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date().min(Yup.ref('startDate'), "End date can't be before start date"),
      description: Yup.string().required('Description is required'),
    })
  ),
  projects: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Project name is required'),
      description: Yup.string().required('Description is required'),
      link: Yup.string().url('Invalid URL'),
      technologies: Yup.string().required('Technologies are required').test('technologies', 'At least one technology is required', (value) => {
        return value && value.split(',').map(tech => tech.trim()).filter(Boolean).length > 0;
      }),
    })
  ),
  skills: Yup.array().of(
    Yup.object().shape({
      skill: Yup.string().required('Skill is required'),
      proficiency: Yup.string().oneOf(['Beginner', 'Intermediate', 'Advanced', 'Expert'], 'Invalid proficiency level').required('Proficiency is required'),
    })
  ),
});

export const stageValidationSchema = [
  Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    contactInfo: Yup.object().shape({
      phone: Yup.string().required('Phone number is required'),
      address: Yup.string().required('Address is required'),
    }),
  }),
  Yup.object().shape({
    education: Yup.array().of(
      Yup.object().shape({
        institution: Yup.string().required('Institution is required'),
        degree: Yup.string().required('Degree is required'),
        fieldOfStudy: Yup.string().required('Field of study is required'),
        startDate: Yup.date().required('Start date is required'),
        endDate: Yup.date().min(Yup.ref('startDate'), "End date can't be before start date"),
      })
    ).min(1, 'At least one education entry is required'),
  }),
  Yup.object().shape({
    experience: Yup.array().of(
      Yup.object().shape({
        company: Yup.string().required('Company is required'),
        position: Yup.string().required('Position is required'),
        startDate: Yup.date().required('Start date is required'),
        endDate: Yup.date().min(Yup.ref('startDate'), "End date can't be before start date"),
        description: Yup.string().required('Description is required'),
      })
    ).min(1, 'At least one experience entry is required'),
  }),
  Yup.object().shape({
    projects: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Project name is required'),
        description: Yup.string().required('Description is required'),
        link: Yup.string().url('Invalid URL'),
        technologies: Yup.string().required('Technologies are required').test('technologies', 'At least one technology is required', (value) => {
          return value && value.split(',').map(tech => tech.trim()).filter(Boolean).length > 0;
        }),
      })
    ).min(1, 'At least one project entry is required'),
  }),
  Yup.object().shape({
    skills: Yup.array().of(
      Yup.object().shape({
        skill: Yup.string().required('Skill is required'),
        proficiency: Yup.string().oneOf(['Beginner', 'Intermediate', 'Advanced', 'Expert'], 'Invalid proficiency level').required('Proficiency is required'),
      })
    ).min(1, 'At least one skill entry is required'),
  }),
];