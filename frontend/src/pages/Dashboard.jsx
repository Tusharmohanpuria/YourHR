import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const openResume = () => {
    if (profile.resume && profile.resume.url) {
      window.open(profile.resume.url, '_blank');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="dashboard-title">Dashboard</h2>
        <Link to="/profile" className="btn btn-primary">Edit Profile</Link>
      </div>
      {profile ? (
        <div className="card shadow-sm border-0 rounded-lg">
          <div className="card-body">
            <h4 className="card-title text-primary">Welcome, {profile.full_name}!</h4>
            <hr />
            <div className="row mb-4">
              <div className="col-md-6">
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.contact_info.phone}</p>
                <p><strong>Address:</strong> {profile.contact_info.address}</p>
              </div>
              <div className="col-md-6">
                {profile.resume && (
                  <div className="resume-section">
                    <p><strong>Resume:</strong> {profile.resume.file_name}</p>
                    <button className="btn btn-outline-primary" onClick={openResume}>View Resume</button>
                  </div>
                )}
              </div>
            </div>
            <div className="profile-sections">
              <h5 className="text-secondary">Education</h5>
              <ul className="list-group mb-4">
                {profile.education.map((edu, index) => (
                  <li key={index} className="list-group-item">{edu.degree} from {edu.institution}, {edu.year}</li>
                ))}
              </ul>
              <h5 className="text-secondary">Experience</h5>
              <ul className="list-group mb-4">
                {profile.experience.map((exp, index) => (
                  <li key={index} className="list-group-item">{exp.position} at {exp.company}, {exp.startDate} - {exp.endDate || 'Present'}</li>
                ))}
              </ul>
              <h5 className="text-secondary">Projects</h5>
              <ul className="list-group mb-4">
                {profile.projects.map((project, index) => (
                  <li key={index} className="list-group-item">{project.name}: {project.description} {project.link && <a href={project.link} className="text-primary">Link</a>}</li>
                ))}
              </ul>
              <h5 className="text-secondary">Skills</h5>
              <ul className="list-group">
                {profile.skills.map((skill, index) => (
                  <li key={index} className="list-group-item">{skill.skill} - {skill.proficiency}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile information...</p>
      )}
    </div>
  );
};

export default Dashboard;
