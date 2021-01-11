import { useQuery } from 'react-query';
import { getAllUserTags } from 'services/TagsServices';

const useUserActivities = () => useQuery(['activities', 'array'], async () => {
  const data = await getAllUserTags();
  return data;
});

export default useUserActivities;
