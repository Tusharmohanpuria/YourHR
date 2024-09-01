const supabase = require('../services/supabaseService');
const path = require('path');

exports.getProfile = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, full_name, contact_info, education, experience, projects')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;

    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('*')
      .eq('user_id', req.user.id);

    if (skillsError) throw skillsError;

    user.skills = skills;

    const { data: resumeMetadata, error: resumeError } = await supabase
      .from('resumes')
      .select('id, file_name, file_path')
      .eq('user_id', req.user.id)
      .single();

    if (resumeError && resumeError.code !== 'PGRST116') {
      throw resumeError;
    }

    if (resumeMetadata) {
      const { data: resumeUrl, error: storageError } = await supabase
        .storage
        .from('resumes')
        .createSignedUrl(resumeMetadata.file_path, 60);

      if (storageError) throw storageError;

      user.resume = {
        ...resumeMetadata,
        url: resumeUrl.signedUrl
      };
      
    } else {
      user.resume = null;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.uploadResume = async (req, res, next) => {
  try {
    const { file } = req;
    const userId = req.user.id;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileExt = path.extname(file.originalname);
    const fileName = `${userId}/${Date.now()}${fileExt}`;

    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    const { data: resumeData, error: resumeError } = await supabase
      .from('resumes')
      .insert({
        user_id: userId,
        file_name: file.originalname,
        file_path: data.path
      });

    if (resumeError) throw resumeError;

    res.status(200).json({ message: 'Resume uploaded successfully', data: resumeData });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { fullName, contactInfo, education, experience, projects, skills } = req.body;

    const { data, error } = await supabase
      .from('users')
      .update({
        full_name: fullName,
        contact_info: contactInfo,
        education,
        experience,
        projects
      })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    // Update skills
    if (skills && skills.length > 0) {
      await supabase
        .from('skills')
        .delete()
        .eq('user_id', req.user.id);

      const { error: skillsError } = await supabase
        .from('skills')
        .insert(skills.map(skill => ({ user_id: req.user.id, ...skill })));

      if (skillsError) throw skillsError;
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};