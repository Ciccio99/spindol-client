import axios from 'loaders/axios';
import ErrorHandler from 'utils/ErrorHandler';

export const getAllUserTags = async () => {
  try {
    const { data } = await axios.get('/tags');
    return data;
  } catch (e) {
    throw new ErrorHandler(e);
  }
};

export const getTagById = async (id) => {
  try {
    const { data } = await axios.get(`/tags/${id}`);
    return data;
  } catch (e) {
    throw new ErrorHandler(e);
  }
};

export const insertTag = async (dto) => {
  try {
    if (dto.tag.length > 30) {
      throw new Error('Tag cannot be more than 30 characters long.');
    }
    const { data } = await axios.post('/tags', dto);
    return data;
  } catch (e) {
    throw new ErrorHandler(e);
  }
};

export const updateTag = async (dto) => {
  try {
    if (!dto._id) {
      throw new Error('Missing Tag Id in DTO');
    }
    if (dto.tag) {
      if (dto.tag.length > 30) {
        throw new Error('Tag cannot be more than 30 characters long.');
      }
    }
    const { data } = await axios.patch(`/tags/${dto._id}`, dto);
    return data;
  } catch (e) {
    throw new ErrorHandler(e);
  }
};

export const deleteTag = async (id) => {
  try {
    if (!id) {
      throw new Error('Missing Tag Id');
    }
    await axios.delete(`/tags/${id}`);
    return true;
  } catch (e) {
    throw new ErrorHandler(e);
  }
};
