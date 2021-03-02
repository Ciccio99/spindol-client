import { useQuery, useQueryCache, useMutation } from 'react-query';
import { getAllUserTags, insertTag, updateTag } from 'services/TagsServices';
import { useAlertSystemDispatch } from 'context/alertSystemContext';

const getActivitiesObject = (activitiesList) => {
  const activitiesObj = activitiesList.reduce(
    (obj, activity) => ({
      ...obj,
      [activity._id]: activity,
    }),
    {}
  );
  return activitiesObj;
};

export const useActivitiesList = () =>
  useQuery(['activities', 'list'], async () => {
    const data = await getAllUserTags();
    return data;
  });

export const useActivitiesObject = () =>
  useQuery(['activities', 'object'], async () => {
    const data = await getAllUserTags();
    const activitiesObj = getActivitiesObject(data);
    return activitiesObj;
  });

export const useActivitiesListPrefetch = () => {
  const queryCache = useQueryCache();
  queryCache.prefetchQuery(['activities', 'object'], async () =>
    getAllUserTags()
  );
};

export const useActivitiesObjectPrefetch = () => {
  const queryCache = useQueryCache();

  queryCache.prefetchQuery(['activities', 'object'], async () => {
    const data = await getAllUserTags();
    const activitiesObj = getActivitiesObject(data);
    return activitiesObj;
  });
};

export const useCreateActivity = () => {
  const dispatchAlert = useAlertSystemDispatch();
  const queryCache = useQueryCache();

  const [createActivity] = useMutation((data) => insertTag(data), {
    onSuccess: () => {
      queryCache.invalidateQueries(['activities']);
    },
    onError: (error) => {
      dispatchAlert({
        type: 'ERROR',
        message: error.message,
      });
    },
  });

  return { createActivity };
};

export const useUpdateActivity = () => {
  const dispatchAlert = useAlertSystemDispatch();
  const queryCache = useQueryCache();

  const [updateActivity] = useMutation((data) => updateTag(data), {
    onSuccess: () => {
      queryCache.invalidateQueries(['activities']);
    },
    onError: (error) => {
      dispatchAlert({
        type: 'ERROR',
        message: error.message,
      });
    },
  });

  return { updateActivity };
};
