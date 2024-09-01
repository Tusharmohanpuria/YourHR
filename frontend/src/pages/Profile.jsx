import React, { useState, useEffect } from 'react';
import { uploadResume, getProfile, updateProfile } from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import MultiStageForm from '../components/MultiStageForm';

const Profile = () => {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      await uploadResume(file);
      toast.success('Resume uploaded successfully');
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Resume upload failed');
    }
  };

  const handleProfileUpdate = async (values, { setSubmitting }) => {
    try {
      const response = await updateProfile(values);
      setProfile(response.data);
      login(response.data, user.token);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Profile Management</h2>
      {profile ? (
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-center">Update Your Profile</h5>
                <MultiStageForm initialValues={profile} onSubmit={handleProfileUpdate} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-center">Upload Resume</h5>
                <form onSubmit={handleUpload}>
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Upload Resume
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <p>Loading profile information...</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
