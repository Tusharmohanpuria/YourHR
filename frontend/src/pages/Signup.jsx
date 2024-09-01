import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';
import { toast } from 'react-toastify';
import MultiStageForm from '../components/MultiStageForm';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signup(values);
      toast.success('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="card shadow-lg p-4">
            <h2 className="mb-4 text-center">Create Your Account</h2>
            <MultiStageForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
