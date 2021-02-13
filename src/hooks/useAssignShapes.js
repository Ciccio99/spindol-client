import { useEffect } from 'react';
import { useActivitiesList, useUpdateActivity } from 'hooks/useActivities';
import { getRandomShapeId, getRandomShapeColor } from 'utils/shape-utils';

export default function useAssignShapes() {
  const { data: activities } = useActivitiesList();
  const { updateActivity } = useUpdateActivity();

  useEffect(() => {
    if (!activities || activities.length === 0) return;
    (async () => {
      activities.forEach((activity) => {
        if (!activity.shapeId && !activity.shapeColor) {
          const dto = {
            _id: activity._id,
            shapeId: getRandomShapeId(),
            shapeColor: getRandomShapeColor(),
          };
          updateActivity(dto);
        }
      });
    })();
  }, [activities, updateActivity]);
}
