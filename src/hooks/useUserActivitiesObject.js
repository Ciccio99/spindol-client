import { useQuery } from 'react-query';
import { getAllUserTags } from 'services/TagsServices';

const useUserActivitiesObject = () => useQuery(['activities', 'object'], async () => {
  const data = await getAllUserTags();
  const activitiesObj = data.reduce((obj, activity) => ({
    ...obj,
    [activity._id]: activity,
  }), {});
  return activitiesObj;
});

export default useUserActivitiesObject;
